/*
 * --------------------------------------------------
 * MNKR_SimpleMsgSideViewMZ Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// Plugin for RPG Maker MZ
// SimpleMsgSideViewMZ.js
//=============================================================================
// [Update History]
// This is the MZ version of SimpleMsgSideView the RMMV official plugin.

/*:ja
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SimpleMsgSideViewMZ.js
 * @plugindesc サイドビューバトルでスキル/アイテムの名前のみ表示します。
 * @author 神無月サスケ　(改変 munokura)
 *
 * @param displayAttack
 * @text 通常攻撃も表示
 * @desc 通常攻撃も表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @param displayIcon
 * @text アイコン表示
 * @desc スキルやアイテムのアイコンも表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default true
 *
 * @param undisplaySkill
 * @text 非表示スキル
 * @type skill[]
 * @default 
 * @desc 使用しても表示しないスキルを指定
 * 
 * @help
 * このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインを導入すると、戦闘の際、バトルログが表示されず、
 * 使用したスキルやアイテムの名前のみが表示されるようになります。
 *
 * ■注意
 * - フロントビューでの使用も可能ですが、味方のダメージが表示されません。
 * - ログを表示せず、技名のみを表示するため、戦闘のテンポが若干高速になります。
 * 
 * 改変部分
 * スキル名を表示したくないスキルを追加できます。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
  "use strict";

  //
  // process parameters
  //
  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const displayAttack = parameters['displayAttack'] === 'true';
  const displayIcon = parameters['displayIcon'] == 'true';
  const undisplaySkill = JSON.parse(parameters['undisplaySkill']);

  //
  // main routine
  //

  // !!!overwrite!!!
  Window_BattleLog.prototype.addText = function (text) {
    this.refresh();
    this.wait();
    // not display battle log
  };

  Window_BattleLog.prototype.addItemNameText = function (item) {
    this._lines.push(item.name);
    this._actionIconIndex = displayIcon ? item.iconIndex : 0;
    this.refresh();
    this.wait();
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.displayAction = function (subject, item) {
    if (displayAttack ||
      !(DataManager.isSkill(item) && item.id === subject.attackSkillId())
    ) {
      if (!undisplaySkill.includes(String($dataSkills[item.id].id))) {
        this.push('addItemNameText', item);
      }
    } else {
      this.push('wait');
    }
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.drawLineText = function (index) {
    const text = this._lines[index];
    const rect = this.lineRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (this._actionIconIndex) {
      const x = (rect.width - this.textWidth(text)) / 2 - 4;
      this.drawIcon(this._actionIconIndex, x, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
  };

})();
