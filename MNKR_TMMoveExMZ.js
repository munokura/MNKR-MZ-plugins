/*
 * --------------------------------------------------
 * MNKR_TMMoveExMZ Ver.1.0.0
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
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMMoveExMZ.js
 * @author tomoaky (改変 munokura)
 * @plugindesc 壁衝突音やリージョンによる通行設定などの機能を追加します。
 * 
 * @param passableRegionId
 * @type number
 * @desc タイルに関係なく通行を可能にするリージョン番号
 * 初期値: 251
 * @default 251
 *
 * @param dontPassRegionId
 * @type number
 * @desc タイルに関係なく通行を不可にするリージョン番号
 * 初期値: 252
 * @default 252
 *
 * @param knockWallSe
 * @desc 壁衝突時に鳴らす効果音のファイル名
 * 初期値: Blow1
 * @default Blow1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param knockWallSeParam
 * @type string
 * @desc 壁衝突時に鳴らす効果音のパラメータ
 * 初期値: {"volume":90, "pitch":100}
 * @default {"volume":90, "pitch":100}
 * 
 * @param knockWallPan
 * @type number
 * @desc 壁衝突効果音の左右バランス
 * 初期値: 75
 * @default 75
 *
 * @param knockWallInterval
 * @type number
 * @desc 壁衝突効果音の再生間隔（フレーム数）
 * 初期値: 30
 * @default 30
 *
 * @param turnKeyCode
 * @type string
 * @desc その場で向き変更に使うキー
 * 初期値: S
 * @default S
 *
 * @param movableRegion1
 * @type string
 * @desc イベントの移動可能リージョングループ設定１番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion2
 * @type string
 * @desc イベントの移動可能リージョングループ設定２番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion3
 * @type string
 * @desc イベントの移動可能リージョングループ設定３番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion4
 * @type string
 * @desc イベントの移動可能リージョングループ設定４番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion5
 * @type string
 * @desc イベントの移動可能リージョングループ設定５番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion6
 * @type string
 * @desc イベントの移動可能リージョングループ設定６番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion7
 * @type string
 * @desc イベントの移動可能リージョングループ設定７番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion8
 * @type string
 * @desc イベントの移動可能リージョングループ設定８番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion9
 * @type string
 * @desc イベントの移動可能リージョングループ設定９番
 * 設定例: 1,2,3
 * @default 
 *
 * @param movableRegion10
 * @type string
 * @desc イベントの移動可能リージョングループ設定１０番
 * 設定例: 1,2,3
 * @default 
 *
 * @help
 * 使い方:
 *
 *   Ｓキーを押しながら方向キーを押すと、移動せずにプレイヤーの向きだけを
 *   変えることができます。マウス（タップ）操作の場合はプレイヤーがいる場所
 *   をクリックすることで、時計回りに９０度回転します。
 *
 *   その場で移動せずに向きを変更する機能で使用するキーは turnKeyCode の値を
 *   変更することで設定できます。ＸやＺなど標準機能で既に使用しているキーは
 *   設定しないでください。
 *
 *   メモ欄タグを使って、イベントごとに移動可能なリージョンを変更できます。
 *   プラグインパラメータで移動可能リージョングループをカスタマイズしてから
 *   利用してください。
 *   たとえば movableRegion1 の値を 1,2,3 にして、イベントのメモ欄に
 *   <movableRegion:1> というタグを書いた場合、そのイベントはリージョンが
 *   １～３番の場所のみ移動できるようになります。
 *
 *
 * メモ欄タグ（イベント）:
 * 
 *   <movableRegion:1>
 *     移動可能リージョングループを１番に設定する
 *
 *   <stepSwitchOnA:64>
 *     イベントが移動してリージョン６４番を踏むとセルフスイッチＡをオン
 *     Ａ以外のセルフスイッチを使用する場合は stepSwitchOnB のようにして
 *     ください。
 *
 *   <stepSwitchOffB:65>
 *     イベントが移動してリージョン６５番を踏むとセルフスイッチＢをオフ
 * 
 *   上記タグはイベントコマンド『注釈』に書き込むことでも機能します。
 *   メモ欄と注釈の両方にタグがあった場合、注釈の方が優先されます。
 *
 *
 * プラグインコマンド:
 * 
 *   regionLocate 3 20
 *     ３番のイベントをリージョン２０番が設定されている座標のどこかへ場所移動
 *     させます。
 *     イベント番号が 0 ならコマンドを実行したイベント自体、-1 ならプレイヤー
 *     を対象とします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command regionLocate
 * @text イベントを移動
 * @desc イベントをリージョンIDが設定されている座標のどこかへ場所移動させます。
 *
 * @arg EventId
 * @text イベントID
 * @desc 移動するイベントを指定します。
 * -1:プレイヤー / 0:実行イベント / 1以上:イベントID
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg RegionId
 * @text リージョンID
 * @desc 移動先の対象となるリージョンIDです。
 * @type number
 * @max 255
 * @default 1
 */

var TMPlugin = TMPlugin || {};
if (!TMPlugin.EventBase) {
    TMPlugin.EventBase = true;
    (() => {
        'use strict';

        const _Game_Event_setupPage = Game_Event.prototype.setupPage;
        Game_Event.prototype.setupPage = function() {
            _Game_Event_setupPage.call(this);
            if (this._pageIndex >= 0) this.loadCommentParams();
        };

        Game_Event.prototype.loadCommentParams = function() {
            this._commentParams = {};
            const re = /<([^<>:]+)(:?)([^>]*)>/g;
            const list = this.list();
            for (let i = 0; i < list.length; i++) {
                const command = list[i];
                if (command && command.code == 108 || command.code == 408) {
                    for (;;) {
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

        Game_Event.prototype.loadTagParam = function(paramName) {
            return this._commentParams[paramName] || this.event().meta[paramName];
        };

    })();
} // TMPlugin.EventBase

(() => {
    'use strict';

    const pluginName = 'MNKR_TMMoveExMZ';
    const parameters = PluginManager.parameters(pluginName);
    const passableRegionId = Number(parameters['passableRegionId'] || 251);
    const dontPassRegionId = Number(parameters['dontPassRegionId'] || 252);
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
    Game_Map.prototype.checkPassage = function(x, y, bit) {
        const regionId = this.regionId(x, y);
        if (regionId === passableRegionId) return true;
        if (regionId === dontPassRegionId) return false;
        return _Game_Map_checkPassage.call(this, x, y, bit);
    };

    Game_Map.prototype.regionPoints = function(regionId) {
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

    Game_Map.prototype.regionPointRandom = function(regionId) {
        const regionPoints = this.regionPoints(regionId);
        if (regionPoints.length === 0) return null;
        return regionPoints[Math.randomInt(regionPoints.length)];
    };

    //-----------------------------------------------------------------------------
    // Game_Player
    //

    const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(d) {
        _Game_Player_moveStraight.call(this, d);
        if (!this.isMovementSucceeded()) {
            const x2 = $gameMap.roundXWithDirection(this.x, d);
            const y2 = $gameMap.roundYWithDirection(this.y, d);
            if (this.isNormal() && ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2))) return;
            if (this.isInVehicle() && this.vehicle().isLandOk(this.x, this.y, this.direction())) return;
            const d2 = this.reverseDir(d);
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
    Game_Player.prototype.moveByInput = function() {
        if (!this.isMoving() && this.canMove()) {
            const direction = this.getInputDirection();
            if (Input.isPressed('turn') && direction > 0) {
                this.setDirection(direction);
                return;
            }
            if (TouchInput.isTriggered() && $gameTemp.isDestinationValid()) {
                const x = $gameTemp.destinationX();
                const y = $gameTemp.destinationY();
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
    Game_Event.prototype.isMapPassable = function(x, y, d) {
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
    Game_Event.prototype.moveStraight = function(d) {
        _Game_Event_moveStraight.call(this, d);
        ['A', 'B', 'C', 'D'].forEach(function(code) {
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

    PluginManager.registerCommand(pluginName, "regionLocate", function(args) {
        const character = this.character(Number(args.EventId));
        if (character) {
            const point = $gameMap.regionPointRandom(Number(args.RegionId));
            if (point) character.locate(point.x, point.y);
        }
    });

})();