/*
 * --------------------------------------------------
 * MNKR_TMItemRestrictionMZ Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - アイテム制約拡張
// バージョン: 1.0.2
// 最終更新日: 2017/02/14
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMItemRestrictionMZ.js
 * @author tomoaky (改変 munokura)
 * @plugindesc アイテムの対象アクターに関する制約を追加します。
 *
 * @help
 * 使い方:
 * 
 *   アイテムのメモ欄にタグをつけることで対象として選択できるアクターを
 *   制限できるようになります。
 * 
 * 
 * メモ欄タグ (アイテム):
 * 
 *   <justOnce>
 *     メモ欄にこのタグがついているアイテムは、同じアクターに対して 1 回しか
 *     使えなくなります。
 * 
 *   <targetActor:1 2>
 *     メモ欄にこのタグがついているアイテムは、1 番と 2 番のアクターにのみ
 *     使用できるようになります。
 * 
 * 
 * プラグインコマンド:
 * 
 *   clearItemRestriction 1
 *     アクター 1 番のアイテム使用履歴を初期化し、<justOnce> タグのついた
 *     アイテムを再び使用できる状態にします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command clearItemRestriction
 * @text アイテム使用履歴初期化
 * @desc アクターのアイテム使用履歴を初期化します。
 *
 * @arg actorId
 * @text アクターID
 * @desc 使用履歴を初期化するアクター。
 * @type actor
 * @default 0
 */

(() => {

    "use strict";
    const pluginName = "MNKR_TMItemRestrictionMZ";

    //-----------------------------------------------------------------------------
    // Game_BattlerBase
    //

    Game_BattlerBase.prototype.clearItemRestriction = function() {
        this._alreadyUsed = [];
    };

    Game_BattlerBase.prototype.alreadyUsed = function() {
        if (this._alreadyUsed == null) this.clearItemRestriction();
        return this._alreadyUsed;
    };

    Game_BattlerBase.prototype.isAlreadyUsed = function(item) {
        return this.alreadyUsed().contains(item.id);
    };

    Game_BattlerBase.prototype.setAlreadyUsed = function(item) {
        this.alreadyUsed().push(item.id);
    };

    //-----------------------------------------------------------------------------
    // Game_Actor
    //

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        this.clearItemRestriction();
    };

    //-----------------------------------------------------------------------------
    // Game_Action
    //

    const _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        if (this.isAlreadyUsed(target)) return false;
        if (!this.isTargetActorValid(target)) return false;
        return _Game_Action_testApply.call(this, target);
    };

    Game_Action.prototype.isAlreadyUsed = function(target) {
        const item = this.item();
        return this.isItem() && item.meta.justOnce && target.isAlreadyUsed(item);
    };

    Game_Action.prototype.isTargetActorValid = function(target) {
        if (target.isActor() && this.isItem()) {
            const item = this.item();
            if (item.meta.targetActor) {
                const targetActors = item.meta.targetActor.split(' ').map(Number);
                return targetActors.contains(target.actorId());
            }
        }
        return true;
    };

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        if (target.result().isHit()) this.setAlreadyUsed(target);
    };

    Game_Action.prototype.setAlreadyUsed = function(target) {
        const item = this.item();
        if (this.isItem() && item.meta.justOnce) target.setAlreadyUsed(item);
    };

    //-----------------------------------------------------------------------------
    // PluginManager
    //

    PluginManager.registerCommand(pluginName, "clearItemRestriction", args => {
        const actor = $gameActors.actor(Number(args.actorId));
        if (actor) actor.clearItemRestriction();
    });

    //-----------------------------------------------------------------------------
    // Window_BattleActor
    //

    Window_BattleActor.prototype.playOkSound = function() {};

    Window_BattleActor.prototype.playBuzzerSound = function() {};

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //

    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const action = BattleManager.inputtingAction();
        const actor = this._actorWindow.actor(this._actorWindow.index());
        if (action.isAlreadyUsed(actor) || !action.isTargetActorValid(actor)) {
            SoundManager.playBuzzer();
            this._actorWindow.activate();
        } else {
            SoundManager.playOk();
            _Scene_Battle_onActorOk.call(this);
        }
    };

})();