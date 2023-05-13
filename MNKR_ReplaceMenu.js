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
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReplaceMenu.js
 * @plugindesc メニューを開く動作を一時的にコモンイベントに置き換えます。
 * @author munokura
 *
 * @help
 * メニューを開く動作を一時的にコモンイベントに置き換えます。
 * 変数の値が0の時、通常のメニューを開きます。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * Ver.0.0.3
 * コモンイベント実行前にフェードが入ってしまうバグを修正
 *
 *
 * @param variableCommon
 * @text コモンイベント指定変数ID
 * @type variable
 * @default 0
 * @desc 変数の数値をIDとしたコモンイベントを実行します。
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