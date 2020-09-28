/*
 * --------------------------------------------------
 * MNKR_MaxSave Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MaxSave.js
 * @plugindesc セーブスロットの数を指定できます。
 * @author munokura
 *
 * @param Max Files
 * @text セーブスロットの数
 * @type number
 * @min 1
 * @max 99
 * @desc セーブスロットの数
 * ツクールデフォルト:20
 * @default 20
 *
 * @help
 * セーブスロットの数を指定できます。
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

(function () {
	'use strict';

	const parameters = PluginManager.parameters('MNKR_MaxSave');
	const maxFiles = Number(parameters['Max Files'] || 20);

	DataManager.maxSavefiles = function () {
		return maxFiles;
	};

})();
