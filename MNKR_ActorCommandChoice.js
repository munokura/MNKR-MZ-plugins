/*
 * --------------------------------------------------
 * MNKR_ActorCommandChoice.js
 *   Ver.1.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ActorCommandChoice.js
 * @plugindesc アクター共通の戦闘コマンドの表示を変更
 * @author munokura
 * 
 * @help
 * アクター共通の戦闘コマンド（攻撃、スキル、防御、アイテム）表示を指定できます。
 * プラグインパラメーターで、表示・非表示を指定してください。
 * 
 * このプラグインは、プラグイン管理リストの出来るだけ上の方に配置してください。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param addAttack
 * @text 攻撃
 * @desc 攻撃コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * 
 * @param addSkill
 * @text スキル
 * @desc スキルコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param addGuard
 * @text 防御
 * @desc 防御コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param addItem
 * @text アイテム
 * @desc アイテムコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param commandCols
 * @text コマンド列数
 * @desc アクターコマンドの列数を指定します。
 * @type number
 * @default 1
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_addAttack = parameters['addAttack'] === 'true';
    const PRM_addSkill = parameters['addSkill'] === 'true';
    const PRM_addGuard = parameters['addGuard'] === 'true';
    const PRM_addItem = parameters['addItem'] === 'true';
    const PRM_commandCols = Number(parameters['commandCols'] || 1);

    Window_ActorCommand.prototype.maxCols = function () {
        return PRM_commandCols;
    };

    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            if (PRM_addAttack) {
                this.addAttackCommand();
            }
            if (PRM_addSkill) {
                this.addSkillCommands();
            }
            if (PRM_addGuard) {
                this.addGuardCommand();
            }
            if (PRM_addItem) {
                this.addItemCommand();
            }
        }
    };

})();
