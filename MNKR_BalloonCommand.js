/*
 * --------------------------------------------------
 * MNKR_BalloonCommand Ver.0.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BalloonCommand.js
 * @plugindesc (作成中) 変数が使用できないイベントコマンドをプラグインコマンドで使用可能にします。
 * @author munokura
 * 
 * @help
 * 変数が使用できないイベントコマンドをプラグインコマンドで変数使用可能にします。
 * 
 * 以下を実装しようとしています。
 *   - フキダシアイコンの表示
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @command requestBalloonFF
 * @text フキダシアイコンの表示(固定値x固定値)
 * @desc フキダシアイコンを表示します。イベントコマンドで指定できない16番以降のフキダシ表示に使用します。
 *
 * @arg EventId
 * @text イベントID
 * @desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
 * @type number
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
 */

(() => {

    "use strict";
    const pluginName = "MNKR_BalloonCommand";

    PluginManager.registerCommand(pluginName, "requestBalloonFF", args => {
        const EventId = Number(args.EventId);
        const balloonId = Number(args.BalloonId);
        const wait = args.wait === "true";

        // 無反応
        // Game_Temp.prototype.requestBalloon = function (target, balloonId) {
        //     const request = { target: target, balloonId: balloonId };
        //     this._balloonQueue.push(request);
        //     if (target.startBalloon) {
        //         target.startBalloon();
        //     }
        // };

        // 無反応
        // Game_Interpreter.prototype.command213 = function () {
        //     this._characterId = EventId;
        //     const character = this.character(this._characterId);
        //     if (character) {
        //         $gameTemp.requestBalloon(character, balloonId);
        //         if (wait) {
        //             this.setWaitMode("balloon");
        //         }
        //     }
        //     return true;
        // };

        // 無反応
        // Game_Interpreter.prototype.command213 = function (args) {
        //     this._characterId = args[0];
        //     const character = this.character(this._characterId);
        //     if (character) {
        //         $gameTemp.requestBalloon(character, args[1]);
        //         if (args[2]) {
        //             this.setWaitMode("balloon");
        //         }
        //     }
        //     return true;
        // };

        // TypeError Cannot read property 'push' of undefined
        // Game_Temp.prototype.requestBalloon.call(this);
        // $gameTemp.requestBalloon(this.character(eventId), balloonId);

        // ReferenceError arguments is not defined
        // Game_Temp.prototype.requestBalloon.apply(this, arguments);
        // $gameTemp.requestBalloon(this.character(eventId), balloonId);

        // TypeError Cannot read property '0' of undefined
        // Game_Interpreter.prototype.command213.call(this);
        // $gameTemp.requestBalloon(this.character(eventId), balloonId);

        // ReferenceError arguments is not defined
        // Game_Interpreter.prototype.command213.apply(this, arguments);
        // $gameTemp.requestBalloon(this.character(eventId), balloonId);

    });

})();