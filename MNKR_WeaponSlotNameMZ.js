/*
 * --------------------------------------------------
 * MNKR_WeaponSlotNameMZ.js
 *   Ver.0.1.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_WeaponSlotNameMZ.js
@plugindesc Change the weapon item name in the equipment scene.
@author example
@license MIT License

@help
Changes the weapon type name in the equipment scene.

Enter the following in the actor/occupation memo field.
If the name is entered for both the actor and occupation, the occupation takes
priority.
<MNKR_WeaponSlotName:Voice>

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_WeaponSlotNameMZ.js
@plugindesc 装備シーンの武器の項目名を変更します。
@author munokura

@help
装備シーンの武器の装備タイプ名を変更します。

アクター・職業のメモ欄に下記のように入力してください。
アクター・職業の両方に書かれている場合、職業が優先されます。
<MNKR_WeaponSlotName:声>


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    const _Window_StatusBase_actorSlotName = Window_StatusBase.prototype.actorSlotName;
    Window_StatusBase.prototype.actorSlotName = function (actor, index) {
        if (index > 1) {
            return _Window_StatusBase_actorSlotName.call(this, actor, index);
        }
        const actorMeta = actor.actor().meta.MNKR_WeaponSlotName || false;
        const classMeta = actor.currentClass().meta.MNKR_WeaponSlotName || false;
        const hasDualWield = actor.isDualWield();
        const hasMeta = classMeta ? classMeta : actorMeta;
        const slot0 = index === 0 && hasMeta;
        const slot1 = index === 1 && hasMeta && hasDualWield;
        if (slot0 || slot1) {
            return hasMeta;
        }
        return _Window_StatusBase_actorSlotName.call(this, actor, index);
    };

})();