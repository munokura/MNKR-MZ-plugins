/*
 * --------------------------------------------------
 * MNKR_PointScrollMZ.js
 *   Ver.1.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PointScrollMZ.js
@plugindesc You can scroll the screen by specifying a position or event.
@author munokura
@license MIT License

@help
You can scroll the screen by specifying a position or event.

------------------------------------------------------
Usage
------------------------------------------------------
Use the plugin command or
Execute $gameMap.setPointScroll(pos, duration) in a script.
Pass pos as an array, such as [x,y] or [id].

Example 1
$gameMap.setPointScroll([0,0], 60);
Scrolls the screen over 60 frames (1 second) so that map coordinate 0,0 is the
center of the screen.

Example 2
$gameMap.setPointScroll([-1], 60);
Scrolls the screen over 60 frames (1 second) so that the player is the center
of the screen.

------------------------------------------------------
Plugin Command
------------------------------------------------------
*********************************************************
PointScroll x,y duration
Scrolls the screen over duration frames for coordinates x and y.

*****************************************************
EventScroll id duration
Scrolls the screen for the event with id duration frames.
Specifying 0 for id will target the triggered event,
while specifying -1 will target the player.

# Contact Information
This is a plugin originally created for RPG Maker MV ported for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).

@command PointScroll
@text Scroll to map coordinates
@desc Scrolls the screen to map coordinates.
@arg Pos
@text Map Coordinates
@desc Specifies the map coordinates to move to.
@type string
@default 0,0
@arg duration
@text Travel time
@desc Specifies the number of frames to complete the scroll.
@type number
@default 60

@command EventScroll
@text Scroll to Events
@desc Scroll the screen to Events (Player).
@arg event
@text Destination event
@desc Specifies the event to move to.
@type number
@default 0
@min -1
@arg duration
@text Travel time
@desc Specifies the number of frames to complete the scroll.
@type number
@default 60
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PointScrollMZ.js
@plugindesc 位置やイベントを指定して画面をスクロールすることができます。
@author Yana (改変:munokura)

@help
位置やイベントを指定して画面をスクロールすることができます。

------------------------------------------------------
使い方
------------------------------------------------------
プラグインコマンドを使用するか、
$gameMap.setPointScroll(pos, duration)をスクリプトで実行してください。
この際、posは[x,y]または[id]のように、配列で渡してください。

例1
$gameMap.setPointScroll([0,0], 60);
マップ座標0,0が画面の中心になるように60フレーム(1秒)でスクロールします。

例2
$gameMap.setPointScroll([-1], 60);
プレイヤーが画面の中心になるように60フレーム(1秒)でスクロールします。

------------------------------------------------------
 プラグインコマンド
------------------------------------------------------
******************************************************
PointScroll x,y duration
座標x,yにdurationフレーム掛けて画面をスクロールします。

******************************************************
EventScroll id duration
id番のイベントにdurationフレーム掛けて画面をスクロールします。
idに0を指定すると起動したイベントを、
-1を指定すると、プレイヤーを対象にします。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@command PointScroll
@text マップ座標へスクロール
@desc マップ座標へ画面をスクロールします。

@arg Pos
@text マップ座標
@desc 移動先のマップの座標を指定します。
@type string
@default 0,0

@arg duration
@text 移動時間
@desc スクロールを完了するフレーム数を指定します。
@type number
@default 60

@command EventScroll
@text イベントへスクロール
@desc イベント（プレイヤー）へ画面をスクロールします。

@arg event
@text 移動先イベント
@desc 移動先のイベントを指定します。
-1:プレイヤー / 0:実行イベント / 1以上:イベントID
@type number
@min -1
@default 0

@arg duration
@text 移動時間
@desc スクロールを完了するフレーム数を指定します。
@type number
@default 60
*/

//
// ポイントスクロール ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2017 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//




(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    PluginManager.registerCommand(pluginName, "PointScroll", args => {
        let pos = args.Pos.split(',');
        let duration = Number(args.duration);
        $gameMap.setPointScroll(pos, duration);
    });

    PluginManager.registerCommand(pluginName, "EventScroll", args => {
        let pos = [args.event];
        let duration = Number(args.duration);
        $gameMap.setPointScroll(pos, duration);
    });

    Game_Map.prototype.isPointScrolling = function () {
        return this._pointScrollDuration > 0;
    };

    Game_Map.prototype.setPointScroll = function (pos, duration) {
        let x = 0;
        let y = 0;
        if (pos.length > 1) {
            x = Number(pos[0]);
            y = Number(pos[1]);
        } else {
            let character = this._interpreter.character(Number(pos[0]));
            x = character.x;
            y = character.y;
        }
        this._targetScrollPointX = x;
        this._targetScrollPointY = y;
        this._pointScrollDuration = duration;
        this._maxPointScrollDuration = duration;
        let ox = this._displayX + this.screenTileX() / 2 - 0.5;
        let oy = this._displayY + this.screenTileY() / 2 - 0.5;
        if (ox > this.width()) ox = ox - this.width();
        if (oy > this.height()) oy = oy - this.height();
        this._pointScrollOriginX = ox;
        this._pointScrollOriginY = oy;
    };

    Game_Map.prototype.updatePointScroll = function () {
        if (this.isPointScrolling()) {
            this._pointScrollDuration--;
            let ox = this._pointScrollOriginX;
            let oy = this._pointScrollOriginY;
            let tx = this._targetScrollPointX;
            let ty = this._targetScrollPointY;
            let duration = this._pointScrollDuration;
            let max = this._maxPointScrollDuration;
            let x = tx + (ox - tx) * duration / max - $gameMap.screenTileX() / 2 + 0.5;
            let y = ty + (oy - ty) * duration / max - $gameMap.screenTileY() / 2 + 0.5;
            x = $gameMap.isLoopHorizontal() ? (x + $gameMap.width()) % $gameMap.width() : Math.max(x, 0);
            y = $gameMap.isLoopVertical() ? (y + $gameMap.height()) % $gameMap.height() : Math.max(y, 0);
            this._displayX = x;
            this._displayY = y;
        }
    };

    const __GMap_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        __GMap_update.call(this, sceneActive);
        this.updatePointScroll();
    };

})();