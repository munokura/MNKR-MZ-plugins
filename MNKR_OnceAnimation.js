/*
 * --------------------------------------------------
 * MNKR_OnceAnimation.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OnceAnimation.js
@plugindesc Regardless of the number of consecutive skills used in battle, the animation will only be played once.
@author munokura
@license MIT License

@help
This plugin plays animations only once, regardless of the number of
consecutive skill uses during battle.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on usage (commercial, 18+, etc.).

# Acknowledgments
This plugin was created under the guidance of DarkPlasma.
Thank you for your advice (and the solution itself).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OnceAnimation.js
@plugindesc 戦闘中のスキルの連続回数に関わらずアニメーション再生を1回にします。
@author munokura

@help
戦闘中のスキルの連続回数に関わらずアニメーション再生を1回にします。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


# 謝辞
当プラグインはDarkPlasma氏の指導で作成されました。
ご助言（解答そのもの）をいただき、感謝いたします。
*/

(() => {
  "use strict";

  const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
  Window_BattleLog.prototype.showAnimation = function (subject, targets, animationId) {
    _Window_BattleLog_showAnimation.call(
      this,
      subject,
      Array.from(new Set(targets)),
      animationId
    );
  };

})();