/*
 * --------------------------------------------------
 * MNKR_TimerEX Ver.1.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimerEX.js
 * @plugindesc タイマーをカウントアップ・ダウンできるようにします。
 * @author munokura
 *
 * @help
 * タイマーをカウントアップ・ダウンできるようにします。
 * 発動スイッチがOFFの場合、通常のカウントダウンの動作をします。
 * 発動スイッチがONの場合、カウントアップの動作をします。
 * 
 * カウントアップ・ダウンに関わらず、タイマー停止時の値を変数に保存します。
 * 保存される値はフレーム値(1フレーム:1/60秒)です。
 * 分や秒に換算する場合、計算して使用してください。
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
 * @param Count Up Switch
 * @text カウントアップ発動スイッチ
 * @type switch
 * @desc 指定スイッチがON時カウントアップ。OFF時カウントダウン。無指定の場合、常にカウントアップになります。
 * @default 0
 *
 * @param Count Stop Value
 * @text 保存変数ID
 * @type variable
 * @desc タイマーを停止した時の値を保存する変数ID。取得値はフレーム値(1フレーム:1/60秒)
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const countUpSwitch = Number(parameters['Count Up Switch'] || 0);
    const countStopValue = Number(parameters['Count Stop Value'] || 0);

    const _Game_Timer_update = Game_Timer.prototype.update;
    Game_Timer.prototype.update = function (sceneActive) {
        if (($gameSwitches.value(countUpSwitch) || countUpSwitch === 0) && sceneActive && this._working) {
            this._frames++;
        } else {
            _Game_Timer_update.apply(this, arguments);
        }
    };

    const _Game_Timer_stop = Game_Timer.prototype.stop;
    Game_Timer.prototype.stop = function () {
        _Game_Timer_stop.call(this);
        if (countStopValue) {
            $gameVariables.setValue(countStopValue, this._frames);
        }
    };

})();