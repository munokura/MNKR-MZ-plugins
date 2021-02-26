/*
 * --------------------------------------------------
 * MNKR_StatusMenuExMZ.js
 *   Ver.0.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_StatusMenuExMZ.js
 * @plugindesc ステータスシーンに表示するパラメータを追加します。
 * @author munokura
 *
 * @help
 * ステータスシーンに表示するパラメータを追加します。
 *
 * プラグインコマンドはありません。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * 
 * @param statusParamsWindowWidth
 * @text 能力値ウィンドウ幅
 * @desc 能力値を表示するウィンドウの幅
 * 初期値: 384
 * @type number
 * @default 384
 * 
 * @param paramFontSize
 * @text 能力値フォントサイズ
 * @desc 能力値を表示するフォントサイズ
 * 初期値: 18
 * @type number
 * @default 18
 * 
 * @param paramLineHeight
 * @text 能力値改行高
 * @desc 能力値を表示する行間高
 * 初期値: 21
 * @type number
 * @default 21
 * 
 * @param paramList
 * @text 表示通常能力値
 * @type string
 * @desc 表示する表示通常番号(カンマ区切りで10項目)
 * 初期値: 2,3,4,5,6,7
 * @default 2,3,4,5,6,7
 *
 * @param xparamText
 * @text 追加能力値の項目名
 * @desc 追加能力値の項目名(カンマ区切りで10項目)
 * 初期値: 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,…
 * @default 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,HP再生,MP再生,TP再生
 * 
 * @param sparamText
 * @text 特殊能力値の項目名
 * @desc 特殊能力値の項目名(カンマ区切りで10項目)
 * 初期値: 狙われ率,防御効果,回復効果,薬の知識,MP消費,…
 * @default 狙われ率,防御効果,回復効果,薬の知識,MP消費,TPチャージ,,,床ダメージ,経験値獲得
 * 
 * @param paramNameX
 * @text 通常能力名X座標
 * @desc 通常能力名の表示X座標
 * 初期値: 0
 * @type number
 * @default 0
 * 
 * @param paramNameWidth
 * @text 通常能力名の幅
 * @desc 通常能力名の表示幅
 * 初期値: 70
 * @type number
 * @default 70
 * 
 * @param paramX
 * @text 通常能力値X座標
 * @desc 通常能力値の表示X座標
 * 初期値: 60
 * @type number
 * @default 60
 * 
 * @param paramWidth
 * @text 通常能力値の幅
 * @desc 通常能力値の表示幅
 * 初期値: 50
 * @type number
 * @default 50
 * 
 * @param xparamNameX
 * @text 追加能力値名X座標
 * @desc 追加能力値名の表示X座標
 * 初期値: 120
 * @type number
 * @default 120
 * 
 * @param xparamNameWidth
 * @text 追加能力値名の幅
 * @desc 追加能力値名の表示幅
 * 初期値: 70
 * @type number
 * @default 70
 * 
 * @param xparamX
 * @text 追加能力値X座標
 * @desc 追加能力値の表示X座標
 * 初期値: 180
 * @type number
 * @default 180
 * 
 * @param xparamWidth
 * @text 追加能力値の幅
 * @desc 追加能力値の表示幅
 * 初期値: 50
 * @type number
 * @default 50
 * 
 * @param sparamNameX
 * @text 特殊能力値名X座標
 * @desc 特殊能力値名の表示X座標
 * 初期値: 240
 * @type number
 * @default 240
 * 
 * @param sparamNameWidth
 * @text 特殊能力値名の幅
 * @desc 特殊能力値名の表示幅
 * 初期値: 70
 * @type number
 * @default 70
 * 
 * @param sparamX
 * @text 特殊能力値X座標
 * @desc 特殊能力値の表示X座標
 * 初期値: 300
 * @type number
 * @default 300
 * 
 * @param sparamWidth
 * @text 特殊能力値の幅
 * @desc 特殊能力値の表示幅
 * 初期値: 50
 * @type number
 * @default 50
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const statusParamsWindowWidth = +parameters['statusParamsWindowWidth'];
  const paramFontSize = +parameters['paramFontSize'];
  const paramLineHeight = +parameters['paramLineHeight'];
  const paramList = parameters['paramList'].split(',');
  const xparamText = parameters['xparamText'].split(',');
  const sparamText = parameters['sparamText'].split(',');
  const paramNameX = +parameters['paramNameX'];
  const paramNameWidth = +parameters['paramNameWidth'];
  const paramX = +parameters['paramX'];
  const paramWidth = +parameters['paramWidth'];
  const xparamNameX = +parameters['xparamNameX'];
  const xparamNameWidth = +parameters['xparamNameWidth'];
  const xparamX = +parameters['xparamX'];
  const xparamWidth = +parameters['xparamWidth'];
  const sparamNameX = +parameters['sparamNameX'];
  const sparamNameWidth = +parameters['sparamNameWidth'];
  const sparamX = +parameters['sparamX'];
  const sparamWidth = +parameters['sparamWidth'];

  Window_StatusParams.prototype.maxItems = function () {
    const maxlist = Math.max(paramList.length, xparamText.length, sparamText.length);
    return maxlist;
  };

  Window_StatusParams.prototype.itemHeight = function () {
    return paramLineHeight;
  };

  Window_StatusParams.prototype.drawItem = function (index) {

    this.contents.fontSize = paramFontSize;

    const rect = this.itemLineRect(index);
    const paramId = index;
    const name = TextManager.param(paramList[paramId]);

    if (name) {
      const value = this._actor.param(paramList[paramId]);

      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, paramNameX, rect.y, paramNameWidth);
      this.resetTextColor();
      this.drawText(value, paramX, rect.y, paramWidth, "right");
    }

    const xparamId = index;
    const xname = xparamText[xparamId];
    if (xname) {
      const xvalue = this._actor.xparam(xparamId) * 100;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText(xname, xparamNameX, rect.y, xparamNameWidth);
      this.resetTextColor();
      this.drawText(xvalue + '%', xparamX, rect.y, xparamWidth, "right");
    }

    const sparamId = index;
    const sname = sparamText[sparamId];
    if (sname) {

      const svalue = this._actor.sparam(sparamId) * 100;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText(sname, sparamNameX, rect.y, sparamNameWidth);
      this.resetTextColor();
      this.drawText(svalue + '%', sparamX, rect.y, sparamWidth, "right");
    }
  };

  Scene_Status.prototype.statusParamsWidth = function () {
    return statusParamsWindowWidth;
  };

})();