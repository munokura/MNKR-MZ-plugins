/*
 * --------------------------------------------------
 * MNKR_AddSeBattleRegenerate.js
 *   Ver.0.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddSeBattleRegenerate.js
@plugindesc You can add sound effects to slip damage and HP regeneration during battle.
@author example
@license MIT License

@help
Adds sound effects to slip damage and HP regeneration during battle.
Parameters will not be played if the sound effect file is not specified.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param slipDamageSe
@text Slip Damage Sound Effect
@desc Slip Damage SE Parameters
@type struct<sePram>
@default {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}

@param regenerateHpSe
@text HP Regen SE
@desc HP Regen SE parameters
@type struct<sePram>
@default {"name":"Heal3","volume":"90","pitch":"100","pan":"0"}
*/

/*~struct~sePram:
@param name
@text File name
@desc SE file name
@type file
@require 1
@dir audio/se/

@param volume
@text volume
@desc SE volume
@type number
@default 90
@max 100

@param pitch
@text pitch
@desc SE pitch
@type number
@default 100
@min 50
@max 150

@param pan
@text phase
@desc SE phase
@type number
@default 0
@min -100
@max 100
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddSeBattleRegenerate.js
@plugindesc 戦闘中のスリップダメージ・HPリジェネにSEを追加できます。
@author munokura

@help
戦闘中のスリップダメージ・HPリジェネにSEを追加できます。
SEのファイルが無指定のパラメーターは再生されません。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param slipDamageSe
@text スリップダメージSE
@desc スリップダメージSEのパラメータ
初期値: {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
@default {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
@type struct<sePram>

@param regenerateHpSe
@text HPリジェネSE
@desc HPリジェネSEのパラメータ
初期値: {"name":"Heal3","volume":"90","pitch":"100","pan":"0"}
@default {"name":"Heal3","volume":"90","pitch":"100","pan":"0"}
@type struct<sePram>
*/

/*~struct~sePram:ja
@param name
@text ファイル名
@default
@require 1
@dir audio/se/
@type file
@desc SEのファイル名

@param volume
@text 音量
@default 90
@type number
@max 100
@desc SEの音量

@param pitch
@text ピッチ
@default 100
@type number
@min 50
@max 150
@desc SEのピッチ

@param pan
@text 位相
@default 0
@type number
@min -100
@max 100
@desc SEの位相
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_slipDamageSe = JSON.parse(parameters['slipDamageSe'] || '{}');
  const PRM_regenerateHpSe = JSON.parse(parameters['regenerateHpSe'] || '{}');

  const hasSlipDamageSe = PRM_slipDamageSe.name !== '';
  const hasRegenerateHpSe = PRM_regenerateHpSe.name !== '';

  const _Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function () {
    if (this.isAlive()) {
      const hp = this.hp;
      _Game_Battler_regenerateAll.call(this);
      playRegenerateHpSe(this.hp - hp);
    }
  };

  function playRegenerateHpSe(differenceHp) {
    if (differenceHp !== 0) {
      if (differenceHp > 0 && hasRegenerateHpSe) {
        AudioManager.playSe(PRM_regenerateHpSe);
      }
      if (differenceHp < 0 && hasSlipDamageSe) {
        AudioManager.playSe(PRM_slipDamageSe);
      }
    }
  };

})();