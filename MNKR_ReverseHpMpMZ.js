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
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ReverseHpMpMZ.js
 * @plugindesc HP・MPの表示を反転できます。
 * @author munokura
 *
 * @help
 * HPの表示を蓄積ダメージに変更できます。
 * MPの表示を残りMPから蓄積消費量に変更できます。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param reverseHp
 * @text HP反転化
 * @type boolean
 * @on 反転
 * @off 通常
 * @default true
 * @desc HPの表示を残りHPから蓄積ダメージに変更します。
 * 
 * @param reverseMp
 * @text MP反転化
 * @type boolean
 * @on 反転
 * @off 通常
 * @default true
 * @desc MPの表示を残りMPから蓄積消費量に変更します。
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