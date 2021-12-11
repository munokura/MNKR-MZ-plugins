/*
 * --------------------------------------------------
 * MNKR_ChangeCommandHeightMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeCommandHeightMZ.js
 * @plugindesc スマートフォン向けにコマンド類の高さを調節します。
 * @author munokura
 *
 * @help
 * スマートフォン向けにコマンド類の高さを調節します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param titleHeight
 * @text タイトル
 * @type number
 * @default 48
 * @desc タイトル画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param optionsHeight
 * @text オプション
 * @type number
 * @default 48
 * @desc オプション画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param gameEndHeight
 * @text ゲーム終了
 * @type number
 * @default 48
 * @desc ゲーム終了画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param menuCommandHeight
 * @text メニュー
 * @type number
 * @default 48
 * @desc メニュー画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param itemListHeight
 * @text アイテム
 * @type number
 * @default 48
 * @desc アイテム画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param itemListHeight
 * @text スキル
 * @type number
 * @default 48
 * @desc スキル画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param equipCommandHeight
 * @text 装備
 * @type number
 * @default 48
 * @desc 装備画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param shopCommandHeight
 * @text ショップ
 * @type number
 * @default 48
 * @desc ショップ画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param battleCommandHeight
 * @text 戦闘
 * @type number
 * @default 48
 * @desc 戦闘画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param choiceListHeight
 * @text 選択肢
 * @type number
 * @default 48
 * @desc 選択肢・アイテム選択のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.titleHeight = Number(parameters['titleHeight'] || 48);
    param.optionsHeight = Number(parameters['optionsHeight'] || 48);
    param.gameEndHeight = Number(parameters['gameEndHeight'] || 48);
    param.menuCommandHeight = Number(parameters['menuCommandHeight'] || 48);
    param.itemListHeight = Number(parameters['itemListHeight'] || 48);
    param.skillListHeight = Number(parameters['skillListHeight'] || 48);
    param.equipCommandHeight = Number(parameters['equipCommandHeight'] || 48);
    param.shopCommandHeight = Number(parameters['shopCommandHeight'] || 48);
    param.battleCommandHeight = Number(parameters['battleCommandHeight'] || 48);
    param.choiceListHeight = Number(parameters['choiceListHeight'] || 48);

    // タイトル
    if (param.titleHeight > 0) {
        Scene_Title.prototype.calcWindowHeight = function (numLines) {
            return numLines * param.titleHeight + $gameSystem.windowPadding() * 2;
        };

        Window_TitleCommand.prototype.itemHeight = function () {
            return param.titleHeight;
        };
    }

    // オプション
    if (param.optionsHeight > 0) {
        Scene_Options.prototype.calcWindowHeight = function (numLines) {
            return numLines * param.optionsHeight + $gameSystem.windowPadding() * 2;
        };

        Window_Options.prototype.itemHeight = function () {
            return param.optionsHeight;
        };
    }

    // ゲーム終了
    if (param.gameEndHeight > 0) {
        Scene_GameEnd.prototype.calcWindowHeight = function (numLines) {
            return numLines * param.optionsHeight + $gameSystem.windowPadding() * 2;
        };

        Window_GameEnd.prototype.itemHeight = function () {
            return param.optionsHeight;
        };
    }

    // メニュー
    if (param.menuCommandHeight > 0) {
        Window_MenuCommand.prototype.itemHeight = function () {
            return param.menuCommandHeight;
        };
    }

    // アイテム
    if (param.itemListHeight > 0) {
        Scene_Item.prototype.categoryWindowRect = function () {
            const wx = 0;
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth;
            const wh = 1 * param.itemListHeight + $gameSystem.windowPadding() * 2;
            // const wh = 1 * param.itemListHeight + $gameSystem.windowPadding() * 2 + 8;
            // const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };

        Window_ItemList.prototype.itemHeight = function () {
            return param.itemListHeight;
        };

        Window_ItemCategory.prototype.itemHeight = function () {
            return param.itemListHeight;
        };
    }

    // スキル
    if (param.skillListHeight > 0) {
        Window_SkillList.prototype.itemHeight = function () {
            return param.skillListHeight;
        };

        Window_SkillStatus.prototype.itemHeight = function () {
            return param.skillListHeight;
        };

        Window_SkillType.prototype.itemHeight = function () {
            return param.skillListHeight;
        };
    }

    // 装備
    if (param.equipCommandHeight > 0) {
        Scene_Equip.prototype.commandWindowRect = function () {
            const wx = this.statusWidth();
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth - this.statusWidth();
            const wh = 1 * param.equipCommandHeight + $gameSystem.windowPadding() * 2 + 8;
            // const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };

        Window_EquipCommand.prototype.lineHeight = function () {
            return param.equipCommandHeight;
        };

        Window_EquipSlot.prototype.lineHeight = function () {
            return param.equipCommandHeight;
        };

        Window_EquipItem.prototype.lineHeight = function () {
            return param.equipCommandHeight;
        };
    }

    //ショップ
    if (param.shopCommandHeight > 0) {
        Scene_Shop.prototype.goldWindowRect = function () {
            const ww = this.mainCommandWidth();
            const wh = 1 * param.shopCommandHeight + $gameSystem.windowPadding() * 2 + 8;
            // const wh = this.calcWindowHeight(1, true);
            const wx = Graphics.boxWidth - ww;
            const wy = this.mainAreaTop();
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Shop.prototype.commandWindowRect = function () {
            const wx = 0;
            const wy = this.mainAreaTop();
            const ww = this._goldWindow.x;
            const wh = 1 * param.shopCommandHeight + $gameSystem.windowPadding() * 2 + 8;
            // const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_Shop.prototype.categoryWindowRect = function () {
            const wx = 0;
            const wy = this._dummyWindow.y;
            const ww = Graphics.boxWidth;
            const wh = 1 * param.shopCommandHeight + $gameSystem.windowPadding() * 2;
            // const wh = 1 * param.shopCommandHeight + $gameSystem.windowPadding() * 2 + 8;
            // const wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };

        const _Window_Gold_refresh = Window_Gold.prototype.refresh;
        Window_Gold.prototype.refresh = function () {
            const isScene_Shop = SceneManager._scene.constructor.name === 'Scene_Shop';
            if (isScene_Shop) {
                const rect = this.itemLineRect(0);
                const x = rect.x;
                const y = rect.y + Math.round((param.shopCommandHeight - 36) / 2);
                // const y = rect.y;
                const width = rect.width;
                this.contents.clear();
                this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
            } else {
                _Window_Gold_refresh.call(this);
            }
        };

        Window_ShopBuy.prototype.lineHeight = function () {
            return param.shopCommandHeight;
        };

        Window_ShopCommand.prototype.lineHeight = function () {
            return param.shopCommandHeight;
        };
    }

    // 戦闘
    if (param.battleCommandHeight > 0) {
        Scene_Battle.prototype.partyCommandWindowRect = function () {
            const ww = 192;
            const wh = 4 * param.shopCommandHeight + $gameSystem.windowPadding() * 2 + 8 * 4;
            // const wh = this.windowAreaHeight();
            const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
            const wy = Graphics.boxHeight - wh;
            return new Rectangle(wx, wy, ww, wh);
        };

        Window_PartyCommand.prototype.lineHeight = function () {
            return param.battleCommandHeight;
        };

        Scene_Battle.prototype.actorCommandWindowRect = function () {
            const ww = 192;
            const wh = 4 * param.shopCommandHeight + $gameSystem.windowPadding() * 2 + 8 * 4;
            // const wh = this.windowAreaHeight();
            const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
            const wy = Graphics.boxHeight - wh;
            return new Rectangle(wx, wy, ww, wh);
        };

        Window_ActorCommand.prototype.lineHeight = function () {
            return param.battleCommandHeight;
        };

        Window_BattleEnemy.prototype.lineHeight = function () {
            return param.battleCommandHeight;
        };

        Window_BattleSkill.prototype.lineHeight = function () {
            return param.battleCommandHeight;
        };

        Window_BattleItem.prototype.lineHeight = function () {
            return param.battleCommandHeight;
        };
    }

    //選択肢・アイテム選択
    if (param.choiceListHeight > 0) {
        Window_ChoiceList.prototype.lineHeight = function () {
            return param.choiceListHeight;
        };
    }

})();
