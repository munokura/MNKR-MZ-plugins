/*
 * --------------------------------------------------
 * MNKR_AltSkillMenuMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltSkillMenuMZ.js
@plugindesc Simplify the skills screen in the main menu.
@author example
@license MIT License

@help
# Function
Simplifies the skills screen in the main menu.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param gaugeWidth
@text Gauge Width
@desc Specify the width of gauges such as HP
@type number
@default 352
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltSkillMenuMZ.js
@plugindesc メインメニュー内スキル画面をシンプルにします。
@author munokura

@help
# 機能
メインメニュー内スキル画面をシンプルにします。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param gaugeWidth
@text ゲージ幅
@desc HP等のゲージの幅を指定
@type number
@default 352
*/

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.gaugeWidth = Number(parameters['gaugeWidth'] || 396);

    const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
    Sprite_Gauge.prototype.bitmapWidth = function () {
        const isSkillMenu = SceneManager._scene.constructor === Scene_Skill;
        if (isSkillMenu) {
            const bitmapWidth = param.gaugeWidth;
            return bitmapWidth;
        }
        return _Sprite_Gauge_bitmapWidth.call(this);
    };

    Window_SkillStatus.prototype.refresh = function () {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
            const x = this.colSpacing() / 2;
            const h = this.innerHeight;
            const y = h / 2 - this.lineHeight() * 1.5;
            this.drawActorSimpleStatus(this._actor, x, y);
        }
    };

})();