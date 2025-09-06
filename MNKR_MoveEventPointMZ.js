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
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MoveEventPointMZ.js
@plugindesc Adds a plugin command that moves the specified event to the specified coordinates on the map.
@author example
@license MIT License

@help
Adds a plugin command that moves a specified event to a specified coordinate
on the map.
Similar to the player's touch movement, it moves while avoiding obstacles up
to the coordinate.

Event ID - -1: Player / 0: Executing Event / 1 or higher: Event ID on the map
X Coordinate - X coordinate within the map
Y Coordinate - Y coordinate within the map
Wait - Wait until completion/No

# Notes
This plugin uses the same mechanism used by RPG Maker's player to move to
specified coordinates by touch.
Specifying a location far off-screen is likely to cause problems.
It is recommended to specify closer coordinates.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).

# Acknowledgments
Thank you to jp_asty for your guidance.

@command moveEvewtPoint
@text Moves the event to the specified coordinates.
@desc Moves the event to the specified coordinates in the map.
@arg eventId
@text Event ID to move
@desc Event ID - -1: Player / 0: Execution event / 1 or more: Event ID on the map
@default 0
@arg mapX
@text Destination X coordinate
@desc Destination X coordinate on the map
@default 0
@arg mapY
@text Destination Y coordinate
@desc Destination Y coordinate on the map
@default 0
@arg waitOn
@text Wait until completion
@desc Wait until the movement is complete.
@type boolean
@on Wait
@off No wait
@default false
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MoveEventPointMZ.js
@plugindesc 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
@author munokura

@help
指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
プレイヤーのタッチ移動と同じで、座標までの障害物を避けて移動します。

イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
X座標 - マップ内のX座標
Y座標 - マップ内のY座標
ウェイト - 完了までウェイトする/しない


# 注意事項
ツクールのプレイヤーがタッチ指定された座標へ移動する仕組みを流用しています。
画面外の遠い位置への指定はトラブルを生みやすいです。
近めの座標を指定することを推奨します。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


# 謝辞
ご指導いただきました、jp_asty氏に感謝いたします。


@command moveEvewtPoint
@text イベントを指定座標へ移動
@desc イベントをマップ内の指定座標へ移動させます。

@arg eventId
@text 移動するイベントID
@desc イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
@default 0

@arg mapX
@text 移動先X座標
@desc 移動先のマップ内X座標
@default 0

@arg mapY
@text 移動先Y座標
@desc 移動先のマップ内Y座標
@default 0

@arg waitOn
@text 完了までウェイト
@desc 移動が完了するまでウェイトする。
@type boolean
@on ウェイトする
@off ウェイトしない
@default false
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