//=============================================================================
// MNKR_MOG_TittleCommandsPatchMZ.js
//=============================================================================

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MOG_TittleCommandsPatchMZ.js
@plugindesc If there is no saved data, MOG_TitleCommands can change the hue of the image or replace it.
@author munokura
@license MIT License

@help
The following is a patch plugin for MOG_TitleCommands.
==============================================================================
+++ MOG - Title Picture Commands (v1.3) +++
By Moghunter
https://mogplugins.wordpress.com
=========================================================================================
Please follow the terms of use of the plugin above.

There are no plugin commands.

# Contact
Please contact the modifier for any inquiries.

Changes the continue image displayed when no save data is available.
You can change the color tone or replace the image.

Save the replacement image in the following folder:
img/titles2/

If you specify a replacement image, the color tone change setting will be
ignored.

@param replaceImage
@text Image when continue is not possible
@desc Specifies the image to display for the continue command when there is no saved data.
@type file
@require 1
@dir img/titles2

@param continueTone
@text Continuity image tone
@desc If there is no saved data, the color to change the continue command image to. Red, green, blue, gray (0, 0, 0, 128)
@type string
@default 0, 0, 0, 128
*/

/*:ja
@target MZ
@plugindesc MOG_TitleCommands でセーブデータがない場合、画像の色相を変えたり、差し替えたり出来ます。
@author Moghunter (改変:munokura)
@base MOG_TitleCommands
@orderAfter MOG_TitleCommands
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MOG_TittleCommandsPatchMZ.js

@help
下記、MOG_TitleCommands のパッチプラグインです。
============================================================================
+++ MOG - Title Picture Commands (v1.3) +++
By Moghunter
https://mogplugins.wordpress.com
============================================================================
利用規約は上記プラグインのものに従ってください。


プラグインコマンドはありません。


# 問い合わせ先
お問い合わせは改変者へお願いいたします。


セーブデータがない場合に、コンティニュー画像の表示を変更します。
色調を変えたり、差し替えたり出来ます。

差し替える画像は下記のフォルダに保存してください。
img/titles2/

差し替える画像を指定した場合、色調変更の指定は無視されます。


@param replaceImage
@text コンティニュー不可時画像
@type file
@require 1
@dir img/titles2
@default
@desc セーブデータがない場合にコンティニューコマンドに表示する画像を指定します。

@param continueTone
@text コンティニュー画像色調
@type string
@desc セーブデータがない場合、コンティニューコマンド画像を変化させる色調です。赤,緑,青,グレー(0, 0, 0, 128)
@default 0, 0, 0, 128
*/

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
const parameters = PluginManager.parameters(pluginName);

const param = {};
param.replaceImage = parameters['replaceImage'] || '';
param.continueTone = parameters[['continueTone']] || [0, 0, 0, 0];

//==============================
// * Prepare Bitmap Patch by munokura
//==============================
const _TpictureCom_prepareBitmap = TpictureCom.prototype.prepareBitmap;
TpictureCom.prototype.prepareBitmap = function () {
	const hasReplaceImage = param.replaceImage ? true : false;
	const name = hasReplaceImage ? param.replaceImage : "Command_" + String(this._index);
	if (this._index === 1 && !DataManager.isAnySavefileExists()) {
		if (hasReplaceImage) {
			this.bitmap = ImageManager.loadTitle2(name);
		} else {
			this.blendMode = 1;
			this.setBlendColor([0, 0, 0, 128]);
			this.bitmap = ImageManager.loadTitle2(name);
		}
	} else {
		_TpictureCom_prepareBitmap.call(this);
	}
};