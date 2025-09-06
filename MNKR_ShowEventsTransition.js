/*
 * --------------------------------------------------
 * MNKR_ShowEventsTransition.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowEventsTransition.js
@plugindesc Map events will remain visible during encounters.
@author munokura
@license MIT License

@help
Map events will remain displayed during encounters.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShowEventsTransition.js
@plugindesc エンカウント時にマップイベントが表示されたままになります。
@author munokura

@help
エンカウント時にマップイベントが表示されたままになります。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
	'use strict';

	Scene_Map.prototype.startEncounterEffect = function () {
		this._encounterEffectDuration = this.encounterEffectSpeed();
	};

})();