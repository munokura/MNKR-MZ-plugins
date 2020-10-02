/*
 * --------------------------------------------------
 * MNKR_VariableCommand Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
 * @plugindesc 変数が使用できないイベントコマンドをプラグインコマンドで使用可能にします。
 * @author munokura
 * 
 * @help
 * 変数が使用できないイベントコマンドをプラグインコマンドで変数使用可能にします。
 * 
 * 以下が実装されています。
 *   - メンバーを加える
 *   - メンバーを外す
 *   - 職業を変更する
 *   - 名前入力の処理
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @command addActor
 * @text メンバーを加える
 * @desc 変数の値のアクターIDをメンバーに加えます。
 *
 * @arg variableIdActor
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @default 1
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
 * @arg variableIdActor
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @default 1
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
 * @command changeClass
 * @text 職業を変更する
 * @desc 変数の値のアクターIDの職業を変更します。
 *
 * @arg variableIdActor
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @default 1
 * 
 * @arg variableIdClass
 * @text 職業IDを指定する変数ID
 * @desc 変数の値を職業IDとして実行します。
 * @type variable
 * @default 2
 * 
 * @arg setup
 * @text レベルの保持
 * @desc レベルを保持します。
 * @type boolean
 * @on 保持する
 * @off 保持しない
 * @default false
 * 
 * 
 * @command nameInput
 * @text 名前入力の処理
 * @desc 変数の値のアクターIDの名前を入力します。
 *
 * @arg variableIdActor
 * @text アクターIDを指定する変数ID
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @default 1
 * 
 * @arg maxWord
 * @text 入力最大文字数
 * @desc 入力できる最大文字数を指定します。
 * @type number
 * @min 1
 * @default 8
 * 
 * 
 */

(() => {

    "use strict";
    const pluginName = "MNKR_VariableCommand";

    PluginManager.registerCommand(pluginName, "addActor", args => {
        const actorID = $gameVariables.value(Number(args.variableIdActor));
        const doSetup = args.setup === "true";
        if (actorID) {
            if (doSetup) {
                $gameActors.actor(actorID).setup(actorID);
            }
            $gameParty.addActor(actorID);
        }
    });

    PluginManager.registerCommand(pluginName, "removeActor", args => {
        const actorID = $gameVariables.value(Number(args.variableIdActor));
        const doSetup = args.setup === "true";
        if (actorID) {
            if (doSetup) {
                $gameActors.actor(actorID).setup(actorID);
            }
            $gameParty.removeActor(actorID);
        }
    });

    PluginManager.registerCommand(pluginName, "changeClass", args => {
        const actorID = $gameVariables.value(Number(args.variableIdActor));
        const classID = $gameVariables.value(Number(args.variableIdClass));
        const doSetup = args.setup === "true";
        if (actorID && classID) {
            $gameActors.actor(actorID).changeClass(classID, doSetup);
        }
    });

    PluginManager.registerCommand(pluginName, "nameInput", args => {
        const actorID = $gameVariables.value(Number(args.variableIdActor));
        const max = Number(args.maxWord);
        if (actorID && max) {
            SceneManager.push(Scene_Name);
            SceneManager.prepareNextScene(actorID, max);
        }
    });

})();