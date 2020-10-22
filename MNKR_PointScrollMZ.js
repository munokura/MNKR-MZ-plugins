/*
 * --------------------------------------------------
 * MNKR_PointScrollMZ Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
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

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PointScrollMZ.js
 * @plugindesc 位置やイベントを指定して画面をスクロールすることができます。
 * @author Yana (改変 munokura)
 *
 * @help
 * 位置やイベントを指定して画面をスクロールすることができます。
 * 
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * プラグインコマンドを使用するか、
 * $gameMap.setPointScroll(pos, duration)をスクリプトで実行してください。
 * この際、posは[x,y]または[id]のように、配列で渡してください。
 * 
 * 例1
 * $gameMap.setPointScroll([0,0]), 60);
 * マップ座標0,0が画面の中心になるように60フレーム(1秒)でスクロールします。
 * 
 * 例2
 * $gameMap.setPointScroll([-1]), 60);
 * プレイヤーが画面の中心になるように60フレーム(1秒)でスクロールします。
 *
 * ------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * ******************************************************
 * PointScroll x,y duration
 * 座標x,yにdurationフレーム掛けて画面をスクロールします。
 *
 * ******************************************************
 * EventScroll id duration
 * id番のイベントにdurationフレーム掛けて画面をスクロールします。
 * idに0を指定すると起動したイベントを、
 * -1を指定すると、プレイヤーを対象にします。
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
 * @command PointScroll
 * @text マップ座標へスクロール
 * @desc マップ座標へ画面をスクロールします。
 *
 * @arg Pos
 * @text マップ座標
 * @desc 移動先のマップの座標を指定します。
 * @type string
 * @default 0,0
 * 
 * @arg duration
 * @text 移動時間
 * @desc スクロールを完了するフレーム数を指定します。
 * @type number
 * @default 60
 * 
 * @command EventScroll
 * @text イベントへスクロール
 * @desc イベント（プレイヤー）へ画面をスクロールします。
 *
 * @arg event
 * @text 移動先イベント
 * @desc 移動先のイベントを指定します。
 * -1:プレイヤー / 0:実行イベント / 1以上:イベントID
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg duration
 * @text 移動時間
 * @desc スクロールを完了するフレーム数を指定します。
 * @type number
 * @default 60
 * 
 */


(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    ////////////////////////////////////////////////////////////////////////////////////

    PluginManager.registerCommand(pluginName, "PointScroll", args => {
        const pos = args.Pos.split(',');
        const duration = Number(args.duration);
        $gameMap.setPointScroll(pos, duration);
    });

    PluginManager.registerCommand(pluginName, "EventScroll", args => {
        const pos = [args.event];
        console.log(pos);
        const duration = Number(args.duration);
        $gameMap.setPointScroll(pos, duration);
    });

    Game_Map.prototype.isPointScrolling = function() {
        return this._pointScrollDuration > 0;
    };

    Game_Map.prototype.setPointScroll = function(pos, duration) {
        let x = 0;
        let y = 0;
        if (pos.length > 1) {
            x = Number(pos[0]);
            y = Number(pos[1]);
        } else {
            const character = this._interpreter.character(Number(pos[0]));
            x = character.x;
            y = character.y;
        }
        this._targetScrollPointX = x;
        this._targetScrollPointY = y;
        this._pointScrollDuration = duration;
        this._maxPointScrollDuration = duration;
        const ox = this._displayX + this.screenTileX() / 2 - 0.5;
        const oy = this._displayY + this.screenTileY() / 2 - 0.5;
        if (ox > this.width()) ox = ox - this.width();
        if (oy > this.height()) oy = oy - this.height();
        this._pointScrollOriginX = ox;
        this._pointScrollOriginY = oy;
    };

    Game_Map.prototype.updatePointScroll = function() {
        if (this.isPointScrolling()) {
            this._pointScrollDuration--;
            const ox = this._pointScrollOriginX;
            const oy = this._pointScrollOriginY;
            const tx = this._targetScrollPointX;
            const ty = this._targetScrollPointY;
            const duration = this._pointScrollDuration;
            const max = this._maxPointScrollDuration;
            let x = tx + (ox - tx) * duration / max - $gameMap.screenTileX() / 2 + 0.5;
            let y = ty + (oy - ty) * duration / max - $gameMap.screenTileY() / 2 + 0.5;
            x = $gameMap.isLoopHorizontal() ? (x + $gameMap.width()) % $gameMap.width() : Math.max(x, 0);
            y = $gameMap.isLoopVertical() ? (y + $gameMap.height()) % $gameMap.height() : Math.max(y, 0);
            this._displayX = x;
            this._displayY = y;
        }
    };

    const __GMap_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        __GMap_update.call(this, sceneActive);
        this.updatePointScroll();
    };

    ////////////////////////////////////////////////////////////////////////////////////
})();