/*
 * --------------------------------------------------
 * MNKR_MaxBattleMembers Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxBattleMembers.js
 * @plugindesc 戦闘に参加する最大人数を指定できます。
 * @author munokura
 *
 * @param Max Members
 * @text 戦闘参加最大人数
 * @type number
 * @min 1
 * @desc 戦闘に参加する最大人数
 * ツクールデフォルト:4
 * @default 4
 *
 * @help
 * 戦闘に参加する最大人数を指定できます。
 */

(function() {
    'use strict';

    const parameters = PluginManager.parameters('MNKR_MaxBattleMembers');
    const maxMembers = Number(parameters['Max Members'] || 4);

    Game_Party.prototype.maxBattleMembers = function() {
        return maxMembers;
    };

})();