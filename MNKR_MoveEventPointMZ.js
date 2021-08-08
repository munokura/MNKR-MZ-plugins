/*
 * --------------------------------------------------
 * MNKR_MoveEventPointMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MoveEventPointMZ.js
 * @plugindesc 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
 * @author munokura
 *
 * @help
 * 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
 * プレイヤーのタッチ移動と同じで、座標までの障害物を避けて移動します。
 * 
 * イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
 * X座標 - マップ内のX座標
 * Y座標 - マップ内のY座標
 * ウェイト - 完了までウェイトする/しない
 * 
 * 注意事項
 *   ツクールのプレイヤーがタッチ指定された座標へ移動する仕組みを流用しています。
 *   画面外の遠い位置への指定はトラブルを生みやすいです。
 *   近めの座標を指定することを推奨します。
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 謝辞
 *   ご指導いただきました、jp_asty氏に感謝いたします。
 * 
 * 
 * @command moveEvewtPoint
 * @text イベントを指定座標へ移動
 * @desc イベントをマップ内の指定座標へ移動させます。
 *
 * @arg eventId
 * @text 移動するイベントID
 * @desc イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
 * @default 0
 * 
 * @arg mapX
 * @text 移動先X座標
 * @desc 移動先のマップ内X座標
 * @default 0
 * 
 * @arg mapY
 * @text 移動先Y座標
 * @desc 移動先のマップ内Y座標
 * @default 0
 * 
 * @arg waitOn
 * @text 完了までウェイト
 * @desc 移動が完了するまでウェイトする。
 * @type boolean
 * @on ウェイトする
 * @off ウェイトしない
 * @default false
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  PluginManager.registerCommand(pluginName, "moveEvewtPoint", function (args) {

    const eventId = Number(args.eventId);
    const mapX = args.mapX;
    const mapY = args.mapY;
    const waitOn = args.waitOn === "true";

    this.character(eventId).forceMoveRoute({
      "list": [{
        "code": 45, "parameters":
          ["this.moveStraight(this.findDirectionTo(" + mapX + ", " + mapY + ")); this._moveRoute.repeat = !this.pos(" + mapX + ", " + mapY + ");"]
      },
      { "code": 0 }],
      "repeat": true,
      "skippable": false
    })
    this._character = this.character(eventId);

    if (waitOn) {
      this.setWaitMode('route');
    }
  });

})();