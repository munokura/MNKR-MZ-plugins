/*
 * --------------------------------------------------
 * MNKR_TouchMoveSwitch.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TouchMoveSwitch.js
 * @plugindesc マップ画面でのタッチ移動・トリガーを停止します。
 * @author munokura
 *
 * @help
 * マップ画面でのタッチ移動・トリガーを停止します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param raiseSwitch
 * @text 有効化スイッチ
 * @desc 指定スイッチがONの時、このプラグインを動作させます。「なし」の場合、常に動作します。
 * @type switch
 * @default 0
 * 
 */

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);
    const PRM_raiseSwitch = Number(pluginParameters['raiseSwitch'] || 0);

    const _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        const raise = PRM_raiseSwitch === 0 ? true : $gameSwitches.value(PRM_raiseSwitch);
        if (!raise) {
            _Scene_Map_processMapTouch.call(this);
        }
    };

})();
