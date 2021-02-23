/*
 * --------------------------------------------------
 * MNKR_TowardPlayer Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TowardPlayer.js
 * @plugindesc プレイヤーがイベントに話しかけた後にイベントが元の方向に戻らないように変更します。
 * @author munokura
 *
 * @help
 * プレイヤーがイベントに話しかけた後に
 * イベントが元の方向に戻らないように変更します。
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

  Game_Event.prototype.lock = function () {
    if (!this._locked) {
      this._prelockDirection = this.direction();
      this.turnTowardPlayer();
    }
  };

})();