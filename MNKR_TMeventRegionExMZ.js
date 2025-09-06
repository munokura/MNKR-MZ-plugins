/*
 * --------------------------------------------------
 * MNKR_TMeventRegionExMZ.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMeventRegionExMZ.js
@plugindesc You can specify whether or not events are allowed to pass through in the region, and you can control the self-switch when passing through an event.
@author munokura
@license MIT License

@help
Usage:

You can specify whether an event is allowed or denied access by region, and
control switches when the event passes through.

You can change the movable region for each event using the memo tag.

Please use this after customizing the movable region group in the plugin
parameters.

For example, if you set the value of movableRegion1 to 1, 2, or 3 and add the
tag <movableRegion:1> to the event's memo field, the event will only be able
to move to regions 1 through 3.

Memo Tag (Event):

<movableRegion:1>
Sets the movable region group to 1.

<stepSwitchOnA:64>
When the event moves and steps on region 64, turn on self-switch A.

To use a self-switch other than A, use stepSwitchOnB.

<stepSwitchOffB:65>
When the event moves and steps on region 65, turn off self-switch B.

The above tags also work when written in the "Annotation" event command.
If there are tags in both the memo field and the annotation, the annotation
takes priority.

Plugin Command:

regionLocate 3 20
Moves the location of event 3 to any coordinate within region 20.

If the event number is 0, it targets the event itself that executed the
command; if it is -1, it targets the player.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).

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
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMeventRegionExMZ.js
@author tomoaky (改変:munokura)
@plugindesc リージョンでイベント通行可/不可の指定、イベント通行時にセルフスイッチ制御ができます。

@help
使い方:

  リージョンでイベント通行可/不可の指定、イベント通行時にスイッチ制御ができます。

  メモ欄タグを使って、イベント毎に移動可能なリージョンを変更できます。
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
            const re = /<([^<>:]+)(:?)([^>]*)>/g;
            const list = this.list();
            for (let i = 0; i < list.length; i++) {
                const command = list[i];
                if (command && command.code == 108 || command.code == 408) {
                    for (; ;) {
                        const match = re.exec(command.parameters[0]);
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
    const movableRegionType = [];
    for (let i = 1; i <= 10; i++) {
        movableRegionType[i] = parameters['movableRegion' + i].split(',');
    }

    //-----------------------------------------------------------------------------
    // Game_Map
    //

    Game_Map.prototype.regionPoints = function (regionId) {
        const result = [];
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
        const regionPoints = this.regionPoints(regionId);
        if (regionPoints.length === 0) return null;
        return regionPoints[Math.randomInt(regionPoints.length)];
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //

    const _Game_Event_isMapPassable = Game_Event.prototype.isMapPassable;
    Game_Event.prototype.isMapPassable = function (x, y, d) {
        const movableRegion = this.loadTagParam('movableRegion');
        if (movableRegion) {
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);
            const region = $gameMap.regionId(x2, y2);
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
            const key = [$gameMap.mapId(), this.eventId(), code];
            if (regionId && this.regionId() === +regionId) {
                $gameSelfSwitches.setValue(key, true);
            } else {
                regionId = this.loadTagParam('stepSwitchOff' + code);
                if (regionId && this.regionId() === +regionId) {
                    $gameSelfSwitches.setValue(key, false);
                }
            }
        }, this);
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "regionLocate", function (args) {
        const character = this.character(Number(args.EventId));
        if (character) {
            const point = $gameMap.regionPointRandom(Number(args.RegionId));
            if (point) character.locate(point.x, point.y);
        }
    });

})();