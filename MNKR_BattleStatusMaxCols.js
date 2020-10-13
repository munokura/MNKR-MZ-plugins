/*
 * --------------------------------------------------
 * MNKR_BattleStatusMaxCols Ver.0.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleStatusMaxCols.js
 * @plugindesc (試作中) 戦闘ステータスウィンドウ内のアクター数を指定できます。
 * @author munokura
 *
 * @param Max Cols
 * @text ウィンドウ内の最大表示アクター数
 * @type number
 * @desc ウィンドウ内の最大表示アクター数
 * ツクールデフォルト:4
 * @default 4
 *
 * @help
 * 戦闘ステータスウィンドウ内の最大アクター数を指定できます。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(function() {
    'use strict'

    const pluginName = 'MNKR_ActorCommandChoice';
    const parameters = PluginManager.parameters(pluginName);
    const maxCols = Number(parameters['Max Cols'] || 4);

    Window_BattleStatus.prototype.maxCols = function() {
        return maxCols;
    }

    Window_BattleStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const nameX = this.nameX(rect);
        const nameY = this.nameY(rect);
        const stateIconX = this.stateIconX(rect);
        const stateIconY = this.stateIconY(rect);
        const basicGaugesX = this.basicGaugesX(rect);
        const basicGaugesY = this.basicGaugesY(rect);
        this.placeTimeGauge(actor, nameX, nameY);
        this.placeActorName(actor, nameX, nameY);
        this.placeStateIcon(actor, stateIconX, stateIconY);
        this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
    }

})()