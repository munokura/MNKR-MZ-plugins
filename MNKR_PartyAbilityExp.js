/*
 * --------------------------------------------------
 * MNKR_PartyAbilityExp.js
 *   Ver.0.1.2
 * Copyright (c) 2024 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyAbilityExp.js
@plugindesc Adds experience gain to party skills.
@author munokura
@license MIT License

@help
# Function
Adds an experience point increase to a party skill.

# Usage
Enter the following in the memo field of a database with a feature field.
<MNKR_PartyAbilityExp: Increase Rate (%)>
If multiple rates overlap, the highest value will be used.

## Example
<MNKR_PartyAbilityExp:200>
Party experience points will be increased by 200%.

<MNKR_PartyAbilityExp:0>
Party experience points will be increased by 0%.
*Negative values will be treated as 0.

## Database with a feature field
- Actor
- Occupation
- Weapon
- Armor
- State

# Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PartyAbilityExp.js
@plugindesc パーティスキルに経験値の増加を追加します。
@author munokura

@help
# 機能
パーティスキルに経験値の増加を追加します。

# 使い方
特徴欄があるデータベースのメモ欄に以下を入力してください。
<MNKR_PartyAbilityExp:増加率(%)>
複数のレートが重複した場合、最大の数値が採用されます。

## 記述例
<MNKR_PartyAbilityExp:200>
パーティの獲得経験値が200%になります。

<MNKR_PartyAbilityExp:0>
パーティの獲得経験値が0%になります。
※負の値を入れても0として扱われます。

## 特徴欄があるデータベース
- アクター
- 職業
- 武器
- 防具
- ステート

# 利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    Game_BattlerBase.prototype.partyExpRate = function (pluginName) {
        let metaArray = [];
        const battlerTrait = this.traitObjects();
        metaArray = battlerTrait.map(obj => obj.meta[pluginName]);
        metaArray = metaArray.filter(item => item).map(Number);
        const maxMeta = Math.max(...metaArray);
        return maxMeta;
    };

    Game_Party.prototype.partyExpRate = function (pluginName) {
        let result = null;
        this.battleMembers().forEach(function (actor) {
            result = actor.partyExpRate(pluginName);
        });
        result === null ? 100 : result;
        return result;
    };

    const _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
    Game_Troop.prototype.expTotal = function () {
        return Math.floor(_Game_Troop_expTotal.call(this) * this.expRate());
    };

    Game_Troop.prototype.expRate = function () {
        const rate = 1 * $gameParty.getExpRate() / 100;
        return rate;
    };

    Game_Party.prototype.getExpRate = function () {
        const expRate = this.partyExpRate(pluginName) < 0 ? 0 : this.partyExpRate(pluginName);
        return expRate;
    };

})();
