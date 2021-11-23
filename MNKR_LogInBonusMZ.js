/*
 * --------------------------------------------------
 * MNKR_LogInBonusMZ.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LogInBonusMZ.js
 * @plugindesc ログインボーナス実装を簡易にするプラグインコマンドを提供します。
 * @author munokura
 *
 * @help
 * ログインボーナス実装を簡易にするプラグインコマンドを提供します。
 * 
 * --プラグインコマンド--
 * 前回ボーナス取得した時刻と比較し、日を跨いだ指定時刻を越えている場合に
 * コモンイベント（ボーナス取得内容）を実行します。
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
 * @text 時刻値変数
 * @type variable
 * @default 0
 * @desc 時刻値を保存する変数を指定。0の場合は動作しません。
 *
 * @param updateTime
 * @text ログインボーナス更新時刻
 * @type number
 * @max 23
 * @default 0
 * @desc 24時制の時刻を入力。この時間を過ぎているか確認します。
 * 
 * 
 * @command checkBonus
 * @text ボーナス確認
 * @desc ボーナス取得条件を満たした場合、コモンイベントを実行します。
 *
 * @arg bonusCommon
 * @text コモンイベント
 * @type common_event
 * @desc ボーナス取得時に実行するコモンイベントを指定
 * @default 0
 * 
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.timeVariable = Number(parameters['timeVariable'] || 0);
    param.updateTime = Number(parameters['updateTime'] || 0);

    function fetchTimeObj(stamp) {
        const timeObj = {};
        timeObj.base = new Date(stamp);
        timeObj.year = timeObj.base.getFullYear();
        timeObj.month = timeObj.base.getMonth();
        timeObj.date = timeObj.base.getDate();
        timeObj.hours = timeObj.base.getHours();
        return timeObj;
    };

    PluginManager.registerCommand(pluginName, "checkBonus", function (args) {
        if (param.timeVariable > 0) {
            const stamp = new Date();
            const nowObj = fetchTimeObj(stamp);
            let recentBonus;
            if (nowObj.hours >= param.updateTime) {
                recentBonus = new Date(nowObj.year, nowObj.month, nowObj.date, param.updateTime);
            } else {
                recentBonus = new Date(nowObj.year, nowObj.month, nowObj.date - 1, param.updateTime);
            }
            if (recentBonus >= $gameVariables.value(param.timeVariable)) {
                const bonusCommonId = Number(args.bonusCommon);
                $gameTemp.reserveCommonEvent(bonusCommonId);
                $gameVariables.setValue(param.timeVariable, stamp);
            }
        }
    });

})();
