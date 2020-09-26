/*
 * --------------------------------------------------
 * MNKR_ActorCommandChoice Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ActorCommandChoice.js
 * @plugindesc v1.0.0 アクター共通の戦闘コマンドの表示を変更
 * @author munokura
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
 * 
 * @help
 * アクター共通の戦闘コマンド（攻撃、スキル、防御、アイテム）表示を指定できます。
 * プラグインパラメーターで、表示・非表示を指定してください。
 */

(() => {
    'use strict';

    const pluginName = 'MNKR_ActorCommandChoice';

    const parameters = PluginManager.parameters(pluginName);
    const addAttack = eval(parameters['Add Attack'] || 'false');
    const addSkill = eval(parameters['Add Skill'] || 'true');
    const addGuard = eval(parameters['Add Guard'] || 'true');
    const addItem = eval(parameters['Add Item'] || 'true');

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