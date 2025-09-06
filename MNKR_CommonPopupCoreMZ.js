/*
 * --------------------------------------------------
 * MNKR_CommonPopupCoreMZ.js
 *   Ver.0.2.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommonPopupCoreMZ.js
@plugindesc This is a base plugin that provides a general-purpose popup mechanism.
@author example
@license MIT License

@help
This plugin provides a general-purpose popup mechanism.
This plugin alone does not have any functionality beyond adding plugin
commands.

-----------------------------------------------------
Plugin Commands
------------------------------------------------------
CommonPopup add param1 param2 param3 ...

You can specify only the necessary parameters.
Example: Pop up a test popup above the player for 240 frames.
CommonPopup add text:test count:240 eventId:-1

Parameter Details:
text: Display text
eventId: Event ID to display
count: Display time
delay: Display delay
moveX: Destination X (relative coordinates)
moveY: Destination Y (relative coordinates)
sx: Pop-up position offset X
sy: Pop-up position offset Y
pattern: Display pattern. 0 is fade, -1 is horizontal stretch, -2 is vertical
stretch
back: -1: transparent background, 0: background color gradient
bx: Text display position offset X
by: Text display position offset Y
extend:
Specify an array to adjust the display timing.
Example: extend:[20,50] Appears over 20 frames and starts disappearing on the
50th frame.

Added features not yet implemented in the original version.
backImage: Filename (in img/pictures)

Deemed less necessary, removed from plugin commands.
anchorX: Popup origin X. Right edge of the 0 event. In tiles.
anchorY: Popup origin Y. Bottom edge of the 0 event. In tiles.

Features likely to be unimplemented
fixed: Fixed to the screen? Specify true/false.
slideCount: The speed at which a new popup slides up when it appears.

When using an event command script,

this.addPopup(["add","text:test","count:120"…]);

You can create a popup using a script by writing something like this.
Similarly, if you want to use it in a script within an event command's
movement route, you can use it by writing:

$gameMap._interpreter.addPopup(["add","text:test","count:120"…]);

# Contact Information
This is a plugin originally created for RPG Maker MV ported for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, R18+, etc.).

@command CommonPopupAdd
@text Pop-up display
@desc Pop up the text.
@arg text
@text Display Text
@desc Enter the display text.
@type string
@arg eventId
@text Event ID
@desc The ID of the event to display.
@type number
@default -1
@min -1
@arg count
@text Display Time
@desc Number of frames to complete the popup
@type number
@default 60
@arg delay
@text Display Delay
@desc Number of frames to start popup
@type number
@default 0
@arg moveX
@text Destination point X (relative coordinates)
@desc X position correction when pop-up is completed
@type number
@default 0
@min -9007
@max 9007
@arg moveY
@text Destination point Y (relative coordinate)
@desc Y position correction when pop-up is completed
@type number
@default -48
@min -9007
@max 9007
@arg sx
@text Pop Position Correction X
@desc Popup X position offset
@type number
@default 0
@min -9007
@max 9007
@arg sy
@text Pop position correction Y
@desc Popup Y position correction
@type number
@default 0
@min -9007
@max 9007
@arg pattern
@text Display Pattern
@desc Pop-up display transformation pattern
@type select
@default Normal
@option fade
@value Normal
@option Horizontal stretch
@value Stretch
@option Vertical stretch
@value GrowUp
@arg back
@text background color
@desc Background color: Red, Green, Blue, Alpha / Transparency: -1
@type string
@default 0,0,0,0.6
@arg backImage
@text background image
@desc Specifies a background image. If a background image is used, the background color will be ignored.
@type file
@require 1
@dir img/pictures
@arg bx
@text Text Alignment X
@desc Text display position correction X
@type number
@default 0
@min -9007
@max 9007
@arg by
@text Text position offset Y
@desc Text display position correction Y
@type number
@default 0
@min -9007
@max 9007
@arg extend
@text Display timing adjustment
@desc Specify an array for adjusting the display timing. Example: [20,50] Appears over 20 frames and starts disappearing from the 50th frame.
@type string

@command CommonPopupClear
@text Remove Pop-up
@desc Dismisses the displayed popup.
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommonPopupCoreMZ.js
@plugindesc 汎用的なポップアップの仕組みを提供するためのベースプラグインです。
@author Yana (改変 munokura)

@help
このプラグインは、汎用的なポップアップの仕組みを提供するプラグインです。
このプラグイン単体ではプラグインコマンドを追加する以外の機能はありません。

------------------------------------------------------
 プラグインコマンド
------------------------------------------------------
CommonPopup add param1 param2 param3 ・・・

必要なパラメータのみを指定できます。
 例:プレイヤーの上にテストと240フレームポップアップさせる
CommonPopup add text:テスト count:240 eventId:-1

パラメータ詳細:
text:表示テキスト
eventId:表示するイベントのID
count:表示時間
delay:表示遅延
moveX:移動先地点X(相対座標)
moveY:移動先地点Y(相対座標)
sx:ポップ位置補正X
sy:ポップ位置補正Y
pattern:表示パターン　0がフェード、-1が横ストレッチ、-2が縦ストレッチ
back:-1:透明背景,0:背景カラーのグラデーション
bx:テキスト表示位置補正X
by:テキスト表示位置補正Y
extend:
  表示タイミングの調整用配列で指定。
  例:extend:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。

本家で未実装のものを追加
  backImage:ファイル名（img/pictures内）

必要性が低いと考え、プラグインコマンドから削除
  anchorX:ポップアップ原点X。0イベントの右端。タイル単位。
  anchorY:ポップアップ原点Y。0イベントの下端。タイル単位。

未実装と思われる機能
  fixed:画面に固定するか？ true/falseで指定。
  slideCount:新しいポップアップが発生した際、上にスライドさせる速度。

イベントコマンドのスクリプトを使う場合、

this.addPopup(["add","text:テスト","count:120"…]);

のように記述すればスクリプトでポップアップを行うことができます。
同じように、イベントコマンドの移動ルート内のスクリプトで使用する場合、

$gameMap._interpreter.addPopup(["add","text:テスト","count:120"…]);

のように記述すれば使用可能です。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@command CommonPopupAdd
@text ポップアップ表示
@desc テキストをポップアップ表示します。

@arg text
@type string
@text 表示テキスト
@desc 表示テキストを入力します。
@default

@arg eventId
@type number
@min -1
@text イベントID
@desc 表示するイベントのID。
-1:プレイヤー / 0:実行イベント / 1以上:イベントID
@default -1

@arg count
@type number
@text 表示時間
@desc ポップアップを完了するまでのフレーム数
@default 60

@arg delay
@type number
@text 表示遅延
@desc ポップアップを開始するまでのフレーム数
@default 0

@arg moveX
@type number
@min -9007
@max 9007
@text 移動先地点X(相対座標)
@desc ポップアップ完了時のX位置補正
@default 0

@arg moveY
@type number
@min -9007
@max 9007
@text 移動先地点Y(相対座標)
@desc ポップアップ完了時のY位置補正
@default -48

@arg sx
@type number
@min -9007
@max 9007
@text ポップ位置補正X
@desc ポップアップのX位置補正
@default 0

@arg sy
@type number
@min -9007
@max 9007
@text ポップ位置補正Y
@desc ポップアップのY位置補正
@default 0

@arg pattern
@type select
@option フェード
@value Normal
@option 横ストレッチ
@value Stretch
@option 縦ストレッチ
@value GrowUp
@text 表示パターン
@desc ポップアップ表示の変形パターン
@default Normal

@arg back
@text 背景色
@type string
@desc 背景色:Red,Green,Blue,Alpha / 透明:-1
例:0, 0, 0, 0.6
@default 0,0,0,0.6

@arg backImage
@text 背景画像
@type file
@require 1
@dir img/pictures
@desc 背景画像を指定します。背景画像を使用すると背景色は無視されます。
@default

@arg bx
@type number
@min -9007
@max 9007
@text テキスト位置補正X
@desc テキストの表示位置補正X
@default 0

@arg by
@type number
@min -9007
@max 9007
@text テキスト位置補正Y
@desc テキストの表示位置補正Y
@default 0

@arg extend
@type string
@text 表示タイミングの調整
@desc 表示タイミングの調整用配列で指定。例:[20,50] 20フレーム掛けて出現し、50フレーム目から消え始める。
@default


@command CommonPopupClear
@text ポップアップ消去
@desc 表示されているポップアップを消去します。
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
        this._window = new Window_Base(new Rectangle(0, 0, Graphics.width, Graphics.height));
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
            const array = CommonPopupManager._setedPopups.clone().reverse();
            const n = 0;
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
        if (cnt < act[0]) {
            const up = (this._arg.moveY / act[0]);
            const slide = (this._arg.moveX / act[0]);
            this.opacity = Math.floor(255 * (cnt / opTime1));
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            // 退場演出
        } else if (cnt >= act[1]) {
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
        const moveX = 0;
        const moveY = 0;
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
        const moveX = 0;
        const moveY = 0;
        if (cnt < act[0]) {
            const up = (this._arg.moveY / act[0]);
            const slide = (this._arg.moveX / act[0]);
            const rate = cnt / act[0];
            this.scale.y = rate;
            moveX = Math.floor(slide * cnt);
            moveY = Math.floor(up * cnt);
            this._arg.rate = rate;
        } else if (cnt >= act[1]) {
            const a1 = originalWait - act[1];
            const rate = this._count / a1;
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
        let xx = this.x;
        let yy = this.y;
        if (this._arg.fixed) {
            const dx = $gameMap._displayX;
            const dy = $gameMap._displayY;
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
                const screenX = $gameParty.inBattle() ? 0 : character.screenX();
                const displayX = $gameParty.inBattle() ? 0 : $gameMap._displayX * 48;
                arg.x = screenX + displayX;
            } else {
                arg.x = 0;
            }
        }
        if (arg.y === null) {
            if (character) {
                const screenY = $gameParty.inBattle() ? 0 : character.screenY();
                const displayY = $gameParty.inBattle() ? 0 : $gameMap._displayY * 48;
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
                    if (CommonPopupManager._tempCommonSprites[i].terminate) {
                        const sprite = CommonPopupManager._tempCommonSprites[i].sprite;
                        this._popupContainer.removeChild(sprite);
                        delete CommonPopupManager._tempCommonSprites[i]
                    } else if (!CommonPopupManager._tempCommonSprites[i].sprite) {
                        const sprite = new Sprite_Popup(i);
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
        const width = Graphics.width;
        const height = Graphics.height;
        const x = 0;
        const y = 0;
        this._popupContainer = new Sprite();
        this._popupContainer.setFrame(x, y, width, height);
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