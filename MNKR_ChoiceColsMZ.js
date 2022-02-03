/*
 * --------------------------------------------------
 * MNKR_ChoiceColsMZ.js
 *   Ver.0.1.0
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChoiceColsMZ.js
 * @plugindesc 選択肢の列数・Y軸位置を変更する機能を追加します。
 * @author munokura
 *
 * @help
 * 選択肢の列数・Y軸位置を変更する機能を追加します。
 * プラグインパラメーターで変数IDを指定し、その変数の値が選択に反映されます。
 * 
 * 注意
 * 1.Y位置指定の変数はゲーム開始時のままだと0なので、画面最上部に出ます。
 *   デフォルト動作にするには -1 などのマイナスの値を予め代入する必要があります。
 * 2.Y位置指定の変数の値が大きすぎて画面外にはみ出る場合、
 *   自動的に画面最下部に調整されます。
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
 * @default 0
 * @desc 変数の値の列数になります。値が2未満の場合、1列になります。機能を使用しない場合「なし」を指定
 * 
 * @param choiceYpositionVariableId
 * @text Y位置変数ID
 * @type variable
 * @default 0
 * @desc 変数の値が選択肢のY軸位置になります。値がマイナスの場合、標準の動作になります。機能を使用しない場合「なし」を指定
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const param = {};
  param.choiceColsVariableId = Number(parameters['choiceColsVariableId'] || 0);
  param.choiceYpositionVariableId = Number(parameters['choiceYpositionVariableId'] || 0);

  const useCols = param.choiceColsVariableId > 0;
  const useYpos = param.choiceYpositionVariableId > 0;

  if (useCols) {
    Window_ChoiceList.prototype.maxCols = function () {
      const choiceCols = $gameVariables.value(param.choiceColsVariableId);
      return Math.max(choiceCols, 1);
    };

    const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
    Window_ChoiceList.prototype.windowWidth = function () {
      const choiceCols = $gameVariables.value(param.choiceColsVariableId);
      if (choiceCols > 1) {
        const width = (this.maxChoiceWidth() + this.colSpacing()) * choiceCols + this.padding * 2;
        return Math.min(width, Graphics.boxWidth);
      }
      return _Window_ChoiceList_windowWidth.call(this);
    };

    const _Window_ChoiceList_windowHeight = Window_ChoiceList.prototype.windowHeight;
    Window_ChoiceList.prototype.windowHeight = function () {
      const choiceCols = $gameVariables.value(param.choiceColsVariableId);
      if (choiceCols > 1) {
        const height = this.fittingHeight(Math.ceil(this.numVisibleRows() / choiceCols));
        return height;
      }
      return _Window_ChoiceList_windowHeight.call(this);
    };
  }

  if (useYpos) {
    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
      _Window_ChoiceList_updatePlacement.call(this);
      const choiceY = $gameVariables.value(param.choiceYpositionVariableId);
      if (choiceY >= 0) {
        const maxY = Graphics.boxHeight - this.windowHeight();
        const fixChoiceY = choiceY > maxY ? maxY : choiceY;
        this.y = fixChoiceY;
      }
    };
  }

})();
