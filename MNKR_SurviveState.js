/*
 * --------------------------------------------------
 * MNKR_SurviveState.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SurviveState.js
 * @plugindesc ふんばりステートを作成できます。
 * @author munokura
 *
 * @help
 * ふんばりステートを作成できます。
 * 
 * -- ふんばりステートとは --
 * 攻撃を受け戦闘不能になる場合に、一度だけHPを1残すステートです。
 * 一度、使用するとステートは解除されます。
 * 他の設定はデータベースのステートの設定に従います。
 * 
 * プラグインパラメーターでステートを指定してください。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param surviveStateId
 * @text ふんばりステート
 * @desc ふんばりステートとして扱うステートを指定します。
 * @type state
 * @default 0
 *
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_surviveStateId = Number(parameters['surviveStateId'] || 0);

  const _Game_Battler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function () {
    Game_BattlerBase.prototype.refresh.call(this);
    const battlerStates = this._states;
    const hasSurviveState = battlerStates.find(value => value === PRM_surviveStateId);
    if (hasSurviveState && this.hp === 0) {
      this.setHp(1);
      this.removeState(PRM_surviveStateId);
    } else {
      _Game_Battler_refresh.call(this);
    }
  };

})();
