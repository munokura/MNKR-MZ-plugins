/*
 * --------------------------------------------------
 * MNKR_TMTimerExMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMVplugin - タイマー拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/29
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTimerExMZ.js
 * @plugindesc タイマー表示を秒単位からミリ秒単位に変更します。
 *
 * @author tomoaky (改変 munokura)
 *
 * @help
 * 使用方法:
 * 
 *   プラグインを導入するだけでタイマー機能が拡張されます。
 *
 *   イベントコマンド『条件分岐』のタイマー判定を使用すると、
 *   ミリ秒単位ではまだ時間が残っているのにも関わらず、
 *   時間切れと判定されてしまいます。
 *   プラグインコマンドでゲーム変数に残り時間を代入してから、
 *   その変数を使って条件分岐を実行することでこの問題を回避できます。
 *
 *   ミリ秒表示は毎フレーム再描画を実行するため、処理が重くなります。
 *
 *
 * プラグインコマンド:
 *
 *   timerMsec 5
 *     ゲーム変数5番にタイマーの残り時間をミリ秒単位で代入します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @param timerX
 * @text タイマーX座標
 * @type number
 * @desc タイマーを表示するX座標。
 * 初期値: 816(ウィンドウの幅以上の値の場合は右端)
 * @default 816
 *
 * @param timerY
 * @text タイマーY座標
 * @type number
 * @desc タイマーを表示するY座標。
 * 初期値: 48(ウィンドウの高さ以上の値の場合は下端)
 * @default 48
 *
 * @param showMinutes
 * @text タイマー表示形式
 * @type boolean
 * @on 分:秒
 * @off 秒のみ
 * @desc タイマーを 分 : 秒 の書式で表示する。
 * 初期値: true (false-秒のみ / true-分:秒)
 * @default true
 *
 * @param msecShiftY
 * @text ミリ秒のY調整
 * @type number
 * @desc ミリ秒表示のY座標を調整します。
 * 初期値: 36
 * @default 36
 * 
 * 
 * @command timerMsec
 * @text タイマーの残り時間を代入
 * @desc タイマーの残り時間を代入します。
 *
 * @arg variableId
 * @text 変数ID
 * @desc 変数にタイマーの残り時間をミリ秒単位で代入します。
 * @type variable
 * @default 0
 */

var Imported = Imported || {};
Imported.TMTimerEx = true;

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const timerX = +parameters['timerX'];
    const timerY = +parameters['timerY'];
    const showMinutes = parameters['showMinutes'] === 'true';
    const msecShiftY = +parameters['msecShiftY'];

    //-----------------------------------------------------------------------------
    // Game_Timer
    //

    Game_Timer.prototype.msec = function () {
        return Math.floor(this._frames / 60 * 1000);
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "timerMsec", args => {
        const arr = [args.variableId];
        $gameVariables.setValue(+arr[0], $gameTimer.msec());
    });

    //-----------------------------------------------------------------------------
    // Sprite_Timer
    //

    Sprite_Timer.prototype.createBitmap = function () {
        this.bitmap = new Bitmap(160, 48);
    };

    const _Sprite_Timer_updateBitmap = Sprite_Timer.prototype.updateBitmap;
    Sprite_Timer.prototype.updateBitmap = function () {
        _Sprite_Timer_updateBitmap.call(this);
        let msec = $gameTimer.msec();
        if (this._msec !== msec) {
            this._msec = msec;
            this.redrawMsec();
        }
    };

    Sprite_Timer.prototype.redraw = function () {
        this.bitmap.fontSize = 32;
        let text = showMinutes ? this.timerText() : '' + this._seconds;
        let height = this.bitmap.height;
        this.bitmap.clearRect(0, 0, 96, height);
        this.bitmap.drawText(text, 0, 0, 96, height, 'right');
    };

    Sprite_Timer.prototype.redrawMsec = function () {
        this.bitmap.fontSize = 16;
        let text = '.' + (this._msec % 1000).padZero(3);
        let y = this.bitmap.height - msecShiftY;
        let width = this.bitmap.width - 96;
        this.bitmap.clearRect(96, y, width, msecShiftY);
        this.bitmap.drawText(text, 96, y, width, msecShiftY, 'left');
    };

    Sprite_Timer.prototype.updatePosition = function () {
        if (timerX >= Graphics.width) {
            this.x = Graphics.width - this.bitmap.width;
        } else {
            this.x = timerX;
        }
        if (timerY >= Graphics.height) {
            this.y = Graphics.height - this.bitmap.height;
        } else {
            this.y = timerY;
        }
    };

})();