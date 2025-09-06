/*
 * --------------------------------------------------
 * MNKR_ShareExp.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShareExp.js
@plugindesc Experience points earned at the end of battle will now be divided equally among all surviving members.
@author example
@license MIT License

@help
Changes the calculation of experience points earned at the end of battle
to a system where they are divided equally among the number of surviving
members.

# Notes
The calculation assumes that the "experience point gain rate" for KOs is 0%
(default).
If you change this setting, it will not work properly.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShareExp.js
@plugindesc 戦闘終了時の取得経験値の計算を、戦闘不能になっていないメンバー数で均等割するシステムに変更します。
@author munokura

@help
戦闘終了時の取得経験値の計算を、
戦闘不能になっていないメンバー数で均等割するシステムに変更します。

# 注意点
戦闘不能の「経験値取得率」が0%（デフォルト）である前提で計算されます。
変更すると、正常に働きません。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  const _BattleManager_makeRewards = BattleManager.makeRewards;
  BattleManager.makeRewards = function () {
    _BattleManager_makeRewards.call(this);
    const getMembers = $gameParty.aliveMembers().length;
    this._rewards.exp = Math.ceil(this._rewards.exp / getMembers);
  };

})();