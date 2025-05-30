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
 * @target MZ
 * @plugindesc メインメニュー内スキル画面をシンプルにします。
 * @author munokura
 * 
 * @help
 * # 機能
 * メインメニュー内スキル画面をシンプルにします。
 * 
 * プラグインコマンドはありません。
 * 
 * 
 * # 利用規約
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param gaugeWidth
 * @text ゲージ幅
 * @desc HP等のゲージの幅を指定
 * @type number
 * @default 352
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