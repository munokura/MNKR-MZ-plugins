/*
 * --------------------------------------------------
 * MNKR_AddIconSaveMZ.js
 *  Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddIconSaveMZ.js
@plugindesc You can add icons to your save data.
@author example
@license MIT License

@help
You can add an icon to your save data.
Specify a variable ID in the plugin parameters
and assign the icon ID to that variable to display it.

To hide the icon, assign 0.

There is no plugin command.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param iconVariableId
@text Display icon variable ID
@desc Specify the variable that contains the icon ID value to display.
@type variable
@default 1
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddIconSaveMZ.js
@plugindesc セーブデータにアイコンを追加表示できます。
@author munokura

@help
セーブデータにアイコンを追加表示できます。
プラグインパラメーターで変数IDを指定し、
その変数にアイコンIDを代入すると表示されます。

非表示にするには0を代入してください。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param iconVariableId
@text 表示アイコン変数ID
@type variable
@desc 表示するアイコンIDの値を入れる変数を指定します。
@default 1
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_iconVariableId = Number(parameters['iconVariableId'] || 1);

  const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
  Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
    _Window_SavefileList_drawContents.call(this, info, rect, valid);
    const bottom = rect.y + rect.height;
    const lineHeight = this.lineHeight();
    this.drawIcon(info.iconVariableId, rect.x, bottom - lineHeight);
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    const info = _DataManager_makeSavefileInfo.call(this);
    info.iconVariableId = $gameVariables.value(PRM_iconVariableId);
    return info;
  };

})();