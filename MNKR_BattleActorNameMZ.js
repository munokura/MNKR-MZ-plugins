/*
 * --------------------------------------------------
 * MNKR_BattleActorNameMZ.js
 *   Ver.0.1.0
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleActorNameMZ.js
 * @plugindesc 戦闘ステータスウィンドウ内アクター名のフォントを変更します。
 * @author munokura
 *
 * @help
 * 戦闘ステータスウィンドウ内アクター名のフォントを変更します。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param fontSize
 * @text フォントサイズ
 * @default 26
 * @desc アクター名のフォントサイズ
 * ツクールデフォルト:26
 * 
 * @param textColor
 * @text テキスト色
 * @default #ffffff
 * @desc アクター名のテキスト色。HEXで指定
 * ツクールデフォルト:#ffffff
 * 
 * @param outlineWidth
 * @text アウトライン幅
 * @default 3
 * @desc アクター名のテキストアウトライン幅
 * ツクールデフォルト:3
 * 
 * @param outlineColor
 * @text アウトライン色
 * @default {"red":"0","green":"0","blue":"0","alpha":"60"}
 * @desc アクター名のテキストアウトライン色。RGBAで指定
 * ツクールデフォルト:0, 0, 0, 60
 * @type struct<RGBA>
 */
/*~struct~RGBA:
 * @param red
 * @text 赤
 * @default 0
 * @desc RGBAのR。0-255
 * @type number
 * @max 255
 *
 * @param green
 * @text 緑
 * @default 0
 * @desc RGBAのG。0-255
 * @type number
 * @max 255
 *
 * @param blue
 * @text 青
 * @default 0
 * @desc RGBAのB。0-255
 * @type number
 * @max 255
 *
 * @param alpha
 * @text 不透明度
 * @default 60
 * @desc RGBAのA。不透明度。0-100
 * @type number
 * @max 100
 *
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_fontSize = Number(parameters['fontSize'] || 26);
  const PRM_textColor = parameters['textColor'] || '#ffffff';
  const PRM_outlineWidth = Number(parameters['outlineWidth'] || 3);
  const PRM_outlineColorJson = JSON.parse(parameters['outlineColor']);
  const PRM_outlineColor = 'rgba(' +
    (PRM_outlineColorJson.red, PRM_outlineColorJson.green, PRM_outlineColorJson.blue, PRM_outlineColorJson.alpha / 100)
    + ')';

  const _Sprite_Name_setupFont = Sprite_Name.prototype.setupFont;
  Sprite_Name.prototype.setupFont = function () {
    _Sprite_Name_setupFont.call(this);
    this.bitmap.fontSize = PRM_fontSize;
    this.bitmap.textColor = PRM_textColor;
    this.bitmap.outlineColor = PRM_outlineColor;
    this.bitmap.outlineWidth = PRM_outlineWidth;
  };

})();