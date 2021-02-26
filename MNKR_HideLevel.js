/*
 * --------------------------------------------------
 * MNKR_HideLevel.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideLevel.js
 * @plugindesc レベルに関連する項目（レベル・経験値）を非表示にします。
 * @author munokura
 *
 * @help
 * レベルに関連する項目（レベル・経験値）を非表示にします。
 * 非表示にするだけで、機能としては残ります。
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

  Window_StatusBase.prototype.drawActorLevel = function (actor, x, y) {
  };

  Window_Status.prototype.drawExpInfo = function (x, y) {
  };

})();