/*
 * --------------------------------------------------
 * MNKR_PartyCommandSkipMZ.js
 *   Ver.1.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandSkipMZ.js
 * @plugindesc 戦闘開始時にパーティコマンドを飛ばし、アクターコマンドから開始します。
 * @author munokura
 *
 * @help
 * 戦闘開始時にパーティコマンドを飛ばします。
 * 
 * ターン制では、先頭のアクターでキャンセルすると、パーティコマンドに戻ります。
 * 
 * パーティコマンドウィンドウでキャンセルすると、戦うを選んだ状態になります。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {

      'use strict';

      const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
      Scene_Battle.prototype.createPartyCommandWindow = function () {
            _Scene_Battle_createPartyCommandWindow.call(this);
            this._partyCommandWindow.setHandler('cancel', this.commandFight.bind(this));
      };

      const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
      Scene_Battle.prototype.startPartyCommandSelection = function () {
            if (this._partyCommandSkipped && !($dataSystem.battleSystem === 0)) {
                  _Scene_Battle_startPartyCommandSelection.call(this);
            } else {
                  this._partyCommandSkipped = true;
                  this.selectNextCommand();
            }
      };

      Scene_Battle.prototype.selectPreviousCommand = function () {
            BattleManager.selectPreviousCommand();
            if (BattleManager.isInputting() && BattleManager.actor()) {
                  this.startActorCommandSelection();
            } else {
                  _Scene_Battle_startPartyCommandSelection.call(this);
            }
      };

})();