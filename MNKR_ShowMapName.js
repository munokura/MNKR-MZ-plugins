/*
 * --------------------------------------------------
 * MNKR_ShowMapName.js
 *   Ver.0.1.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ShowMapName.js
 * @plugindesc マップ名を表示したままにします。
 * @author munokura
 *
 * @help
 * マップ名を表示したままにします。
 * 
 * マップのメモ欄に
 * <MNKR_ShowMapName>
 * と入れたマップに反映されます。
 * 
 * マップ名表示マップで一時的に非表示にしたい（フェードアウト等）場合、
 * 下記スクリプトを実行してください。
 * $gameMap.disableNameDisplay();
 * 
 * 再表示する場合、下記スクリプトを実行してください。
 * $gameMap.enableNameDisplay();
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param globalSetting
 * @text 全マップでマップ名表示
 * @desc 全マップでマップ名を表示したままにします。
 * @type boolean
 * @on 全マップ
 * @off タグがあるマップ
 * @default false
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const globalSetting = parameters['globalSetting'] === 'true';

  const _Window_MapName_update = Window_MapName.prototype.update;
  Window_MapName.prototype.update = function () {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      if ($gameMap.isNameDisplayEnabled()) {
        this.updateFadeIn();
      } else {
        this.updateFadeOut();
      }
    } else {
      _Window_MapName_update.call(this);
    }
  };

})();