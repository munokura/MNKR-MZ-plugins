/*
 * --------------------------------------------------
 * MNKR_CustomActorCommandMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CustomActorCommandMZ.js
 * @plugindesc 戦闘アクターコマンドウィンドウの表示を変更
 * @author munokura
 * 
 * @help
 * アクターコマンドウィンドウ（攻撃、スキル、防御、アイテム）表示を指定できます。
 * 
 * このプラグインは、基本的にアクターコマンドを変更する他のプラグインと競合します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param addAttack
 * @text 攻撃
 * @desc 攻撃コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * 
 * @param addSkill
 * @text スキル
 * @desc スキルコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param addGuard
 * @text 防御
 * @desc 防御コマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param addItem
 * @text アイテム
 * @desc アイテムコマンドの表示/非表示を指定します。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param commandCols
 * @text コマンド列数
 * @desc コマンドウィンドウの列数を指定します。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param commandWidth
 * @text ウィンドウ幅
 * @desc コマンドウィンドウの幅を指定します。無指定の場合-1。ツクールデフォルト値192
 * @type number
 * @min -1
 * @default -1
 * 
 * @param commandHeight
 * @text ウィンドウ行数
 * @desc コマンドウィンドウの行数を指定します。無指定の場合-1。ツクールデフォルト値4
 * @type number
 * @min -1
 * @default -1
 * 
 * @param commandX
 * @text ウィンドウ位置X
 * @desc コマンドウィンドウの位置を指定します。無指定(右下)の場合-1。ツクールデフォルト値616
 * @type number
 * @min -1
 * @default -1
 * 
 * @param commandY
 * @text ウィンドウ位置Y
 * @desc コマンドウィンドウの位置を指定します。無指定(右下)の場合-1。ツクールデフォルト値416
 * @type number
 * @min -1
 * @default -1
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_addAttack = parameters['addAttack'] === 'true';
    const PRM_addSkill = parameters['addSkill'] === 'true';
    const PRM_addGuard = parameters['addGuard'] === 'true';
    const PRM_addItem = parameters['addItem'] === 'true';
    const PRM_commandCols = Number(parameters['commandCols'] || 1);
    const PRM_commandWidth = Number(parameters['commandWidth'] || -1);
    const PRM_commandHeight = Number(parameters['commandHeight'] || -1);
    const PRM_commandX = Number(parameters['commandX'] || -1);
    const PRM_commandY = Number(parameters['commandY'] || -1);


    //-----------------------------------------------------------------------------
    // Scene_Battle

    Scene_Battle.prototype.actorCommandWindowRect = function () {
        let ww, wh, wx, wy;
        if (PRM_commandWidth > 0) {
            ww = PRM_commandWidth;
        } else {
            ww = 192;
        }
        if (PRM_commandHeight > 0) {
            wh = this.calcWindowHeight(PRM_commandHeight, true);
        } else {
            wh = this.windowAreaHeight();
        }
        wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    //-----------------------------------------------------------------------------
    // Window_ActorCommand

    Window_ActorCommand.prototype.maxCols = function () {
        return PRM_commandCols;
    };

    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            if (PRM_addAttack) {
                this.addAttackCommand();
            }
            if (PRM_addSkill) {
                this.addSkillCommands();
            }
            if (PRM_addGuard) {
                this.addGuardCommand();
            }
            if (PRM_addItem) {
                this.addItemCommand();
            }
        }
    };

    const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
    Window_ActorCommand.prototype.refresh = function () {
        _Window_ActorCommand_refresh.call(this);
        // 自動調整を試みたが、下のコマンドが表示されなくなってしまう
        // if (PRM_commandHeight < 0) {
        //     const lines = Math.ceil(this.maxItems() / PRM_commandCols);
        //     this.height = this.fittingHeight(lines);
        // }
        if (PRM_commandX > 0) {
            this.x = PRM_commandX;
        }
        if (PRM_commandY > 0) {
            this.y = PRM_commandY;
        }
    }


})();
