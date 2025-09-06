/*
 * --------------------------------------------------
 * MNKR_TMTurnMoveMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTurnMoveMZ.js
@plugindesc You can create events that move in a roguelike fashion as the player moves.
@author munokura
@license MIT License

@help
Usage:

By adding the <turnMove> tag to an event's notes or the annotation command at
the top of its execution,
turn movement will be applied only to that event.
You can also use <TurnMove> instead of <turnMove>.

Set the autonomous movement for turn movement events as follows:

To move at the same speed as the player
Speed 4: Standard
Frequency 3: Standard

To move two steps for every one step the player takes
Speed 5: Double Speed
Frequency 4: High

To move one step for every two steps the player takes
Speed 4: Standard
Frequency 1: Lowest

Also, by using the <alwaysTurnMove> tag instead of the <turnMove> tag, turn
movement will be performed even if the event is off-screen.

Plugin Command:

stopTurnMove
Disables turn movement for all events.
(Turn movement is enabled at the start of the game.)

startTurnMove
Enables turn movement that was disabled with stopTurnMove.

skipTurnMove
Moves only turn movement events without moving the player.
The movement amount is one player step.

# Contact Information
This is a plugin originally created for RPG Maker MV ported for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on usage (commercial, R18+, etc.).

@command stopTurnMove
@text Disable turn movement
@desc Disables turn movement for all events.

@command startTurnMove
@text Enable Turn Movement
@desc Enables a disabled turn movement.

@command skipTurnMove
@text Move only turn movement events
@desc It does not move the player, but only the turn movement events.
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTurnMoveMZ.js
@plugindesc プレイヤーの移動に合わせてローグライクな移動をするイベントを作成できます。
@author tomoaky (改変:munokura)

@help
使い方:

  イベントのメモ、または実行内容の一番上にある注釈コマンド内に
  <turnMove> というタグを書き込むことで、そのイベントにだけ
  ターン移動を適用します。
  <turnMove> の代わりに <ターン移動> でもかまいません。

  ターン移動イベントの自律移動は以下のように設定してください。
    プレイヤーと同じ速度で移動する場合
      速度  4:標準速
      頻度  3:標準

    プレイヤーが１歩移動する間に２歩移動する場合
      速度  5:２倍速
      頻度  4:高

    プレイヤーが２歩移動する間に１歩移動する場合
      速度  4:標準速
      頻度  1:最低

  また、<turnMove> / <ターン移動> タグの代わりに
  <alwaysTurnMove> / <常にターン移動> タグを使用することで、
  イベントが画面外にいてもターン移動が実行されるようになります。

プラグインコマンド:

  stopTurnMove
    全イベントのターン移動を無効化します。
    (ゲーム開始時はターン移動が有効になっています)

  startTurnMove
    stopTurnMove で無効化したターン移動を有効化します。

  skipTurnMove
    プレイヤーを移動させずにターン移動イベントのみを移動させます、
    移動量はプレイヤーの１歩分です。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@command stopTurnMove
@text ターン移動を無効化
@desc 全イベントのターン移動を無効化します。

@command startTurnMove
@text ターン移動を有効化
@desc 無効化したターン移動を有効化します。

@command skipTurnMove
@text ターン移動イベントのみを移動
@desc プレイヤーを移動させずにターン移動イベントのみを移動させます。
*/

//=============================================================================
// TMPlugin - ターン移動
// バージョン: 1.0.2
// 最終更新日: 2017/10/08
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================



var Imported = Imported || {};
Imported.TMTurnMove = true;
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

    //-----------------------------------------------------------------------------
    // Game_Map
    //

    Game_Map.prototype.updateTurnMove = function () {
        let events = this.events();
        for (let i = 0; i < events.length; i++) {
            events[i].updateTurnMove();
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Player
    //

    Game_Player.prototype.disableTurnMove = function () {
        this._turnMoveEnabled = false;
    };

    Game_Player.prototype.enableTurnMove = function () {
        this._turnMoveEnabled = true;
    };

    const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function () {
        _Game_Player_increaseSteps.call(this);
        if (this._turnMoveEnabled == null) this._turnMoveEnabled = true;
        if (this._turnMoveEnabled) $gameMap.updateTurnMove();
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //

    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function () {
        _Game_Event_setupPage.call(this);
        if (this._pageIndex >= 0) {
            this._alwaysTurnMove = this.loadTagParam('alwaysTurnMove') ||
                this.loadTagParam('常にターン移動');
            this._turnMove = this._alwaysTurnMove || this.loadTagParam('turnMove') ||
                this.loadTagParam('ターン移動');
            this._turnMoveCount = 0;
        }
    };

    const _Game_Event_isNearTheScreen = Game_Event.prototype.isNearTheScreen;
    Game_Event.prototype.isNearTheScreen = function () {
        if (this._alwaysTurnMove) return true;
        return Game_Character.prototype.isNearTheScreen.call(this);
    };

    const _Game_Event_checkStop = Game_Event.prototype.checkStop;
    Game_Event.prototype.checkStop = function (threshold) {
        if (this._turnMove) {
            if (this._turnMoveCount == null) this._turnMoveCount = 0;
            if (this._turnMoveFlag) {
                this._turnMoveCount += 60;
                this._turnMoveFlag = false;
            }
            if (this._turnMoveCount < threshold) return false;
            this._turnMoveCount -= threshold;
            return true;
        } else {
            return _Game_Event_checkStop.call(this, threshold);
        }
    };

    Game_Event.prototype.updateTurnMove = function () {
        this._turnMoveFlag = true;
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "stopTurnMove", () => {
        $gamePlayer.disableTurnMove();
    });

    PluginManager.registerCommand(pluginName, "startTurnMove", () => {
        $gamePlayer.enableTurnMove();
    });

    PluginManager.registerCommand(pluginName, "skipTurnMove", () => {
        $gameMap.updateTurnMove();
    });

})();