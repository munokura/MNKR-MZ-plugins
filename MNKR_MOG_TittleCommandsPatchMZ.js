//=============================================================================
// MNKR_MOG_TittleCommandsPatchMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc MOG_TitleCommands でセーブデータがない場合、画像の色相を変えたり、差し替えたり出来ます。
 * @author Moghunter
 * @base MOG_TitleCommands
 * @orderAfter MOG_TitleCommands
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MOG_TittleCommandsPatchMZ.js
 *
 * @help
 * 下記、MOG_TitleCommands のパッチプラグインです。
 * ============================================================================
 * +++ MOG - Title Picture Commands (v1.3) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ============================================================================
 * 利用規約は上記プラグインのものに従ってください。
 * 
 * 注意：
 * このプラグインの質問はムノクラへお願いいたします。
 * https://x.com/munokura/
 * 
 * 
 * セーブデータがない場合に、コンティニュー画像の表示を変更します。
 * 色調を変えたり、差し替えたり出来ます。
 *
 * 差し替える画像は下記のフォルダに保存してください。
 * img/titles2/
 *
 * 差し替える画像を指定した場合、色調変更の指定は無視されます。
 * 
 * 
 * @param replaceImage
 * @text コンティニュー不可時画像
 * @type file
 * @require 1
 * @dir img/titles2
 * @default
 * @desc セーブデータがない場合にコンティニューコマンドに表示する画像を指定します。
 * 
 * @param continueTone
 * @text コンティニュー画像色調
 * @type string
 * @desc セーブデータがない場合、コンティニューコマンド画像を変化させる色調です。赤,緑,青,グレー(0, 0, 0, 128)
 * @default 0, 0, 0, 128
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
