/*
 * --------------------------------------------------
 * MNKR_AddSeBattleRegenerateMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddSeBattleRegenerateMZ.js
 * @plugindesc 戦闘中のスリップダメージ・HPリジェネにSEを追加できます。
 * @author munokura
 *
 * @help
 * 戦闘中のスリップダメージ・HPリジェネにSEを追加できます。
 * SEのファイルが無指定のパラメーターは再生されません。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param slipDamageSe
 * @text スリップダメージSE
 * @desc スリップダメージSEのパラメータ
 * 初期値: {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
 * @default {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
 * @type struct<sePram>
 * 
 * @param regenerateHpSe
 * @text HPリジェネSE
 * @desc HPリジェネSEのパラメータ
 * 初期値: {"name":"Heal3","volume":"90","pitch":"100","pan":"0"}
 * @default {"name":"Heal3","volume":"90","pitch":"100","pan":"0"}
 * @type struct<sePram>
 */

/*~struct~sePram:
 * @param name
 * @text ファイル名
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 * @desc SEのファイル名
 *
 * @param volume
 * @text 音量
 * @default 90
 * @type number
 * @max 100
 * @desc SEの音量
 *
 * @param pitch
 * @text ピッチ
 * @default 100
 * @type number
 * @min 50
 * @max 150
 * @desc SEのピッチ
 *
 * @param pan
 * @text 位相
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * @desc SEの位相
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const slipDamageSe = JSON.parse(parameters['slipDamageSe'] || '{}');
  const regenerateHpSe = JSON.parse(parameters['regenerateHpSe'] || '{}');

  const setUpSlipDamageSe = (slipDamageSe.name !== '');
  const setUpRegenerateHpSe = (regenerateHpSe.name !== '');

  const _Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function () {
    if (this.isAlive()) {
      const hp = this.hp;
      _Game_Battler_regenerateAll.call(this);
      this.regenerateHpSe(this.hp - hp);
    }
  };

  Game_Battler.prototype.regenerateHpSe = function (value) {
    if (value !== 0) {
      if (value > 0 && setUpRegenerateHpSe) {
        AudioManager.playSe(regenerateHpSe);
      }
      if (value < 0 && setUpSlipDamageSe) {
        AudioManager.playSe(slipDamageSe);
      }
    }
  };

})();