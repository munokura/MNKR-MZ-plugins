/*
 * --------------------------------------------------
 * MNKR_TMTopFixMZ_DarkPlasma_FormationPatch.js
 *   Ver.3.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTopFixMZ_DarkPlasma_FormationPatch.js
@plugindesc Patch to apply the function of MNKR_TMTopFixMZ to DarkPlasma_Formation
@author munokura
@license MIT License

@help
In DarkPlasma_Formation scenes,
this prevents the actor at the front of the party from being rearranged.
Tested with DarkPlasma_Formation Ver. 3.0.0.

# How to Use
Turn on DarkPlasma_Formation and MNKR_TMTopFixMZ in the Plugin Manager.
Turn on MNKR_TMTopFixMZ_DarkPlasma_FormationPatch in the Plugin Manager and
place it below DarkPlasma_Formation.

## Example of Plugin Manager Arrangement
DarkPlasma_Formation
MNKR_TMTopFixMZ
MNKR_TMTopFixMZ_DarkPlasma_FormationPatch

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMTopFixMZ_DarkPlasma_FormationPatch.js
@plugindesc MNKR_TMTopFixMZの機能をDarkPlasma_Formationに適用するパッチ
@author munokura
@base DarkPlasma_Formation
@base MNKR_TMTopFixMZ
@orderAfter DarkPlasma_Formation

@help
DarkPlasma_Formation のシーンにおいて、
パーティの先頭にいるアクターの並び替えを禁止します。
DarkPlasma_Formation Ver3.0.0 で動作確認しています。

# 使い方
DarkPlasma_Formation と MNKR_TMTopFixMZ をプラグイン管理でONにします。
MNKR_TMTopFixMZ_DarkPlasma_FormationPatch をプラグイン管理でONにし、
DarkPlasma_Formation の下側に配置してください。

## プラグイン管理の並び例
DarkPlasma_Formation
MNKR_TMTopFixMZ
MNKR_TMTopFixMZ_DarkPlasma_FormationPatch


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';

    const _Window_FormationBattleMember_isCurrentItemEnabled = Window_FormationBattleMember.prototype.isCurrentItemEnabled;
    Window_FormationBattleMember.prototype.isCurrentItemEnabled = function () {
        if ($gameSystem.isTopFix() && this.index() === 0) {
            return false;
        }
        return _Window_FormationBattleMember_isCurrentItemEnabled.call(this);
    };

})();