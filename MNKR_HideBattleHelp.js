/*
 * --------------------------------------------------
 * MNKR_HideBattleHelp.js
 *   Ver.0.0.3
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideBattleHelp.js
@plugindesc Hides the help window after selecting a skill or item in battle.
@author munokura
@license MIT License

@help
# Function
Hides the help window after selecting a skill or item on the battle screen.

Use the plugin parameters to specify behavior when selecting an enemy
character and an actor.

There are no plugin commands.

# Terms of Use
MIT License.
https://licenses.opensource.jp/MIT/MIT.html
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param EnemySelect
@text Help display when selecting an enemy character
@desc Displays the skill's help window.
@type boolean
@on display
@off hidden
@default false

@param ActorSelect
@text Help display when selecting an actor
@desc Displays the skill's help window.
@type boolean
@on display
@off hidden
@default false
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideBattleHelp.js
@plugindesc 戦闘でスキル・アイテムを選択後にヘルプウィンドウを非表示にします。
@author munokura

@help
# 機能
戦闘画面でスキル・アイテムを選択後にヘルプウィンドウを非表示にします。
プラグインパラメーターで、敵キャラ選択時とアクター選択時での挙動を指定してください。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
https://licenses.opensource.jp/MIT/MIT.html
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。

@param EnemySelect
@text 敵キャラ選択時ヘルプ表示
@desc スキルのヘルプウィンドウを表示します。
@type boolean
@on 表示
@off 非表示
@default false

@param ActorSelect
@text アクター選択時ヘルプ表示
@desc スキルのヘルプウィンドウを表示します。
@type boolean
@on 表示
@off 非表示
@default false
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.EnemySelect = parameters['EnemySelect'] === "true";
    param.ActorSelect = parameters['ActorSelect'] === "true";

    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function () {
        _Scene_Battle_startEnemySelection.call(this);
        if (!param.EnemySelect) {
            this._helpWindow.hide();
        }
    };

    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function () {
        _Scene_Battle_startActorSelection.call(this);
        if (!param.ActorSelect) {
            this._helpWindow.hide();
        }
    };

})();