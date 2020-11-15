/*
 * --------------------------------------------------
 * MNKR_TMTurnMoveMZ Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
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

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTurnMoveMZ.js
 * @plugindesc プレイヤーの移動に合わせてローグライクな移動をするイベントを作成できます。
 * @author tomoaky (改変 munokura)
 * 
 * @help
 * 使い方:
 * 
 *   イベントのメモ、または実行内容の一番上にある注釈コマンド内に
 *   <turnMove> というタグを書き込むことで、そのイベントにだけ
 *   ターン移動を適用します。
 *   <turnMove> の代わりに <ターン移動> でもかまいません。
 * 
 *   ターン移動イベントの自律移動は以下のように設定してください。
 *     プレイヤーと同じ速度で移動する場合
 *       速度  4:標準速
 *       頻度  3:標準
 * 
 *     プレイヤーが１歩移動する間に２歩移動する場合
 *       速度  5:２倍速
 *       頻度  4:高
 * 
 *     プレイヤーが２歩移動する間に１歩移動する場合
 *       速度  4:標準速
 *       頻度  1:最低
 * 
 *   また、<turnMove> / <ターン移動> タグの代わりに
 *   <alwaysTurnMove> / <常にターン移動> タグを使用することで、
 *   イベントが画面外にいてもターン移動が実行されるようになります。
 * 
 * プラグインコマンド:
 * 
 *   stopTurnMove
 *     全イベントのターン移動を無効化します。
 *     (ゲーム開始時はターン移動が有効になっています)
 * 
 *   startTurnMove
 *     stopTurnMove で無効化したターン移動を有効化します。
 * 
 *   skipTurnMove
 *     プレイヤーを移動させずにターン移動イベントのみを移動させます、
 *     移動量はプレイヤーの１歩分です。
 * 
 * 
 * @command stopTurnMove
 * @text ターン移動を無効化
 * @desc 全イベントのターン移動を無効化します。
 * 
 * @command startTurnMove
 * @text ターン移動を有効化
 * @desc 無効化したターン移動を有効化します。
 * 
 * @command skipTurnMove
 * @text ターン移動イベントのみを移動
 * @desc プレイヤーを移動させずにターン移動イベントのみを移動させます。
 */

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