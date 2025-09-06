/*
 * --------------------------------------------------
 * MNKR_PartyCommandCancel.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandCancel.js
@plugindesc If you cancel in the party command window, you will be in the state where you chose to fight.
@author munokura
@license MIT License

@help
If you cancel in the party command window, the game will return to the state
where you selected "Fight."

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyCommandCancel.js
@plugindesc パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。
@author munokura
@help
パーティコマンドウィンドウでキャンセル処理すると、戦うを選んだ状態になります。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {

	'use strict';

	const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
	Scene_Battle.prototype.createPartyCommandWindow = function () {
		_Scene_Battle_createPartyCommandWindow.call(this);
		this._partyCommandWindow.setHandler('cancel', this.commandFight.bind(this));
	};

})();