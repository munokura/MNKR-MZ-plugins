/*
 * --------------------------------------------------
 * MNKR_HideSkillMenu.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideSkillMenu.js
 * @plugindesc マップでのスキル一覧に表示しないスキルを指定できます。
 * @author munokura
 *
 * @help
 * マップでのスキル一覧に表示しないスキルを指定できます。
 * メモ欄に下記タグを入れたスキルは一覧に表示されなくなります。
 * <MNKR_HideSkillMenu>
 * 
 * 戦闘中のスキル一覧には表示されます。
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
    return _Window_SkillList_includes.call(this, item);
  };

})();
