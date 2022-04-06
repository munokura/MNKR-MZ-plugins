/*
 * --------------------------------------------------
 * MNKR_CalcTpbInit.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CalcTpbInit.js
 * @plugindesc TPB戦闘開始時のチャージ値を指定できます。
 * @author munokura
 *
 * @help
 * デフォルトでは、TPB戦闘開始時に行動順を決めるチャージ値が、
 * バトラーの俊敏性にランダム値が加算された値になっています。
 * 
 * このプラグインを導入すると、TPB戦闘開始時のみ下記の動作になります。
 * 1.チャージ初期値のランダム値加算が無くなる。
 * 2.各メモ欄にタグで値を指定した合計値が初期値に反映される。
 * 3.初期値から俊敏性によって、チャージが溜まっていく。
 * 
 * 
 * 下記のタグをアクター・職業・武器・防具・敵キャラのメモ欄に入力してください。
 * <MNKR_CalcTpbInit:数値>
 * 
 * 例
 * <MNKR_CalcTpbInit:10>
 * <MNKR_CalcTpbInit:-5>
 * 
 * アクターは関係する全てのタグの合計値が結果に反映されます。
 * プラグインパラメーターで、チャージの最大値を指定してください。
 * タグの合計値を最大値で割った割合が初期値になります。
 * 
 * 例
 * 1000を指定した場合、タグの合計値が500の場合にチャージの半分
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param maxInit
 * @text タグ最大値
 * @type number
 * @min 1
 * @default 1000
 * @desc タグの合計値を最大値で割った割合が初期値になります。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_maxInit = Number(parameters['maxInit'] || 1);

  const _Game_Battler_initTpbChargeTime = Game_Battler.prototype.initTpbChargeTime;
  Game_Battler.prototype.initTpbChargeTime = function (advantageous) {
    _Game_Battler_initTpbChargeTime.call(this, advantageous);

    let totalCharge = 0;
    if (this.isActor()) {
      const actorCharge = Number(this.actor().meta.MNKR_CalcTpbInit || 0);
      const classCharge = Number(this.currentClass().meta.MNKR_CalcTpbInit || 0);

      const weaponsArray = $gameActors.actor(this.actorId()).weapons();
      let weaponsCharge = 0;
      weaponsArray.forEach(element => weaponsCharge += Number(element.meta.MNKR_CalcTpbInit || 0));

      const armorsArray = $gameActors.actor(this.actorId()).armors();
      let armorsCharge = 0;
      armorsArray.forEach(element => armorsCharge += Number(element.meta.MNKR_CalcTpbInit || 0));

      totalCharge = actorCharge + classCharge + weaponsCharge + armorsCharge;
    } else {
      const enemyCharge = Number(this.enemy().meta.MNKR_CalcTpbInit || 0);
      totalCharge = enemyCharge;
    }
    this._tpbChargeTime = totalCharge / PRM_maxInit;
    if (this.isRestricted()) {
      this._tpbChargeTime = 0;
    }

  };

})();
