/*
 * --------------------------------------------------
 * MNKR_NoLose Ver.1.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_NoLose.js
 * @plugindesc 戦闘で全滅してもゲームオーバーになりません。
 * @author munokura
 *
 * @help
 * 戦闘で全滅してもゲームオーバーになりません。
 */

(function() {
    'use strict';

    const _BattleManager_setup = BattleManager.setup
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _BattleManager_setup.apply(this, arguments);
        this._canLose = true;
    };

})();