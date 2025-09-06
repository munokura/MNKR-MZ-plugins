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
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowMapName.js
@plugindesc Keep the map name visible.
@author example
@license MIT License

@help
Keeps the map name displayed.

This setting will be reflected on maps where you enter
<MNKR_ShowMapName>
in the map's memo field.

To temporarily toggle the map name display on or off,
use the "Change Map Name Display" event command.
Example: During fade-out

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and
there are no restrictions on its use (commercial, 18+, etc.).

@param globalSetting
@text Display map name on all maps
@desc Keep map name visible on all maps.
@type boolean
@on All maps
@off Maps with tags
@default false

@param fadeOutSetting
@text Hide map name when fading out
@desc Hide the map name when fading out, and show the map name when fading in.
@type boolean
@on valid
@off invalid
@default true
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowMapName.js
@plugindesc マップ名を表示したままにします。
@author munokura

@help
マップ名を表示したままにします。

マップのメモ欄に
<MNKR_ShowMapName>
と入れたマップに反映されます。

マップ名表示マップで一時的に表示・非表示を切り替えたい場合、
イベントコマンド「マップ名表示の変更」を使用してください。
例：フェードアウト時


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param globalSetting
@text 全マップでマップ名表示
@desc 全マップでマップ名を表示したままにします。
@type boolean
@on 全マップ
@off タグがあるマップ
@default false

@param fadeOutSetting
@text フェードアウト時のマップ名非表示化
@desc フェードアウト時にマップ名を非表示にし、フェードイン時にマップ名を表示するようにします。
@type boolean
@on 有効
@off 無効
@default true
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