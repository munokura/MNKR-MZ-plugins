//=============================================================================
// Mihil_Window_EventSkill.js
//=============================================================================
// Copyright (c) 2018- mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc 「アイテム選択の処理」のようにスキルを選択してIDを変数に渡す
 * @target MZ
 * @author mihiraghi
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * 
 * @command setSkillId
 * @text スキル選択ID
 * @desc 選択したスキルIDを返します
 * 
 * @arg variable
 * @type variable
 * @text 代入変数
 * @desc スキルIdを代入する変数
 * @default 1
 * 
 * @arg actorId
 * @type actor
 * @text 選択アクター
 * @desc スキルを選択するアクター
 * @default 1
 * 
 * @arg actorIdVariable
 * @text アクター指定変数
 * @type variable
 * @desc スキルを選択するアクターIDが入っている変数。これが指定されている場合、選択アクターの項目は無視されます。
 * @default 1
 *
 * @command setSkillItem
 * @text スキル選択オブジェクト
 * @desc 選択したスキル実態を返します
 * 
 * @arg variable
 * @type variable
 * @text 代入変数
 * @desc スキルオブジェクトを代入する変数
 * @default 1
 * 
 * @arg actorId
 * @type actor
 * @text 選択アクター
 * @desc スキルを選択するアクター
 * @default 1
 * 
 * @arg actorIdVariable
 * @text アクター指定変数
 * @type variable
 * @desc スキルを選択するアクターIDが入っている変数。これが指定されている場合、選択アクターの項目は無視されます。
 * @default 1
 *
 * @help 
 * 
 * プラグインコマンドで
 * アクターのIDと代入する変数のIDを指定します。
 * setSkillIdは選択したスキルのIDを
 * setSkillItemは選択したスキルのデータベースオブジェクトを
 * それぞれ返します。
 * 
 * versions
 * 1.3.1  PluginManagerEx.registerCommandの書き方を修正(@Sigureyaさんアドバイスありがとうございました)
 * 1.3.0  スキル選択の処理を待つ処理ができていなかった。スクリプト直接呼び出しだと待てないのでスクリプト方式を廃止。
 * 1.2.0  Idを返すsetSkillIdとオブジェクトを返すsetSkillItemとにプラグインコマンドを分離
 *        プラグイン名を変更
 * 1.1.0  プラグインコマンドを追加
 * 1.0.0  仮配布
 * 
 */
//-----------------------------------------------------------------------------
(() => {
    'use strict'

    const currentScript = document.currentScript;
    PluginManagerEx.registerCommand(currentScript, "setSkillId", function (args) {
        // start munokura 機能追加
        if (args.actorIdVariable > 0) {
            args.actor = $gameVariables.value(args.actorIdVariable);
        }
        //end munokura
        this.setSkillChoice([args.variable, args.actor]);
    });
    PluginManagerEx.registerCommand(currentScript, "setSkillItem", function (args) {
        // start munokura 機能追加
        if (args.actorIdVariable > 0) {
            args.actor = $gameVariables.value(args.actorIdVariable);
        }
        //end munokura
        this.setSkillChoice([args.variable, args.actor, true]);
    });


    class Window_EventSkill extends Window_EventItem {
        constructor(rect) {
            super(rect)
        }
        makeItemList() {
            const actorId = $gameMessage.skillChoiceActorId();
            this._data = $gameActors.actor(actorId).skills()
        };
        needsNumber() {
            return false
        }
        onOk() {
            const item = this.item();
            const itemId = item ? item.id : 0;
            const vId = $gameMessage.skillChoiceVariableId();
            // if ($gameMessage.skillChoiceReturnItem) {    // コマンドに関わらず変数にオブジェクトが代入されるバグ修正
            if ($gameMessage._skillChoiceReturnItem) {
                $gameVariables.setValue(vId, item);
            } else {
                $gameVariables.setValue(vId, itemId);
            }
            this._messageWindow.terminateMessage();
            this.close();
        }
        onCancel() {
            $gameVariables.setValue($gameMessage.skillChoiceVariableId(), 0);
            this._messageWindow.terminateMessage();
            this.close();
        }
    }

    const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function () {
        this.createEventSkillWindow();
        _Scene_Message_createAllWindows.apply(this, arguments)
    }
    Scene_Message.prototype.createEventSkillWindow = function () {
        const rect = this.eventItemWindowRect();
        this._eventSkillWindow = new Window_EventSkill(rect);
        this.addWindow(this._eventSkillWindow);
        // console.log(this.children)
    };
    const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
    Scene_Message.prototype.associateWindows = function () {
        _Scene_Message_associateWindows.apply(this, arguments);
        const messageWindow = this._messageWindow;
        messageWindow.setEventSkillWindow(this._eventSkillWindow);
        this._eventSkillWindow.setMessageWindow(messageWindow);
    }

    Window_Message.prototype.setEventSkillWindow = function (eventSkillWindow) {
        this._eventSkillWindow = eventSkillWindow;
    };
    const _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    Window_Message.prototype.isAnySubWindowActive = function () {
        return _Window_Message_isAnySubWindowActive.apply(this, arguments) || this._eventSkillWindow.active;
    }
    const _Window_Message_startInput = Window_Message.prototype.startInput;
    Window_Message.prototype.startInput = function () {
        if ($gameMessage.isSkillChoice()) {
            this._eventSkillWindow.start();
            return true;
        }
        return _Window_Message_startInput.apply(this, arguments)
    }

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        _Game_Message_clear.apply(this, arguments)
        this._skillChoiceVariableId = 0;
        this._skillChoiceReturnItem = null;
    }

    Game_Message.prototype.isSkillChoice = function () {
        return this._skillChoiceVariableId > 0;
    };
    const _Game_Message_isBusy = Game_Message.prototype.isBusy
    Game_Message.prototype.isBusy = function () {
        return _Game_Message_isBusy.apply(this, arguments) || this.isSkillChoice()
    }

    Game_Message.prototype.skillChoiceVariableId = function () {
        return this._skillChoiceVariableId;
    };

    Game_Message.prototype.skillChoiceReturnItem = function () {
        return this._skillChoiceReturnItem;
    };

    Game_Message.prototype.skillChoiceActorId = function () {
        return this._skillChoiceActorId;
    };
    /**
     * @param {boolean} isItem skill実態そのものを返すかどうか。falseでスキルIDを返す
     */
    Game_Message.prototype.setSkillChoice = function (variableId, actorId = 1, isItem = null) {
        this._skillChoiceVariableId = variableId;
        this._skillChoiceActorId = actorId;
        this._skillChoiceReturnItem = isItem;
    };

    // Select Skill
    Game_Interpreter.prototype.setSkillChoice = function (params) {
        if ($gameMessage.isBusy()) {
            return false;
        }
        $gameMessage.setSkillChoice(...params);
        this.setWaitMode("message");
        return true;
    };

    // MessageWindowHidden.js対応 https://github.com/triacontane/RPGMakerMV/blob/mz_master/MessageWindowHidden.js
    var _Window_EventSkill_update = Window_EventSkill.prototype.update;
    Window_EventSkill.prototype.update = function () {
        if (!this.visible) return;
        _Window_EventSkill_update.apply(this, arguments);
    };

    window[Window_EventSkill.name] = Window_EventSkill;

})();
