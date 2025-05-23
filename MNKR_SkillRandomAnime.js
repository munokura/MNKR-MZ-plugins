/*
 * --------------------------------------------------
 * MNKR_SkillRandomAnime.js
 * Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SkillRandomAnime.js
 * @plugindesc スキル・アイテムのアニメーションを候補からランダムに選んで再生します。戦闘中のみで動作します。
 * @author munokura
 *
 * @help
 * スキル・アイテムのアニメーションを候補からランダムに選んで再生します。
 * 戦闘中のみで動作します。
 * 
 * スキル・アイテムのメモ欄に以下の書式でアニメーションIDを記述してください。
 * <MNKR_SkillRandomAnime:1,2,3,4>
 * 
 * カンマ区切りで複数のアニメーションIDを指定します。
 * 指定されたアニメーションIDの中からランダムで1つ選ばれ、再生されます。
 * 
 *
 * プラグインコマンドはありません。
 * 
 * 
 * 利用規約:
 * MITライセンスです。
 * 　https://licenses.opensource.jp/MIT/MIT.html
 * 　作者に無断で改変、再配布が可能で、
 * 　利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    let _itemMetaArr = null;

    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function (subject, action, targets) {
        _Window_BattleLog_startAction.call(this, subject, action, targets);
        const itemMeta = action.item().meta[pluginName];
        _itemMetaArr = itemMeta ? itemMeta.split(',').map(Number) : null;
    };

    const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function (
        subject, targets, animationId
    ) {
        if (!_itemMetaArr) {
            _Window_BattleLog_showAnimation.call(this, subject, targets, animationId);
            return;
        }
        const randomIndex = Math.floor(Math.random() * _itemMetaArr.length);
        const selectedAnimationId = _itemMetaArr[randomIndex];
        this.showNormalAnimation(targets, selectedAnimationId);
    };

})();