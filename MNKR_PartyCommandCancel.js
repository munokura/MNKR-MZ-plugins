/*
 * --------------------------------------------------
 * MNKR_PartyCommandCancel Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandCancel.js
 * @plugindesc パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。
 * @author munokura
 *
 * @help
 * パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。
 */

(function () {
	'use strict';

	const _Scene_Battle_prototype_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
	Scene_Battle.prototype.createPartyCommandWindow = function () {
		_Scene_Battle_prototype_createPartyCommandWindow.call(this);
		this._partyCommandWindow.setHandler('cancel', this.commandFight.bind(this));
	};


})();
