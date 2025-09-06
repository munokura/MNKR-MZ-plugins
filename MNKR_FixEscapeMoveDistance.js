/*
 * --------------------------------------------------
 * MNKR_FixEscapeMoveDistance.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_FixEscapeMoveDistance.js
@plugindesc Fixes actor movement and behavior during escape.
@author munokura
@license MIT License

@help
# Features
Fixes an issue where actors would not be able to move completely off-screen
when using the escape command when the resolution is increased in side-view
combat.

# Usage
Enable it in the Plugin Manager and set the parameters.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param escapeDistance
@text Distance traveled during escape
@desc Specifies the number of pixels the actor moves in the X direction when fleeing. If -1, the width of the screen is assigned. Maker default value: 300
@type number
@default 600
@min -1
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_FixEscapeMoveDistance.js
@plugindesc 逃走時のアクターの移動と動作を修正します。
@author munokura
@help
# 機能
サイドビュー戦闘で解像度を広げた場合、
逃げるコマンドでアクターが画面外まで移動しきれない問題を解決します。


# 使い方
プラグイン管理で有効にし、パラメータを設定してください。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param escapeDistance
@text 逃走時の移動距離
@desc アクターが逃走する際のX方向の移動ピクセル数を指定します。-1の場合、画面の幅値を割り当てます。ツクールのデフォルト値：300
@type number
@min -1
@default 600
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM = {};
    PRM.escDistance = Number(parameters['escapeDistance'] || 600);

    Sprite_Actor.prototype.retreat = function () {
        if (PRM.escDistance === -1) {
            PRM.escDistance = Graphics.width;
        }
        this.startMove(PRM.escDistance, 0, 30);
    };

})();