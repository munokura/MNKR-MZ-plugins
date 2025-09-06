/*
 * --------------------------------------------------
 * MNKR_TMcollideSeMZ.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMcollideSeMZ.js
@plugindesc Adds wall collision sounds for players.
@author munokura
@license MIT License

@help
A sound effect will be played when the player collides with an impassable
tile.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param knockWallSeFile
@text Wall collision SE
@desc File name of the sound effect that sounds when hitting a wall
@type file
@default Blow1
@require 1
@dir audio/se/

@param knockWallSeVolume
@text Wall collision sound effect volume
@desc Volume of the sound effect played when hitting a wall
@type number
@default 90

@param knockWallSePitch
@text Wall Collision SE Pitch
@desc Pitch of the wall collision sound effect
@type number
@default 100

@param knockWallPan
@text Wall collision SE phase
@desc Left/right balance of wall collision sound effects
@type number
@default 0

@param knockWallInterval
@text Wall collision SE playback interval
@desc Wall collision sound effect playback interval (number of frames)
@type number
@default 30
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMcollideSeMZ.js
@author tomoaky (改変:munokura)
@plugindesc プレイヤーに壁衝突音を追加します。

@help
プレイヤーが通行不可のタイルに衝突すると効果音が鳴るようになります。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param knockWallSeFile
@text 壁衝突SE
@desc 壁衝突に鳴らす効果音のファイル名
初期値: Blow1
@default Blow1
@require 1
@dir audio/se/
@type file

@param knockWallSeVolume
@text 壁衝突SE音量
@desc 壁衝突に鳴らす効果音の音量
初期値: 90
@default 90
@type number

@param knockWallSePitch
@text 壁衝突SEピッチ
@desc 壁衝突に鳴らす効果音のピッチ
初期値: 100
@default 100
@type number

@param knockWallPan
@text 壁衝突SE位相
@desc 壁衝突効果音の左右バランス
初期値: 0
@default 0
@type number

@param knockWallInterval
@text 壁衝突SE再生間隔
@desc 壁衝突効果音の再生間隔（フレーム数）
初期値: 30
@default 30
@type number
*/

//=============================================================================
// TMPlugin - 移動機能拡張
// バージョン: 1.3.1
// 最終更新日: 2017/06/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================



(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const knockWallSe = JSON.parse('{}');
    knockWallSe.name = parameters['knockWallSeFile'] || '';
    knockWallSe.volume = parameters['knockWallSeVolume'] || 90;
    knockWallSe.pitch = parameters['knockWallSePitch'] || 100;
    const knockWallPan = +(parameters['knockWallPan'] || 75);
    const knockWallInterval = +(parameters['knockWallInterval'] || 30);

    //-----------------------------------------------------------------------------
    // Game_Player
    //

    const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function (d) {
        _Game_Player_moveStraight.call(this, d);
        if (!this.isMovementSucceeded()) {
            const x2 = $gameMap.roundXWithDirection(this.x, d);
            const y2 = $gameMap.roundYWithDirection(this.y, d);
            if (this.isNormal() && ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2))) return;
            if (this.isInVehicle() && this.vehicle().isLandOk(this.x, this.y, this.direction())) return;
            const d2 = this.reverseDir(d);
            if (!$gameMap.isPassable(this.x, this.y, d) || !$gameMap.isPassable(x2, y2, d2)) {
                this._knockWallCount = this._knockWallCount == null ? 0 : this._knockWallCount;
                if (this._knockWallCount + knockWallInterval <= Graphics.frameCount ||
                    this._lastKnockWallDir !== d) {
                    if (d === 4) {
                        knockWallSe.pan = -knockWallPan;
                    } else if (d === 6) {
                        knockWallSe.pan = knockWallPan;
                    } else {
                        knockWallSe.pan = 0;
                    }
                    AudioManager.playSe(knockWallSe);
                    this._knockWallCount = Graphics.frameCount;
                    this._lastKnockWallDir = d;
                }
            }
        }
    };

})();