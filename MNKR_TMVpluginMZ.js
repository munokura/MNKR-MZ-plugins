/*
 * --------------------------------------------------
 * MNKR_TMVpluginMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/**
 * 2020/10/03 RPGツクールMZ用に移植 by ムノクラ
 */

//=============================================================================
// TMVplugin - レベル上限操作
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2015/12/29
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMVpluginMZ.js
 * @plugindesc ゲーム中にレベル上限を増やせます。
 * @author munokura
 *
 * @param maxMaxLevel
 * @text レベル上限
 * @type number
 * @min 1
 * @max 99
 * @desc 加算値込みのレベル上限
 * デフォルト: 99
 * @default 99
 *
 * @help
 * ゲーム中にレベル上限を増やせます。
 * RPGツクールMZの仕様上、増加後の最大レベルが99を越えると不具合が起こります。
 * 別プラグイン等で、レベル100以上を想定している場合は不明です。
 * 
 * 
 * プラグインコマンド:
 * gainMaxLevel 1 5
 *      # アクター1番のレベル上限を5増やす
 * 
 * getMaxLevel 2 3
 *      # アクター2番のレベル上限(加算値)を変数3番に代入
 * 
 * getMaxLevelPlus 2 3
 *      # アクター2番のレベル上限(加算値)を変数3番に代入
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * 
 * @command gainMaxLevel
 * @text アクターのレベル上限増加
 * @desc アクターのレベル上限を増やします。
 *
 * @arg ActorId
 * @text アクターID
 * @desc 対象のアクターIDを指定します。
 * @type actor
 * @default 1
 * 
 * @arg gain
 * @text 増加量
 * @desc レベル上限の増加量を指定します。
 * @type number
 * @default 1
 * 
 * 
 * @command getMaxLevel
 * @text 上限値を変数に代入
 * @desc アクターのレベル上限値を変数に代入します。
 *
 * @arg ActorId
 * @text アクターID
 * @desc 対象のアクターIDを指定します。
 * @type actor
 * @default 1
 * 
 * @arg VariableId
 * @text 変数ID
 * @desc 代入する変数IDを指定します。
 * @type variable
 * @default 1
 * 
 * 
 * @command getMaxLevelPlus
 * @text 上限加算値を変数に代入
 * @desc アクターのレベル上限加算値を変数に代入します。
 *
 * @arg ActorId
 * @text アクターID
 * @desc 対象のアクターIDを指定します。
 * @type actor
 * @default 1
 * 
 * @arg VariableId
 * @text 変数ID
 * @desc 代入する変数IDを指定します。
 * @type variable
 * @default 1
 */


(() => {

    "use strict";
    const parameters = PluginManager.parameters('MNKR_TMVpluginMZ');
    const maxMaxLevel = parameters['maxMaxLevel'];

    const pluginName = "MNKR_TMVpluginMZ";

    PluginManager.registerCommand(pluginName, "gainMaxLevel", args => {
        const actor = $gameActors.actor(Number(args.ActorId));
        const gain = Number(args.gain);
        if (actor) {
            actor.gainMaxLevel(gain);
        }
    });

    PluginManager.registerCommand(pluginName, "getMaxLevel", args => {
        const actor = $gameActors.actor(Number(args.ActorId));
        const variable = Number(args.VariableId);
        if (actor) {
            $gameVariables.setValue(variable, actor.maxLevel());
        }
    });

    PluginManager.registerCommand(pluginName, "getMaxLevelPlus", args => {
        const actor = $gameActors.actor(Number(args.ActorId));
        const variable = Number(args.VariableId);
        if (actor) {
            if (actor._maxLevelPlus === undefined) {
                actor.gainMaxLevel(0);
            }
            $gameVariables.setValue(variable, actor._maxLevelPlus);
        }
    });

    //-----------------------------------------------------------------------------
    // Game_Actor
    //

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _Game_Actor_initMembers.call(this);
        this._maxLevelPlus = 0;
    };

    const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
    Game_Actor.prototype.maxLevel = function () {
        if (this._maxLevelPlus === undefined) {
            this._maxLevelPlus = 0;
        }
        return _Game_Actor_maxLevel.call(this) + this._maxLevelPlus;
    };

    Game_Actor.prototype.gainMaxLevel = function (n) {
        if (this._maxLevelPlus === undefined) {
            this._maxLevelPlus = 0;
        }
        this._maxLevelPlus += n;
        var m = maxMaxLevel - this.actor().maxLevel;
        this._maxLevelPlus = this._maxLevelPlus.clamp(0, m);
    };

})();
