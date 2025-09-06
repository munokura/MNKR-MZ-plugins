/*
 * --------------------------------------------------
 * MNKR_ReplaceMenu.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReplaceMenu.js
@plugindesc Temporarily replaces the menu opening action with a common event.
@author example
@license MIT License

@help
Temporarily replaces the menu opening action with a common event.
When the variable value is 0, the normal menu opens.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author,
and there are no restrictions on usage (commercial, 18+, etc.).

Ver. 0.0.3
Fixed a bug that caused a fade to occur before a common event was executed.

@param variableCommon
@text Common event specification variable ID
@desc Executes a common event with the variable's numeric value as its ID.
@type variable
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReplaceMenu.js
@plugindesc メニューを開く動作を一時的にコモンイベントに置き換えます。
@author munokura

@help
メニューを開く動作を一時的にコモンイベントに置き換えます。
変数の値が0の時、通常のメニューを開きます。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


Ver.0.0.3
コモンイベント実行前にフェードが入ってしまうバグを修正


@param variableCommon
@text コモンイベント指定変数ID
@type variable
@default 0
@desc 変数の数値をIDとしたコモンイベントを実行します。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const variableCommon = Number(parameters['variableCommon'] || 0);

  const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function () {
    const commonId = Number($gameVariables.value(variableCommon));
    if (commonId > 0) {
      $gameTemp.reserveCommonEvent(commonId);
      this.menuCalling = false;
    } else {
      _Scene_Map_callMenu.call(this);
    }
  };

})();