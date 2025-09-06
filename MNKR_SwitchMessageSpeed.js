/*
 * --------------------------------------------------
 * MNKR_SwitchMessageSpeed.js
 *   Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchMessageSpeed.js
@plugindesc Use the switch to disable the speed-up of "Text display" and "Text scrolling display."
@author munokura
@license MIT License

@help
Use the switches to disable the "Text Display" and "Text Scrolling"
acceleration.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param switchSpeed
@text Speed-up disable switch
@desc When the switch is ON, the text display acceleration is disabled. If the switch is not specified, it is always disabled.
@type switch
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchMessageSpeed.js
@plugindesc スイッチで「文章の表示」「文章のスクロール表示」の高速化を無効化します。
@author munokura

@help
スイッチで「文章の表示」「文章のスクロール表示」の高速化を無効化します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param switchSpeed
@text 高速化無効化スイッチ
@type switch
@default 0
@desc スイッチON時に文章の表示の高速化が無効化されます。スイッチが無指定の場合、常に無効化されます。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const switchSpeed = Number(parameters['switchSpeed'] || 0);

  const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
  Window_Message.prototype.updateShowFast = function () {
    if ($gameSwitches.value(switchSpeed) || switchSpeed === 0) {
    } else {
      _Window_Message_updateShowFast.call(this);
    }
  };

  Window_ScrollText.prototype.scrollSpeed = function () {
    let speed = $gameMessage.scrollSpeed() / 2;
    if (!($gameSwitches.value(switchSpeed) || switchSpeed === 0) && this.isFastForward()) {
      speed *= this.fastForwardRate();
    }
    return speed;
  };

})();