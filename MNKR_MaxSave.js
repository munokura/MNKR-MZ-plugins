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
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxSave.js
 * @plugindesc セーブスロットの数を指定できます。
 * @author munokura
 *
 * @param Max Files
 * @text セーブスロットの数
 * @type number
 * @min 1
 * @max 99
 * @desc セーブスロットの数。MZではオートセーブのスロット分1を加えてください。
 * @default 6
 *
 * @help
 * セーブスロットの数を指定できます。
 * RPGツクールMZでは、オートセーブのスロット分1を加えてください。
 * ツクールデフォルト MV:20 / MZ:21
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
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