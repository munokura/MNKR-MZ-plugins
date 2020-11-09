/*
 * --------------------------------------------------
 * MNKR_CommonPopupCoreMZ Ver.0.0.9
 * Copyright (c) 2020 Munokura
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
 * 
 * @help
 * このプラグインは、汎用的なポップアップの仕組みを提供するプラグインです。
 * このプラグイン単体ではプラグインコマンドを追加する以外の機能はありません。
 * 
 * ------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * CommonPopup add param1 param2 param3 ・・・
 * 
 * 必要なパラメータのみを指定できます。
 *  例:プレイヤーの上にテストと240フレームポップアップさせる
 * CommonPopup add text:テスト count:240 eventId:-1
 * 
 * パラメータ詳細:
 * text:表示テキスト
 * eventId:表示するイベントのID
 * count:表示時間
 * delay:表示遅延
 * moveX:目標地点X(相対座標)
 * moveY:目標地点Y(相対座標)
 * sx:表示位置補正X
 * sy:表示位置補正Y
 * pattern:表示パターン　0がフェード、-1が横ストレッチ、-2が縦ストレッチ
 * back:-1:透明背景,0:背景カラーのグラデーション
 * bx:内容の表示位置補正X
 * by:内容の表示位置補正Y
 * extend:
 *   表示タイミングの調整用配列で指定。
 *   例:extend:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * 
 * 以下、本家で未実装と思われる機能
 *   - fixed:画面に固定するか？ true/falseで指定。
 *   - anchorX:
 *   - anchorY:
 *   - slideCount:新しいポップアップが発生した際、上にスライドさせる速度。
 * 
 * 未実装だが追加したい
 * backImage:ファイル名（img/pictures内）
 *
 * イベントコマンドのスクリプトを使う場合、
 *
 * this.addPopup(["add","text:テスト","count:120"…]);
 *
 * のように記述すればスクリプトでポップアップを行うことができます。
 * 同じように、イベントコマンドの移動ルート内のスクリプトで使用する場合、
 *
 * $gameMap._interpreter.addPopup(["add","text:テスト","count:120"…]);
 *
 * のように記述すれば使用可能です。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command CommonPopupAdd
 * @text ポップアップ表示
 * @desc テキストをポップアップ表示します。
 * 
 * @arg text
 * @type string
 * @text 表示テキスト
 * @desc 表示テキストを入力します。
 * @default 
 * 
 * @arg eventId
 * @type number
 * @min -1
 * @text イベントID
 * @desc 表示するイベントのID。
 * -1:プレイヤー / 0:実行イベント / 1以上:イベントID
 * @default -1
 * 
 * @arg count
 * @type number
 * @text 表示時間
 * @desc ポップアップを完了するまでのフレーム数
 * @default 60
 * 
 * @arg delay
 * @type number
 * @text 表示遅延
 * @desc ポップアップを開始するまでのフレーム数
 * @default 0
 * 
 * @arg moveX
 * @type number
 * @min -9007
 * @max 9007
 * @text 目標地点X(相対座標)
 * @desc ポップアップ完了時のX位置補正
 * @default 0
 * 
 * @arg moveY
 * @type number
 * @min -9007
 * @max 9007
 * @text 目標地点Y(相対座標)
 * @desc ポップアップ完了時のY位置補正
 * @default -48
 * 
 * @arg sx
 * @type number
 * @min -9007
 * @max 9007
 * @text 表示位置補正X
 * @desc ポップアップ枠内のX位置補正
 * @default 0
 * 
 * @arg sy
 * @type number
 * @min -9007
 * @max 9007
 * @text 表示位置補正Y
 * @desc ポップアップ枠内のY位置補正
 * @default 0
 * 
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
 * 
 * @arg back
 * @text 背景色
 * @type string
 * @desc 背景色:Red,Green,Blue,Alpha / 透明:-1
 * 例:0, 0, 0, 0.6
 * @default 0,0,0,0.6
 * 
 * @arg bx
 * @type number
 * @min -9007
 * @max 9007
 * @text 内容の表示位置補正X
 * @desc 内容の表示位置補正X
 * @default 0
 * 
 * @arg by
 * @type number
 * @min -9007
 * @max 9007
 * @text 内容の表示位置補正Y
 * @desc 内容の表示位置補正Y
 * @default 0
 * 
 * @arg extend
 * @type string
 * @text 表示タイミングの調整
 * @desc 表示タイミングの調整用配列で指定。
 * 例:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
 * @default
 * 
 * 
 * @command CommonPopupClear
 * @text ポップアップ消去
 * @desc 表示されているポップアップを消去します。
 */

/*
 * @param Text Back Color
 * @text ポップアップ背景色
 * @desc ポップアップの背景カラーです。
 * rgba(red,green,blue,alpha)で設定してください。
 * @default rgba(0,0,0,0.6)
 * 
 * @param Text Back FileName
 * @text ポップアップ背景画像
 * @desc ポップアップの背景画像名です。
 * %dがインデックスに変換されます。
 * @default popup_back%d
 * 
 * @arg backImage
 * @text 背景画像
 * @type file
 * @require 1
 * @dir img/pictures
 * @desc 背景画像を指定します。背景画像を使用すると背景色は無視されます。
 * @default
 * 
 * @arg fixed
 * @type boolean
 * @on 固定する
 * @off 固定しない
 * @text 画面に固定（false時が未実装）
 * @desc 画面に固定
 * @default true
 * 
 * @arg anchorX
 * @text 原点X
 * @desc 原点X
 * @default 0.5
 * 
 * @arg anchorY
 * @text 原点Y
 * @desc 原点Y
 * @default 0.5
 * 
 * @arg slideCount
 * @text スライド速度
 * @desc 新しいポップアップが発生した際、上にスライドさせる速度。
 * @default
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

    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    // var parameters = PluginManager.parameters(pluginName);
    // var commonPopupTextBackColor = String(parameters['Text Back Color'] || 'rgba(0, 0, 0, 0.6)');
    // var commonPopupTextBackFileName = String(parameters['Text Back FileName'] || 'popup_back%d');

    // var _cPU_GInterpreter_pluginCommand =
    //     Game_Interpreter.prototype.pluginCommand;
    // Game_Interpreter.prototype.pluginCommand = function (command, args) {
    //     _cPU_GInterpreter_pluginCommand.call(this, command, args);
    //     if (command === 'CommonPopup' || command === 'ポップアップ') {
    //         switch (args[0]) {
    //             case 'add':
    //             case '表示':
    //                 this.addPopup(args);
    //                 break;
    //             case 'clear':
    //             case '消去':
    //                 CommonPopupManager.clearPopup();
    //                 break;
    //         }
    //     }
    // };

    // Game_Interpreter.prototype.addPopup = function (argParam) {
    //     var eventId = 0;
    //     for (var i = 0; i < argParam.length; i++) {
    //         if (argParam[i].match(/^eventId:(.+)/g)) {
    //             eventId = Number(RegExp.$1);
    //             break;
    //         }
    //     }
    //     var character = this.character(eventId);
    //     var arg = CommonPopupManager.setPopup(argParam, character);
    //     if (arg.back > 0 || typeof arg.back === 'string') {
    //         CommonPopupManager.bltCheck(CommonPopupManager.makeBitmap(arg));
    //         CommonPopupManager._readyPopup.push(arg);
    //     } else {
    //         CommonPopupManager._tempCommonSprites.setNullPos(arg);
    //     }
    // };

    PluginManager.registerCommand(pluginName, "CommonPopupAdd", function (args) {
        var argParam = Object.entries(args).map(([key, value]) => `${key}:${value}`);
        argParam.unshift("add");

        var eventId = 0;
        for (var i = 0; i < argParam.length; i++) {
            if (argParam[i].match(/^eventId:(.+)/g)) {
                eventId = Number(RegExp.$1);
                break;
            }
        }
        var character = this.character(eventId);
        var arg = CommonPopupManager.setPopup(argParam, character);

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
        for (var i = 0; i < this.length; i++) {
            if (this[i] === null || this[i] === '') {
                this[i] = object;
                return i;
            }
        }
        this.push(object);
    };

    Array.prototype.compact = function () {
        var result = [];
        for (var i = 0; i < this.length; i++) {
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
        this._window = new Window_Base(0, 0, Graphics.boxWidth, Graphics.boxHeight);
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
            var text = this._arg.text;
            var width = CommonPopupManager.window().textWidth(text);
            var height = CommonPopupManager.window().contents.fontSize + 8;
            var sh = 8;
            if (this._arg.back === 0) { sh = 2 }
            CommonPopupManager.window().createContents();
            this.bitmap = new Bitmap(width + 24, height + sh);
            this.drawBackRect(width + 24, height + sh);
            CommonPopupManager.window().drawTextEx(this._arg.text, 12, 4);
            // this.bitmap.blt(CommonPopupManager.window().contents, 0, 0, width + 24, height + sh, this._arg.bx, this._arg.by + 2);
            this.bitmap.blt(CommonPopupManager.window().contents, 0, 0, width + 24, height + sh, this._arg.bx, this._arg.by);
        }
    };

    Sprite_Popup.prototype.drawBackRect = function (width, height) {

        // if (this._arg.backImage !== '') {
        //     var bitmap = CommonPopupManager.makeBitmap(this._arg);
        //     var w = this._bitmap.width;
        //     var h = this._bitmap.height;
        //     if (typeof this._arg.back === 'string') {
        //         w = bitmap.width > this._bitmap.width ? bitmap.width : w;
        //         h = bitmap.height > this._bitmap.height ? bitmap.height : h;
        //         if (w > this._bitmap.width || h > this._bitmap.height) {
        //             this.bitmap = new Bitmap(w, h);
        //         }
        //     }
        //     this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, w, h);
        //     bitmap.clear();
        //     bitmap = null;
        // } else {
        if (this._arg.back === '-1') {
        } else {
            var color1 = 'rgba(' + this._arg.back + ')';
            var color2 = 'rgba(0,0,0,0)';
            var dSize = width / 4;
            this.bitmap.gradientFillRect(0, 0, dSize, height, color2, color1);
            this.bitmap.fillRect(dSize, 0, dSize * 2, height, color1);
            this.bitmap.gradientFillRect(dSize * 3, 0, dSize, height, color1, color2);
        }
        // }
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
            var array = CommonPopupManager._setedPopups.clone().reverse();
            var n = 0;
            for (var i = 0; i < array.length; i++) {
                if (this._index === array[i][0]) {
                    if (this._arg.slideAction === 'Down') {
                        this.y = this.y + n;
                    } else {
                        this.y = this.y - n;
                    }
                }
                var sprite = CommonPopupManager._tempCommonSprites[array[i][0]];
                if (sprite.pattern === -2 || sprite.pattern === 'GrowUp') {
                    n += (array[i][1] * sprite.rate);
                } else {
                    n += (array[i][1] * ((this._arg.slideCount - array[i][2]) / this._arg.slideCount));
                }
            }
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                CommonPopupManager._setedPopups[i][2]--;
                if (CommonPopupManager._setedPopups[i][2] < 0) {
                    CommonPopupManager._setedPopups[i][2] = 0
                }
            }
            array = null;
        }
    };

    Sprite_Popup.prototype.updateSlide = function () {
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        this.opacity = 255;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend !== '') { act = this._arg.extend }
        var opTime1 = act[0];
        var moveX = 0;
        var moveY = 0;
        if (act[2]) { opTime1 = originalWait - act[2] }
        var opTime2 = originalWait - act[1];
        var n = 0;
        if (act[3]) { opTime2 = act[3] }
        // 登場演出
        if (cnt < act[0]) {
            var up = (this._arg.moveY / act[0]);
            var slide = (this._arg.moveX / act[0]);
            this.opacity = Math.floor(255 * (cnt / opTime1));
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            // 退場演出
        } else if (cnt >= act[1]) {
            var up = (this._arg.moveY / (originalWait - act[1]));
            var slide = (this._arg.moveX / (originalWait - act[1]));
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
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.x = 0;
        var moveX = 0;
        var moveY = 0;
        if (cnt < act[0]) {
            var up = (this._arg.moveY / act[0]);
            var slide = (this._arg.moveX / act[0]);
            var rate = cnt / act[0];
            this.scale.x = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
        } else if (cnt > act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1;
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
        var originalWait = this._arg.count;
        var cnt = originalWait - this._count;
        var act = [originalWait * 0.25, originalWait * 0.75];
        if (this._arg.extend) act = this._arg.extend;
        if (this._count === 0) this.scale.y = 0;
        var moveX = 0;
        var moveY = 0;
        if (cnt < act[0]) {
            var up = (this._arg.moveY / act[0]);
            var slide = (this._arg.moveX / act[0]);
            var rate = cnt / act[0];
            this.scale.y = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            this._arg.rate = rate;
        } else if (cnt >= act[1]) {
            var a1 = originalWait - act[1];
            var rate = this._count / a1;
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
        if (this._arg.battler) {
            if ($gameParty.inBattle()) {
                this.x += this._arg.battler.x;
                this.y += this._arg.battler.y;
            } else {
                this.x += this._arg.battler._realX * $gameMap.tileWidth();
                this.y += this._arg.battler._realY * $gameMap.tileHeight();
            }
        }
        var xx = this.x;
        var yy = this.y;
        if (this._arg.fixed) {
            var dx = $gameMap._displayX;
            var dy = $gameMap._displayY;
            xx = this.x - dx * $gameMap.tileWidth();
            yy = this.y - dy * $gameMap.tileHeight();
            if (xx < 0 || yy < 0) {
                if (xx < 0 && $gameMap.isLoopHorizontal()) dx -= $dataMap.width;
                if (yy < 0 && $gameMap.isLoopVertical()) dy -= $dataMap.height;
                xx = this.x - dx * $gameMap.tileWidth();
                yy = this.y - dy * $gameMap.tileHeight();
            }
        }
        this.x = xx;
        this.y = yy;
    };

    Sprite_Popup.prototype.updateAnime = function () {
        var anime = $dataAnimations[Number(this._arg.pattern)];
        var frameId = Math.floor((anime.frames.length * (this._arg.count - this._count)) / this._arg.count);
        if (frameId !== anime.frames.length) {
            var array = anime.frames[frameId][0];
            var x = array[1];
            var y = array[2];
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
            for (var i = 0; i < CommonPopupManager._setedPopups.length; i++) {
                if (CommonPopupManager._setedPopups[i][0] === this._index) {
                    delete CommonPopupManager._setedPopups[i];
                }
            }
            CommonPopupManager._setedPopups = CommonPopupManager._setedPopups.compact();
        }
    };

    CommonPopupManager.setPopup = function (argParam, character) {
        var arg = {
            x: null,
            y: null,
            text: '',                // 表示テキスト
            eventId: -1,             // 表示するイベントのID
            count: 60,               // 表示時間
            delay: 0,                // 表示遅延
            moveX: 0,                // 目標地点X(相対座標)
            moveY: -48,              // 目標地点Y(相対座標)
            sx: 0,                   // 表示位置補正X
            sy: 0,                   // 表示位置補正Y
            pattern: 0,              // 表示パターン
            back: -1,                // 背景に使う画像インデックス
            backImage: '',           // 背景に使う画像ファイル名
            bx: 0,                   // 内容の表示位置補正X
            by: 0,                   // 内容の表示位置補正Y
            extend: '',              // 
            fixed: true,             //
            anchorX: 0.5,
            anchorY: 0.5,
            battler: null,
            se: { name: '', volume: 90, pitch: 100, pan: 0 },
            enableOutEffect: true
        };
        var array = ['x', 'y', 'text', 'eventId', 'count', 'delay', 'moveX', 'moveY',
            'sx', 'sy', 'pattern', 'back', 'backImage', 'bx', 'by', 'extend', 'fixed',
            'anchorX', 'anchorY', 'slideCount'];
        for (var i = 0; i < argParam.length; i++) {
            if (i > 0) {
                for (var j = 0; j < array.length; j++) {
                    var r = new RegExp('^(' + array[j] + ')' + ':(.+)');
                    if (argParam[i].match(r)) {
                        var code = RegExp.$1;
                        var value = RegExp.$2;
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
                var screenX = $gameParty.inBattle() ? 0 : character.screenX();
                var displayX = $gameParty.inBattle() ? 0 : $gameMap._displayX * 48;
                arg.x = screenX + displayX;
            } else {
                arg.x = 0;
            }
        }
        if (arg.y === null) {
            if (character) {
                var screenY = $gameParty.inBattle() ? 0 : character.screenY();
                var displayY = $gameParty.inBattle() ? 0 : $gameMap._displayY * 48;
                arg.y = screenY + displayY;
            } else {
                arg.y = 0;
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
            for (var i = 0; i < this._readyPopup.length; i++) {
                if (this._readyPopup[i]) {
                    var arg = this._readyPopup[i];
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
        // if (typeof arg.back === 'number') {
        //     var fileName = commonPopupTextBackFileName;
        //     // fileName = fileName.replace(/%d/g, arg.back);
        //     fileName = fileName.replace(/%d/g, arg.backImage);
        //     return ImageManager.loadSystem(fileName);
        // } else {
        // // var fileName = arg.back;
        var fileName = arg.backImage;
        ImageManager.loadPicture(fileName);
        return ImageManager.loadPicture(fileName);
        // }
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

        for (var i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                if (!tag || tag === CommonPopupManager._tempCommonSprites[i].tag) {
                    CommonPopupManager._tempCommonSprites[i].delay = 0;
                    CommonPopupManager._tempCommonSprites[i].count = 1;
                    var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                    if (sprite) sprite._count = 1;
                }
            }
        }
    };

    var _cPU_SsBase_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function () {
        _cPU_SsBase_initialize.call(this);
        this.createSpritePopup();
    };

    var _cPU_SsBase_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function () {
        _cPU_SsBase_update.call(this);
        if (this._popupContainer === '') { return }
        if (CommonPopupManager._tempCommonSprites) {
            for (var i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
                if (CommonPopupManager._tempCommonSprites[i]) {
                    if (CommonPopupManager._tempCommonSprites[i].terminate) {
                        var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                        this._popupContainer.removeChild(sprite);
                        delete CommonPopupManager._tempCommonSprites[i]
                    } else if (!CommonPopupManager._tempCommonSprites[i].sprite) {
                        var sprite = new Sprite_Popup(i);
                        this._popupContainer.addChild(sprite);
                        CommonPopupManager._tempCommonSprites[i].sprite = sprite;
                    }
                }
            }
        }
    };

    var _cPU_SBase_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _cPU_SBase_update.call(this);
        if (CommonPopupManager) { CommonPopupManager.setPopUpdate() };
    };

    Spriteset_Base.prototype.createSpritePopup = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._popupContainer = new Sprite();
        this._popupContainer.setFrame(x, y, width, height);
        this.addChild(this._popupContainer);
    };

    var _cPU_SBase_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _cPU_SBase_terminate.call(this);
        this.terminatePopup();
    };

    Scene_Base.prototype.terminatePopup = function () {
        if (!CommonPopupManager._tempCommonSprites) {
            CommonPopupManager.initTempSprites();
        }
        for (var i = 0; i < CommonPopupManager._tempCommonSprites.length; i++) {
            if (CommonPopupManager._tempCommonSprites[i]) {
                var sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                if (sprite) sprite.terminate();
                delete CommonPopupManager._tempCommonSprites[i];
            }
        }
        CommonPopupManager._setedPopupss = [];
        CommonPopupManager._readyPopup = [];
    };

    var _cPU_SMap_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function () {
        _cPU_SMap_launchBattle.call(this);
        this.terminatePopup();
    };

    // 再定義　文字サイズに合わせてアイコンのサイズを調整する
    // Window_Base.prototype.drawIcon = function (iconIndex, x, y) {
    //     var bitmap = ImageManager.loadSystem('IconSet');
    //     var pw = Window_Base._iconWidth;
    //     var ph = Window_Base._iconHeight;
    //     var sx = iconIndex % 16 * pw;
    //     var sy = Math.floor(iconIndex / 16) * ph;
    //     var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
    //     var nn = (32 - n) / 2;
    //     this.contents.blt(bitmap, sx, sy, pw, ph, x, y, n, n);
    // };

    // 再定義 processDrawIconをストレッチされた文字サイズに合わせたズレに調整する
    // Window_Base.prototype.processDrawIcon = function (iconIndex, textState) {
    //     this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    //     var n = Math.floor((this.contents.fontSize / this.standardFontSize()) * Window_Base._iconWidth);
    //     textState.x += n + 4;
    // };

    // if (!Imported.YEP_MessageCore) {
    //     // \FS[FontSize]の制御文字を追加する部分です。
    //     var _cPU_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    //     Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    //         if (code === 'FS') {
    //             var param = this.obtainEscapeParam(textState);
    //             if (param != '') {
    //                 this.makeFontSize(param)
    //             }
    //         } else {
    //             _cPU_Window_Base_processEscapeCharacter.call(this, code, textState);
    //         }
    //     };
    // }

    // Window_Base.prototype.makeFontSize = function (fontSize) {
    //     this.contents.fontSize = fontSize;
    // };

    //ここから MV Joint

    PluginManager.registerCommand(pluginName, "callCommand", function (arg) {
        this.command356([arg.commandArg]);
    });

    function isRect(value) {
        return (typeof value) === "object";
    };

    function rectlize(x, y, w, h) {
        if (isRect(x)) {
            return x;
        }
        var newRect = new Rectangle(x, y, w, h);
        return newRect;
    };

    var Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, w, h) {
        var rect = rectlize(x, y, w, h);
        Window_Base_initialize.call(this, rect);
    };

    //ここまで MV Joint

})();
