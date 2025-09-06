/*
 * --------------------------------------------------
 * MNKR_SelectMaxRows.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectMaxRows.js
@plugindesc Specifies the number of rows in the choice window.
@author example
@license MIT License

@help
Specifies the number of lines in the selection window.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param Max Rows
@text Number of rows of options
@desc Number of lines displayed in the selection window
@type number
@default 6
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectMaxRows.js
@plugindesc 選択肢ウィンドウ内の行数を指定します。
@author munokura

@help
選択肢ウィンドウ内の行数を指定します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param Max Rows
@text 選択肢の行数
@type number
@default 6
@desc 選択肢のウィンドウ内の表示行数
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const maxRows = Number(parameters['Max Rows'] || 6);

    Window_ChoiceList.prototype.maxLines = function () {
        return maxRows;
    };

})();