/*
 * --------------------------------------------------
 * MNKR_VictoryMeLoop.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc 戦闘勝利時のMEをループ再生します。
 * @author munokura
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VictoryMeLoop.js
 * @help
 * # 機能
 * 戦闘勝利時のMEをループ再生し、シーン遷移まで継続させます。
 * データベース＞システム1＞音楽＞勝利で設定されたMEを使用します。
 * 
 * ループ開始・終了地点を秒単位で指定できます。
 * -1を指定した場合、音声ファイルのループタグに従います。
 * 
 * # 注意
 * このプラグインは BattleManager.playVictoryMe をオーバーライドします。
 * 勝利画面に関係するプラグインを併用する場合、競合に注意してください。
 * 
 * # 利用規約
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param loopStart
 * @text ループ開始地点（秒）
 * @desc ループの開始地点を秒で指定します。-1でファイルのループタグに従います。
 * @type number
 * @min -1
 * @decimals 2
 * @default -1
 * 
 * @param loopEnd
 * @text ループ終了地点（秒）
 * @desc ループの終了地点を秒で指定します。-1でファイルのループタグに従います。
 * @type number
 * @min -1
 * @decimals 2
 * @default -1
 */

(() => {
    'use strict';

    // プラグインパラメーター取得
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM = {};
    PRM.loopStart = parseFloat(parameters['loopStart']) || -1;
    PRM.loopEnd = parseFloat(parameters['loopEnd']) || -1;

    //-----------------------------------------------------------------------------
    // VictoryMEController
    // 勝利MEのループ制御を管理するクラス

    function VictoryMEController() {
        this.initialize.apply(this, arguments);
    }

    VictoryMEController.prototype.initialize = function () {
        this._isPlaying = false;
        this._timer = null;
        this._currentAudio = null;
        this._audioContext = null;
        this._sourceNode = null;
        this._gainNode = null;
        this._buffer = null;
        this._startTime = 0;
        this._pausedAt = 0;
        this._loopStart = PRM.loopStart;
        this._loopEnd = PRM.loopEnd;
    };

    VictoryMEController.prototype.isPlaying = function () {
        return this._isPlaying;
    };

    VictoryMEController.prototype.start = function () {
        if (this._isPlaying) return;
        this._isPlaying = true;
        this.playVictoryME();
    };

    VictoryMEController.prototype.stop = function () {
        this._isPlaying = false;
        this.clearTimer();
        this.stopAudio();
    };

    VictoryMEController.prototype.stopAudio = function () {
        if (this._sourceNode) {
            try {
                this._sourceNode.stop();
            } catch (e) {
                // すでに停止している場合のエラーを無視
            }
            this._sourceNode = null;
        }

        // 通常のME停止も実行
        AudioManager.stopMe();
    };

    VictoryMEController.prototype.playVictoryME = function () {
        if (!this._isPlaying) return;

        const victoryMe = $dataSystem.victoryMe;
        if (!victoryMe || !victoryMe.name) return;

        // カスタムループが指定されている場合
        if (this._loopStart >= 0 || this._loopEnd >= 0) {
            this.playWithCustomLoop(victoryMe);
        } else {
            // ファイルのループタグに従う
            this.playWithFileLoop(victoryMe);
        }
    };

    VictoryMEController.prototype.playWithCustomLoop = function (meData) {
        const self = this;

        this.loadAudioBuffer(meData).then(function (buffer) {
            if (!self._isPlaying) return;

            self._buffer = buffer;
            self.initAudioContext();
            self.playCustomLoop();
        });
    };

    VictoryMEController.prototype.playWithFileLoop = function (meData) {
        const self = this;

        // 標準のME再生
        AudioManager.playMe(meData);

        // ファイル時間を取得してループスケジュール
        this.getMEDuration(meData).then(function (duration) {
            self.scheduleNextPlay(meData, duration);
        });
    };

    VictoryMEController.prototype.loadAudioBuffer = function (meData) {
        const self = this;
        return new Promise(function (resolve, reject) {
            const path = self.getAudioPath(meData.name);

            fetch(path)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    const audioContext = self.getAudioContext();
                    return audioContext.decodeAudioData(arrayBuffer);
                })
                .then(audioBuffer => {
                    resolve(audioBuffer);
                })
                .catch(error => {
                    console.warn('Audio loading failed:', error);
                    // フォールバックとして標準再生
                    self.playWithFileLoop(meData);
                });
        });
    };

    VictoryMEController.prototype.getAudioPath = function (filename) {
        // OGGを優先、フォールバックでM4A
        if (this.canPlayOgg()) {
            return 'audio/me/' + filename + '.ogg';
        } else {
            return 'audio/me/' + filename + '.m4a';
        }
    };

    VictoryMEController.prototype.canPlayOgg = function () {
        const audio = document.createElement('audio');
        return !!(audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    };

    VictoryMEController.prototype.getAudioContext = function () {
        if (!this._audioContext) {
            this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this._audioContext;
    };

    VictoryMEController.prototype.initAudioContext = function () {
        const audioContext = this.getAudioContext();

        this._gainNode = audioContext.createGain();
        this._gainNode.connect(audioContext.destination);

        // システム音量を適用
        const victoryMe = $dataSystem.victoryMe;
        this._gainNode.gain.value = (victoryMe.volume || 100) / 100;
    };

    VictoryMEController.prototype.playCustomLoop = function () {
        if (!this._isPlaying || !this._buffer) return;

        const audioContext = this.getAudioContext();
        const duration = this._buffer.duration;

        // ループ範囲の計算
        const startTime = this._loopStart >= 0 ? this._loopStart : 0;
        const endTime = this._loopEnd >= 0 ? Math.min(this._loopEnd, duration) : duration;
        const loopDuration = endTime - startTime;

        if (loopDuration <= 0) {
            console.warn('Invalid loop range specified');
            return;
        }

        // ソースノード作成
        this._sourceNode = audioContext.createBufferSource();
        this._sourceNode.buffer = this._buffer;
        this._sourceNode.connect(this._gainNode);

        // ループ設定
        this._sourceNode.loop = true;
        this._sourceNode.loopStart = startTime;
        this._sourceNode.loopEnd = endTime;

        // 再生開始
        this._sourceNode.start(0, startTime);

        // 次のループのスケジュール（念のための保険）
        this.scheduleCustomLoopCheck(loopDuration);
    };

    VictoryMEController.prototype.scheduleCustomLoopCheck = function (duration) {
        const self = this;
        this.clearTimer();

        this._timer = setTimeout(function () {
            if (self._isPlaying) {
                // 音声が継続しているかチェック
                if (!self._sourceNode || self._sourceNode.playbackState === 'finished') {
                    self.playCustomLoop();
                } else {
                    // 再帰的にチェック
                    self.scheduleCustomLoopCheck(duration);
                }
            }
        }, duration * 1000);
    };

    VictoryMEController.prototype.scheduleNextPlay = function (meData, duration) {
        const self = this;
        this.clearTimer();

        this._timer = setTimeout(function () {
            if (self._isPlaying) {
                self.playWithFileLoop(meData);
            }
        }, duration);
    };

    VictoryMEController.prototype.getMEDuration = function (meData) {
        const self = this;
        return new Promise(function (resolve) {
            const buffer = AudioManager._meBuffer;

            if (buffer && buffer._buffer && buffer._buffer.duration) {
                resolve(buffer._buffer.duration * 1000);
            } else {
                self.loadAudioForDuration(meData, resolve);
            }
        });
    };

    VictoryMEController.prototype.loadAudioForDuration = function (meData, resolve) {
        const audio = new Audio();
        const path = this.getAudioPath(meData.name);
        const defaultDuration = 5000;

        const onLoadedMetadata = function () {
            resolve(audio.duration * 1000 || defaultDuration);
            cleanup();
        };

        const onError = function () {
            resolve(defaultDuration);
            cleanup();
        };

        const cleanup = function () {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('error', onError);
        };

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('error', onError);
        audio.src = path;

        setTimeout(function () {
            resolve(defaultDuration);
            cleanup();
        }, 1000);
    };

    VictoryMEController.prototype.clearTimer = function () {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    //-----------------------------------------------------------------------------
    // Global instance

    const $victoryMEController = new VictoryMEController();

    //-----------------------------------------------------------------------------
    // BattleManager

    BattleManager.playVictoryMe = function () {
        // 標準のME再生の代わりにループ再生を開始
        $victoryMEController.start();
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function () {
        _Scene_Battle_initialize.call(this);
        $victoryMEController.stop();
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        $victoryMEController.stop();
        _Scene_Battle_terminate.call(this);
    };

    //-----------------------------------------------------------------------------
    // SceneManager

    const _SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function (sceneClass) {
        $victoryMEController.stop();
        _SceneManager_goto.call(this, sceneClass);
    };

})();