/*
 * --------------------------------------------------
 * MNKR_ItemLimitActor.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ItemLimitActor.js
 * @plugindesc 指定アクターのみに使用できるアイテムを作れます。
 * @author munokura
 *
 * @help
 * 指定アクターのみに使用できるアイテムを作れます。
 *
 * アイテムのメモ欄に下記のようにタグを入れてください。
 * <MNKR_ItemLimitActor:アクターID>
 *
 * 例
 * <MNKR_ItemLimitActor:1>
 * アクターID1にだけ使えます。
 * 
 * <MNKR_ItemLimitActor:1,2,3>
 * アクターID1および2および3にだけ使えます。
 * 
 * 注意
 * 現バージョンでは下記に対応していません。
 * - 戦闘中での使用対応
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

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function (target) {
    const itemMeta = this.item().meta.MNKR_ItemLimitActor || false;
    if (target.isActor() && itemMeta) {
      const limitActorsArray = itemMeta.split(',').map(Number);
      const targetActorId = target.actorId();
      return limitActorsArray.includes(targetActorId);
    }
    return _Game_Action_testApply.call(this, target);
  };

})();
