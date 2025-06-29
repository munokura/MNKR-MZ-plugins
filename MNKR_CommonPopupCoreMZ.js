/*
 * --------------------------------------------------
 * MNKR_CommonPopupCoreMZ.js
 * Ver.0.1.1
 * Copyright (c) 2020, 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//
//  汎用ポップアップコア ver1.06
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommonPopupCoreMZ.js
 * @plugindesc 汎用的なポップアップの仕組みを提供するためのベースプラグインです。
 * @author Yana (改変 munokura)
 * @help
 * # 機能
 * ポップアップを表示するプラグインコマンドを追加します。
 * 
 * ## プラグインコマンドのパラメータ
 * text:表示テキスト
 * eventId:表示するイベントのID
 * count:表示時間
 * delay:表示遅延
 * moveX:移動先地点X(相対座標)
 * moveY:移動先地点Y(相対座標)
 * sx:ポップ位置補正X
 * sy:ポップ位置補正Y
 * pattern:表示パターン　0がフェード、-1が横ストレッチ、-2が縦ストレッチ
 * back:-1:透明背景,0:背景カラーのグラデーション
 * bx:テキスト表示位置補正X
 * by:テキスト表示位置補正Y
 * extend:
 * 表示タイミングの調整用配列で指定。
 * 例:extend:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * 
 * - 移植前で未実装のものを追加
 * backImage:ファイル名（img/pictures内）
 * 
 * - 必要性が低いと考え、プラグインコマンドから削除
 * anchorX:ポップアップ原点X。0イベントの右端。タイル単位。
 * anchorY:ポップアップ原点Y。0イベントの下端。タイル単位。
 * 
 * - 未実装と思われる機能
 * fixed:画面に固定するか？ true/falseで指定。
 * slideCount:新しいポップアップが発生した際、上にスライドさせる速度。
 * 
 * 
 * # 利用規約:
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * * @command CommonPopupAdd
 * @text ポップアップ表示
 * @desc テキストをポップアップ表示します。
 * @arg text
 * @type string
 * @text 表示テキスト
 * @desc 表示テキストを入力します。
 * @default 
 * @arg eventId
 * @type number
 * @min -1
 * @text イベントID
 * @desc 表示するイベントのID。
 * -1:プレイヤー / 0:実行イベント / 1以上:イベントID
 * @default -1
 * @arg count
 * @type number
 * @text 表示時間
 * @desc ポップアップを完了するまでのフレーム数
 * @default 60
 * @arg delay
 * @type number
 * @text 表示遅延
 * @desc ポップアップを開始するまでのフレーム数
 * @default 0
 * @arg moveX
 * @type number
 * @min -9007
 * @max 9007
 * @text 移動先地点X(相対座標)
 * @desc ポップアップ完了時のX位置補正
 * @default 0
 * @arg moveY
 * @type number
 * @min -9007
 * @max 9007
 * @text 移動先地点Y(相対座標)
 * @desc ポップアップ完了時のY位置補正
 * @default -48
 * @arg sx
 * @type number
 * @min -9007
 * @max 9007
 * @text ポップ位置補正X
 * @desc ポップアップのX位置補正
 * @default 0
 * @arg sy
 * @type number
 * @min -9007
 * @max 9007
 * @text ポップ位置補正Y
 * @desc ポップアップのY位置補正
 * @default 0
 * @arg pattern
 * @type select
 * @option フェード
 * @value Normal
 * @option 横ストレッチ
 * @value Stretch
 * @option 縦ストレッチ
 * @value GrowUp
 * @text 表示パターン
 * @desc ポップアップ表示の変形パターン
 * @default Normal
 * @arg back
 * @text 背景色
 * @type string
 * @desc 背景色:Red,Green,Blue,Alpha / 透明:-1
 * 例:0, 0, 0, 0.6
 * @default 0,0,0,0.6
 * @arg backImage
 * @text 背景画像
 * @type file
 * @require 1
 * @dir img/pictures
 * @desc 背景画像を指定します。背景画像を使用すると背景色は無視されます。
 * @default
 * @arg bx
 * @type number
 * @min -9007
 * @max 9007
 * @text テキスト位置補正X
 * @desc テキストの表示位置補正X
 * @default 0
 * @arg by
 * @type number
 * @min -9007
 * @max 9007
 * @text テキスト位置補正Y
 * @desc テキストの表示位置補正Y
 * @default 0
 * @arg extend
 * @type string
 * @text 表示タイミングの調整
 * @desc 表示タイミングの調整用配列で指定。例:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * @default
 * 
 * * @command CommonPopupClear
 * @text ポップアップ消去
 * @desc 表示されているポップアップを消去します。
 */

var Imported = Imported || {};
Imported['CommonPopupCore'] = 1.06;

function Sprite_Popup() {
    this.initialize.apply(this, arguments);
};

function CommonPopupManager() {
    throw new Error('This is a static class');
};

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    PluginManager.registerCommand(pluginName, "CommonPopupAdd", function (args) {
        const argParam = Object.entries(args).map(([key, value]) => `${key}:${value}`);
        argParam.unshift("add");

        let eventId = 0;
        for (let i = 0; i < argParam.length; i++) {
            if (argParam[i].match(/^eventId:(.+)/g)) {
                eventId = Number(RegExp.$1);
                break;
            }
        }
        const character = this.character(eventId);
        const arg = CommonPopupManager.setPopup(argParam, character);

        if (arg.backImage !== '') {
            CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg));
            CommonPopupManager._readyPopup.push(arg);
        } else {
            CommonPopupManager._readyPopup.push(arg);
        }
    });

    PluginManager.registerCommand(pluginName, "CommonPopupClear", function (args) {
        CommonPopupManager.clearPopup();
    });

    Array.prototype.setNullPos = function (object) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === null || this[i] === '') {
                this[i] = object;
                return i;
            }
        }
        this.push(object);
    };

    Array.prototype.compact = function () {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== null && this[i] !== '') {
                result.push(this[i]);
            }
        }
        return result;
    };

    CommonPopupManager.initTempSprites = function () {
        this._tempCommonSprites = new Array(50);
        this._setedPopups = [];
        this._readyPopup = [];
    };

    CommonPopupManager.window = function () {
        if (this._window) { return this._window }
        this._window = new Window_Base(new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight));
        return this._window;
    };

    CommonPopupManager.testBitmap = function () {
        if (this._testBitmap) { return this._testBitmap }
        this._testBitmap = new Bitmap(1, 1);
        return this._testBitmap;
    };

    Sprite_Popup.prototype = Object.create(Sprite.prototype);
    Sprite_Popup.prototype.constructor = Sprite_Popup;

    Sprite_Popup.prototype.initialize = function (index) {
        Sprite.prototype.initialize.call(this);
        this._index = index;
        this._count = 0;
        this._enable = false;
        this.update();
    };

    Sprite_Popup.prototype.setMembers = function (arg) {
        this._count = arg.count;
        this._arg = arg;
        this.anchor.x = arg.anchorX;
        this.anchor.y = arg.anchorY;
        this.x = arg.x;
        this.y = arg.y;
        this.z = 6;
        this.visible = true;
        this._enable = true;
        this.createBitmap();
        if (arg.slideCount) {
            CommonPopupManager._setedPopups.push([this._index, this.height, this._arg.slideCount]);
        }
    };

    Sprite_Popup.prototype.createBitmap = function () {
        if (this._arg.bitmap) {
            this.bitmap = this._arg.bitmap;
        } else {
            CommonPopupManager.window().resetFontSettings();
            const text = this._arg.text;
            const size = CommonPopupManager.window().textSizeEx(text);
            const width = size.width;
            const height = size.height;
            const sh = 8;
            CommonPopupManager.window().createContents();
            this.bitmap = new Bitmap(width + 24, height + sh);
            this.drawBackRect(width + 24, height + sh);
            CommonPopupManager.window().drawTextEx(this._arg.text, 12, 4);
            this.bitmap.blt(CommonPopupManager.window().contents, 0, 0, width + 24, height + sh, this._arg.bx, this._arg.by);
        }
    };

    Sprite_Popup.prototype.drawBackRect = function (width, height) {
        if (this._arg.backImage !== '') {
            const bitmap = CommonPopupManager.makeBitmap(this._arg);
            const w = this._bitmap.width;
            const h = this._bitmap.height;
            if (typeof this._arg.back === 'string') {
                w = bitmap.width > this._bitmap.width ? bitmap.width : w;
                h = bitmap.height > this._bitmap.height ? bitmap.height : h;
                if (w > this._bitmap.width || h > this._bitmap.height) {
                    this.bitmap = new Bitmap(w, h);
                }
            }
            this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, w, h);
        } else {
            if (this._arg.back === '-1') {
            } else {
                const color1 = 'rgba(' + this._arg.back + ')';
                const color2 = 'rgba(0,0,0,0)';
                const dSize = width / 4;
                this.bitmap.gradientFillRect(0, 0, dSize, height, color2, color1);
                this.bitmap.fillRect(dSize, 0, dSize * 2, height, color1);
                this.bitmap.gradientFillRect(dSize * 3, 0, dSize, height, color1, color2);
            }
        }
    };

    Sprite_Popup.prototype.update = function () {
        Sprite.prototype.update.call(this);
        if (CommonPopupManager._tempCommonSprites[this._index] && !this._enable) {
            if (CommonPopupManager._tempCommonSprites[this._index].delay === 0) {
                this.setMembers(CommonPopupManager._tempCommonSprites[this._index]);
                if (this._arg && this._arg.se.name) AudioManager.playSe(this._arg.se);
            } else {
                CommonPopupManager._tempCommonSprites[this._index].delay--;
            }
        }
        if (this._count > 0) {
            this._count--;
            if (!this._arg) {
                this.terminate();
                return;
            }
            switch (this._arg.pattern) {
                case 0:
                case '0':
                case 'Normal':
                    this.updateSlide();
                    break;
                case -1:
                case '-1':
                case 'Stretch':
                    this.updateTurn();
                    break;
                case -2:
                case '-2':
                case 'GrowUp':
                    this.updateGrowUp();
                    break;
                default:
                    this.updateAnime();
            }
            if (this._count === 0) this.terminate();
        }
        if (this._arg && this._arg.slideCount) this.updateMoveSlide();
    };

    Sprite_Popup.prototype.updateMoveSlide = function () {
        if (CommonPopupManager._setedPopups) {
            let array = CommonPopupManager._setedPopups.clone().reverse();
            let n = 0;
            for (let i = 0; i < array.length; i++) {
                if (this._index === array[i][0]) {
                    if (this._arg.slideAction === 'Down') {
                        this.y = this.y + n;
                    } else {
                        this.y = this.y - n;
                    }
                }
                const sprite = CommonPopupManager._tempCommonSprites[array[i][0]];
                if (sprite.pattern === -2 || sprite.pattern === 'GrowUp') {
                    n += (array[i][1] * sprite.rate);
                } else {
                    n += (array[i][1] * ((this._arg.slideCount - array[i][2]) / this._arg.slideCount));
                }
            }
            for (let i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                CommonPopupManager._setedPopups[i][2]--;
                if (CommonPopupManager._setedPopups[i][2] < 0) {
                    CommonPopupManager._setedPopups[i][2] = 0
                }
            }
            array = null;
        }
    };

    Sprite_Popup.prototype.updateSlide = function () {
        const originalWait = this._arg.count;
        const cnt = originalWait - this._count;
        this.opacity = 255;
        const act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend !== '') { act = this._arg.extend }
        const opTime1 = act[0];
        let moveX = 0;
        let moveY = 0;
        if (act[2]) { opTime1 = originalWait - act[2] }
        const opTime2 = originalWait - act[1];
        if (act[3]) { opTime2 = act[3] }
        // 登場演出
        let up = 0;
        let slide = 0;
        if (cnt < act[0]) {
            up = (this._arg.moveY / act[0]);
            slide = (this._arg.moveX / act[0]);
            this.opacity = Math.floor(255 * (cnt / opTime1));
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            // 退場演出
        } else if (cnt >= act[1]) {
            up = (this._arg.moveY / (originalWait - act[1]));
            slide = (this._arg.moveX / (originalWait - act[1]));
            this.opacity = Math.floor(255 * (this._count / opTime2));
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / opTime2));
                moveY = Math.floor(this._arg.moveY * (this._count / opTime2));
            } else {
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        } else {
            moveX = this._arg.moveX;
            moveY = this._arg.moveY;
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.updateTurn = function () {
        const originalWait = this._arg.count;
        const cnt = originalWait - this._count;
        const act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.x = 0;
        let moveX = 0;
        let moveY = 0;
        let rate = 0;
        if (cnt < act[0]) {
            const up = (this._arg.moveY / act[0]);
            const slide = (this._arg.moveX / act[0]);
            rate = cnt / act[0];
            this.scale.x = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
        } else if (cnt > act[1]) {
            const a1 = originalWait - act[1];
            rate = this._count / a1;
            this.scale.x = rate;
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / a1));
                moveY = Math.floor(this._arg.moveY * (this._count / a1));
            } else {
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        } else {
            this.scale.x = 1.0;
            moveX = this._arg.moveX;
            moveY = this._arg.moveY;
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.updateGrowUp = function () {
        const originalWait = this._arg.count;
        const cnt = originalWait - this._count;
        const act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.y = 0;
        let moveX = 0;
        let moveY = 0;
        let rate = 0;
        if (cnt < act[0]) {
            const up = (this._arg.moveY / act[0]);
            const slide = (this._arg.moveX / act[0]);
            rate = cnt / act[0];
            this.scale.y = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            this._arg.rate = rate;
        } else if (cnt >= act[1]) {
            const a1 = originalWait - act[1];
            rate = this._count / a1;
            this.scale.y = rate;
            this._arg.rate = rate;
            if (this._arg.enableOutEffect) {
                moveX = Math.floor(this._arg.moveX * (this._count / a1));
                moveY = Math.floor(this._arg.moveY * (this._count / a1));
            } else {
                moveX = this._arg.moveX;
                moveY = this._arg.moveY;
            }
        } else {
            this.scale.y = 1.0;
            moveX = this._arg.moveX;
            moveY = this._arg.moveY;
        }
        this._times = cnt;
        this.setPosition(moveX, moveY);
    };

    Sprite_Popup.prototype.setPosition = function (x, y) {
        this.x = this._arg.x + x + this._arg.sx;
        this.y = this._arg.y + y + this._arg.sy;
        // バトラー用の座標加算（戦闘シーンで使用）
        if (this._arg.battler && $gameParty.inBattle()) {
            this.x += this._arg.battler.x;
            this.y += this._arg.battler.y;
        }

        // マップ画面の場合、マップスクロールによる補正を適用
        if (!this._arg.battler && this._arg.fixed) {
            const dx = $gameMap._displayX;
            const dy = $gameMap._displayY;
            this.x -= dx * $gameMap.tileWidth();
            this.y -= dy * $gameMap.tileHeight();
        }
    };

    Sprite_Popup.prototype.updateAnime = function () {
        const anime = $dataAnimations[Number(this._arg.pattern)];
        const frameId = Math.floor((anime.frames.length * (this._arg.count - this._count)) / this._arg.count);
        if (frameId !== anime.frames.length) {
            const array = anime.frames[frameId][0];
            const x = array[1];
            const y = array[2];
            this.x = this._arg.x + x + this._arg.sx;
            this.y = this._arg.y + y + this._arg.sy;
            this.scale = new Point(array[3] / 100, array[3] / 100);
            this.rotation = array[4];
            this.opacity = array[6];
            this.blendMode = array[7];
        }
    };

    Sprite_Popup.prototype.terminate = function () {
        this.bitmap = null;
        this.visible = false;
        this._enable = false;
        this._count = 0;
        this._arg = null;

        if (CommonPopupManager._tempCommonSprites[this._index]) {
            CommonPopupManager._tempCommonSprites[this._index].terminate = true;
        }
        if (CommonPopupManager._setedPopups) {
            for (let i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                if (CommonPopupManager._setedPopups[i][0] === this._index) {
                    delete CommonPopupManager._setedPopups[i];
                }
            }
            CommonPopupManager._setedPopups = CommonPopupManager._setedPopups.compact();
        }
    };

    CommonPopupManager.setPopup = function (argParam, character) {
        const arg = {
            x: null,
            y: null,
            text: '',              // 表示テキスト
            eventId: -1,           // 表示するイベントのID
            count: 60,             // 表示時間
            delay: 0,              // 表示遅延
            moveX: 0,              // 目標地点X(相対座標)
            moveY: -48,            // 目標地点Y(相対座標)
            sx: 0,                 // 表示位置補正X
            sy: 0,                 // 表示位置補正Y
            pattern: 0,            // 表示パターン
            back: -1,              // 背景に使う画像インデックス
            backImage: '',         // 背景に使う画像ファイル名
            bx: 0,                 // 内容の表示位置補正X
            by: 0,                 // 内容の表示位置補正Y
            extend: '',            // 
            fixed: true,           //
            anchorX: 0.5,          // ★ここがデフォルトで0.5になっていることを確認
            anchorY: 0.5,          // ★ここがデフォルトで0.5になっていることを確認
            battler: null,
            se: { name: '', volume: 90, pitch: 100, pan: 0 },
            enableOutEffect: true
        };
        const array = ['x', 'y', 'text', 'eventId', 'count', 'delay', 'moveX', 'moveY',
            'sx', 'sy', 'pattern', 'back', 'backImage', 'bx', 'by', 'extend', 'fixed',
            'anchorX', 'anchorY', 'slideCount'];
        for (let i = 0; i < argParam.length; i++) {
            if (i > 0) {
                for (let j = 0; j < array.length; j++) {
                    const r = new RegExp('^(' + array[j] + ')' + ':(.+)');
                    if (argParam[i].match(r)) {
                        const code = RegExp.$1;
                        const value = RegExp.$2;
                        if (code === 'text' || code === 'extend') {
                            arg[code] = value;
                        } else if (code === 'fixed') {
                            arg[code] = value === 'true';
                        } else if (code === 'back') {
                            arg[code] = value;
                        } else if (code === 'pattern') {
                            arg[code] = value;
                        } else if (code === 'backImage') {
                            arg[code] = value;
                        } else {
                            arg[code] = Number(value);
                        }
                    }
                }
            }
        }
        if (arg.x === null) {
            if (character) {
                arg.x = character.screenX() - ($gameMap.tileWidth() / 2);
            } else {
                arg.x = Graphics.boxWidth / 2;
            }
        }
        if (arg.y === null) {
            if (character) {
                arg.y = character.screenY() - $gameMap.tileHeight();
            } else {
                arg.y = Graphics.boxHeight / 2;
            }
        }

        if (arg.extend) {
            arg.extend = eval(arg.extend);
        }

        arg.terminate = false;
        return arg;
    };

    CommonPopupManager.setPopUpdate = function () {
        if (this._readyPopup) {
            for (let i = 0; i < this._readyPopup.length; i++) {
                if (this._readyPopup[i]) {
                    const arg = this._readyPopup[i];
                    if (ImageManager.isReady()) {
                        this.startPopup(arg);
                        delete this._readyPopup[i];
                        this._readyPopup.compact();
                        return;
                    } else {
                        this.bltCheck(this.makeBitmap(arg));
                    }
                }
            }
        }
    };

    CommonPopupManager.makeBitmap = function (arg) {
        const fileName = arg.backImage;
        ImageManager.loadPicture(fileName);
        return ImageManager.loadPicture(fileName);
    };

    CommonPopupManager.bltCheck = function (bitmap) {
        this.testBitmap().blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
        bitmap = null;
    };

    CommonPopupManager.startPopup = function (arg) {
        CommonPopupManager._tempCommonSprites.setNullPos(arg);
    };

    CommonPopupManager.clearPopup = function (tag) {
        if (!CommonPopupManager._tempCommonSprites) {
            CommonPopupManager.initTempSprites();
        }

        for (let i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                if (!tag || tag === CommonPopupManager._tempCommonSprites[i].tag) {
                    CommonPopupManager._tempCommonSprites[i].delay = 0;
                    CommonPopupManager._tempCommonSprites[i].count = 1;
                    const sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                    if (sprite) sprite._count = 1;
                }
            }
        }
    };

    const _cPU_SsBase_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function () {
        _cPU_SsBase_initialize.call(this);
        this.createSpritePopup();
    };

    const _cPU_SsBase_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function () {
        _cPU_SsBase_update.call(this);
        if (this._popupContainer === '') { return }
        if (CommonPopupManager._tempCommonSprites) {
            for (let i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
                if (CommonPopupManager._tempCommonSprites[i]) {
                    let sprite = null;
                    if (CommonPopupManager._tempCommonSprites[i].terminate) {
                        sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                        this._popupContainer.removeChild(sprite);
                        delete CommonPopupManager._tempCommonSprites[i]
                    } else if (!CommonPopupManager._tempCommonSprites[i].sprite) {
                        sprite = new Sprite_Popup(i);
                        this._popupContainer.addChild(sprite);
                        CommonPopupManager._tempCommonSprites[i].sprite = sprite;
                    }
                }
            }
        }
    };

    const _cPU_SBase_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _cPU_SBase_update.call(this);
        if (CommonPopupManager) { CommonPopupManager.setPopUpdate() };
    };

    Spriteset_Base.prototype.createSpritePopup = function () {
        this._popupContainer = new Sprite();
        this._popupContainer.x = 0;
        this._popupContainer.y = 0;
        this.addChild(this._popupContainer);
    };

    const _cPU_SBase_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _cPU_SBase_terminate.call(this);
        this.terminatePopup();
    };

    Scene_Base.prototype.terminatePopup = function () {
        if (!CommonPopupManager._tempCommonSprites) {
            CommonPopupManager.initTempSprites();
        }
        for (let i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                const sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                if (sprite) sprite.terminate();
                delete CommonPopupManager._tempCommonSprites[i];
            }
        }
        CommonPopupManager._setedPopupss = [];
        CommonPopupManager._readyPopup = [];
    };

    const _cPU_SMap_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function () {
        _cPU_SMap_launchBattle.call(this);
        this.terminatePopup();
    };

})();