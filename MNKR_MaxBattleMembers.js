/*
 * --------------------------------------------------
 * MNKR_MaxBattleMembers.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxBattleMembers.js
@plugindesc You can specify the maximum number of people who can participate in a battle.
@author example
@license MIT License

@help
You can specify the maximum number of participants in battle.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, R18+, etc.).

@param Max Members
@text Maximum number of participants in battle
@desc Maximum number of participants in a battle
@type number
@default 4
@min 1
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxBattleMembers.js
@plugindesc 戦闘に参加する最大人数を指定できます。
@author munokura

@help
戦闘に参加する最大人数を指定できます。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param Max Members
@text 戦闘参加最大人数
@type number
@min 1
@desc 戦闘に参加する最大人数
ツクールデフォルト:4
@default 4
*/

(() => {

    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const maxMembers = Number(parameters['Max Members'] || 4);

    Game_Party.prototype.maxBattleMembers = function () {
        return maxMembers;
    };

})();