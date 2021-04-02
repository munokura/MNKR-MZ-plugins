/*
 * --------------------------------------------------
 * MNKR_ShowMapName.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowMapName.js
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

  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _Scene_Map_start.call(this);
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      this._mapNameWindow.open();
    }
  };

  const _Window_MapName_updateFadeOut = Window_MapName.prototype.updateFadeOut;
  Window_MapName.prototype.updateFadeOut = function () {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (!showMapName) {
      _Window_MapName_updateFadeOut.call(this);
    }
    this._showCount = 0;
  };

})();