/*
 * --------------------------------------------------
 * MNKR_NoLose.js
 *   Ver.1.2.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_NoLose.js
 * @plugindesc 戦闘で全滅してもゲームオーバーになりません。
 * @author munokura
 * 
 * @help
 * パラメーターで指定したスイッチがONの時、
 * 戦闘で全滅するとゲームオーバーにならず、
 * マップ画面へ移行後にコモンイベントを実行します。
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
 * @param switchId
 * @text スイッチID
 * @type switch
 * @desc 発動させるスイッチID。指定しない場合、全滅しませんがコモンイベントを実行しなくなります。
 * @default 0
 *
 * @param commonId
 * @type common_event
 * @text コモンイベントID
 * @desc 全滅時に実行するコモンイベント
 * 戦闘終了後にマップで実行されます。
 * @default 0
 */

(() => {

    'use strict'

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const switchId = Number(parameters['switchId'] || 0);
    const commonId = Number(parameters['commonId'] || 0);

    const _BattleManager_setup = BattleManager.setup
    BattleManager.setup = function (troopId, canEscape, canLose) {
        _BattleManager_setup.apply(this, arguments);
        if ($gameSwitches.value(switchId)) {
            this._canLose = true;
        }
    };

    const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd
    BattleManager.updateBattleEnd = function () {
        const isAllDead = $gameParty.isAllDead();
        _BattleManager_updateBattleEnd.call(this);
        if ($gameSwitches.value(switchId) && commonId > 0 && isAllDead) {
            $gameTemp.reserveCommonEvent(commonId);
        }
    };

})();
