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
 */

(function () {
	'use strict';

	const parameters = PluginManager.parameters('MNKR_MaxSave');
	const maxFiles = Number(parameters['Max Files'] || 20);

	DataManager.maxSavefiles = function () {
		return maxFiles;
	};

})();
