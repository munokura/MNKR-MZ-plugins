/*
 * --------------------------------------------------
 * MNKR_ShowMapName.js
 *   Ver.0.2.1
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
 * マップ名表示マップで一時的に表示・非表示を切り替えたい場合、
 * イベントコマンド「マップ名表示の変更」を使用してください。
 * 例：フェードアウト時
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
 * 
 * @param fadeOutSetting
 * @text フェードアウト時のマップ名非表示化
 * @desc フェードアウト時にマップ名を非表示にし、フェードイン時にマップ名を表示するようにします。
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM = {};
  PRM.globalSetting = parameters['globalSetting'] === 'true';
  PRM.fadeOutSetting = parameters['fadeOutSetting'] === 'true';

  const _Window_MapName_update = Window_MapName.prototype.update;
  Window_MapName.prototype.update = function () {
    if (DataManager.isEventTest()) {
      _Window_MapName_update.call(this);
      return;
    };
    const showMapName = $dataMap.meta[pluginName] || PRM.globalSetting;
    if (!showMapName) {
      _Window_MapName_update.call(this);
      return;
    }
    if ($gameMap.isNameDisplayEnabled()) {
      this.updateFadeIn();
    } else {
      this.updateFadeOut();
    }
  };

  const _Game_Screen_startFadeOut = Game_Screen.prototype.startFadeOut;
  Game_Screen.prototype.startFadeOut = function (duration) {
    if (PRM.fadeOutSetting) {
      $gameMap.disableNameDisplay();
    }
    _Game_Screen_startFadeOut.call(this, duration);
  };

  const _Game_Screen_startFadeIn = Game_Screen.prototype.startFadeIn;
  Game_Screen.prototype.startFadeIn = function (duration) {
    if (PRM.fadeOutSetting) {
      $gameMap.enableNameDisplay();
    }
    _Game_Screen_startFadeIn.call(this, duration);
  };

})();