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
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_NoLose.js
@plugindesc Even if you are wiped out in battle, it won't be a game over.
@author example
@license MIT License

@help
When the switch specified by the parameter is ON,
a complete elimination in battle does not result in a game over.
Instead, the game transitions to the map screen and a common event is
executed.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param switchId
@text Switch ID
@desc If you do not specify the switch ID to activate, the common event will not be executed, but the unit will not be wiped out.
@type switch
@default 0

@param commonId
@text Common Event ID
@desc Common event executed when all enemies are wiped out
@type common_event
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_NoLose.js
@plugindesc 戦闘で全滅してもゲームオーバーになりません。
@author munokura

@help
パラメーターで指定したスイッチがONの時、
戦闘で全滅するとゲームオーバーにならず、
マップ画面へ移行後にコモンイベントを実行します。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param switchId
@text スイッチID
@type switch
@desc 発動させるスイッチID。指定しない場合、全滅しませんがコモンイベントを実行しなくなります。
@default 0

@param commonId
@type common_event
@text コモンイベントID
@desc 全滅時に実行するコモンイベント
戦闘終了後にマップで実行されます。
@default 0
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