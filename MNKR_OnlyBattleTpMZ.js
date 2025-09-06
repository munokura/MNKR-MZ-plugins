/*
 * --------------------------------------------------
 * MNKR_OnlyBattleTpMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OnlyBattleTpMZ.js
@plugindesc Turns off the TP display outside of the battle screen.
@author example
@license MIT License

@help
Removes TP display outside of the battle screen.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OnlyBattleTpMZ.js
@plugindesc 戦闘画面以外のTP表示を消します。
@author munokura

@help
戦闘画面以外のTP表示を消します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';

    const _Window_StatusBase_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
    Window_StatusBase.prototype.placeBasicGauges = function (actor, x, y) {
        const isScene = SceneManager._scene.constructor.name === 'Scene_Battle';
        if (isScene) {
            _Window_StatusBase_placeBasicGauges.call(this, actor, x, y);
        } else {
            this.placeGauge(actor, "hp", x, y);
            this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());
        }
    };

})();