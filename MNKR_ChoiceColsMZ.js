/*
 * --------------------------------------------------
 * MNKR_ChoiceColsMZ.js
 *   Ver.0.0.6
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChoiceColsMZ.js
 * @plugindesc 選択肢の列数を変更する機能を追加します。
 * @author munokura
 *
 * @help
 * 選択肢の列数を変更する機能を追加します。
 * プラグインパラメーターで変数IDを指定し、その変数の値が選択肢の列数になります。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param choiceColsVariableId
 * @text 列数変数ID
 * @type variable
 * @default 1
 * @desc 変数の値の列数になります。
 * 値が2未満の場合、1列になります。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const choiceColsVariableId = Number(parameters['choiceColsVariableId'] || 0);
  Window_ChoiceList.prototype.maxCols = function () {
    const choiceCols = $gameVariables.value(choiceColsVariableId);
    return Math.max(choiceCols, 1);
  };

  const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
  Window_ChoiceList.prototype.windowWidth = function () {
    const choiceCols = $gameVariables.value(choiceColsVariableId);
    if (choiceCols > 1) {
      const width = (this.maxChoiceWidth() + this.colSpacing()) * choiceCols + this.padding * 2;
      return Math.min(width, Graphics.boxWidth);
    }
    return _Window_ChoiceList_windowWidth.call(this);
  };

  const _Window_ChoiceList_windowHeight = Window_ChoiceList.prototype.windowHeight;
  Window_ChoiceList.prototype.windowHeight = function () {
    const choiceCols = $gameVariables.value(choiceColsVariableId);
    if (choiceCols > 1) {
      const height = this.fittingHeight(Math.ceil(this.numVisibleRows() / choiceCols));
      return height;
    }
    return _Window_ChoiceList_windowHeight.call(this);
  };

})();