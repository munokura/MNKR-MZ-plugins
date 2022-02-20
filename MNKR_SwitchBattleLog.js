/*
 * --------------------------------------------------
 * MNKR_SwitchBattleLog.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchBattleLog.js
 * @plugindesc バトルログの表示非表示をスイッチで切り替えられるようになります。
 * @author munokura
 *
 * @help
 * バトルログの表示非表示をスイッチで切り替えられるようになります。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param hideSwitch
 * @text 非表示スイッチ
 * @type switch
 * @default 0
 * @desc スイッチがONの時にバトルログが非表示になります。「なし」に指定すると、常に非表示になります。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.hideSwitch = Number(parameters['hideSwitch'] || 0);

    const _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function () {
        _Window_BattleLog_update.call(this);
        const raise = param.hideSwitch === 0 ? true : $gameSwitches.value(param.hideSwitch);
        if (raise) {
            this.hide();
        }
    };

})();
