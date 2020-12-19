/*
 * --------------------------------------------------
 * MNKR_SwitchGameoverMusic Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchGameoverMusic.js
 * @plugindesc 指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。
 * 
 * @help
 * 指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param Game Over Switch Id
 * @text 発動スイッチ
 * @type switch
 * @desc 指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const gameOverSwitchId = Number(parameters['Game Over Switch Id'] || 0);

    const _Scene_Gameover_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
    Scene_Gameover.prototype.playGameoverMusic = function () {
        if (!$gameSwitches.value(gameOverSwitchId)) {
            _Scene_Gameover_playGameoverMusic;
        }
    };

})();
