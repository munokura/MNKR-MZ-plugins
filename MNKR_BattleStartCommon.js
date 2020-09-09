/*
 * --------------------------------------------------
 * MNKR_BattleStartCommon Ver.2.0.1
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
 * 
 * コモンイベント後に戦闘開始メッセージを表示したい場合、
 * コモンイベントに下記のスクリプト（コアと同じ記述）を追加してください。
 * 
 * $gameTroop.enemyNames().forEach(function(name) {
 *     $gameMessage.add(TextManager.emerge.format(name));
 * });
 * if (this._preemptive) {
 *     $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
 * } else if (this._surprise) {
 *     $gameMessage.add(TextManager.surprise.format($gameParty.name()));
 * }
 * 
 * 例
 * ◆戦闘アニメーションの表示：敵グループ全体, 光/全体3
 * ◆ウェイト：60フレーム
 * ◆スクリプト：
 * $gameTroop.enemyNames().forEach(function(name) {
 *     $gameMessage.add(TextManager.emerge.format(name));
 * });
 * if (this._preemptive) {
 *     $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
 * } else if (this._surprise) {
 *     $gameMessage.add(TextManager.surprise.format($gameParty.name()));
 * }
 */

(function () {
    'use strict';

    const parameters = PluginManager.parameters('MNKR_BattleStartCommon');
    const variableId = Number(parameters['Variable Id'] || 0);
    const valueZero = eval(parameters['Value Zero'] || 0);

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if (valueZero) {
            _BattleManager_displayStartMessages.call(this);
        } else {
            $gameTemp.reserveCommonEvent($gameVariables.value(variableId));
        }
    };

})();