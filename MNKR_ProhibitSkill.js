/*
 * --------------------------------------------------
 * MNKR_ProhibitSkill.js
 *   Ver.0.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ProhibitSkill.js
@plugindesc You can create items that cannot be used by actors who have already mastered the specified skill.
@author example
@license MIT License

@help
You can create an item that cannot be used by actors who have learned a
specified skill (range: single ally).

Enter the following tag in the item's memo field:
<ProhibitSkill:SkillID>

Example
<ProhibitSkill:99>
Cannot be used by actors who have learned skill ID 99.

<ProhibitSkill:99,100,101>
Cannot be used by actors who have learned skill ID 99, 100, or 101.

Note
The current version does not support the following:
- Support for use in battle

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this item without permission, and there are no
restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ProhibitSkill.js
@plugindesc 指定スキルを習得済みのアクターに使えないアイテムを作れます。
@author munokura

@help
指定スキルを習得済みのアクターに使えないアイテム（範囲が味方単体）を作れます。

アイテムのメモ欄に下記のようにタグを入れてください。
<ProhibitSkill:スキルID>

例
<ProhibitSkill:99>
ID99のスキルを覚えているアクターには使えません。

<ProhibitSkill:99,100,101>
ID99か100か101のいずれかスキルを覚えているアクターには使えません。

注意
現バージョンでは下記に対応していません。
- 戦闘中での使用対応

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function (target) {
    if (this.prohibitSkill(target)) {
      return false;
    }
    return _Game_Action_testApply.call(this, target);
  };

  Game_Action.prototype.prohibitSkill = function (target) {
    const itemMeta = this.item().meta.ProhibitSkill || false;
    if (target.isActor() && itemMeta) {
      const prohibitSkills = itemMeta.split(',').map(Number);
      const even = (element) => target.isLearnedSkill(element);
      return prohibitSkills.some(even);
    }
    return false;
  };

})();