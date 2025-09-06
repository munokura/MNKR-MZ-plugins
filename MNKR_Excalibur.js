/*
 * --------------------------------------------------
 * MNKR_Excalibur.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_Excalibur.js
@plugindesc Make the key to the promised victory.
@author munokura
@license MIT License

@help
Pressing the victory key during battle
inflicts the "Incapacitated" state on all enemies and ends the turn.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param activation
@text Activation Switch ID
@desc This is the switch that enables the function. It is enabled when ON. If not specified, it is always enabled.
@type switch
@default 0

@param Excalibur Key
@text Winning Key
@desc Specify the key to win. You can also set keys other than the options.
@type select
@default pagedown
@option Tab
@value tab
@option A button / Enter / Space / Z
@value ok
@option X button / Shift
@value shift
@option Control / Alt
@value control
@option Escape / Numpad 0 / X / Insert
@value escape
@option RB button / Page down / W
@value pagedown
@option LB button / Page up / Q
@value pageup
@option Down button / Cursor down / Numeric keypad 2
@value down
@option Left button / Cursor left / Numeric keypad 4
@value left
@option Right button / Cursor right / Numeric keypad 6
@value right
@option Up button / Cursor up / Numeric keypad 8
@value up
@option F9
@value debug
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_Excalibur.js
@plugindesc 約束された勝利のキーを作ります。
@author munokura

@help
戦闘中に勝利キーを押すと、
敵全体に「戦闘不能」ステートを付与し、ターン終了へ移行します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param activation
@text 有効化スイッチID
@type switch
@desc 機能を有効化するスイッチです。ONの時に有効化されます。指定しない場合、常に有効化されます。
@default 0

@param Excalibur Key
@text 勝利キー
@desc 勝利するキーを指定します。選択肢以外のキーも設定できます。
@type select
@option Tab
@value tab
@option Aボタン / Enter / スペース / Z
@value ok
@option Xボタン / Shift
@value shift
@option Control / Alt
@value control
@option Escape / テンキー0 / X / Insert
@value escape
@option RBボタン / Pagedown / W
@value pagedown
@option LBボタン / Pageup / Q
@value pageup
@option 下ボタン / カーソル下 / テンキー2
@value down
@option 左ボタン / カーソル左 / テンキー4
@value left
@option 右ボタン / カーソル右 / テンキー6
@value right
@option 上ボタン / カーソル上 / テンキー8
@value up
@option F9
@value debug
@default pagedown
*/

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const activation = Number(parameters['activation'] || 0);
  const excaliburKey = String(parameters['Excalibur Key'] || 'pagedown');

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    if (Input.isTriggered(excaliburKey) && (activation === 0 || $gameSwitches.value(activation))) {
      $gameTroop.members().forEach(function (enemy) {
        enemy.addState(1);
      });
      this._skillWindow.hide();
      this._skillWindow.deactivate();
      this._itemWindow.hide();
      this._itemWindow.deactivate();
      this._actorWindow.hide();
      this._actorWindow.deactivate();
      this._enemyWindow.hide();
      this._enemyWindow.deactivate();
      this._actorCommandWindow.deactivate();
      this._partyCommandWindow.deactivate();
      BattleManager.endTurn();
    }
  };

})();