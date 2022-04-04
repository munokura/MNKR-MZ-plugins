/*
 * --------------------------------------------------
 * MNKR_WeaponSlotNameMZ.js
 *   Ver.0.1.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_WeaponSlotNameMZ.js
 * @plugindesc 装備シーンの武器の項目名を変更します。
 * @author munokura
 *
 * @help
 * 装備シーンの武器の装備タイプ名を変更します。
 *
 * アクター・職業のメモ欄に下記のように入力してください。
 * アクター・職業の両方に書かれている場合、職業が優先されます。
 * <MNKR_WeaponSlotName:声>
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

    const _Window_StatusBase_actorSlotName = Window_StatusBase.prototype.actorSlotName;
    Window_StatusBase.prototype.actorSlotName = function (actor, index) {
        const actorMeta = actor.actor().meta.MNKR_WeaponSlotName;
        const classMeta = actor.currentClass().meta.MNKR_WeaponSlotName;
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
