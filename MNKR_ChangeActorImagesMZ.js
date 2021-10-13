/*
 * --------------------------------------------------
 * MNKR_ChangeActorImagesMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeActorImagesMZ.js
 * @plugindesc 「アクターの画像変更」の指定アクターを変数値の挙動に変更します。
 * @author munokura
 *
 * @help
 * イベントコマンド「アクターの画像変更」の指定アクターを無視し、
 * 指定アクターIDを変数値の挙動に変更します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param raiseSwitch
 * @text 有効化スイッチ
 * @desc 指定スイッチがONの時、このプラグインを動作させます。0の場合、常に動作します。
 * @type switch
 * @default 0
 * 
 * @param actorIdVariableId
 * @text アクターID変数
 * @desc 「アクターの画像変更」の対象になるアクターIDを入れる変数
 * @type variable
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);
    const RaiseSwitch = Number(pluginParameters['raiseSwitch'] || 0);
    const ActorIdVariableId = Number(pluginParameters['actorIdVariableId'] || 0);

    // Change Actor Images
    const _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
    Game_Interpreter.prototype.command322 = function (params) {
        const raise = RaiseSwitch === 0 ? true : $gameSwitches.value(RaiseSwitch);
        if (raise) {
            const actor = $gameActors.actor($gameVariables.value(ActorIdVariableId));
            if (actor) {
                actor.setCharacterImage(params[1], params[2]);
                actor.setFaceImage(params[3], params[4]);
                actor.setBattlerImage(params[5]);
            }
            $gamePlayer.refresh();
            return true;
        } else {
            _Game_Interpreter_command322.call(this, params);
        }
    };

})();