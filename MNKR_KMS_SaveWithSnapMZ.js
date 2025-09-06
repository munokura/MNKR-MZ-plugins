/*
 * --------------------------------------------------
 * MNKR_KMS_SaveWithSnapMZ.js
 *   Ver.0.1.4
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KMS_SaveWithSnapMZ.js
@plugindesc Add screenshots to the save/load screen.
@author munokura
@license MIT License

@help
Adds screenshots to the save/load screen.
You can also display the name of the saved map.

This plugin does not have any plugin commands.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author, and there are no restrictions on its use (commercial, 18+, etc.).

@param fontSize
@text Font size
@desc Font size for the entire save screen. Default: 26
@default 26

@param mapImages
@text Map image

@param imageScale
@text Image size magnification
@desc The resolution of the image displayed on the save screen (sort of). The larger the resolution, the larger the save size. Default: 0.15
@default 0.15
@parent mapImages

@param enableJpeg
@text JPEG permission
@desc Use JPEG if available and it is smaller than PNG.
@type boolean
@on Allow JPEG
@off Only PNG is allowed
@default true
@parent mapImages

@param imageX
@text Map image X axis
@desc Amount of pixels to offset the display position of the map image on the X axis
@default 0
@parent mapImages

@param imageY
@text Map image Y axis
@desc Amount of pixels to offset the display position of the map image on the Y axis
@default 0
@parent mapImages

@param imageHight
@text Map Image Height
@desc The pixel amount of the map image display height. Values exceeding the frame height are invalid. The width is calculated from the height while maintaining the aspect ratio. Default value: 84
@default 84
@parent mapImages

@param drawTitles
@text Save Title

@param drawTitle
@text Save title display
@desc Switch display of "File x" displayed in the save list by default
@type boolean
@on display
@off hidden
@default false
@parent drawTitles

@param titleX
@text Save Title X-Axis
@desc Amount of pixels to offset the display position of the save title on the X axis
@default 0
@parent drawTitles

@param titleY
@text Save Title Y-Axis
@desc Amount of pixels to offset the display position of the save title on the Y axis
@default 4
@parent drawTitles

@param titleWidth
@text Save Title Width
@desc Display width of save title in pixels
@default 180
@parent drawTitles

@param drawMapNames
@text Map Name

@param drawMapName
@text Map name display
@desc Specify whether to display the map name when saved in the save data.
@type boolean
@on display
@off hidden
@default true
@parent drawMapNames

@param mapNameX
@text Map Name X-Axis
@desc Amount of pixels to offset the map name display position on the X axis
@default 0
@parent drawMapNames

@param mapNameY
@text Map Name Y-Axis
@desc Amount of pixel offset on the Y axis for the map name display position
@default 4
@parent drawMapNames

@param mapNameWidth
@text Map Name Width
@desc The pixel width of the map name display
@default 568
@parent drawMapNames

@param drawPartys
@text Party Character

@param drawParty
@text Party character display
@desc Specify whether to display the party characters saved in the save data.
@type boolean
@on display
@off hidden
@default true
@parent drawPartys

@param partyX
@text Party character X axis
@desc Amount of pixels to offset the display position of party characters on the X axis
@default 220
@parent drawPartys

@param partyY
@text Party character Y axis
@desc Amount of pixels to offset the display position of party characters on the Y axis
@default -8
@parent drawPartys

@param playtimes
@text Play time

@param playtime
@text Play time display
@desc Specify whether to display the play time when saved in the save data.
@type boolean
@on display
@off hidden
@default true
@parent playtimes

@param playtimeX
@text Play time x-axis
@desc Amount of pixels to offset the play time display position on the X axis
@default 0
@parent playtimes

@param playtimeY
@text Play time Y axis
@desc Amount of pixels to offset the play time display position on the Y axis
@default 0
@parent playtimes

@param playtimeWidth
@text Play time range
@desc The number of pixels in the width of the play time display
@default 760
@parent playtimes
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KMS_SaveWithSnapMZ.js
@plugindesc セーブ/ロード画面にスクリーンショットを追加します。

@author TOMY (改変:munokura)

@help
セーブ/ロード画面にスクリーンショットを追加します。
保存したマップ名を表示することもできます。

このプラグインには、プラグインコマンドはありません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param fontSize
@text フォントサイズ
@default 26
@desc セーブ画面全体のフォントサイズ。既定値:26

@param mapImages
@text マップ画像

@param imageScale
@text 画像サイズ倍率
@default 0.15
@desc セーブ画面に表示される画像の解像度（のようなもの）。大きいほどセーブサイズが大きくなります。既定値:0.15
@parent mapImages

@param enableJpeg
@text JPEG許可
@type boolean
@on JPEGを許可
@off PNGのみ許可
@default true
@desc JPEG 形式が使用可能で、かつ PNG よりサイズが小さくなる場合は JPEG を使用します。
@parent mapImages

@param imageX
@text マップ画像X軸
@default 0
@desc マップ画像の表示位置をX軸オフセットするピクセル量
正の値で右、負の値で左にオフセットします。
@parent mapImages

@param imageY
@text マップ画像Y軸
@default 0
@desc マップ画像の表示位置をY軸オフセットするピクセル量
正の値で下、負の値で上にオフセットします。
@parent mapImages

@param imageHight
@text マップ画像高さ
@default 84
@desc マップ画像の表示高さのピクセル量。枠高を超える値は無効になります。幅は高さから縦横比を保って算出されます。既定値:84
@parent mapImages

@param drawTitles
@text セーブタイトル

@param drawTitle
@text セーブタイトル表示
@type boolean
@on 表示
@off 非表示
@default false
@desc デフォルトでセーブ一覧に表示される「ファイル x」の表示切り替え
@parent drawTitles

@param titleX
@text セーブタイトルX軸
@default 0
@desc セーブタイトルの表示位置をX軸オフセットするピクセル量
正の値で右、負の値で左にオフセットします。既定値:0
@parent drawTitles

@param titleY
@text セーブタイトルY軸
@default 4
@desc セーブタイトルの表示位置をY軸オフセットするピクセル量
正の値で下、負の値で上にオフセットします。既定値:4
@parent drawTitles

@param titleWidth
@text セーブタイトル幅
@default 180
@desc セーブタイトルの表示幅のピクセル量
既定値:180
@parent drawTitles

@param drawMapNames
@text マップ名

@param drawMapName
@text マップ名表示
@type boolean
@on 表示
@off 非表示
@default true
@desc セーブデータに保存時のマップ名を表示するか指定します。
@parent drawMapNames

@param mapNameX
@text マップ名X軸
@default 0
@desc マップ名の表示位置をX軸オフセットするピクセル量
正の値で右、負の値で左にオフセットします。既定値:0
@parent drawMapNames

@param mapNameY
@text マップ名Y軸
@default 4
@desc マップ名の表示位置をY軸オフセットするピクセル量
正の値で下、負の値で上にオフセットします。既定値:4
@parent drawMapNames

@param mapNameWidth
@text マップ名幅
@default 568
@desc マップ名の表示幅のピクセル量
既定値:568
@parent drawMapNames

@param drawPartys
@text パーティキャラ

@param drawParty
@text パーティキャラ表示
@type boolean
@on 表示
@off 非表示
@default true
@desc セーブデータに保存時のパーティキャラを表示するか指定します。
@parent drawPartys

@param partyX
@text パーティキャラX軸
@default 220
@desc パーティキャラの表示位置をX軸オフセットするピクセル量
正の値で右、負の値で左にオフセットします。既定値:220
@parent drawPartys

@param partyY
@text パーティキャラY軸
@default -8
@desc パーティキャラの表示位置をY軸オフセットするピクセル量
正の値で下、負の値で上にオフセットします。既定値:-8
@parent drawPartys

@param playtimes
@text プレイ時間

@param playtime
@text プレイ時間表示
@type boolean
@on 表示
@off 非表示
@default true
@desc セーブデータに保存時のプレイ時間を表示するか指定します。
@parent playtimes

@param playtimeX
@text プレイ時間X軸
@default 0
@desc プレイ時間の表示位置をX軸オフセットするピクセル量
正の値で右、負の値で左にオフセットします。既定値:0
@parent playtimes

@param playtimeY
@text プレイ時間Y軸
@default 0
@desc プレイ時間の表示位置をY軸オフセットするピクセル量
正の値で下、負の値で上にオフセットします。既定値:0
@parent playtimes

@param playtimeWidth
@text プレイ時間幅
@default 760
@desc プレイ時間の表示幅のピクセル量
既定値:760
@parent playtimes
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




(function () {

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParams = PluginManager.parameters(pluginName);
    const Params = {};
    Params.fontSize = Number(pluginParams['fontSize'] || 26);

    Params.savefileBitmapScale = Number(pluginParams['imageScale'] || 0.15);
    Params.enableJpeg = String(pluginParams['enableJpeg']) === 'true';
    Params.imageX = Number(pluginParams['imageX'] || 0);
    Params.imageY = Number(pluginParams['imageY'] || 0);
    Params.imageHight = Number(pluginParams['imageHight'] || 84);

    Params.drawTitle = String(pluginParams['drawTitle']) === 'true';
    Params.titleX = Number(pluginParams['titleX'] || 0);
    Params.titleY = Number(pluginParams['titleY'] || 0);
    Params.titleWidth = Number(pluginParams['titleWidth'] || 180);

    Params.drawMapName = String(pluginParams['drawMapName']) === 'true';
    Params.mapNameX = Number(pluginParams['mapNameX'] || 0);
    Params.mapNameY = Number(pluginParams['mapNameY'] || 4);
    Params.mapNameWidth = Number(pluginParams['mapNameWidth'] || 568);

    Params.drawparty = String(pluginParams['drawParty']) === 'true';
    Params.partyX = Number(pluginParams['partyX'] || 220);
    Params.partyY = Number(pluginParams['partyY'] || 4);

    Params.playtime = String(pluginParams['playtime']) === 'true';
    Params.playtimeX = Number(pluginParams['playtimeX'] || 0);
    Params.playtimeY = Number(pluginParams['playtimeY'] || 0);
    Params.playtimeWidth = Number(pluginParams['playtimeWidth'] || 760);

    //-----------------------------------------------------------------------------
    // Bitmap

    /*
     * ビットマップを URL 表現に変換
     */
    Bitmap.prototype.toDataURL = function () {
        if (Params.enableJpeg) {
            // サイズが小さくなる方を返す
            // ※ サポート外の形式が指定されたら PNG になる仕様なので、
            //    変換結果が null 等になることはない
            const png = this._canvas.toDataURL('image/png');
            const jpeg = this._canvas.toDataURL('image/jpeg');
            return (png.length < jpeg.length) ? png : jpeg;
        } else {
            return this._canvas.toDataURL('image/png');
        }
    };

    //-----------------------------------------------------------------------------
    // DataManager

    const _KMS_SaveWithSnap_DataManager_loadSavefileImages = DataManager.loadSavefileImages;
    DataManager.loadSavefileImages = function (info) {
        _KMS_SaveWithSnap_DataManager_loadSavefileImages.call(this, info);
        if (info.snapUrl) {
            const hasEncryptedImages = Utils.hasEncryptedImages();
            Utils._hasEncryptedImages = false;
            ImageManager.loadBitmap(info.snapUrl);
            Utils._hasEncryptedImages = hasEncryptedImages;
        }
    };

    const _KMS_SaveWithSnap_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function () {
        const info = _KMS_SaveWithSnap_DataManager_makeSavefileInfo.call(this);
        const bitmap = this.makeSavefileBitmap();
        if (bitmap) {
            info.snapUrl = bitmap.toDataURL();
        }
        if (Params.drawMapName) {
            info.mapname = $gameMap.displayName();
        }
        return info;
    };

    /*
     * セーブファイル用のビットマップを作成
     */
    DataManager.makeSavefileBitmap = function () {
        const bitmap = $gameTemp.getSavefileBitmap();
        if (!bitmap) {
            return null;
        }
        const scale = Params.savefileBitmapScale;
        const newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
        newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);
        return newBitmap;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp

    const _KMS_SaveWithSnap_Game_Temp_initialize = Game_Temp.prototype.initialize;
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

    Window_SavefileList.prototype.drawItem = function (index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const rect = this.itemRectWithPadding(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(savefileId));
        if (info) {
            this.drawSnappedImage(info, rect);
            this.drawContents(info, rect);
        }
        this.drawTitle(savefileId, rect.x, rect.y + 4);
    };

    Window_SavefileList.prototype.drawTitle = function (savefileId, x, y) {
        if (Params.drawTitle) {
            if (savefileId === 0) {
                this.drawText(TextManager.autosave, x + Params.titleX, y + Params.titleX, Params.titleWidth);
            } else {
                this.drawText(TextManager.file + " " + savefileId, x + Params.titleY, y + Params.titleY, Params.titleWidth);
            }
        }
    };

    Window_SavefileList.prototype.drawContents = function (info, rect) {
        this.contents.fontSize = Params.fontSize;
        if (info) {
            if (info.mapname && Params.drawMapName) {
                this.drawText(info.mapname, rect.x + Params.mapNameX, rect.y + Params.mapNameY, Params.mapNameWidth);
            }
        }
        const bottom = rect.y + rect.height;
        if (Params.drawparty) {
            this.drawPartyCharacters(info, rect.x + Params.partyX, bottom + Params.partyY);
        }

        if (Params.playtime) {
            const lineHeight = this.lineHeight();
            const y2 = bottom - lineHeight - 4;
            if (y2 >= lineHeight) {
                this.drawPlaytime(info, rect.x + Params.playtimeX, y2 + Params.playtimeY, Params.playtimeWidth);
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
        const hasEncryptedImages = Utils.hasEncryptedImages();
        Utils._hasEncryptedImages = false;
        const bitmap = ImageManager.loadBitmapFromUrl(info.snapUrl);
        Utils._hasEncryptedImages = hasEncryptedImages;
        const dh = Params.imageHight < this.itemHeight() - 12 ? Params.imageHight : this.itemHeight() - 12;
        const dw = parseInt(bitmap.width * dh / bitmap.height);
        const dx = rect.x + Math.max(rect.width - dw - 120, 0) + Params.imageX;
        const dy = rect.y + 4 + Params.imageY;
        this.changePaintOpacity(true);
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
    };

})();