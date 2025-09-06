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
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LimitParamMZ.js
@plugindesc Specify the upper and lower limits of basic ability scores.
@author munokura
@license MIT License

@help
# Function
Specifies the upper and lower limits of basic ability scores.
By default, the upper limit in RPG Maker MZ is set to infinity.

## Note
Do not specify a lower limit greater than the upper limit.
In that case, the lower limit will be the same as the upper limit.

There is no plugin command.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param upperParam
@text Ability Score Limit

@param upperHp
@text Max HP
@desc Specifies the upper limit of maximum HP.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperMp
@text Max MP
@desc Specifies the upper limit of maximum MP.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperAtk
@text Attack Power
@desc Specifies the upper limit of attack power.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperDef
@text Defense power
@desc Specifies the upper limit of defense power.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperMat
@text magic power
@desc Specifies the upper limit of magical power.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperMdf
@text magic defense
@desc Specifies the upper limit of magic defense.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperAgi
@text Agility
@desc Specifies the upper limit for agility.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param upperLuk
@text luck
@desc Specifies the upper limit of luck.
@type combo
@default Infinity
@option Infinity
@parent upperParam

@param lowerParam
@text Ability Score Lower Limit

@param lowerHp
@text Max HP
@desc Specifies the lower limit of maximum HP.
@type number
@default 1
@min 1
@parent lowerParam

@param lowerMp
@text Max MP
@desc Specifies the lower limit of maximum MP.
@type number
@default 0
@parent lowerParam

@param lowerAtk
@text Attack Power
@desc Specifies the minimum attack power.
@type number
@default 0
@parent lowerParam

@param lowerDef
@text Defense power
@desc Specifies the lower limit of defense power.
@type number
@default 0
@parent lowerParam

@param lowerMat
@text magic power
@desc Specifies the minimum value of magic power.
@type number
@default 0
@parent lowerParam

@param lowerMdf
@text magic defense
@desc Specifies the lower limit of magic defense.
@type number
@default 0
@parent lowerParam

@param lowerAgi
@text Agility
@desc Specifies the lower limit for agility.
@type number
@default 0
@parent lowerParam

@param lowerLuk
@text luck
@desc Specifies the lower limit of luck.
@type number
@default 0
@parent lowerParam
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LimitParamMZ.js
@plugindesc 基本能力値の上限値と下限値を指定します。
@author munokura

@help
# 機能
基本能力値の上限値と下限値を指定します。
RPGツクールMZのデフォルトでは上限はInfinity（無限）です。

## 注意
下限値の指定は上限値より大きくしないでください。
その場合、下限値は上限値と同じになります。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param upperParam
@text 能力値上限

@param upperHp
@text 最大HP
@default Infinity
@type combo
@option Infinity
@desc 最大HPの上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperMp
@text 最大MP
@default Infinity
@type combo
@option Infinity
@desc 最大MPの上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperAtk
@text 攻撃力
@default Infinity
@type combo
@option Infinity
@desc 攻撃力の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperDef
@text 防御力
@default Infinity
@type combo
@option Infinity
@desc 防御力の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperMat
@text 魔法力
@default Infinity
@type combo
@option Infinity
@desc 魔法力の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperMdf
@text 魔法防御
@default Infinity
@type combo
@option Infinity
@desc 魔法防御の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperAgi
@text 俊敏性
@default Infinity
@type combo
@option Infinity
@desc 俊敏性の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param upperLuk
@text 運
@default Infinity
@type combo
@option Infinity
@desc 運の上限値を指定します。
ツクールデフォルト : Infinity（無限）
@parent upperParam

@param lowerParam
@text 能力値下限

@param lowerHp
@text 最大HP
@default 1
@desc 最大HPの下限値を指定します。
ツクールデフォルト : 1
@type number
@min 1
@parent lowerParam

@param lowerMp
@text 最大MP
@default 0
@desc 最大MPの下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerAtk
@text 攻撃力
@default 0
@desc 攻撃力の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerDef
@text 防御力
@default 0
@desc 防御力の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerMat
@text 魔法力
@default 0
@desc 魔法力の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerMdf
@text 魔法防御
@default 0
@desc 魔法防御の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerAgi
@text 俊敏性
@default 0
@desc 俊敏性の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam

@param lowerLuk
@text 運
@default 0
@desc 運の下限値を指定します。
ツクールデフォルト : 0
@type number
@parent lowerParam
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