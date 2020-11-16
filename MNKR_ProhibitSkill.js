/*
 * --------------------------------------------------
 * MNKR_ProhibitSkill Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ProhibitSkill.js
 * @plugindesc 指定スキルを習得済みのアクターに使えないアイテムを作れます。
 * @author munokura
 *
 * @help
 * 指定スキルを習得済みのアクターに使えないアイテムを作れます。
 *
 * アイテムのメモ欄に下記のようにタグを入れてください。
 * <ProhibitSkill:スキルID>
 *
 * 例
 * <ProhibitSkill:99>
 * ID99のスキルを覚えているアクターには使えません。
 * 
 * <ProhibitSkill:99,100,101>
 * ID99か100か101のいずれかスキルを覚えているアクターには使えません。
 * 
 * 注意
 * 現バージョンでは下記に対応していません。
 * - 戦闘中での使用対応
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
  "use strict";

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function (target) {
    if (this.prohibitSkill(target)) return false;
    return _Game_Action_testApply.call(this, target);
  };

  Game_Action.prototype.prohibitSkill = function (target) {
    if (target.isActor() && this.isItem()) {
      const item = this.item();
      if (item.meta.ProhibitSkill) {
        const prohibitSkills = JsonEx.parse(`[${item.meta.ProhibitSkill}]`);
        const even = (element) => target.isLearnedSkill(element);
        return prohibitSkills.some(even);
      }
    }
    return false;
  };

})();