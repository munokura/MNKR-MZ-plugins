/*
 * --------------------------------------------------
 * MNKR_SelectWinAction Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectWinAction.js
 * @plugindesc 指定変数の値により、戦闘勝利時のSVアクター動作を指定できます。
 * @author munokura
 *
 * @help
 * 指定変数の値により、戦闘勝利時のSVアクター動作を指定できます。
 *
 * 変数の値：動作
 *        0：勝利(ツクールデフォルト)
 *        1：前進
 *        2：通常待機
 *        3：詠唱待機
 *        4：防御
 *        5：ダメージ
 *        6：回避
 *        7：突き
 *        8：振り
 *        9：飛び道具
 *       10：汎用スキル
 *       11：魔法
 *       12：アイテム
 *       13：逃げる
 *       14：瀕死
 *       15：状態異常
 *       16：睡眠
 *       17：戦闘不能
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param Variable Id
 * @text 指定変数
 * @type variable
 * @desc 指定する変数ID
 * @default 0
 */

(() => {
	'use strict';

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);
	const variableId = Number(parameters['Variable Id'] || 0);
	const motionObject = {
		1: 'walk',
		2: 'wait',
		3: 'chant',
		4: 'guard',
		5: 'damage',
		6: 'evade',
		7: 'thrust',
		8: 'swing',
		9: 'missile',
		10: 'skill',
		11: 'spell',
		12: 'item',
		13: 'escape',
		14: 'dying',
		15: 'abnormal',
		16: 'sleep'
	};

	const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
	Game_Actor.prototype.performVictory = function () {
		var motionId = $gameVariables.value(variableId);
		if (motionId !== 0 && this.canMove()) {
			var motionKey = (motionObject[motionId] || 'dead');
			this.requestMotion(motionKey);
		} else {
			_Game_Actor_performVictory.apply(this, arguments);
		};
	};

})();