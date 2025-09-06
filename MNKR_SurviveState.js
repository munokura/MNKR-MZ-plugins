/*
 * --------------------------------------------------
 * MNKR_SurviveState.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SurviveState.js
@plugindesc You can create a clenched state.
@author example
@license MIT License

@help
You can create a clenched state.

# What is the clenched state?
This state leaves 1 HP when an attack incapacitates the character.
Once used, the state is canceled.
Other settings will be determined by the state settings in the database.

Specify the state using the plugin parameters.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param surviveStateId
@text Clenched State
@desc Specifies the state to treat as a clenched state.
@type state
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SurviveState.js
@plugindesc くいしばりステートを作成できます。
@author ムノクラ

@help
くいしばりステートを作成できます。

# くいしばりステートとは
攻撃を受け戦闘不能になる場合に、一度だけHPを1残すステートです。
一度、使用するとステートは解除されます。
他の設定はデータベースのステートの設定に従います。

プラグインパラメーターでステートを指定してください。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param surviveStateId
@text くいしばりステート
@desc くいしばりステートとして扱うステートを指定します。
@type state
@default 0
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_surviveStateId = Number(parameters['surviveStateId'] || 0);

  const _Game_Battler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function () {
    Game_BattlerBase.prototype.refresh.call(this);
    const battlerStatesArray = this._states;
    const hasSurviveState = battlerStatesArray.find(value => value === PRM_surviveStateId);
    if (hasSurviveState && this.hp === 0) {
      this.setHp(1);
      this.removeState(PRM_surviveStateId);
    } else {
      _Game_Battler_refresh.call(this);
    }
  };

})();