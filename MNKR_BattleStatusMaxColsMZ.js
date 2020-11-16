/*
 * --------------------------------------------------
 * MNKR_BattleStatusMaxColsMZ Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleStatusMaxColsMZ.js
 * @plugindesc 戦闘ステータスウィンドウ内のアクター数を指定できます。
 * @author munokura
 *
 * @help
 * 戦闘ステータスウィンドウ内の最大アクター数を指定できます。
 * ゲージの幅を指定できます。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param maxCols
 * @text ウィンドウ内の最大表示アクター数
 * @type number
 * @desc ウィンドウ内の最大表示アクター数
 * ツクールデフォルト:4
 * @default 1
 * 
 * @param gaugeWidth
 * @text ゲージ幅
 * @type number
 * @desc メニューで表示されるゲージの幅を指定
 * ツクールデフォルト:128
 * @default 576
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const maxCols = Number(parameters['maxCols'] || 1);
    const gaugeWidth = Number(parameters['gaugeWidth'] || 576);

    Window_BattleStatus.prototype.maxCols = function () {
        return maxCols;
    };

    //戦闘シーンのゲージ幅のみ変更
    const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
    Sprite_Gauge.prototype.bitmapWidth = function () {
        const isSceneMenu = SceneManager._scene.constructor.name;
        return (['Scene_Battle'].includes(isSceneMenu)) ? gaugeWidth : _Sprite_Gauge_bitmapWidth.call(this);
    };

})();