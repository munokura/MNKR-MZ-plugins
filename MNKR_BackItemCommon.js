/*
 * --------------------------------------------------
 * MNKR_BackItemCommon.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BackItemCommon.js
 * @plugindesc アイテム・スキルの使用効果コモンイベント後、元の選択に自動で戻るようにできます。
 * @author munokura
 * @help
 * # 機能
 * デフォルトではアイテム・スキルの使用効果にコモンイベントを設定すると、
 * メニューを閉じ、マップ画面でコモンイベントが実行されて完了します。
 * 
 * このプラグインの機能を使用すると、
 * アイテム・スキルのコモンイベント完了後、元の選択に戻れるアイテム・スキルが作れます。
 * 
 * # 使用方法
 * 機能を動作させたいアイテム・スキルのメモ欄に下記のタグを記入してください。
 * <MNKR_BackItemCommon>
 * タグが記入されていないアイテム・スキルは、デフォルトの動作をします。
 * 
 * # 注意
 * - マップ画面でのアイテム・スキル使用時のみ適用されます。
 * - 戦闘中は対象外です。
 * 
 * # 利用規約
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    let _itemReturnFlag = false;
    let _lastItemSymbol = null;
    let _lastItemIndex = null;
    let _skillReturnFlag = false;
    let _lastSkillActorId = null;
    let _lastSkillTypeId = null;
    let _lastSkillIndex = null;

    function convertItemSymbol(itemTypeId) {
        if (itemTypeId === 1) return 'item';
        if (itemTypeId === 2) return 'keyItem';
        return null;
    }

    const _Scene_Item_useItem = Scene_Item.prototype.useItem;
    Scene_Item.prototype.useItem = function () {
        const item = this.item();

        if (item && item.meta[pluginName] && item.effects.some(e => e.code === Game_Action.EFFECT_COMMON_EVENT)) {
            _itemReturnFlag = true;
            _skillReturnFlag = false;
            _lastItemSymbol = convertItemSymbol(item.itypeId);
            const list = this._itemWindow._data;
            _lastItemIndex = list.indexOf(item);
        }

        _Scene_Item_useItem.call(this);
    };

    const _Scene_Item_start = Scene_Item.prototype.start;
    Scene_Item.prototype.start = function () {
        _Scene_Item_start.call(this);

        if (_lastItemSymbol && !_itemReturnFlag) {
            this._categoryWindow.selectSymbol(_lastItemSymbol);
            this._categoryWindow.deactivate();
            this._itemWindow.setCategory(_lastItemSymbol);
            this._itemWindow.activate();
            if (_lastItemIndex != null && _lastItemIndex >= 0 && _lastItemIndex < this._itemWindow.maxItems()) {
                this._itemWindow.select(_lastItemIndex);
            } else {
                this._itemWindow.select(0);
            }

            _lastItemSymbol = null;
            _lastItemIndex = null;
        }
    };

    const _Scene_Skill_useItem = Scene_Skill.prototype.useItem;
    Scene_Skill.prototype.useItem = function () {
        const skill = this.item();

        if (skill && skill.meta[pluginName] && skill.effects.some(e => e.code === Game_Action.EFFECT_COMMON_EVENT)) {
            _skillReturnFlag = true;
            _itemReturnFlag = false;
            _lastSkillActorId = this._actor.actorId();
            _lastSkillTypeId = skill.stypeId;
            const list = this._itemWindow._data;
            _lastSkillIndex = list.indexOf(skill);
        }

        _Scene_Skill_useItem.call(this);
    };

    const _Scene_Skill_start = Scene_Skill.prototype.start;
    Scene_Skill.prototype.start = function () {
        _Scene_Skill_start.call(this);

        if (_lastSkillTypeId !== null && !_skillReturnFlag) {
            let typeIndex = -1;
            const commands = this._skillTypeWindow._list;
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].ext === _lastSkillTypeId) {
                    typeIndex = i;
                    break;
                }
            }

            if (typeIndex >= 0) {
                this._skillTypeWindow.select(typeIndex);
                this._skillTypeWindow.deactivate();
                this._itemWindow.setActor(this._actor);
                this._itemWindow.setStypeId(_lastSkillTypeId);
                this._itemWindow.refresh();
                this._itemWindow.activate();

                if (_lastSkillIndex !== null && _lastSkillIndex >= 0 && _lastSkillIndex < this._itemWindow.maxItems()) {
                    this._itemWindow.select(_lastSkillIndex);
                } else if (this._itemWindow.maxItems() > 0) {
                    this._itemWindow.select(0);
                } else {
                    this._itemWindow.select(-1);
                }
            } else {
                this._skillTypeWindow.activate();
            }

            _lastSkillActorId = null;
            _lastSkillTypeId = null;
            _lastSkillIndex = null;
        }
    };

    const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {

        if (!$gameMessage.isBusy() && !$gameTemp.isCommonEventReserved()) {
            if (_itemReturnFlag) {
                _itemReturnFlag = false;
                SceneManager.push(Scene_Item);
                return;
            }
            if (_skillReturnFlag) {
                _skillReturnFlag = false;
                const actor = $gameActors.actor(_lastSkillActorId);
                if (actor) {
                    $gameParty.setMenuActor(actor);
                }
                SceneManager.push(Scene_Skill);
                return;
            }
        }

        _Scene_Map_updateScene.call(this);
    };

})();