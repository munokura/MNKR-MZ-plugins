/*
 * --------------------------------------------------
 * MNKR_AltBattleStatusMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltBattleStatusMZ.js
@plugindesc Simplify the status window during battle.
@author munokura
@license MIT License

@help
# Features
Simplifies the status window during battle.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param actorAutoCols
@text Automatic adjustment of the number of actors
@desc Actor window width automatically adjusted based on the number of players participating in the battle
@type boolean
@on Auto adjust
@off Do not auto-adjust
@default true
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltBattleStatusMZ.js
@plugindesc 戦闘中のステータスウィンドウをシンプルにします。
@author munokura

@help
# 機能
戦闘中のステータスウィンドウをシンプルにします。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param actorAutoCols
@text アクター数自動調整
@desc アクターウィンドウ幅を戦闘参加人数で自動調整
@type boolean
@on 自動調整する
@off 自動調整しない
@default true
*/

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const PRM = {};
    PRM.actorAutoCols = parameters['actorAutoCols'] === 'true';

    const _Window_BattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
    Window_BattleStatus.prototype.maxCols = function () {
        if (PRM.actorAutoCols) {
            const cols = $gameParty.battleMembers().length;
            return cols;
        }
        return _Window_BattleStatus_maxCols.call(this);
    };

    const _Window_BattleStatus_maxItems = Window_BattleStatus.prototype.maxItems;
    Window_BattleStatus.prototype.maxItems = function () {
        if (PRM.actorAutoCols) {
            const cols = $gameParty.battleMembers().length;
            return cols;
        }
        return _Window_BattleStatus_maxItems.call(this);
    };

    Window_BattleStatus.prototype.drawItemImage = function (index) {
    };

    Window_BattleStatus.prototype.drawItemStatus = function (index) {
        const lineHeight = this.lineHeight();
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const nameX = this.nameX(rect);
        const nameY = 8;
        const stateIconX = this.stateIconX(rect);
        const stateIconY = this.stateIconY(rect);
        const basicGaugesX = this.basicGaugesX(rect);
        const basicGaugesY = lineHeight * 1;
        this.placeTimeGauge(actor, nameX, nameY);
        this.placeActorName(actor, nameX, nameY);
        this.drawActorLevel(actor, basicGaugesX, basicGaugesY + lineHeight * 2);
        this.placeStateIcon(actor, stateIconX, stateIconY + lineHeight * 4);
        this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
    };

    const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
    Sprite_Gauge.prototype.bitmapWidth = function () {
        const isScene = SceneManager._scene.constructor === Scene_Battle;
        if (!isScene) {
            return _Sprite_Gauge_bitmapWidth.call(this);
        }
        if (PRM.actorAutoCols) {
            const bitmapWidth = Math.round(128 * 4 / $gameParty.battleMembers().length);
            return bitmapWidth;
        }
        return _Sprite_Gauge_bitmapWidth.call(this);
    };

    Window_BattleStatus.prototype.drawActorLevel = function (actor, x, y) {
        const bitmapWidth = PRM.actorAutoCols ? Math.round(128 * 4 / $gameParty.battleMembers().length) : 128;
        const levelTextWidth = this.textWidth(String(actor.level));
        const levelX = x + bitmapWidth - levelTextWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, levelX, y, levelTextWidth, "right");
    };

})();