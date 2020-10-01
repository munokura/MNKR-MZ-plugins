/*
 * --------------------------------------------------
 * MNKR_VariableCommand
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
 * @plugindesc (試作中) 変数が使用できないイベントコマンドをプラグインコマンドで可能にします。
 * @author munokura
 * 
 * @command addActor
 * @text メンバーを加える
 * @desc 変数の値のアクターIDをメンバーに加えます。
 *
 * @arg variableID
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @min 1
 * 
 * @arg setup
 * @text アクター初期化
 * @desc アクターを初期化します。
 * @type boolean
 * @on 初期化する
 * @off 初期化しない
 * @default false
 * 
 * 
 * @command removeActor
 * @text メンバーを外す
 * @desc 変数の値のアクターIDをメンバーから外します。
 *
 * @arg variableID
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @min 1
 * 
 * @arg setup
 * @text アクター初期化
 * @desc アクターを初期化します。
 * @type boolean
 * @on 初期化する
 * @off 初期化しない
 * @default false
 * 
 * 
 * 
 * @help
 * 試作中です。
 * 
 * 変数が使用できないイベントコマンドをプラグインコマンドで可能にします。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
*/

(() => {

    "use strict";
    const pluginName = "MNKR_VariableCommand";

    PluginManager.registerCommand(pluginName, "addActor", args => {
        let variableID = Number(args.variableID);
        let variable = $gameVariables.value(args.variableID);
        let setup = eval(args.setup);
        if (variable) {
            if (setup) {
                $gameActors.actor(variable).setup(variable)
            }
            $gameParty.addActor(variable);
        }
    });

    PluginManager.registerCommand(pluginName, "removeActor", args => {
        let variableID = Number(args.variableID);
        let variable = $gameVariables.value(args.variableID);
        let setup = eval(args.setup);
        if (variable) {
            if (setup) {
                $gameActors.actor(variable).setup(variable)
            }
            $gameParty.removeActor(variable);
        }
    });

})();
