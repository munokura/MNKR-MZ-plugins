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
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CalcTpbInit.js
@plugindesc You can specify the charge value at the start of a TPB battle.
@author example
@license MIT License

@help
By default, the charge value that determines the order of actions at the start
of a TPB battle is
the battler's agility plus a random value.

When this plugin is installed, the following behavior will occur only at the
start of a TPB battle:
1. The random value addition to the initial charge value will be removed.
2. The initial value will be reflected as the sum of the values specified by
tags in each memo field.
3. Charge will accumulate from the initial value based on agility.

Enter the following tags in the memo fields for actors, classes, weapons,
armor, and enemy characters.
<MNKR_CalcTpbInit:Number>

Example
<MNKR_CalcTpbInit:10>
<MNKR_CalcTpbInit:-5>

For actors, the sum of all relevant tags will be reflected in the result.
Specify the maximum charge value in the plugin parameters.
The initial value will be the percentage obtained by dividing the total tag
value by the maximum value.

Example
If you specify 1000, half the charge will be applied if the total tag value is
500.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param maxInit
@text Tag Maximum Value
@desc The initial value is the ratio of the total tag value divided by the maximum value.
@type number
@default 1000
@min 1
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CalcTpbInit.js
@plugindesc TPB戦闘開始時のチャージ値を指定できます。
@author munokura

@help
デフォルトでは、TPB戦闘開始時に行動順を決めるチャージ値は、
バトラーの俊敏性にランダム値が加算された値になっています。

このプラグインを導入すると、TPB戦闘開始時のみ下記の動作になります。
1.チャージ初期値のランダム値加算が無くなる。
2.各メモ欄にタグで値を指定した合計値が初期値に反映される。
3.初期値から俊敏性によって、チャージが溜まっていく。


下記のタグをアクター・職業・武器・防具・敵キャラのメモ欄に入力してください。
<MNKR_CalcTpbInit:数値>

例
<MNKR_CalcTpbInit:10>
<MNKR_CalcTpbInit:-5>

アクターは関係する全てのタグの合計値が結果に反映されます。
プラグインパラメーターで、チャージの最大値を指定してください。
タグの合計値を最大値で割った割合が初期値になります。

例
1000を指定した場合、タグの合計値が500の場合にチャージの半分


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param maxInit
@text タグ最大値
@type number
@min 1
@default 1000
@desc タグの合計値を最大値で割った割合が初期値になります。
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