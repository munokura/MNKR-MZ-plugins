/*
 * --------------------------------------------------
 * MNKR_LogInBonusMZ.js
 *   Ver.0.0.4
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
 * @param updateHours
 * @text ログインボーナス更新時刻
 * @type number
 * @max 23
 * @default 0
 * @desc 24時制の時刻を入力。この時間を過ぎているか確認します。
 *
 *
 * @command checkBonus
 * @text ボーナス確認
 * @desc ボーナス取得条件を満たす場合スイッチをON。満たしていない場合、OFFにします。
 *
 * @arg bonusSwitch
 * @text スイッチ
 * @type switch
 * @desc 動作するスイッチを指定
 * @default 0
 *
 *
 * @command getBonus
 * @text ボーナス取得
 * @desc ボーナス取得条件を満たす場合、時刻値変数を更新し、コモンイベントを実行します。
 *
 * @arg bonusCommon
 * @text コモンイベント
 * @type common_event
 * @desc 実行するコモンイベントを指定。指定しない場合、時刻値変数だけが更新されます。
 * @default 0
 *
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.timeVariable = Number(parameters['timeVariable'] || 0);
    param.updateHours = Number(parameters['updateHours'] || 0);

    function fetchTimeObj() {
        const timeObj = {};
        timeObj.base = new Date();
        timeObj.year = timeObj.base.getFullYear();
        timeObj.month = timeObj.base.getMonth();
        timeObj.date = timeObj.base.getDate();
        timeObj.hours = timeObj.base.getHours();
        return timeObj;
    };

    function isBonus() {
        const nowObj = fetchTimeObj();
        const recentBonusDate = nowObj.hours >= param.updateHours ? nowObj.date : nowObj.date - 1;
        const recentBonusStamp = new Date(nowObj.year, nowObj.month, recentBonusDate, param.updateHours).getTime();
        const canBonus = recentBonusStamp > $gameVariables.value(param.timeVariable) ? true : false;
        return canBonus;
    };

    PluginManager.registerCommand(pluginName, "checkBonus", function (args) {
        if (param.timeVariable > 0) {
            const canBonus = isBonus();
            const bonusSwitchId = Number(args.bonusSwitch);
            $gameSwitches.setValue(bonusSwitchId, canBonus);
        }
    });

    PluginManager.registerCommand(pluginName, "getBonus", function (args) {
        if (param.timeVariable > 0) {
            const canBonus = isBonus();
            if (canBonus) {
                const stamp = new Date().getTime();
                $gameVariables.setValue(param.timeVariable, stamp);
                const bonusCommonId = Number(args.bonusCommon);
                if (bonusCommonId > 0) {
                    $gameTemp.reserveCommonEvent(bonusCommonId);
                }
            }
        }
    });

})();
