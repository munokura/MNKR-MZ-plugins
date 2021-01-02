/*
 * --------------------------------------------------
 * MNKR_KMS_SaveWithSnapMZ Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// KMS_SaveWithSnap.js
//   Last update: 2015/12/04
//=============================================================================

/*
The MIT License

Copyright © 2015 TOMY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*:ja
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KMS_SaveWithSnapMZ.js
 * @plugindesc セーブ/ロード画面にスクリーンショットを追加します。
 * 
 * @author TOMY (改変 munokura)

 *
 * @help
 * セーブ/ロード画面にスクリーンショットを追加します。
 * 保存したマップ名を表示することもできます。
 * 
 * このプラグインには、プラグインコマンドはありません。
 * 
 * 
 * このプラグインについて
 *   RPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
 *   お問い合わせは改変者へお願いいたします。
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param Image scale
 * @text 画像サイズ倍率
 * @default 0.15
 * @desc セーブ時の画像データのサイズ倍率です。
 *
 * @param Enable JPEG
 * @text JPEG許可
 * @type boolean
 * @on JPEGを許可
 * @off PNGのみ許可
 * @default true
 * @desc JPEG 形式が使用可能で、かつ PNG よりサイズが小さくなる場合は JPEG を使用します。
 *
 * @param Enable MapName
 * @text マップ名表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @desc セーブデータに保存時のマップ名を表示するか指定します。
 */

var KMS = KMS || {};

(function () {

    KMS.imported = KMS.imported || {};
    KMS.imported['SaveWithSnap'] = true;

    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    var pluginParams = PluginManager.parameters(pluginName);
    var Params = {};
    Params.savefileBitmapScale = Number(pluginParams['Image scale'] || 0.15);
    Params.enableJpeg = String(pluginParams['Enable JPEG']) === 'true';
    Params.enableMapName = String(pluginParams['Enable MapName']) === 'true';

    //-----------------------------------------------------------------------------
    // Bitmap

    if (!Bitmap.prototype.save) {
        /*
         * ビットマップを URL 表現に変換
         */
        Bitmap.prototype.toDataURL = function () {
            if (Params.enableJpeg) {
                // サイズが小さくなる方を返す
                // ※ サポート外の形式が指定されたら PNG になる仕様なので、
                //    変換結果が null 等になることはない
                var png = this._canvas.toDataURL('image/png');
                var jpeg = this._canvas.toDataURL('image/jpeg');
                return (png.length < jpeg.length) ? png : jpeg;
            } else {
                return this._canvas.toDataURL('image/png');
            }
        };
    }

    //-----------------------------------------------------------------------------
    // DataManager

    var _KMS_SaveWithSnap_DataManager_loadSavefileImages = DataManager.loadSavefileImages;
    DataManager.loadSavefileImages = function (info) {
        _KMS_SaveWithSnap_DataManager_loadSavefileImages.call(this, info);
        if (info.snapUrl) {
            ImageManager.loadBitmap(info.snapUrl);
        }
    };

    var _KMS_SaveWithSnap_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function () {
        var info = _KMS_SaveWithSnap_DataManager_makeSavefileInfo.call(this);
        var bitmap = this.makeSavefileBitmap();
        if (bitmap) {
            info.snapUrl = bitmap.toDataURL();
        }
        if (Params.enableMapName) {
            info.mapname = $gameMap.displayName();
        }
        return info;
    };

    /*
     * セーブファイル用のビットマップを作成
     */
    DataManager.makeSavefileBitmap = function () {
        var bitmap = $gameTemp.getSavefileBitmap();
        if (!bitmap) {
            return null;
        }
        var scale = Params.savefileBitmapScale;
        var newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
        newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);
        return newBitmap;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp

    var _KMS_SaveWithSnap_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _KMS_SaveWithSnap_Game_Temp_initialize.call(this);
        this._savefileBitmap = null;
    };

    Game_Temp.prototype.setSavefileBitmap = function (bitmap) {
        this._savefileBitmap = bitmap;
    };

    Game_Temp.prototype.getSavefileBitmap = function () {
        if (this._savefileBitmap) {
            return this._savefileBitmap;
        } else {
            return SceneManager._backgroundBitmap;
        }
    };

    //-----------------------------------------------------------------------------
    // Window_SavefileList

    const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
    Window_SavefileList.prototype.drawContents = function (info, rect) {
        _Window_SavefileList_drawContents.apply(this, arguments);
        if (info) {
            this.drawSnappedImage(info, rect);
            if (info.mapname && Params.enableMapName) {
                this.drawText(info.mapname, rect.x + 192, rect.y + 4, rect.width - 192);
            }
        }
    };

    /*
     * セーブファイルの画像を表示
     */
    Window_SavefileList.prototype.drawSnappedImage = function (info, rect) {
        if (!info.snapUrl) {
            return;
        }
        var bitmap = ImageManager.loadBitmapFromUrl(info.snapUrl);
        var dh = this.itemHeight() - 12;
        var dw = parseInt(bitmap.width * dh / bitmap.height);
        var dx = rect.x + Math.max(rect.width - dw - 120, 0);
        var dy = rect.y + 4;
        this.changePaintOpacity(true);
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
    };

})();
