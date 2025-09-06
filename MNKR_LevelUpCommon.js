/*
 * --------------------------------------------------
 * MNKR_LevelUpCommon.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LevelUpCommon.js
@plugindesc After leveling up, perform a common event on the map screen.
@author munokura
@license MIT License

@help
Executes common events on the map screen after leveling up.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param levelUpCommon
@text Common Events
@desc Common events that can be performed on the map screen after leveling up
@type common_event
@default 0

@param raiseSwitch
@text Enable switch
@desc This plug-in will run when the specified switch is ON. If it is set to "None", it will always run.
@type switch
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LevelUpCommon.js
@plugindesc レベルアップ後にマップ画面でコモンイベントを実行します。
@author munokura

@help
レベルアップ後にマップ画面でコモンイベントを実行します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param levelUpCommon
@text コモンイベント
@type common_event
@default 0
@desc レベルアップ後にマップ画面で実行するコモンイベント

@param raiseSwitch
@text 有効化スイッチ
@desc 指定スイッチがONの時、このプラグインを動作させます。「なし」の場合、常に動作します。
@type switch
@default 0
*/

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.levelUpCommon = Number(parameters['levelUpCommon'] || 0);
    param.raiseSwitch = Number(parameters['raiseSwitch'] || 0);

    const MNKR_LevelUpCommon = {
        levelUp: false
    };

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function () {
        const raise = param.raiseSwitch === 0 ? true : $gameSwitches.value(param.raiseSwitch);
        if (raise) {
            MNKR_LevelUpCommon.levelUp = true;
        }
        _Game_Actor_levelUp.call(this);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        if (MNKR_LevelUpCommon.levelUp) {
            $gameTemp.reserveCommonEvent(param.levelUpCommon);
            MNKR_LevelUpCommon.levelUp = false;
        }
        _Scene_Map_update.call(this);
    };

})();