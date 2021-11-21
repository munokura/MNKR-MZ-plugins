/*
 * --------------------------------------------------
 * MNKR_SaveTimeData.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SaveTimeData.js
 * @plugindesc セーブ時に時刻値を変数に保存します。
 * @author munokura
 *
 * @help
 * セーブ時に時刻値を変数に保存します。
 * 時刻値は世界協定時 (UTC) 1970年1月1日午前0時0分0秒からのミリ秒数を
 * 1/1000 (端数は四捨五入)にした値です。
 * 
 * 参考
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param timeVariable
 * @text 保存変数
 * @type variable
 * @default 0
 * @desc セーブ時の日付データを保存する変数を指定。0の場合は動作しません。
 * 
 * @command subtractionMinutes
 * @text 差分代入（単位：分）
 * @desc 実効時刻からセーブ時間を保存している変数を引いた値から、差となる値を代入します。
 *
 * @arg minutesVariable
 * @text 代入変数
 * @type variable
 * @desc 差分を代入する変数を指定
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const TimeVariable = Number(parameters['timeVariable'] || 0);

    const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
    Scene_Save.prototype.onSavefileOk = function () {
        const timeget = getTime();
        if (TimeVariable > 0) {
            $gameVariables.setValue(timeVariable, timeget);
        }
        _Scene_Save_onSavefileOk.call(this);
    };

    function getTime() {
        const timeget = Math.round(Number(new Date()) / 1000);    //ミリ秒を秒に変換
        return timeget;
    };

    PluginManager.registerCommand(pluginName, "subtractionMinutes", function (args) {
        const command = 'subtractionMinutes';
        const MinutesVariable = Number(args.minutesVariable);
        const timeget = getTime();
        if (TimeVariable > 0 && MinutesVariable > 0) {
            const SubtractionMinutes = (timeget - $gameVariables.value(TimeVariable)) / 60;
            $gameVariables.setValue(MinutesVariable, SubtractionMinutes);
        }
    });

})();
