/*
 * --------------------------------------------------
 * MNKR_AddIconSave.js
 *   Ver.0.1.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddIconSave.js
@plugindesc You can add icons to your save data.
@author munokura
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
@default 0

@param offSetX
@text Icon Position X
@desc Amount to offset the display icon horizontally. Positive: Right / Negative: Left
@type number
@default 0
@min -9007
@max 9007

@param offSetY
@text Icon Position Y
@desc Amount to offset the display icon horizontally. Positive: Up / Negative: Down
@type number
@default 0
@min -9007
@max 9007
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddIconSave.js
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
@default 0

@param offSetX
@text アイコン位置X
@type number
@min -9007
@max 9007
@desc 表示アイコンを横方向にオフセットする量。正:右/負:左
@default 0

@param offSetY
@text アイコン位置Y
@type number
@min -9007
@max 9007
@desc 表示アイコンを横方向にオフセットする量。正:上/負:下
参考値 MV:0 / MZ:36
@default 0
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_iconVariableId = Number(parameters['iconVariableId'] || 0);
  const PRM_offSetX = Number(parameters['offSetX'] || 0);
  const PRM_offSetY = Number(parameters['offSetY'] || 0);

  const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
  Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
    _Window_SavefileList_drawContents.call(this, info, rect, valid);
    if (info.variableIconId > 0) {
      const bottom = rect.y + rect.height;
      const lineHeight = this.lineHeight();
      this.drawIcon(info.variableIconId, rect.x + PRM_offSetX, bottom - lineHeight * 2 + PRM_offSetY);
    }
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    const info = _DataManager_makeSavefileInfo.call(this);
    const iconId = $gameVariables.value(PRM_iconVariableId);
    info.variableIconId = iconId > 0 ? iconId : 0;
    return info;
  };

})();