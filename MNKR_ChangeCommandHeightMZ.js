/*
 * --------------------------------------------------
 * MNKR_ChangeCommandHeightMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeCommandHeightMZ.js
 * @plugindesc スマートフォン向けにコマンド類の高さを調節します。
 * @author munokura
 *
 * @help
 * スマートフォン向けにコマンド類の高さを調節します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param titleHeight
 * @text タイトルコマンド高
 * @type number
 * @default 72
 * @desc タイトル画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 *
 * @param optionsHeight
 * @text オプションコマンド高
 * @type number
 * @default 72
 * @desc オプション画面のコマンド高。0にすると、デフォルト動作になります。ツクールデフォルト:36
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.titleHeight = Number(parameters['titleHeight'] || 72);
    param.optionsHeight = Number(parameters['optionsHeight'] || optionsHeight);

    //-----------------------------------------------------------------------------
    // Scene_Title

    if (param.titleHeight > 0) {

        Scene_Title.prototype.calcWindowHeight = function (numLines) {
            return numLines * param.titleHeight + $gameSystem.windowPadding() * 2;
            // return this.fittingHeight(numLines);
        };

        // Scene_Title.prototype.fittingHeight = function (numLines) {
        //     return numLines * this.itemHeight() + $gameSystem.windowPadding() * 2;
        // };

        // Scene_Title.prototype.itemHeight = function () {
        //     return 72;
        // };

        Window_TitleCommand.prototype.itemHeight = function () {
            return param.titleHeight;
        };

    }

    //-----------------------------------------------------------------------------
    // Scene_Options

    if (param.optionsHeight > 0) {

        Scene_Options.prototype.calcWindowHeight = function (numLines) {
            return numLines * param.optionsHeight + $gameSystem.windowPadding() * 2;
        };

        Window_Options.prototype.itemHeight = function () {
            return param.optionsHeight;
        };

    }

})();
