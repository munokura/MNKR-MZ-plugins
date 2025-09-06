/*
 * --------------------------------------------------
 * MNKR_MaxSave.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxSave.js
@plugindesc You can specify the number of save slots.
@author example
@license MIT License

@help
You can specify the number of save slots.
For RPG Maker MZ, add 1 for the autosave slot.
Tsukur default: MV:20 / MZ:21

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).

@param Max Files
@text Number of save slots
@desc Number of save slots. Add 1 for autosave slots in MZ.
@type number
@default 6
@min 1
@max 99
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxSave.js
@plugindesc セーブスロットの数を指定できます。
@author munokura

@param Max Files
@text セーブスロットの数
@type number
@min 1
@max 99
@desc セーブスロットの数。MZではオートセーブのスロット分1を加えてください。
@default 6

@help
セーブスロットの数を指定できます。
RPGツクールMZでは、オートセーブのスロット分1を加えてください。
ツクールデフォルト MV:20 / MZ:21


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const maxFiles = Number(parameters['Max Files'] || 6);

    DataManager.maxSavefiles = function () {
        return maxFiles;
    };

})();