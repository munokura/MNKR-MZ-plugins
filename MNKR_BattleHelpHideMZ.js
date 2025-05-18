/*
 * --------------------------------------------------
 * MNKR_BattleHelpHideMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleHelpHideMZ.js
 * @plugindesc 戦闘でスキル・アイテムを選択後にヘルプウィンドウを非表示にします。
 * @author munokura
 *
 * @help
 * 戦闘画面でスキル・アイテムを選択後にヘルプウィンドウを非表示にします。
 * プラグインパラメーターで、敵キャラ選択時とアクター選択時での挙動を指定してください。
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
 * @param EnemySelect
 * @text 敵キャラ選択時
 * @desc スキルのヘルプウィンドウを表示します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 *
 * @param ActorSelect
 * @text アクター選択時
 * @desc スキルのヘルプウィンドウを表示します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.EnemySelect = parameters['EnemySelect'] === "true";
    param.ActorSelect = parameters['ActorSelect'] === "true";

    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function () {
        _Scene_Battle_startEnemySelection.call(this);
        if (!param.EnemySelect) {
            this._helpWindow.hide();
        }
    };

    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function () {
        _Scene_Battle_startActorSelection.call(this);
        if (!param.ActorSelect) {
            this._helpWindow.hide();
        }
    };

})();
