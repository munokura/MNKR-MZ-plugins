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
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ItemLimitActor.js
@plugindesc You can create items that can only be used by a specified actor.
@author example
@license MIT License

@help
# Function
Create items that can only be used by a specified actor.

Enter the following tag in the item's memo field:
<MNKR_ItemLimitActor:Actor ID>

## Example
<MNKR_ItemLimitActor:1>
Can only be used with actor ID 1.

<MNKR_ItemLimitActor:1,2,3>
Can only be used with actor IDs 1, 2, and 3.

## Note
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
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ItemLimitActor.js
@plugindesc 指定アクターのみに使用できるアイテムを作れます。
@author munokura
@help
# 機能
指定アクターのみに使用できるアイテムを作れます。

アイテムのメモ欄に下記のようにタグを入れてください。
<MNKR_ItemLimitActor:アクターID>

## 例
<MNKR_ItemLimitActor:1>
アクターID1にだけ使えます。

<MNKR_ItemLimitActor:1,2,3>
アクターID1および2および3にだけ使えます。

## 注意
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
    const itemMeta = this.item().meta.MNKR_ItemLimitActor || false;
    if (target.isActor() && itemMeta) {
      const limitActorsArray = itemMeta.split(',').map(Number);
      const targetActorId = target.actorId();
      return limitActorsArray.includes(targetActorId);
    }
    return _Game_Action_testApply.call(this, target);
  };

})();