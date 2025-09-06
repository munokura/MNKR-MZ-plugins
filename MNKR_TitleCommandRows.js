/*
 * --------------------------------------------------
 * MNKR_TitleCommandRows.js
 *   Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TitleCommandRows.js
@plugindesc Specifies the number of window lines for the title menu.
@author example
@license MIT License

@help
Specifies the number of lines in the title menu window.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param Command Rows
@text Number of menu lines
@desc Specifies the number of rows in the menu.
@type number
@default 8
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TitleCommandRows.js
@plugindesc タイトルメニューのウィンドウ行数を指定します。
@author munokura

@help
タイトルメニューのウィンドウ行数を指定します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param Command Rows
@text メニュー行数
@type number
@desc メニューの行数を指定します。
@default 8
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const commandRows = Number(parameters['Command Rows'] || 3);

    Scene_Title.prototype.commandWindowRect = function () {
        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(commandRows, true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY;
        return new Rectangle(wx, wy, ww, wh);
    };

})();