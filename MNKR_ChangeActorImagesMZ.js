/*
 * --------------------------------------------------
 * MNKR_ChangeActorImagesMZ.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeActorImagesMZ.js
@plugindesc Changes the behavior of the specified actor in "Change actor image" to the variable value.
@author example
@license MIT License

@help
Ignores the actor specified in the "Change Actor Image" event command,
and changes the behavior of the specified actor ID to the variable value.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author,
and there are no restrictions on its use (commercial, 18+, etc.).

@param raiseSwitch
@text Enable switch
@desc This plug-in will run when the specified switch is ON. If it is 0, it will always run.
@type switch
@default 0

@param actorIdVariableId
@text Actor ID variable
@desc Variable to store the actor ID to be changed.
@type variable
@default 1
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeActorImagesMZ.js
@plugindesc 「アクターの画像変更」の指定アクターを変数値の挙動に変更します。
@author munokura

@help
イベントコマンド「アクターの画像変更」の指定アクターを無視し、
指定アクターIDを変数値の挙動に変更します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param raiseSwitch
@text 有効化スイッチ
@desc 指定スイッチがONの時、このプラグインを動作させます。0の場合、常に動作します。
@type switch
@default 0

@param actorIdVariableId
@text アクターID変数
@desc 「アクターの画像変更」の対象になるアクターIDを入れる変数
@type variable
@default 1
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);
    const PRM_raiseSwitch = Number(pluginParameters['raiseSwitch'] || 0);
    const PRM_actorIdVariableId = Number(pluginParameters['actorIdVariableId'] || 0);

    // Change Actor Images
    const _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
    Game_Interpreter.prototype.command322 = function (params) {
        const raise = PRM_raiseSwitch === 0 ? true : $gameSwitches.value(PRM_raiseSwitch);
        const actorId = $gameVariables.value(PRM_actorIdVariableId);
        if (raise && actorId > 0) {
            const actor = $gameActors.actor(actorId);
            if (actor) {
                actor.setCharacterImage(params[1], params[2]);
                actor.setFaceImage(params[3], params[4]);
                actor.setBattlerImage(params[5]);
            }
            $gamePlayer.refresh();
            return true;
        } else {
            return _Game_Interpreter_command322.call(this, params);
        }
    };

})();