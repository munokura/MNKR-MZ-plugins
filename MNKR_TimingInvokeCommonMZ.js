/*
 * --------------------------------------------------
 * MNKR_TimingInvokeCommonMZ Ver.1.0.0
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
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimingInvokeCommonMZ.js
 * @plugindesc 場所移動時・戦闘開始/終了時にコモンイベントを実行します。
 * @author Yana (改変 munokura)
 * 
 * @param TransferCommonID
 * @text 場所移動時コモンイベント
 * @type common_event
 * @desc 場所移動完了時に実行するコモンイベントID
 * @default 0
 * 
 * @param BattleStartCommonID
 * @text 戦闘開始時コモンイベント
 * @type common_event
 * @desc 戦闘開始メッセージ後、ターン0前に実行するコモンイベントID
 * @default 0
 * 
 * @param BattleEndCommonID
 * @text 戦闘終了時コモンイベント
 * @type common_event
 * @desc 戦闘終了直後マップ画面で実行するコモンイベントID
 * @default 0
 * 
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインパラメータで各タイミングで発動するコモンイベントのIDを設定すると、
 * そのコモンイベントが設定したタイミングで発動を予約されます。
 * 
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
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
		if (transferCommonId > 0) {
			this._index++;
			$gameTemp.reserveCommonEvent(transferCommonId);
		}
	};

})();