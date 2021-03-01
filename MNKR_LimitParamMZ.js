/*
 * --------------------------------------------------
 * MNKR_LimitParamMZ.js
 *   Ver.0.0.1
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
 * @default 0
 * @desc 最大HPの下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerMp
 * @text 最大MP
 * @default 0
 * @desc 最大MPの下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerAtk
 * @text 攻撃力
 * @default 0
 * @desc 攻撃力の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerDef
 * @text 防御力
 * @default 0
 * @desc 防御力の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerMat
 * @text 魔法力
 * @default 0
 * @desc 魔法力の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerMdf
 * @text 魔法防御
 * @default 0
 * @desc 魔法防御の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerAgi
 * @text 俊敏性
 * @default 0
 * @desc 俊敏性の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 *
 * @param lowerLuk
 * @text 運
 * @default 0
 * @desc 運の下限値を指定します。
 * ツクールデフォルト : 0
 * @parent lowerParam
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);

  const upperHp = Math.ceil(Math.abs(parameters['upperHp'] || Infinity));
  const upperMp = Math.ceil(Math.abs(parameters['upperMp'] || Infinity));
  const upperAtk = Math.ceil(Math.abs(parameters['upperAtk'] || Infinity));
  const upperDef = Math.ceil(Math.abs(parameters['upperDef'] || Infinity));
  const upperMat = Math.ceil(Math.abs(parameters['upperMat'] || Infinity));
  const upperMdf = Math.ceil(Math.abs(parameters['upperMdf'] || Infinity));
  const upperAgi = Math.ceil(Math.abs(parameters['upperAgi'] || Infinity));
  const upperLuk = Math.ceil(Math.abs(parameters['upperLuk'] || Infinity));

  const lowerHp = Math.ceil(Math.abs(parameters['lowerHp'])) < upperHp ? Math.ceil(Math.abs(parameters['lowerHp'])) : upperHp;
  const lowerMp = Math.ceil(Math.abs(parameters['lowerMp'])) < upperMp ? Math.ceil(Math.abs(parameters['lowerMp'])) : upperMp;
  const lowerAtk = Math.ceil(Math.abs(parameters['lowerAtk'])) < upperAtk ? Math.ceil(Math.abs(parameters['lowerAtk'])) : upperAtk;
  const lowerDef = Math.ceil(Math.abs(parameters['lowerDef'])) < upperDef ? Math.ceil(Math.abs(parameters['lowerDef'])) : upperDef;
  const lowerMat = Math.ceil(Math.abs(parameters['lowerMat'])) < upperMat ? Math.ceil(Math.abs(parameters['lowerMat'])) : upperMat;
  const lowerMdf = Math.ceil(Math.abs(parameters['lowerMdf'])) < upperMdf ? Math.ceil(Math.abs(parameters['lowerMdf'])) : upperMdf;
  const lowerAgi = Math.ceil(Math.abs(parameters['lowerAgi'])) < upperAgi ? Math.ceil(Math.abs(parameters['lowerAgi'])) : upperAgi;
  const lowerLuk = Math.ceil(Math.abs(parameters['lowerLuk'])) < upperLuk ? Math.ceil(Math.abs(parameters['lowerLuk'])) : upperLuk;

  const _Game_BattlerBase_paramMax = Game_BattlerBase.prototype.paramMax;
  Game_BattlerBase.prototype.paramMax = function (paramId) {
    switch (paramId) {
      case 0:
        if (upperHp < 1) {
          return 1;
        }
        return upperHp;
      case 1:
        return upperMp;
      case 2:
        return upperAtk;
      case 3:
        return upperDef;
      case 4:
        return upperMat;
      case 5:
        return upperMdf;
      case 6:
        return upperAgi;
      case 7:
        return upperLuk;
    }
    return _Game_BattlerBase_paramMax.call(this, paramId);
  };

  const _Game_BattlerBase_paramMin = Game_BattlerBase.prototype.paramMin;
  Game_BattlerBase.prototype.paramMin = function (paramId) {
    switch (paramId) {
      case 0:
        if (lowerHp < 1) {
          return 1;
        }
        return lowerHp;
      case 1:
        return lowerMp;
      case 2:
        return lowerAtk;
      case 3:
        return lowerDef;
      case 4:
        return lowerMat;
      case 5:
        return lowerMdf;
      case 6:
        return lowerAgi;
      case 7:
        return lowerLuk;
    }
    return _Game_BattlerBase_paramMin.call(this, paramId);
  };

})();