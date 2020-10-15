/*
 * --------------------------------------------------
 * MNKR_TMByeCommandMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - さよならコマンド
// バージョン: 1.0.0
// 最終更新日: 2017/01/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/tomoaky-MV-plugins/master/MNKR_TMByeCommandMZ.js
 * @author tomoaky (改変 munokura)
 * @plugindesc メニューコマンドに仲間と別れる機能を追加します。
 *
 * @param byeCommand
 * @text コマンド表示
 * @desc さよならコマンドのコマンド名。
 * 初期値: 別れる
 * @default 別れる
 *
 * @param byeSe
 * @text 効果音ファイル
 * @desc さよならコマンド実行時に鳴らす効果音のファイル名
 * 初期値: Decision1
 * @default Decision1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param byeSeParam
 * @text 効果音パラメータ
 * @desc さよならコマンド効果音のパラメータ
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 * 
 * @help
 * 使い方:
 *
 *   このプラグインを導入するとメニューコマンドに『別れる』が追加されます。
 *   パーティメンバーが 1 名以下の場合、コマンドを実行することはできません。
 *
 *
 * メモ欄タグ（アクター）:
 * 
 *   <disableBye>
 *     メモ欄にこのタグがついているアクターは別れることができません。
 *
 *
 * プラグインコマンド:
 * 
 *   disableBye
 *     さよならコマンドをメニューコマンドから使用不可にします。
 *
 *   enableBye
 *     使用不可にしたさよならコマンドを元に戻します。
 *
 *
 * @command disableBye
 * @text さよならコマンド無効化
 * @desc さよならコマンドをメニューコマンドから使用不可にします。
 *
 * 
 * @command enableBye
 * @text さよならコマンド有効化
 * @desc 使用不可にしたさよならコマンドを元に戻します。
 */

(() => {
    'use strict';

    const pluginName = 'MNKR_TMByeCommandMZ';
    const parameters = PluginManager.parameters(pluginName);
    const ByeCommand = String(parameters['byeCommand'] || '別れる');
    const ByeSe = JSON.parse(parameters['byeSeParam'] || '{}');
    ByeSe.name = String(parameters['byeSe'] || '');

    //-----------------------------------------------------------------------------
    // Game_System
    //

    Game_System.prototype.isByeEnabled = function() {
        if (this._byeEnabled == null) this._byeEnabled = true;
        return this._byeEnabled;
    };

    Game_System.prototype.disableBye = function() {
        this._byeEnabled = false;
    };

    Game_System.prototype.enableBye = function() {
        this._byeEnabled = true;
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "disableBye", args => {
        $gameSystem.disableBye();
    });

    PluginManager.registerCommand(pluginName, "enableBye", args => {
        $gameSystem.enableBye();
    });

    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        const enabled = this.isByeEnabled();
        this.addCommand(ByeCommand, 'bye', enabled);
        _Window_MenuCommand_addOriginalCommands.call(this);
    };

    Window_MenuCommand.prototype.isByeEnabled = function() {
        return $gameParty.size() >= 2 && $gameSystem.isByeEnabled();
    };

    //-----------------------------------------------------------------------------
    // Window_MenuStatus
    //

    Window_MenuStatus.prototype.setByeMode = function(byeMode) {
        this._byeMode = byeMode;
    };

    const _Window_MenuStatus_processOk = Window_MenuStatus.prototype.processOk;
    Window_MenuStatus.prototype.processOk = function() {
        if (this._byeMode) {
            Window_Selectable.prototype.processOk.call(this);
        } else {
            _Window_MenuStatus_processOk.call(this);
        }
    };

    const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
        if (this._byeMode) {
            const actor = $gameParty.members()[this.index()];
            return actor && !actor.actor().meta.disableBye;
        } else {
            return _Window_MenuStatus_isCurrentItemEnabled.call(this);
        }
    };

    const _Window_MenuStatus_playOkSound = Window_Selectable.prototype.playOkSound;
    Window_Selectable.prototype.playOkSound = function() {
        if (this._byeMode) {
            AudioManager.playSe(ByeSe);
        } else {
            _Window_MenuStatus_playOkSound.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Menu
    //

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('bye', this.commandBye.bind(this));
    };

    Scene_Menu.prototype.commandBye = function() {
        this._statusWindow.setByeMode(true);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok', this.onByeOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onByeCancel.bind(this));
    };

    Scene_Menu.prototype.onByeOk = function() {
        const index = this._statusWindow.index();
        const actor = $gameParty.members()[index];
        $gameParty.removeActor(actor.actorId());
        this._statusWindow.refresh();
        const n = $gameParty.size();
        if (n === 1) {
            this._commandWindow.refresh();
            this.onByeCancel();
        } else {
            if (this._statusWindow.index() >= n) {
                this._statusWindow.select(n - 1);
            }
            this._statusWindow.activate();
        }
    };

    Scene_Menu.prototype.onByeCancel = function() {
        this._statusWindow.deselect();
        this._statusWindow.setByeMode(false);
        this._commandWindow.activate();
    };

})();