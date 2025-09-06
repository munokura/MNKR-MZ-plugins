/*
 * --------------------------------------------------
 * MNKR_ChangeFadeMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeFadeMZ.js
@plugindesc Changes the behavior of the event command "Fade out/in".
@author example
@license MIT License

@help
Changes the behavior of the "fade out/in" event command.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param fadeDurationVariables
@text Fade Speed Variable
@desc The value of the variable is the fade time. The default is 30. If the value is 0/no variable is specified, the default behavior will occur.
@type variable
@default 0

@param fadeColor
@text Fade Color
@desc Enter the RGB values. If you do not use this function, enter -1 for red (R).
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
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeFadeMZ.js
@plugindesc イベントコマンド「フェードアウト/イン」の挙動を変更します。
@author munokura

@help
イベントコマンド「フェードアウト/イン」の挙動を変更します。


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
@desc RGBの値を入力します。機能を使用しない場合、赤(R)に-1と入力。
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
    const PRM_RGBA = [PRM_Red, PRM_Green, PRM_Blue, 0];

    let hasFadeColor = false;

    // フェードアウト
    const _Game_Interpreter_command221 = Game_Interpreter.prototype.command221;
    Game_Interpreter.prototype.command221 = function () {
        const fadeDuration = PRM_fadeDurationVariables === 0 ? 0 : $gameVariables.value(PRM_fadeDurationVariables);
        hasFadeColor = PRM_Red > -1;
        if (!$gameMessage.isBusy() && fadeDuration > 0) {
            $gameScreen.startFadeOut(fadeDuration);
            this.wait(fadeDuration);
            return true;
        } else {
            return _Game_Interpreter_command221.call(this);
        }
    };

    const _Game_Screen_startFadeOut = Game_Screen.prototype.startFadeOut;
    Game_Screen.prototype.startFadeOut = function (duration) {
        _Game_Screen_startFadeOut.call(this, duration);
        if (hasFadeColor) {
            this._flashColor = PRM_RGBA.clone();
        }
    };

    const _Game_Screen_updateFadeOut = Game_Screen.prototype.updateFadeOut;
    Game_Screen.prototype.updateFadeOut = function () {
        if (hasFadeColor && this._fadeOutDuration > 0) {
            const d = this._fadeOutDuration;
            this._flashColor[3] = (this._flashColor[3] * (d - 1) + 255) / d;
            this._fadeOutDuration--;
            hasFadeColor = this._fadeOutDuration != 0;
        } else {
            _Game_Screen_updateFadeOut.call(this);
        }
    };

    // フェードイン
    const _Game_Interpreter_command222 = Game_Interpreter.prototype.command222;
    Game_Interpreter.prototype.command222 = function () {
        hasFadeColor = PRM_Red > -1;
        const fadeDuration = PRM_fadeDurationVariables === 0 ? 0 : $gameVariables.value(PRM_fadeDurationVariables);
        if (!$gameMessage.isBusy() && fadeDuration > 0) {
            $gameScreen.startFadeIn(fadeDuration);
            this.wait(fadeDuration);
            return true;
        } else {
            return _Game_Interpreter_command222.call(this);
        }
    };

    const _Game_Screen_startFadeIn = Game_Screen.prototype.startFadeIn;
    Game_Screen.prototype.startFadeIn = function (duration) {
        _Game_Screen_startFadeIn.call(this, duration);
        if (hasFadeColor) {
            this._flashColor = PRM_RGBA.clone();
            this._flashColor[3] = 255;
        }
    };

    const _Game_Screen_updateFadeIn = Game_Screen.prototype.updateFadeIn;
    Game_Screen.prototype.updateFadeIn = function () {
        if (hasFadeColor && this._fadeInDuration > 0) {
            const d = this._fadeInDuration;
            this._flashColor[3] = (this._flashColor[3] * (d - 1)) / d;
            this._fadeInDuration--;
            hasFadeColor = this._fadeInDuration != 0;
        } else {
            _Game_Screen_updateFadeIn.call(this);
        }
    };

})();