/*
 * --------------------------------------------------
 * MNKR_TimingInvokeCommonMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
//
//  特定タイミング発動コモン ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimingInvokeCommonMZ.js
@plugindesc Common events are executed when moving between locations or when a battle begins or ends.
@author Yana,munokura
@license MIT License

@help
------------------------------------------------------
How to Use
------------------------------------------------------
By setting the ID of a common event to be triggered at a specific timing in
the plugin parameters,
that common event will be scheduled to trigger at the set timing.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author,
and there are no restrictions on its use (commercial, 18+, etc.).

@param TransferCommonID
@text Common events when moving locations
@desc Common event ID to execute when location change is complete
@type common_event
@default 0

@param BattleStartCommonID
@text Common event at the start of battle
@desc Common event ID to execute after the battle start message and before turn 0
@type common_event
@default 0

@param BattleEndCommonID
@text Common event at the end of battle
@desc Common event ID to be executed on the map screen immediately after the battle ends
@type common_event
@default 0
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimingInvokeCommonMZ.js
@plugindesc 場所移動時・戦闘開始/終了時にコモンイベントを実行します。
@author Yana (改変:munokura)

@param TransferCommonID
@text 場所移動時コモンイベント
@type common_event
@desc 場所移動完了時に実行するコモンイベントID
@default 0

@param BattleStartCommonID
@text 戦闘開始時コモンイベント
@type common_event
@desc 戦闘開始メッセージ後、ターン0前に実行するコモンイベントID
@default 0

@param BattleEndCommonID
@text 戦闘終了時コモンイベント
@type common_event
@desc 戦闘終了直後マップ画面で実行するコモンイベントID
@default 0

@help
------------------------------------------------------
使用方法
------------------------------------------------------
プラグインパラメータで各タイミングで発動するコモンイベントのIDを設定すると、
そのコモンイベントが設定したタイミングで発動を予約されます。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/


(() => {

	"use strict";

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);
	const transferCommonId = Number(parameters['TransferCommonID'] || 0);
	const battleStartCommonId = Number(parameters['BattleStartCommonID'] || 0);
	const battleEndCommonId = Number(parameters['BattleEndCommonID'] || 0);

	const __BManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function () {
		__BManager_startBattle.call(this);
		if (battleStartCommonId > 0) {
			$gameTemp.reserveCommonEvent(battleStartCommonId);
		}
	};

	const __BManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function (result) {
		__BManager_endBattle.call(this, result);
		if (battleEndCommonId > 0) {
			$gameTemp.reserveCommonEvent(battleEndCommonId);
		}
	};

	const __GInterpreter_command201 = Game_Interpreter.prototype.command201;
	Game_Interpreter.prototype.command201 = function () {
		__GInterpreter_command201.apply(this, arguments);
		this._index++;
		if (transferCommonId > 0) {
			$gameTemp.reserveCommonEvent(transferCommonId);
		}
	};

})();