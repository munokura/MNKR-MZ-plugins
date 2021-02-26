/*
 * --------------------------------------------------
 * MNKR_ActorCommandChoice.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ActorCommandChoice.js
 * @plugindesc v1.0.0 アクター共通の戦闘コマンドの表示を変更
 * @author munokura
 * 
 * @help
 * アクター共通の戦闘コマンド（攻撃、スキル、防御、アイテム）表示を指定できます。
 * プラグインパラメーターで、表示・非表示を指定してください。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param Add Attack
 * @text 攻撃
 * @desc 攻撃コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * 
 * @param Add Skill
 * @text スキル
 * @desc スキルコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param Add Guard
 * @text 防御
 * @desc 防御コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param Add Item
 * @text アイテム
 * @desc アイテムコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const addAttack = String(parameters['Add Attack']) === 'true';
    const addSkill = String(parameters['Add Skill']) === 'true';
    const addGuard = String(parameters['Add Guard']) === 'true';
    const addItem = String(parameters['Add Item']) === 'true';

    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            if (addAttack) {
                this.addAttackCommand();
            }
            if (addSkill) {
                this.addSkillCommands();
            }
            if (addGuard) {
                this.addGuardCommand();
            }
            if (addItem) {
                this.addItemCommand();
            }
        }
    };

})();