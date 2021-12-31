/*
 * --------------------------------------------------
 * MNKR_InitTp.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_InitTp.js
 * @plugindesc 戦闘開始時のアクターTPが装備・スキルによって加算されます。
 * @author munokura
 *
 * @help
 * デフォルトでは戦闘開始時にバトラー全体へTPが0-24加算されます。
 * 当プラグインはデフォルト加算値に追加で、
 * アクターの装備・スキルによるTPが加算されます。
 * 敵キャラには影響しません。
 * 
 * 
 * 使用方法
 * アクターが使用する武器・防具・スキルのメモ欄に下記を入れます。
 * <MNKR_InitTp:増加量>
 * 
 * 例
 * <MNKR_InitTp:50>
 * このタグが入っている武器・防具・スキルがあるアクターは戦闘開始時に、
 * タグの増加量だけ、戦闘開始時にTPが加算されます。
 * 負の値（マイナス値）を入れると、減算されます。
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

    const _Game_Battler_initTp = Game_Battler.prototype.initTp;
    Game_Battler.prototype.initTp = function () {
        _Game_Battler_initTp.call(this);
        let addendTp = 0;
        let MNKR_InitTp = 0;
        let i = 0;
        if (this.isActor()) {
            for (i = 0; i < this.equips().length; i++) {
                addendTp = this.equips()[i] ? parseInt(this.equips()[i].meta.MNKR_InitTp, 10) : 0;
                if (addendTp) {
                    MNKR_InitTp += addendTp;
                }
            }
            for (i = 0; i < this.skills().length; i++) {
                addendTp = this.skills()[i] ? parseInt(this.skills()[i].meta.MNKR_InitTp, 10) : 0;
                if (addendTp) {
                    MNKR_InitTp += addendTp;
                }
            }
        }
        this.gainTp(MNKR_InitTp);
    };

})();
