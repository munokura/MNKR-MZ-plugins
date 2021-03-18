/*
 * --------------------------------------------------
 * MNKR_BattleActorNameMZ.js
 *   Ver.0.0.1
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
 * @param outlineColor
 * @text アウトライン色
 * @default 0, 0, 0, 0.6
 * @desc アクター名のテキストアウトライン色。RGBAで指定
 * ツクールデフォルト:0, 0, 0, 0.6
 * 
 * @param outlineWidth
 * @text アウトライン幅
 * @default 3
 * @desc アクター名のテキストアウトライン幅
 * ツクールデフォルト:3
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const fontSize = Number(parameters['fontSize'] || '#ffffff');
  const textColor = parameters['textColor'] || 26;
  const outlineColor = 'rgba(' + (parameters['outlineColor'] || '0, 0, 0, 0.6') + ')';
  const outlineWidth = Number(parameters['outlineWidth'] || 3);

  const _Sprite_Name_setupFont = Sprite_Name.prototype.setupFont;
  Sprite_Name.prototype.setupFont = function () {
    _Sprite_Name_setupFont.call(this);
    this.bitmap.fontSize = fontSize;
    this.bitmap.textColor = textColor;
    this.bitmap.outlineColor = outlineColor;
    this.bitmap.outlineWidth = outlineWidth;
  };

})();