/*
 * --------------------------------------------------
 * MNKR_TMMoveExMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
//=============================================================================
// TMPlugin - 移動機能拡張
// バージョン: 1.3.1
// 最終更新日: 2017/06/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMMoveExMZ.js
@plugindesc Adds features such as wall collision sounds and region-based passage settings.
@author tomoaky,munokura
@license MIT License

@help
How to Use:

Hold down the S key and press the directional keys to change the player's
orientation without moving. When using mouse (tap) controls, click where the
player is to rotate 90 degrees clockwise.

You can set the key used to change orientation without moving by changing the
value of turnKeyCode. Do not set keys already used for standard functions,
such as X or Z.

You can change the movable region for each event using the memo field tag.

Please use this after customizing the movable region group in the plugin
parameters.

For example, if you set the value of movableRegion1 to 1, 2, or 3 and write
the tag <movableRegion:1> in the event's memo field, that event will only be
able to move to regions 1 through 3.

Memo Tag (Event):

<movableRegion:1>
Set the movable region group to 1.

<stepSwitchOnA:64>
When the event moves and steps on region 64, turn on self-switch A.

To use a self-switch other than A, use stepSwitchOnB.

<stepSwitchOffB:65>
When the event moves and steps on region 65, turn off self-switch B.

The above tags also work by adding them to the "Note" event command.
If there are tags in both the memo and notes, the note takes priority.

Plugin Command:

regionLocate 3 20
Moves event 3 to a location somewhere within the coordinates of region 20.
An event number of 0 targets the event that executed the command, while an
event number of -1 targets the player.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
MZ.
Please contact the original developer for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param passableRegionId
@text Passable Region
@desc Region number that allows passage regardless of tile
@type number
@default 251

@param dontPassRegionId
@text Impassable Regions
@desc Region number to block passage regardless of tile
@type number
@default 252

@param knockWallSe
@text SE when colliding with a wall
@desc The file name of the sound effect that plays when hitting a wall
@type file
@default Blow1
@require 1
@dir audio/se/

@param knockWallSeParam
@text SE parameters when colliding with a wall
@desc Parameters for the sound effect that plays when hitting a wall
@type string
@default {"volume":90, "pitch":100}

@param knockWallPan
@text Wall collision SE phase
@desc Left/right balance of wall collision sound effects
@type number
@default 75

@param knockWallInterval
@text Wall collision SE playback interval
@desc Wall collision sound effect playback interval (number of frames)
@type number
@default 30

@param turnKeyCode
@text Orientation change key
@desc Keys used to change orientation on the fly
@type string
@default S

@param movableRegion1
@text Movable Region Group 1
@desc Event movable region group setting No. 1
@type string

@param movableRegion2
@text Movable Region Group 2
@desc Event movable region group setting No. 2
@type string

@param movableRegion3
@text Movable Region Group 3
@desc Event movable region group setting 3
@type string

@param movableRegion4
@text Movable Region Group 4
@desc Event movable region group setting 4
@type string

@param movableRegion5
@text Movable Region Group 5
@desc Event movable region group setting 5
@type string

@param movableRegion6
@text Movable Region Group 6
@desc Event movable region group setting No. 6
@type string

@param movableRegion7
@text Movable Region Group 7
@desc Event movable region group setting No. 7
@type string

@param movableRegion8
@text Movable Region Group 8
@desc Event movable region group setting No. 8
@type string

@param movableRegion9
@text Movable Region Group 9
@desc Event movable region group setting No. 9
@type string

@param movableRegion10
@text Movable Region Group 10
@desc Event movable region group setting 10
@type string

@command regionLocate
@text Move an event
@desc Moves the event to a location somewhere within the coordinates of the region ID.
@arg EventId
@text Event ID
@desc Specifies the event to move.
@type number
@default 0
@min -1
@arg RegionId
@text Region ID
@desc The destination region ID.
@type number
@default 1
@max 255
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMMoveExMZ.js
@author tomoaky (改変:munokura)
@plugindesc 壁衝突音やリージョンによる通行設定などの機能を追加します。

@help
使い方:

  Sキーを押しながら方向キーを押すと、移動せずにプレイヤーの向きだけを
  変えることができます。マウス(タップ)操作の場合はプレイヤーがいる場所
  をクリックすることで、時計回りに90度回転します。

  その場で移動せずに向きを変更する機能で使用するキーは turnKeyCode の値を
  変更することで設定できます。XやZなど標準機能で既に使用しているキーは
  設定しないでください。

  メモ欄タグを使って、イベントごとに移動可能なリージョンを変更できます。
  プラグインパラメータで移動可能リージョングループをカスタマイズしてから
  利用してください。
  たとえば movableRegion1 の値を 1,2,3 にして、イベントのメモ欄に
  <movableRegion:1> というタグを書いた場合、そのイベントはリージョンが
  1～3番の場所のみ移動できるようになります。


メモ欄タグ(イベント):

  <movableRegion:1>
    移動可能リージョングループを1番に設定する

  <stepSwitchOnA:64>
    イベントが移動してリージョン64番を踏むとセルフスイッチAをオン
    A以外のセルフスイッチを使用する場合は stepSwitchOnB のようにして
    ください。

  <stepSwitchOffB:65>
    イベントが移動してリージョン65番を踏むとセルフスイッチBをオフ

  上記タグはイベントコマンド『注釈』に書き込むことでも機能します。
  メモ欄と注釈の両方にタグがあった場合、注釈の方が優先されます。


プラグインコマンド:

  regionLocate 3 20
    3番のイベントをリージョン20番が設定されている座標のどこかへ場所移動
    させます。
    イベント番号が 0 ならコマンドを実行したイベント自体、-1 ならプレイヤー
    を対象とします。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param passableRegionId
@text 通行可能リージョン
@desc タイルに関係なく通行を可能にするリージョン番号
初期値: 251
@default 251
@type number

@param dontPassRegionId
@text 通行不可リージョン
@desc タイルに関係なく通行を不可にするリージョン番号
初期値: 252
@default 252
@type number

@param knockWallSe
@text 壁衝突時SE
@desc 壁衝突時に鳴らす効果音のファイル名
初期値: Blow1
@default Blow1
@require 1
@dir audio/se/
@type file

@param knockWallSeParam
@text 壁衝突時SEパラメータ
@desc 壁衝突時に鳴らす効果音のパラメータ
初期値: {"volume":90, "pitch":100}
@default {"volume":90, "pitch":100}
@type string

@param knockWallPan
@text 壁衝突SE位相
@desc 壁衝突効果音の左右バランス
初期値: 75
@default 75
@type number

@param knockWallInterval
@text 壁衝突SE再生間隔
@desc 壁衝突効果音の再生間隔（フレーム数）
初期値: 30
@default 30
@type number

@param turnKeyCode
@text 向き変更キー
@desc その場で向き変更に使うキー
初期値: S
@default S
@type string

@param movableRegion1
@text 移動可リージョングループ1
@desc イベントの移動可能リージョングループ設定１番
設定例: 1,2,3
@default
@type string

@param movableRegion2
@text 移動可リージョングループ2
@desc イベントの移動可能リージョングループ設定２番
設定例: 1,2,3
@default
@type string

@param movableRegion3
@text 移動可リージョングループ3
@desc イベントの移動可能リージョングループ設定３番
設定例: 1,2,3
@default
@type string

@param movableRegion4
@text 移動可リージョングループ4
@desc イベントの移動可能リージョングループ設定４番
設定例: 1,2,3
@default
@type string

@param movableRegion5
@text 移動可リージョングループ5
@desc イベントの移動可能リージョングループ設定５番
設定例: 1,2,3
@default
@type string

@param movableRegion6
@text 移動可リージョングループ6
@desc イベントの移動可能リージョングループ設定６番
設定例: 1,2,3
@default
@type string

@param movableRegion7
@text 移動可リージョングループ7
@desc イベントの移動可能リージョングループ設定７番
設定例: 1,2,3
@default
@type string

@param movableRegion8
@text 移動可リージョングループ8
@desc イベントの移動可能リージョングループ設定８番
設定例: 1,2,3
@default
@type string

@param movableRegion9
@text 移動可リージョングループ9
@desc イベントの移動可能リージョングループ設定９番
設定例: 1,2,3
@default
@type string

@param movableRegion10
@text 移動可リージョングループ10
@desc イベントの移動可能リージョングループ設定１０番
設定例: 1,2,3
@default
@type string


@command regionLocate
@text イベントを移動
@desc イベントをリージョンIDが設定されている座標のどこかへ場所移動させます。

@arg EventId
@text イベントID
@desc 移動するイベントを指定します。
-1:プレイヤー / 0:実行イベント / 1以上:イベントID
@type number
@min -1
@default 0

@arg RegionId
@text リージョンID
@desc 移動先の対象となるリージョンIDです。
@type number
@max 255
@default 1
*/


var Imported = Imported || {};
Imported.TMMoveEx = true;
var TMPlugin = TMPlugin || {};

if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (() => {
    'use strict';

    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function () {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function () {
      this._commentParams = {};
      let re = /<([^<>:]+)(:?)([^>]*)>/g;
      let list = this.list();
      for (let i = 0; i < list.length; i++) {
        let command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (; ;) {
            let match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function (paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

(() => {
  'use strict';

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const passableRegionId = +(parameters['passableRegionId'] || 251);
  const dontPassRegionId = +(parameters['dontPassRegionId'] || 252);
  const knockWallSe = JSON.parse(parameters['knockWallSeParam'] || '{}');
  knockWallSe.name = parameters['knockWallSe'] || '';
  const knockWallPan = +(parameters['knockWallPan'] || 75);
  const knockWallInterval = +(parameters['knockWallInterval'] || 30);
  const movableRegionType = [];
  for (let i = 1; i <= 10; i++) {
    movableRegionType[i] = parameters['movableRegion' + i].split(',');
  }

  //-----------------------------------------------------------------------------
  // Input
  //

  Input.keyMapper[parameters['turnKeyCode'].charCodeAt()] = 'turn';

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
  Game_Map.prototype.checkPassage = function (x, y, bit) {
    let regionId = this.regionId(x, y);
    if (regionId === passableRegionId) return true;
    if (regionId === dontPassRegionId) return false;
    return _Game_Map_checkPassage.call(this, x, y, bit);
  };

  Game_Map.prototype.regionPoints = function (regionId) {
    let result = [];
    for (let x = 0; x < this.width(); x++) {
      for (let y = 0; y < this.height(); y++) {
        if (this.regionId(x, y) === regionId && this.eventIdXy(x, y) === 0) {
          result.push(new Point(x, y));
        }
      }
    }
    return result;
  };

  Game_Map.prototype.regionPointRandom = function (regionId) {
    let regionPoints = this.regionPoints(regionId);
    if (regionPoints.length === 0) return null;
    return regionPoints[Math.randomInt(regionPoints.length)];
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
  Game_Player.prototype.moveStraight = function (d) {
    _Game_Player_moveStraight.call(this, d);
    if (!this.isMovementSucceeded()) {
      let x2 = $gameMap.roundXWithDirection(this.x, d);
      let y2 = $gameMap.roundYWithDirection(this.y, d);
      if (this.isNormal() && ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2))) return;
      if (this.isInVehicle() && this.vehicle().isLandOk(this.x, this.y, this.direction())) return;
      let d2 = this.reverseDir(d);
      if (!$gameMap.isPassable(this.x, this.y, d) || !$gameMap.isPassable(x2, y2, d2)) {
        this._knockWallCount = this._knockWallCount == null ? 0 : this._knockWallCount;
        if (this._knockWallCount + knockWallInterval <= Graphics.frameCount ||
          this._lastKnockWallDir !== d) {
          if (d === 4) {
            knockWallSe.pan = -knockWallPan;
          } else if (d === 6) {
            knockWallSe.pan = knockWallPan;
          } else {
            knockWallSe.pan = 0;
          }
          AudioManager.playSe(knockWallSe);
          this._knockWallCount = Graphics.frameCount;
          this._lastKnockWallDir = d;
        }
      }
    }
  };

  const _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
  Game_Player.prototype.moveByInput = function () {
    if (!this.isMoving() && this.canMove()) {
      let direction = this.getInputDirection();
      if (Input.isPressed('turn') && direction > 0) {
        this.setDirection(direction);
        return;
      }
      if (TouchInput.isTriggered() && $gameTemp.isDestinationValid()) {
        let x = $gameTemp.destinationX();
        let y = $gameTemp.destinationY();
        if (this.pos(x, y)) {
          this.turnRight90();
          return;
        }
      }
    }
    _Game_Player_moveByInput.call(this);
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  const _Game_Event_isMapPassable = Game_Event.prototype.isMapPassable;
  Game_Event.prototype.isMapPassable = function (x, y, d) {
    let movableRegion = this.loadTagParam('movableRegion');
    if (movableRegion) {
      let x2 = $gameMap.roundXWithDirection(x, d);
      let y2 = $gameMap.roundYWithDirection(y, d);
      let region = $gameMap.regionId(x2, y2);
      return movableRegionType[+movableRegion].indexOf('' + region) >= 0;
    } else {
      return _Game_Event_isMapPassable.call(this, x, y, d);
    }
  };

  const _Game_Event_moveStraight = Game_Event.prototype.moveStraight;
  Game_Event.prototype.moveStraight = function (d) {
    _Game_Event_moveStraight.call(this, d);
    ['A', 'B', 'C', 'D'].forEach(function (code) {
      let regionId = this.loadTagParam('stepSwitchOn' + code);
      if (regionId && this.regionId() === +regionId) {
        let key = [$gameMap.mapId(), this.eventId(), code];
        $gameSelfSwitches.setValue(key, true);
      } else {
        regionId = this.loadTagParam('stepSwitchOff' + code);
        if (regionId && this.regionId() === +regionId) {
          let key = [$gameMap.mapId(), this.eventId(), code];
          $gameSelfSwitches.setValue(key, false);
        }
      }
    }, this);
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "regionLocate", function (args) {
    const arr = [args.EventId, args.RegionId];
    let character = this.character(+arr[0]);
    if (character) {
      let point = $gameMap.regionPointRandom(+arr[1]);
      if (point) character.locate(point.x, point.y);
    }
  });

})();