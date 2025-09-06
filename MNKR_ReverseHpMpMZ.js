/*
 * --------------------------------------------------
 * MNKR_ReverseHpMpMZ.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReverseHpMpMZ.js
@plugindesc You can invert the HP and MP display.
@author example
@license MIT License

@help
You can change the HP display to accumulated damage.
You can change the MP display from remaining MP to accumulated consumption.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param reverseHp
@text HP Reverse
@desc Changes the HP display from remaining HP to accumulated damage.
@type boolean
@on Invert
@off usually
@default true

@param reverseMp
@text MP Reverse
@desc Changes the MP display from remaining MP to accumulated consumption.
@type boolean
@on Invert
@off usually
@default true
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReverseHpMpMZ.js
@plugindesc HP・MPの表示を反転できます。
@author munokura

@help
HPの表示を蓄積ダメージに変更できます。
MPの表示を残りMPから蓄積消費量に変更できます。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。

@param reverseHp
@text HP反転化
@type boolean
@on 反転
@off 通常
@default true
@desc HPの表示を残りHPから蓄積ダメージに変更します。

@param reverseMp
@text MP反転化
@type boolean
@on 反転
@off 通常
@default true
@desc MPの表示を残りMPから蓄積消費量に変更します。
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_reverseHp = parameters['reverseHp'] === 'true';
    const PRM_reverseMp = parameters['reverseMp'] === 'true';

    const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
    Sprite_Gauge.prototype.currentValue = function () {
        if (this._battler) {
            switch (this._statusType) {
                case "hp":
                    if (PRM_reverseHp) {
                        return this._battler.mhp - this._battler.hp;
                    }
                    return _Sprite_Gauge_currentValue.call(this);
                case "mp":
                    if (PRM_reverseMp) {
                        return this._battler.mmp - this._battler.mp;
                    }
                    return _Sprite_Gauge_currentValue.call(this);
            }
            return _Sprite_Gauge_currentValue.call(this);
        }
    };

})();