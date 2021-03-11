/*
 * --------------------------------------------------
 * MNKR_SwitchSave.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchSave.js
 * @plugindesc 指定スイッチがONの時にセーブ画面を開くと、キャンセルできなくなります。
 * @author munokura
 *
 * @help
 * 指定スイッチがONの時にセーブ画面を開くと、キャンセルできなくなります。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param cancelSwitch
 * @text キャンセル不可スイッチ
 * @type switch
 * @default 0
 * @desc 指定スイッチがONの時にセーブ画面を開くと、キャンセルできなくなります。無指定だと常にスイッチONと同じになります。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const cancelSwitch = Number(parameters['cancelSwitch'] || 0);

  const _Scene_File_createListWindow = Scene_File.prototype.createListWindow;
  Scene_File.prototype.createListWindow = function () {
    _Scene_File_createListWindow.call(this);
    const isSceneSave = SceneManager._scene.constructor.name === 'Scene_Save';
    const cancelNg = cancelSwitch === 0 ? true : $gameSwitches.value(cancelSwitch);

    if (cancelNg && isSceneSave) {
      this._listWindow.setHandler('cancel', this.onSaveFailure.bind(this));
    }
  };

})();