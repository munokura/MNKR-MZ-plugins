/*
 * --------------------------------------------------
 * MNKR_AltMenuScreenMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltMenuScreenMZ.js
 * @plugindesc メインメニュー画面をシンプルにします。
 * @author munokura
 * 
 * @help
 * # 機能
 * メインメニュー画面をシンプルにします。
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
 * @param actorCols
 * @text アクター表示数
 * @desc メインメニュー画面のアクター表示ウィンドウの1画面の表示数。0にすると、パーティ人数で自動調整
 * @type number
 * @min 0
 * @default 4
 */

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.actorCols = Number(parameters['actorCols'] || 0);

    Scene_Menu.prototype.commandWindowRect = function () {
        const ww = Graphics.boxWidth / 2;
        const wh = this.calcWindowHeight(4, true);
        const wx = 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_MenuCommand.prototype.maxCols = function () {
        return 2;
    }

    Scene_Menu.prototype.statusWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(4.4, true);
        const wx = 0;
        const wy = this.mainAreaBottom() - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_MenuStatus.prototype.maxCols = function () {
        const cols = param.actorCols === 0 ? $gameParty.members().length : param.actorCols;
        return cols;
    }

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1;
    }

    Window_MenuStatus.prototype.drawItem = function (index) {
        this.drawPendingItemBackground(index);
        this.drawItemStatus(index);
    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const bottom = y + rect.height;
        const lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.placeBasicGauges(actor, x, y + lineHeight * 2, width);
        this.drawActorIcons(actor, x, y + lineHeight * 4.2, width);
    };

    Scene_Menu.prototype.goldWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_MenuStatus.prototype.placeGauge = function (actor, type, x, y) {
        const key = "actor%1-gauge-%2".format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_Gauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    };

    const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
    Sprite_Gauge.prototype.bitmapWidth = function () {
        const isSceneMenu = SceneManager._scene.constructor !== Scene_Battle && !this.defaultGauge;
        if (isSceneMenu) {
            const bitmapWidth = param.actorCols === 0 ? 168 * 4 / $gameParty.members().length : 168 * 4 / param.actorCols;
            return bitmapWidth;
        }
        return _Sprite_Gauge_bitmapWidth.call(this);
    };

    Window_MenuStatus.prototype.drawActorLevel = function (actor, x, y) {
        const bitmapWidth = param.actorCols === 0 ? 168 * 4 / $gameParty.members().length : 168 * 4 / param.actorCols;
        const levelTextWidth = this.textWidth(String(actor.level));
        const levelX = x + bitmapWidth - levelTextWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, levelX, y, levelTextWidth, "right");
    };

})();