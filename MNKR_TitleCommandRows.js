/*
 * --------------------------------------------------
 * MNKR_TitleCommandRows Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TitleCommandRows.js
 * @plugindesc タイトルメニューのウィンドウ行数を指定します。
 * @author munokura
 *
 * @param Command Rows
 * @text メニュー行数
 * @type number
 * @desc メニューの行数を指定します。
 * @default 8
 * 
 * @help
 * タイトルメニューのウィンドウ行数を指定します。
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
    const parameters = PluginManager.parameters('MNKR_TitleCommandRows');
    const commandRows = Number(parameters['Command Rows'] || 3);

    // const _Scene_Title_prototype_commandWindowRect = Scene_Title.prototype.commandWindowRect;
    Scene_Title.prototype.commandWindowRect = function () {
        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(commandRows, true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY;
        return new Rectangle(wx, wy, ww, wh);
    };

})();