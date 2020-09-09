/*
 * --------------------------------------------------
 * MNKR_BattleStartCommon Ver.2.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleStartCommon.js
 * @plugindesc 戦闘開始時のメッセージをコモンイベントに置き換えます。
 * @author munokura
 *
 * @param Variable Id
 * @text 指定変数
 * @type variable
 * @desc 指定する変数ID
 * @default 0
 * 
 * @param Value Zero
 * @text 変数値が0の処理
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc デフォルトのメッセージを表示か非表示
 * @default false
 * 
 * @help
 * 戦闘開始時のメッセージをコモンイベントに置き換えます。
 * 
 * パラメーターで使用する変数を指定してください。
 * 変数の値をコモンイベントIDとして実行します。
 */

(function() {
    'use strict';

    const parameters = PluginManager.parameters('MNKR_BattleStartCommon');
    const variableId = Number(parameters['Variable Id'] || 0);
    const valueZero = eval(parameters['Value Zero'] || 0);

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        if (valueZero) {
            _BattleManager_displayStartMessages.call(this);
        } else {
            $gameTemp.reserveCommonEvent($gameVariables.value(variableId));
        }
    };

})();