/*
 * --------------------------------------------------
 * MNKR_Excalibur Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_Excalibur.js
 * @plugindesc 約束された勝利のキーを作ります。
 * @author munokura
 *
 * @help
 * 戦闘中に指定キーを押すと、敵全体に「戦闘不能」ステートを付与し、勝利画面へ移行します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param activation
 * @text 有効化スイッチID
 * @type switch
 * @desc 機能を有効化するスイッチです。ONの時に有効化されます。指定しない場合、常に有効化されます。
 * @default 0
 * 
 * @param Excalibur Key
 * @text 起動キー
 * @desc 起動するキーを指定します。選択肢以外のキーも設定できます。
 * @type select
 * @option Tab
 * @value tab
 * @option Aボタン / Enter / スペース / Z
 * @value ok
 * @option Xボタン / Shift
 * @value shift
 * @option Control / Alt
 * @value control
 * @option Escape / テンキー0 / X / Insert
 * @value escape
 * @option RBボタン / Pagedown / W
 * @value pagedown
 * @option LBボタン / Pageup / Q
 * @value pageup
 * @option 下ボタン / カーソル下 / テンキー2
 * @value down
 * @option 左ボタン / カーソル左 / テンキー4
 * @value left
 * @option 右ボタン / カーソル右 / テンキー6
 * @value right
 * @option 上ボタン / カーソル上 / テンキー8
 * @value up
 * @option F9
 * @value debug
 * @default pagedown
 */

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const activation = Number(parameters['activation'] || 0);
  const excaliburKey = String(parameters['Excalibur Key'] || 'pageup');

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    if (Input.isTriggered(excaliburKey) && (activation === 0 || $gameSwitches.value(activation))) {
      $gameTroop.members().forEach(function (enemy) {
        enemy.addState(1);
      });
      BattleManager.processVictory();
    }
  };

})();