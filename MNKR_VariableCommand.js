/*
 * --------------------------------------------------
 * MNKR_VariableCommand Ver.1.1.0
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
 * 変数が使用できないイベントコマンドをプラグインコマンドで使用可能にします。
 * 
 * 以下が実装されています。
 *   - メンバーを加える
 *   - メンバーを外す
 *   - 職業を変更する
 *   - 名前入力の処理
 *   - フキダシアイコンの表示
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
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
 * @command requestBalloonFF
 * @text フキダシアイコンの表示(固定値x固定値)
 * @desc フキダシアイコンを表示します。イベントコマンドで指定できない16番以降のフキダシ表示に使用します。
 *
 * @arg EventId
 * @text イベントID
 * @desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg BalloonId
 * @text フキダシアイコンID
 * @desc フキダシアイコンIDとして実行します。
 * @type number
 * @default 1
 * 
 * @arg wait
 * @text 完了までウェイト
 * @desc 完了までウェイトします。
 * @type boolean
 * @on ウェイトする
 * @off ウェイトしない
 * @default false
 * 
 * 
 * @command requestBalloonVV
 * @text フキダシアイコンの表示(変数値x変数値)
 * @desc フキダシアイコンを表示します。
 *
 * @arg variableIdEvent
 * @text 変数IDイベント
 * @desc 変数の値をイベントIDとします。値が-1でプレイヤー、0で実行しているイベント、1以上はイベントID
 * @type variable
 * @default 1
 * 
 * @arg variableIdBalloon
 * @text 変数IDフキダシアイコン
 * @desc 変数の値をフキダシアイコンIDとします。
 * @type variable
 * @default 1
 * 
 * @arg wait
 * @text 完了までウェイト
 * @desc 完了までウェイトします。
 * @type boolean
 * @on ウェイトする
 * @off ウェイトしない
 * @default false
 * 
 * 
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

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

    PluginManager.registerCommand(pluginName, "requestBalloonFF", function (args) {
        const eventId = Number(args.EventId);
        const balloonId = Number(args.BalloonId);
        const wait = args.wait === "true";

        $gameTemp.requestBalloon(this.character(eventId), balloonId);
        if (wait) {
            this.setWaitMode("balloon");
        }
    });

    PluginManager.registerCommand(pluginName, "requestBalloonVV", function (args) {
        const eventId = $gameVariables.value(Number(args.variableIdEvent));
        const balloonId = $gameVariables.value(Number(args.variableIdBalloon));
        const wait = args.wait === "true";

        $gameTemp.requestBalloon(this.character(eventId), balloonId);
        if (wait) {
            this.setWaitMode("balloon");
        }
    });

})();