/*
 * --------------------------------------------------
 * MNKR_NoLose Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_NoLose.js
 * @plugindesc 戦闘で全滅してもゲームオーバーになりません。
 * @author munokura
 *
 * @help
 * 戦闘で全滅してもゲームオーバーになりません。
 */

(function () {
	'use strict';

	BattleManager.updateBattleEnd = function() {
		if (this.isBattleTest()) {
			AudioManager.stopBgm();
			SceneManager.exit();
		} else if (!this._escaped && $gameParty.isAllDead()) {
				$gameParty.reviveBattleMembers();
				SceneManager.pop();
		} else {
			SceneManager.pop();
		}
		this._phase = "";
	};
	
})();
