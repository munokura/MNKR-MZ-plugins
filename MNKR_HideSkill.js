/*
 * --------------------------------------------------
 * MNKR_HideSkill.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideSkill.js
 * @plugindesc マップでのスキル一覧に表示しないスキルを指定できます。
 * @author munokura
 *
 * @help
 * スキル一覧に表示しないスキルを指定できます。
 * メモ欄に各タグを入れたスキルは一覧に表示されなくなります。
 * 
 * マップでの非表示
 * <MNKR_HideSkillMenu>
 * 
 * 戦闘中の非表示
 * <MNKR_HideSkillBattle>
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
  "use strict";

  const _Window_SkillList_includes = Window_SkillList.prototype.includes;
  Window_SkillList.prototype.includes = function (item) {
    if (item.meta.MNKR_HideSkillMenu) {
      return false;
    }
    return _Window_SkillList_includes.call(this, item);
  };

  Window_BattleSkill.prototype.includes = function (item) {
    if (item.meta.MNKR_HideSkillBattle) {
      return false;
    }
    return _Window_SkillList_includes.call(this, item);
  };

})();
