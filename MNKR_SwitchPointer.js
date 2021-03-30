/*
 * --------------------------------------------------
 * MNKR_SwitchPointer.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchPointer.js
 * @plugindesc 指定スイッチがON時、タップによる移動先の点滅（ポインタ）表示を止めます。
 * @author munokura
 *
 * @help
 * 指定スイッチがON時、タップによる移動先の点滅（ポインタ）表示を止めます。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param destinationSwitch
 * @text ポインタスイッチID
 * @type switch
 * @default 0
 * @desc 指定スイッチがON時、タップによる移動先の点滅（ポインタ）表示を止めます。無指定の場合、常にONと同等になります。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const destinationSwitch = Number(parameters['destinationSwitch'] || 0);

  const _Sprite_Destination_update = Sprite_Destination.prototype.update;
  Sprite_Destination.prototype.update = function () {
    const isOn = destinationSwitch === 0 ? true : $gameSwitches.value(destinationSwitch);
    if (isOn) {
      Sprite.prototype.update.call(this);
      this.visible = false;
    } else {
      _Sprite_Destination_update.call(this);
    }
  };

})();