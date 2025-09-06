/*
 * --------------------------------------------------
 * MNKR_MovePictureSwitchMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MovePictureSwitchMZ.js
@plugindesc The switch allows you to switch the picture movement coordinates between absolute and relative values.
@author example
@license MIT License

@help
A switch allows you to switch the picture's movement coordinates between
absolute and relative values.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param switchPciture
@text Relative Designation Switch
@desc When the switch is ON, the coordinates of the picture to be moved are specified relative to the original. When the switch is not specified, the coordinates are always specified relative to the original.
@type switch
@default 0
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MovePictureSwitchMZ.js
@plugindesc スイッチでピクチャの移動座標を絶対値と相対値とを切り替えられます。
@author munokura

@help
スイッチでピクチャの移動座標を絶対値と相対値とを切り替えられます。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param switchPciture
@text 相対指定スイッチ
@type switch
@default 0
@desc 指定スイッチON時はピクチャの移動座標が相対指定になります。スイッチが無指定の場合、常に相対指定になります。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const switchPciture = Number(parameters['switchPciture'] || 0);

  const _Game_Picture_move = Game_Picture.prototype.move;
  Game_Picture.prototype.move = function (
    origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType
  ) {
    if ($gameSwitches.value(switchPciture) || switchPciture === 0) {
      x += this.x();
      y += this.y();
    }
    _Game_Picture_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType);
  }

})();