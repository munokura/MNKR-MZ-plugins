/*
 * --------------------------------------------------
 * MNKR_SwitchGameoverMusic.js
 *   Ver.0.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchGameoverMusic.js
@plugindesc When the specified switch is ON, the previous BGM will continue when the game ends.
@author munokura
@license MIT License

@help
When the specified switch is ON, the previous BGM will continue upon game
over.

If no specified switch is specified, the previous BGM will always continue
upon game over.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param Game Over Switch Id
@text Activation switch
@desc When the specified switch is ON, the previous BGM will continue when the game ends.
@type switch
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchGameoverMusic.js
@plugindesc 指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。
@author munokura

@help
指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。

指定スイッチを指定しない場合、常にゲームオーバー時に直前のBGMが続きます。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param Game Over Switch Id
@text 発動スイッチ
@type switch
@desc 指定スイッチがON時ゲームオーバー時に直前のBGMが続きます。
@default 0
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const gameOverSwitchId = Number(parameters['Game Over Switch Id'] || 0);

    const _Scene_Gameover_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
    Scene_Gameover.prototype.playGameoverMusic = function () {
        if (!$gameSwitches.value(gameOverSwitchId)) {
            _Scene_Gameover_playGameoverMusic.call(this);
        }
    };

})();