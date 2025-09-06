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
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeTransferMZ.js
@plugindesc Changed the fade behavior of the event command "Move Location."
@author munokura
@license MIT License

@help
Changes the fade behavior of the "Move Location" event command.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, R18+, etc.).

@param fadeDurationVariables
@text Fade Speed Variable
@desc The value of the variable is the fade time. The default is 30. If the value is 0/no variable is specified, the default behavior will occur.
@type variable
@default 0

@param fadeColor
@text Fade Color
@desc Enter the RGB value. If you do not want to use this function, enter -1 for red (R). If the fade command is set to "None," this will not be reflected.
@type struct<color>
@default {"red":"255","green":"0","blue":"0"}
*/

/*~struct~color:
@param red
@text red
@desc Fade color. 0 to 255. If you don't want to use this function, enter -1.
@type number
@default 255
@min -1
@max 255

@param green
@text green
@desc Fade color, from 0 to 255.
@type number
@default 0
@max 255

@param blue
@text blue
@desc Fade color, from 0 to 255.
@type number
@default 0
@max 255
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeTransferMZ.js
@plugindesc イベントコマンド「場所移動」のフェード挙動を変更します。
@author munokura

@help
イベントコマンド「場所移動」のフェード挙動を変更します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param fadeDurationVariables
@text フェード速度変数
@type variable
@desc 変数の値がフェード時間になります。ツクールデフォルトは30。値が0/変数の指定がない時はデフォルト動作。
@default 0

@param fadeColor
@text フェード色
@type struct<color>
@desc RGBの値を入力します。機能を使用しない場合、赤(R)に-1と入力。コマンドのフェードが「なし」の場合、反映しません。
@default {"red":"255","green":"0","blue":"0"}
*/

/*~struct~color:ja
@param red
@text 赤
@default 255
@type number
@min -1
@max 255
@desc フェードの色。0から255。機能を使用しない場合、-1と入力

@param green
@text 緑
@default 0
@type number
@max 255
@desc フェードの色。0から255。

@param blue
@text 青
@default 0
@type number
@max 255
@desc フェードの色。0から255。
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