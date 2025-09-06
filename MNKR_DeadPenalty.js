/*
 * --------------------------------------------------
 * MNKR_DeadPenalty.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_DeadPenalty.js
@plugindesc If you are incapacitated, your TP will be reduced to 0.
@author example
@license MIT License

@help
If you are incapacitated, your TP will be reduced to 0.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_DeadPenalty.js
@plugindesc 戦闘不能になるとTPが0になります。
@author munokura

@help
戦闘不能になるとTPが0になります。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {

  "use strict";

  const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
  Game_BattlerBase.prototype.die = function () {
    this._tp = 0;
    _Game_BattlerBase_die.call(this);
  };

  const _Game_Battler_gainSilentTp = Game_Battler.prototype.gainSilentTp;
  Game_Battler.prototype.gainSilentTp = function (value) {
    if (this.isAlive()) {
      _Game_Battler_gainSilentTp.apply(this, arguments);
    }
  };

})();