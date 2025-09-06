/*
 * --------------------------------------------------
 * MNKR_SimpleMsgSideViewMZ.js
 *   Ver.0.0.4
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SimpleMsgSideViewMZ.js
@plugindesc Only the names of skills/items are displayed in side view battles.
@author munokura
@license MIT License

@help
This plugin does not have any plugin commands.
This plugin is compatible with RPG Maker MZ.

When you install this plugin, the battle log will not be displayed during
battle,
and only the names of the skills and items used will be displayed.

■Note
- It can be used in front view, but ally damage will not be displayed.
- Since the log is not displayed and only the names of skills are displayed,
the tempo of battle will be slightly faster.

Modifications
You can add skills whose names you do not want to display.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without the author's permission,
and there are no restrictions on its use (commercial, R18, etc.).

@param displayAttack
@text Normal attacks are also displayed
@desc Do you also want to display normal attacks?
@type boolean
@on do
@off do not
@default false

@param displayIcon
@text Icon View
@desc Do you also want to display skill and item icons?
@type boolean
@on do
@off do not
@default true

@param undisplaySkill
@text Hidden Skills
@desc Specify skills that will not be displayed even if used
@type skill[]
@default ["0"]
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SimpleMsgSideViewMZ.js
@plugindesc サイドビューバトルでスキル/アイテムの名前のみ表示します。
@author 神無月サスケ　(改変:munokura)

@param displayAttack
@text 通常攻撃も表示
@desc 通常攻撃も表示する？
@type boolean
@on する
@off しない
@default false

@param displayIcon
@text アイコン表示
@desc スキルやアイテムのアイコンも表示する？
@type boolean
@on する
@off しない
@default true

@param undisplaySkill
@text 非表示スキル
@type skill[]
@default ["0"]
@desc 使用しても表示しないスキルを指定

@help
このプラグインには、プラグインコマンドはありません。
このプラグインは、RPGツクールMZに対応しています。

このプラグインを導入すると、戦闘の際、バトルログが表示されず、
使用したスキルやアイテムの名前のみが表示されるようになります。

■注意
- フロントビューでの使用も可能ですが、味方のダメージが表示されません。
- ログを表示せず、技名のみを表示するため、戦闘のテンポが若干高速になります。

改変部分
スキル名を表示したくないスキルを追加できます。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

//=============================================================================
// Plugin for RPG Maker MZ
// SimpleMsgSideViewMZ.js
//=============================================================================
// [Update History]
// This is the MZ version of SimpleMsgSideView the RMMV official plugin.



(() => {
  "use strict";

  //
  // process parameters
  //
  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const displayAttack = parameters['displayAttack'] === 'true';
  const displayIcon = parameters['displayIcon'] == 'true';
  const undisplaySkill = parameters['undisplaySkill'] === '' ? ["0"] : JSON.parse(parameters['undisplaySkill']);

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
      !((DataManager.isSkill(item) && item.id === subject.attackSkillId()) || (DataManager.isSkill(item) && undisplaySkill.includes(String($dataSkills[item.id].id))))
    ) {
      this.push('addItemNameText', item);
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