/*
 * --------------------------------------------------
 * MNKR_StopShakeOnDamage Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_StopShakeOnDamage.js
 * @plugindesc フロントビュー戦闘でアクター被ダメージ時の画面シェイクを止めます。
 * @author munokura
 *
 * @help
 * フロントビュー戦闘でアクター被ダメージ時の画面シェイクを止めます。
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

    Game_Actor.prototype.performDamage = function () {
        Game_Battler.prototype.performDamage.call(this);
        if (this.isSpriteVisible()) {
            this.requestMotion('damage');
        }
        SoundManager.playActorDamage();
    };

})();