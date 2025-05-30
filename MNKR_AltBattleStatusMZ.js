/*
 * --------------------------------------------------
 * MNKR_AltBattleStatusMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc 戦闘中のステータスウィンドウをシンプルにします。
 * @author munokura
 * 
 * @help
 * # 機能
 * 戦闘中のステータスウィンドウをシンプルにします。
 * 
 * プラグインコマンドはありません。
 * 
 * 
 * # 利用規約
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param actorAutoCols
 * @text アクター数自動調整
 * @desc アクターウィンドウ幅を戦闘参加人数で自動調整
 * @type boolean
 * @on 自動調整する
 * @off 自動調整しない
 * @default true
 */

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.actorAutoCols = parameters['actorAutoCols'] === 'true';

    const _Window_BattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
    Window_BattleStatus.prototype.maxCols = function () {
        if (param.actorAutoCols) {
            const cols = $gameParty.battleMembers().length;
            return cols;
        }
        return _Window_BattleStatus_maxCols.call(this);
    };

    const _Window_BattleStatus_maxItems = Window_BattleStatus.prototype.maxItems;
    Window_BattleStatus.prototype.maxItems = function () {
        if (param.actorAutoCols) {
            const cols = $gameParty.battleMembers().length;
            return cols;
        }
        return _Window_BattleStatus_maxItems.call(this);
    };

    Window_BattleStatus.prototype.drawItemImage = function (index) {
        // const actor = this.actor(index);
        // const rect = this.faceRect(index);
        // this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
    };

    Window_BattleStatus.prototype.drawItemStatus = function (index) {
        const lineHeight = this.lineHeight();
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const itemWidth = rect.width;
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
        if (param.actorAutoCols) {
            const bitmapWidth = Math.round(128 * 4 / $gameParty.battleMembers().length);
            return bitmapWidth;
        }
        return _Sprite_Gauge_bitmapWidth.call(this);
    };

    Window_BattleStatus.prototype.drawActorLevel = function (actor, x, y) {
        const bitmapWidth = Math.round(128 * 4 / $gameParty.battleMembers().length);
        const levelTextWidth = this.textWidth(String(actor.level));
        const levelX = x + bitmapWidth - levelTextWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, levelX, y, levelTextWidth, "right");
    };

})();