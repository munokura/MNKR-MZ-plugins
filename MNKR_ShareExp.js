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
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ShareExp.js
 * @plugindesc 戦闘終了時の取得経験値の計算を、戦闘不能になっていないメンバー数で均等割するシステムに変更します。
 * @author munokura
 *
 * @help
 * 戦闘終了時の取得経験値の計算を、
 * 戦闘不能になっていないメンバー数で均等割するシステムに変更します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 */

(() => {
  "use strict";

  const _BattleManager_makeRewards = BattleManager.makeRewards;
  BattleManager.makeRewards = function () {
    _BattleManager_makeRewards.call(this);
    const getMembrs = $gameParty.aliveMembers().length;
    this._rewards.exp = Math.ceil(this._rewards.exp / getMembrs);
  };

})();
