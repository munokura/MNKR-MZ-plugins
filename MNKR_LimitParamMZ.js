/*
 * --------------------------------------------------
 * MNKR_LimitParamMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LimitParamMZ.js
 * @plugindesc 基本能力値の上限値と下限値を指定します。
 * @author munokura
 *
 * @help
 * 基本能力値の上限値と下限値を指定します。
 * RPGツクールMZのデフォルトでは上限はInfinity（無限）です。
 * 
 * 注意
 *   下限値の指定は上限値より大きくしないでください。
 *   その場合、下限値は上限値と同じになります。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param upperParam
 * @text 能力値上限
 *
 * @param upperHp
 * @text 最大HP
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 最大HPの上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperMp
 * @text 最大MP
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 最大MPの上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperAtk
 * @text 攻撃力
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 攻撃力の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperDef
 * @text 防御力
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 防御力の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperMat
 * @text 魔法力
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 魔法力の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperMdf
 * @text 魔法防御
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 魔法防御の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperAgi
 * @text 俊敏性
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 俊敏性の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param upperLuk
 * @text 運
 * @default Infinity
 * @type combo
 * @option Infinity
 * @desc 運の上限値を指定します。
 * ツクールデフォルト : Infinity（無限）
 * @parent upperParam
 *
 * @param lowerParam
 * @text 能力値下限
 *
 * @param lowerHp
 * @text 最大HP
 * @default 1
 * @desc 最大HPの下限値を指定します。
 * ツクールデフォルト : 1
 * @type number
 * @min 1
 * @parent lowerParam
 *
 * @param lowerMp
 * @text 最大MP
 * @default 0
 * @desc 最大MPの下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerAtk
 * @text 攻撃力
 * @default 0
 * @desc 攻撃力の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerDef
 * @text 防御力
 * @default 0
 * @desc 防御力の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerMat
 * @text 魔法力
 * @default 0
 * @desc 魔法力の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerMdf
 * @text 魔法防御
 * @default 0
 * @desc 魔法防御の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerAgi
 * @text 俊敏性
 * @default 0
 * @desc 俊敏性の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 *
 * @param lowerLuk
 * @text 運
 * @default 0
 * @desc 運の下限値を指定します。
 * ツクールデフォルト : 0
 * @type number
 * @parent lowerParam
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);

  const PRM_upperHp = Math.ceil(Math.abs(parameters['upperHp'] || Infinity));
  const PRM_upperMp = Math.ceil(Math.abs(parameters['upperMp'] || Infinity));
  const PRM_upperAtk = Math.ceil(Math.abs(parameters['upperAtk'] || Infinity));
  const PRM_upperDef = Math.ceil(Math.abs(parameters['upperDef'] || Infinity));
  const PRM_upperMat = Math.ceil(Math.abs(parameters['upperMat'] || Infinity));
  const PRM_upperMdf = Math.ceil(Math.abs(parameters['upperMdf'] || Infinity));
  const PRM_upperAgi = Math.ceil(Math.abs(parameters['upperAgi'] || Infinity));
  const PRM_upperLuk = Math.ceil(Math.abs(parameters['upperLuk'] || Infinity));

  const PRM_lowerHp = lowerCheck(parameters['lowerHp'], PRM_upperHp);
  const PRM_lowerMp = lowerCheck(parameters['lowerMp'], PRM_upperMp);
  const PRM_lowerAtk = lowerCheck(parameters['lowerAtk'], PRM_upperAtk);
  const PRM_lowerDef = lowerCheck(parameters['lowerDef'], PRM_upperDef);
  const PRM_lowerMat = lowerCheck(parameters['lowerMat'], PRM_upperMat);
  const PRM_lowerMdf = lowerCheck(parameters['lowerMdf'], PRM_upperMdf);
  const PRM_lowerAgi = lowerCheck(parameters['lowerAgi'], PRM_upperAgi);
  const PRM_lowerLuk = lowerCheck(parameters['lowerLuk'], PRM_upperLuk);

  function lowerCheck(lowValue, highValue) {
    const lowParam = Number(lowValue);
    return lowParam < highValue ? lowParam : highValue;
  }

  const _Game_BattlerBase_paramMax = Game_BattlerBase.prototype.paramMax;
  Game_BattlerBase.prototype.paramMax = function (paramId) {
    switch (paramId) {
      case 0:
        if (PRM_upperHp < 1) {
          return 1;
        }
        return PRM_upperHp;
      case 1:
        return PRM_upperMp;
      case 2:
        return PRM_upperAtk;
      case 3:
        return PRM_upperDef;
      case 4:
        return PRM_upperMat;
      case 5:
        return PRM_upperMdf;
      case 6:
        return PRM_upperAgi;
      case 7:
        return PRM_upperLuk;
    }
    return _Game_BattlerBase_paramMax.call(this, paramId);
  };

  const _Game_BattlerBase_paramMin = Game_BattlerBase.prototype.paramMin;
  Game_BattlerBase.prototype.paramMin = function (paramId) {
    switch (paramId) {
      case 0:
        if (PRM_lowerHp < 1) {
          return 1;
        }
        return PRM_lowerHp;
      case 1:
        return PRM_lowerMp;
      case 2:
        return PRM_lowerAtk;
      case 3:
        return PRM_lowerDef;
      case 4:
        return PRM_lowerMat;
      case 5:
        return PRM_lowerMdf;
      case 6:
        return PRM_lowerAgi;
      case 7:
        return PRM_lowerLuk;
    }
    return _Game_BattlerBase_paramMin.call(this, paramId);
  };

})();
