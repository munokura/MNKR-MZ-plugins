/*
 * --------------------------------------------------
 * MNKR_PartyCommandSkipMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandSkipMZ.js
 * @plugindesc 戦闘開始時にパーティコマンドを飛ばし、アクターコマンドから開始します。
 * @author munokura
 *
 * @help
 * ターン制戦闘専用です。
 * 
 * 戦闘開始時にパーティコマンドを飛ばします。
 * 先頭のアクターでキャンセルすると、パーティコマンドに戻ります。
 * 
 * パーティコマンドウィンドウでキャンセルすると、戦うを選んだ状態になります。
 */

(() => {
      'use strict';

      const _Scene_Battle_prototype_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
      Scene_Battle.prototype.createPartyCommandWindow = function () {
            _Scene_Battle_prototype_createPartyCommandWindow.call(this);
            this._partyCommandWindow.setHandler('cancel', this.commandFight.bind(this));
      };

      const _Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection
      Scene_Battle.prototype.startPartyCommandSelection = function () {
            this.selectNextCommand();
      };

      Scene_Battle.prototype.selectPreviousCommand = function () {
            BattleManager.selectPreviousCommand();
            if (BattleManager.isInputting() && BattleManager.actor()) {
                  this.startActorCommandSelection();
            } else {
                  _Scene_Battle_prototype_startPartyCommandSelection.call(this);
            }
      };

})();
