/*
 * --------------------------------------------------
 * MNKR_GoldIcon.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_GoldIcon.js
@plugindesc Replace currency unit display with icons
@author example
@license MIT License

@help
Replaces currency unit displays with icons.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).

@param Gold Icon
@text Currency Icon ID
@desc Icon ID to use for currency unit
@type number
@default 313
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_GoldIcon.js
@plugindesc 通貨単位の表示をアイコンに置き換えます
@author munokura

@param Gold Icon
@text 通貨アイコンID
@type number
@desc 通貨の単位に使用するアイコンID
@default 313

@help
通貨単位の表示をアイコンに置き換えます。


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
    const goldIcon = Number(parameters['Gold Icon'] || 313);

    Window_Base.prototype.drawCurrencyValue = function (value, unit, x, y, width) {
        this.resetTextColor();
        this.drawText(value, x, y, width - 36 - 6, 'right');
        this.drawIcon(goldIcon, x + width - 36, y);
    };

})();