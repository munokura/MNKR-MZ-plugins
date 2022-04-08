/*
 * --------------------------------------------------
 * MNKR_AddSkillWtype.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddSkillWtype.js
 * @plugindesc 装備に、スキルの必要武器タイプを追加できます。
 * @author munokura
 *
 * @help
 * 装備に、スキル＞必要武器＞必要武器タイプ1・2を追加できます。
 * 装備で追加した場合、スキルで必要とされる武器タイプの武器を装備していなくても、
 * スキル使用可能になります。
 * 
 * 武器・防具のメモ欄に下記のタグを入れてください。
 * 
 * <MNKR_AddSkillWtype:武器タイプID>
 * 
 * 例
 * デフォルトで武器タイプID1は短剣
 * 短剣が必要なスキルを使用可能になります。
 * <MNKR_AddSkillWtype:1>
 * 
 * 複数のタイプを指定する場合、下記のように記述します。
 * <MNKR_AddSkillWtype:1,2>
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

  const _Game_Actor_isSkillWtypeOk = Game_Actor.prototype.isSkillWtypeOk;
  Game_Actor.prototype.isSkillWtypeOk = function (skill) {
    const equipsArray = this.equips();
    const armorMetaArray = equipsMeta(equipsArray);
    if (armorMetaArray.length === 0) {
      return _Game_Actor_isSkillWtypeOk.call(this, skill);
    }
    const wtypeId1 = skill.requiredWtypeId1;
    const wtypeId2 = skill.requiredWtypeId2;
    if (armorMetaArray.includes(wtypeId1) || armorMetaArray.includes(wtypeId2)) {
      return true;
    }
    return _Game_Actor_isSkillWtypeOk.call(this, skill);
  };

  function equipsMeta(equipsArray) {
    let equipMetaArray = [];
    for (let i = 0; i < equipsArray.length; i++) {
      if (equipsArray[i]) {
        const hasEquipsMeta = equipsArray[i].meta.MNKR_AddSkillWtype || false;
        if (hasEquipsMeta) {
          equipMetaArray = equipMetaArray.concat(equipsArray[i].meta.MNKR_AddSkillWtype.split(',').map(Number));
        }
      }
    }
    return equipMetaArray;
  }

})();
