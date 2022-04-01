/*
 * --------------------------------------------------
 * MNKR_BattleStartCommon.js
 *   Ver.2.0.4
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
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param variableId
 * @text 指定変数
 * @type variable
 * @desc コモンイベントを指定する変数ID。変数値がIDのコモンイベントを実行します。なしの場合、値が0と同じ動作になります。
 * @default 1
 * 
 * @param valueZero
 * @text 変数値が0の処理
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 指定変数の値が0の場合に、デフォルトの戦闘開始メッセージを表示するかどうか
 * @default false
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_variableId = Number(parameters['variableId'] || 0);
    const PRM_valueZero = parameters['valueZero'] === 'true';

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if (PRM_valueZero && $gameVariables.value(PRM_variableId) === 0) {
            _BattleManager_displayStartMessages.call(this);
        } else {
            $gameTemp.reserveCommonEvent($gameVariables.value(PRM_variableId));
        }
    };

})();