/*
 * --------------------------------------------------
 * MNKR_ChangeBackScreenColor.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeBackScreenColor.js
@plugindesc Changes the color of areas where no map tiles are placed.
@author munokura
@license MIT License

@help
Changes the color of areas without map tiles (background).

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, R18+, etc.).

@param backScreenColor
@text background color
@desc Enter the RGB values.
@type struct<color>
@default {"red":"255","green":"0","blue":"0"}
*/

/*~struct~color:
@param red
@text red
@desc Background color, from 0 to 255.
@type number
@default 255
@min -1
@max 255

@param green
@text green
@desc Background color, from 0 to 255.
@type number
@default 0
@max 255

@param blue
@text blue
@desc Background color, from 0 to 255.
@type number
@default 0
@max 255
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeBackScreenColor.js
@plugindesc マップタイルが配置されていない箇所の色を変更します。
@author munokura

@help
マップタイルが配置されていない箇所（背景）の色を変更します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param backScreenColor
@text 背景色
@type struct<color>
@desc RGBの値を入力します。
@default {"red":"255","green":"0","blue":"0"}
*/

/*~struct~color:ja
@param red
@text 赤
@default 255
@type number
@min -1
@max 255
@desc 背景の色。0から255。

@param green
@text 緑
@default 0
@type number
@max 255
@desc 背景の色。0から255。

@param blue
@text 青
@default 0
@type number
@max 255
@desc 背景の色。0から255。
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_backScreenColor = JSON.parse(parameters['backScreenColor'] || '{}');
    const PRM_Red = Number(PRM_backScreenColor.red);
    const PRM_Green = Number(PRM_backScreenColor.green);
    const PRM_Blue = Number(PRM_backScreenColor.blue);

    const _Spriteset_Base_createBaseSprite = Spriteset_Base.prototype.createBaseSprite;
    Spriteset_Base.prototype.createBaseSprite = function () {
        _Spriteset_Base_createBaseSprite.call(this);
        this._blackScreen.setColor(PRM_Red, PRM_Green, PRM_Blue);
    };

})();