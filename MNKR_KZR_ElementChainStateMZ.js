/*
 * --------------------------------------------------
 * MNKR_KZR_ElementChainStateMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KZR_ElementChainStateMZ.js
@plugindesc Create a state that responds to an ally's attack and performs a follow-up attack.
@author example
@license MIT License

@help
[State Settings]
Write the following in the state's memo field.
<ElementChain:skillId,elementId>
Enter the skill ID to activate in skillId, and the attribute ID that responds
to elementId.

[Setting the Next Target]
If the target is a single target and that target is incapacitated,
do you want to set a new target?
Write <TargetNext> in the state's memo field
to specify a new target. A random target will be selected.
Write <UntargetNext> in the state's memo field
to not specify a new target or activate the state.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
use in MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author,
and there are no restrictions on usage (commercial, R18, etc.).

@param NextTarget
@text If the target is unable to fight
@desc If the target becomes incapacitated, a new target will be set.
@type boolean
@default true
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KZR_ElementChainStateMZ.js
@plugindesc 仲間の攻撃に反応して追撃を行うステートを作成します。
@author ぶちょー (改変:munokura)

@param NextTarget
@text 対象が戦闘不能の場合
@desc 対象が戦闘不能になった場合、新たなターゲットを設定する。
@default true
@type boolean

@help
【ステートの設定】
　ステートのメモ欄に以下のように記述します。
　<ElementChain:skillId,elementId>
　skillId に発動するスキルのID、elementId に反応する属性IDを入れてください。
　
【次のターゲットの設定】
　対象が単体で、その対象が戦闘不能になっていた場合、
  新たなターゲットを設定するか。
　ステートのメモ欄に <TargetNext> と記述すると、
　新たなターゲットを指定します。その際はランダムに決まります。
　ステートのメモ欄に <UntargetNext> と記述すると、
　新たなターゲットは指定せず、発動もしません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

//=============================================================================
// KZR_ElementChainState.js
// Version : 1.00
// -----------------------------------------------------------------------------
// [Homepage]: かざり - ホームページ名なんて飾りです。偉い人にはそれがわからんのですよ。 -
//             http://nyannyannyan.bake-neko.net/
// -----------------------------------------------------------------------------
// [Version]
// 1.00 2017/01/28 公開
//=============================================================================



(() => {
    "use strict";

    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    var parameters = PluginManager.parameters(pluginName);
    var ECS_Next = eval(parameters['NextTarget'] || 'true');

    var Imported = Imported || {};
    Imported.KZR_ElementChainState = true;

    //-----------------------------------------------------------------------------
    // BattleManager
    //

    var _kzr_ECS01_BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function () {
        _kzr_ECS01_BattleManager_startAction.call(this);
        $gameTemp._lastAction = this._action;
        this.setElementChain();
    };

    BattleManager.setElementChain = function () {
        this._elementChainAction = [];
        var action = $gameTemp._lastAction;
        if (action.isSkill()) {
            var elements = [];
            if (action.item().damage.elementId === -1) {
                elements = this._subject.attackElements();
            } else {
                elements.push(action.item().damage.elementId);
            }
            this._oldChainTargets = this._targets.concat();
            this._oldChainScope = action.item().scope;
            var unit = action.friendsUnit();
            for (var i in unit.members()) {
                var subject = unit.members()[i];
                if (this._subject !== subject) {
                    var chainAction = subject.setElementChain(elements);
                    if (chainAction) this._elementChainAction.push(chainAction);
                }
            }
        }
    };

    var _kzr_ECS01_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function () {
        var startChain = true;
        if (Imported.KZR_SkillCombo) startChain = (this._combo.length === 0);
        if (this._elementChainAction.length > 0 && startChain) {
            action = this._elementChainAction.shift();
            this.startElementChainAction(action);
        } else {
            _kzr_ECS01_BattleManager_endAction.call(this);
        }
    };

    BattleManager.startElementChainAction = function (action) {
        var subject = action.subject();
        var skill = action.item();
        if (subject.canUse(skill)) {
            this._phase = 'action';
            this._action = action;
            if (this._oldChainScope === skill.scope) {
                var targets = this._oldChainTargets;
                var aliveTarget = !action.isForDeadFriend();
                for (var i = 0; i < targets.length; i++) {
                    var target = targets[i];
                    if (target.isDead() && aliveTarget) {
                        targets = targets.filter(function (t) { return t != target });
                    }
                }
                if (targets.length === 0 && action.nextChainTarget) targets = action.makeTargets();
                this._targets = targets;
            } else {
                this._targets = action.makeTargets();
            }
            if (this._targets.length > 0) {
                subject.useItem(skill);
                this._action.applyGlobal();
                // this.refreshStatus();    //munokura
                this._logWindow.startAction(subject, action, this._targets);
            }
        }
    };

    if (Imported.KZR_SkillCombo) {
        var _kzr_ECS01_BattleManager_startComboAction = BattleManager.startComboAction;
        BattleManager.startComboAction = function (skill) {
            _kzr_ECS01_BattleManager_startComboAction.call(this, skill);
            if (this._combo.length === 0) {
                $gameTemp._lastAction = this._action;
                this.setElementChain();
            }
        };
    }

    //-----------------------------------------------------------------------------
    // Game_BattlerBase
    //

    Game_BattlerBase.prototype.setElementChain = function (elements) {
        var states = this.states();
        for (var i in states) {
            var state = states[i];
            for (var j in state.chainElements) {
                for (var k in elements) {
                    if (elements[k] === state.chainElements[j]) {
                        var action = new Game_Action(this);
                        action.setSkill(state.elementChainSkillId[j]);
                        action.nextChainTarget = state.nextChainTarget;
                        return action;
                    }
                }
            }
        }
        return false;
    };

    //-----------------------------------------------------------------------------
    // Game_Battler
    //

    var _kzr_ECS01_Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function (item) {
        _kzr_ECS01_Game_Battler_useItem.call(this, item);
        if (DataManager.isSkill(item)) this._lastSkill = item;
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //

    var _kzr_ECS01_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _kzr_ECS01_Scene_Boot_start.call(this);
        for (var i = 1; i < $dataStates.length; i++) {
            this.setElementChainState($dataStates[i]);
        }
    };

    Scene_Boot.prototype.setElementChainState = function (state) {
        state.elementChainSkillId = [];
        state.chainElements = [];
        state.nextChainTarget = ECS_Next;
        var notedata = state.note.split(/[\r\n]+/);
        var note1 = /<(?:ElementChain:(\d+),(\d+))>/i;
        var note2 = /<(?:TargetNext)>/g;
        var note3 = /<(?:UntargetNext)>/g;
        for (var i = 0; i < notedata.length; i++) {
            if (notedata[i].match(note1)) {
                state.elementChainSkillId.push(parseInt(RegExp.$1));
                state.chainElements.push(parseInt(RegExp.$2));
            }
            if (notedata[i].match(note2)) state.nextChainTarget = true;
            if (notedata[i].match(note3)) state.nextChainTarget = false;
        }
    };

})();