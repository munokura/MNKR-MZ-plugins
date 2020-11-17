/*
 * --------------------------------------------------
 * MNKR_ShowEventsTransition Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowEventsTransition.js
 * @plugindesc エンカウント時にマップイベントが表示されたままになります。
 * @author munokura
 *
 * @help
 * エンカウント時にマップイベントが表示されたままになります。
 *
 * プラグインコマンドや設定はありません。
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

	Scene_Map.prototype.startEncounterEffect = function () {
		this._encounterEffectDuration = this.encounterEffectSpeed();
	};

})();
