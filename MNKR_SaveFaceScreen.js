/*
 * --------------------------------------------------
 * MNKR_SaveFaceScreen.js
 *   Ver.0.1.0
 * Copyright (c) 2024 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SaveFaceScreen.js
@plugindesc Displays the party's face image on the save screen and changes the size and position of the face image.
@author munokura
@license MIT License

@help
By default, your save data will display your party's walking characters.
Replace the walking characters with face images and adjust their size and
position.
Use the plugin parameters to specify the size and placement of the image.

There are no plugin commands.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param startPositionX
@text Party image start position X
@desc The starting X coordinate of the face image.
@type number
@default 144

@param startPositionY
@text Party image start position Y
@desc The starting Y coordinate of the face image.
@type number
@default 8

@param faceWidth
@text Face Image Width
@desc The cropping width of the face image. Both sides are cropped evenly. The default is 144.
@type number
@default 144

@param faceHeight
@text High-quality facial images
@desc The trimming height of the face image. Trims both sides evenly. The default is 144.
@type number
@default 40

@param faceSpace
@text Face Image Interval
@desc The display interval between facial images.
@type number
@default 8
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SaveFaceScreen.js
@plugindesc セーブ画面にパーティの顔画像に表示し、顔画像の大きさ・位置を変更します。
@author munokura

@help
デフォルトではセーブデータにはパーティの歩行キャラが表示されます。
歩行キャラを顔画像に替え、表示する大きさ・位置を変更します。
プラグインパラメーターで、表示する画像の大きさや配置を指定してください。

プラグインコマンドはありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param startPositionX
@text パーティ画像スタート位置X
@type number
@desc 顔画像の開始X座標です。
@default 144

@param startPositionY
@text パーティ画像スタート位置Y
@type number
@desc 顔画像の開始Y座標です。
@default 8

@param faceWidth
@text 顔画像幅
@type number
@desc 顔画像のトリミング幅。両端を均等にトリミングします。ツクールデフォルトは144。
@default 144

@param faceHeight
@text 顔画像高
@type number
@desc 顔画像のトリミング高さ。両端を均等にトリミングします。ツクールデフォルトは144。
@default 40

@param faceSpace
@text 顔画像間隔
@type number
@desc 顔画像同士の表示間隔。
@default 8
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.startPositionX = Number(parameters['startPositionX'] || 144);
    param.startPositionY = Number(parameters['startPositionY'] || 8);
    param.faceWidth = Number(parameters['faceWidth'] || 144);
    param.faceHeight = Number(parameters['faceHeight'] || 40);
    param.faceSpace = Number(parameters['faceSpace'] || 40);

    //-----------------------------------------------------------------------------
    // Window_SavefileList
    //

    // !!!overwrite!!!
    Window_SavefileList.prototype.drawContents = function (info, rect) {
        const bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            const x = param.startPositionX;
            const y = param.startPositionY;
            this.drawPartyfaces(info, rect.x + x, rect.y + y);
        }
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    Window_SavefileList.prototype.drawPartyfaces = function (info, x, y) {
        if (info.faces) {
            const w = param.faceWidth;
            const h = param.faceHeight;
            const space = param.faceSpace;
            for (const data of info.faces) {
                this.drawFace(data[0], data[1], x, y, w, h);
                x += w + space;
            }
        }
    };

})();
