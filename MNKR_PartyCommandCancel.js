/*
 * --------------------------------------------------
 * MNKR_PartyCommandCancel Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandCancel.js
 * @plugindesc パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。
 * @author munokura
 *
 * @help
 * パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
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

})();