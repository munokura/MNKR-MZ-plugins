/*
 * --------------------------------------------------
 * MNKR_LogInBonusMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LogInBonusMZ.js
 * @plugindesc セーブ時に時刻値を変数に保存し、ログインボーナスを実装しやすくします。
 * @author munokura
 *
 * @help
 * セーブ時に時刻値を変数に保存します。
 * 時刻値は世界協定時 (UTC) 1970年1月1日午前0時0分0秒
 *  (ECMAScript 元期、 UNIX 元期と等価) からのミリ秒数を整数値で表し、
 * うるう秒は無視します。
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
 * @desc セーブ時の時刻値を保存する変数を指定。0の場合は動作しません。
 *
 * @param updateTime
 * @text ログインボーナス更新時刻
 * @type number
 * @max 24
 * @default 0
 * @desc 24時制の時刻を入力。セーブ後にこの時間を過ぎているか確認します。
 * 
 * 
 * @command fetchTime
 * @text 時刻代入（単位：秒）
 * @desc コマンド実行時刻を代入します。
 *
 * @arg timeVariable
 * @text 代入変数
 * @type variable
 * @desc 代入する変数を指定
 * @default 0
 * 
 * 
 * @command subtractionTimes
 * @text 差分代入
 * @desc コマンド実行時刻から前回セーブ時刻を引いた値を代入します。
 *
 * @arg timeVariable
 * @text 代入変数
 * @type variable
 * @desc 差分を代入する変数を指定
 * @default 0
 * 
 * @arg eachTime
 * @text 単位
 * @type select
 * @option 年
 * @value years
 * @option 月
 * @value months
 * @option 日
 * @value days
 * @option 時間
 * @value hours
 * @option 分
 * @value minutes
 * @option 秒
 * @value seconds
 * @default hours
 * 
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.timeVariable = Number(parameters['timeVariable'] || 0);
    param.updateTime = Number(parameters['updateTime'] || 0);

    const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
    Scene_Save.prototype.onSavefileOk = function () {
        const saveTime = fetchTime();
        if (param.timeVariable > 0) {
            $gameVariables.setValue(param.timeVariable, saveTime);
        }
        _Scene_Save_onSavefileOk.call(this);
    };

    function fetchTime() {
        nowTime = new Date().getTime();
        return nowTime;
    };

    function fetchTimeObj(stamp) {
        const timeObj = {};
        timeObj.base = new Date(stamp);
        timeObj.year = timeObj.base.getFullYear();
        timeObj.month = timeObj.base.getMonth();
        timeObj.date = timeObj.base.getDate();
        timeObj.hours = timeObj.base.getHours();
        timeObj.minutes = timeObj.base.getMinutes();
        timeObj.seconds = timeObj.base.getSeconds();
        return timeObj;
    };

    PluginManager.registerCommand(pluginName, "fetchTime", function (args) {
        const timeVariableId = Number(args.timeVariable.stamp);
        const nowTime = fetchTime();
        if (param.timeVariable > 0 && timeVariableId > 0) {
            $gameVariables.setValue(timeVariableId, nowTime);
        }
    });

    PluginManager.registerCommand(pluginName, "subtractionTimes", function (args) {
        const timeVariableId = Number(args.timeVariable);
        const caseBy = args.eachTime;
        const nowTime = fetchTime();

        if (param.timeVariable > 0 && minutesVariableId > 0) {
            switch (caseBy) {
                case 'days':
                    subtractionTimes = Math.floor(nowTime - $gameVariables.value(param.timeVariable) / 1000 / 60 / 60 / 24);
                    $gameVariables.setValue(timeVariableId, subtractionTimes);
                    break;
                case 'hours':
                    subtractionTimes = Math.floor(nowTime - $gameVariables.value(param.timeVariable) / 1000 / 60 / 60);
                    $gameVariables.setValue(timeVariableId, subtractionTimes);
                    break;
                case 'minutes':
                    subtractionTimes = Math.floor(nowTime - $gameVariables.value(param.timeVariable) / 1000 / 60);
                    $gameVariables.setValue(timeVariableId, subtractionTimes);
                    break;
                case 'seconds':
                    subtractionTimes = Math.floor(nowTime - $gameVariables.value(param.timeVariable) / 1000);
                    $gameVariables.setValue(timeVariableId, subtractionTimes);
                    break;
            }
        }
    });

})();
