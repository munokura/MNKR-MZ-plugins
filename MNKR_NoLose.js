/*
 * --------------------------------------------------
 * MNKR_NoLose Ver.1.2.0
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
 * @param Switch Id
 * @text スイッチID
 * @type switch
 * @desc 発動させるスイッチID
 * @default 11
 *
 * @param Common Id
 * @type common_event
 * @text コモンイベントID
 * @desc 全滅時に実行するコモンイベント
 * @default 0
 * 
 * @help
 * パラメーターで指定したスイッチがONの時、
 * 戦闘で全滅するとゲームオーバーにならず、
 * マップ画面へ移行後にコモンイベントを実行します。
 */

(function() {
    'use strict'

    const parameters = PluginManager.parameters('MNKR_NoLose')
    const switchId = Number(parameters['Switch Id'] || 11)
    const commonId = Number(parameters['Common Id'] || 0)

    const _BattleManager_setup = BattleManager.setup
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _BattleManager_setup.apply(this, arguments)
        if ($gameSwitches.value(switchId)) {
            this._canLose = true
        }
    }

    const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd
    BattleManager.updateBattleEnd = function() {
        _BattleManager_updateBattleEnd.call(this)
        if ($gameSwitches.value(switchId) && commonId > 0) {
            $gameTemp.reserveCommonEvent(commonId)
        }
    }

})()