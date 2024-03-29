/*
 * --------------------------------------------------
 * MNKR_ChangeTransferMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeTransferMZ.js
 * @plugindesc イベントコマンド「場所移動」のフェード挙動を変更します。
 * @author munokura
 *
 * @help
 * イベントコマンド「場所移動」のフェード挙動を変更します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param fadeDurationVariables
 * @text フェード速度変数
 * @type variable
 * @desc 変数の値がフェード時間になります。ツクールデフォルトは30。値が0/変数の指定がない時はデフォルト動作。
 * @default 0
 * 
 * @param fadeColor
 * @text フェード色
 * @type struct<color>
 * @desc RGBの値を入力します。機能を使用しない場合、赤(R)に-1と入力。コマンドのフェードが「なし」の場合、反映しません。
 * @default {"red":"255","green":"0","blue":"0"}
 */
/*~struct~color:
 * @param red
 * @text 赤
 * @default 255
 * @type number
 * @min -1
 * @max 255
 * @desc フェードの色。0から255。機能を使用しない場合、-1と入力
 *
 * @param green
 * @text 緑
 * @default 0
 * @type number
 * @max 255
 * @desc フェードの色。0から255。
 *
 * @param blue
 * @text 青
 * @default 0
 * @type number
 * @max 255
 * @desc フェードの色。0から255。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_fadeDurationVariables = Number(parameters['fadeDurationVariables'] || 0);
    const PRM_fadeColor = JSON.parse(parameters['fadeColor'] || '{}');
    const PRM_Red = Number(PRM_fadeColor.red);
    const PRM_Green = Number(PRM_fadeColor.green);
    const PRM_Blue = Number(PRM_fadeColor.blue);

    let MNKR_inTransFadeIn = false;
    let MNKR_inTransfer = false;

    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function (params) {
        MNKR_inTransfer = true;
        return _Game_Interpreter_command201.call(this, params);
    };

    const _Scene_Map_fadeOutForTransfer = Scene_Map.prototype.fadeOutForTransfer;
    Scene_Map.prototype.fadeOutForTransfer = function () {
        const fadeDuration = $gameVariables.value(PRM_fadeDurationVariables);
        const hasDuration = PRM_fadeDurationVariables === 0 ? false : fadeDuration > 0;
        if (hasDuration) {
            const fadeType = $gamePlayer.fadeType();
            switch (fadeType) {
                case 0:
                case 1:
                    this.startFadeOut(fadeDuration, fadeType === 1);
                    break;
            }
        } else {
            _Scene_Map_fadeOutForTransfer.call(this);
        }
    };

    const _Scene_Map_fadeInForTransfer = Scene_Map.prototype.fadeInForTransfer;
    Scene_Map.prototype.fadeInForTransfer = function () {
        const fadeDuration = $gameVariables.value(PRM_fadeDurationVariables);
        const hasDuration = PRM_fadeDurationVariables === 0 ? false : fadeDuration > 0;
        if (hasDuration) {
            const fadeType = $gamePlayer.fadeType();
            switch (fadeType) {
                case 0:
                case 1:
                    this.startFadeIn(fadeDuration, fadeType === 1);
                    MNKR_inTransFadeIn = true;
                    break;
            }
        } else {
            _Scene_Map_fadeInForTransfer.call(this);
        }
    };

    const _Scene_Map_updateColorFilter = Scene_Base.prototype.updateColorFilter;
    Scene_Map.prototype.updateColorFilter = function () {
        if (MNKR_inTransfer && PRM_Red > -1) {
            const blendColor = [PRM_Red, PRM_Green, PRM_Blue, this._fadeOpacity];
            this._colorFilter.setBlendColor(blendColor);
        } else {
            _Scene_Map_updateColorFilter.call(this);
        }
    };

    const _Scene_Base_updateFade = Scene_Base.prototype.updateFade;
    Scene_Base.prototype.updateFade = function () {
        _Scene_Base_updateFade.call(this);
        if (MNKR_inTransfer && MNKR_inTransFadeIn && this._fadeDuration === 0) {
            MNKR_inTransFadeIn = false;
            MNKR_inTransfer = false;
        }
    };

})();
