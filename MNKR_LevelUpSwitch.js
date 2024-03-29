/*
 * --------------------------------------------------
 * MNKR_LevelUpSwitch.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LevelUpSwitch.js
 * @plugindesc レベルアップ後に指定スイッチをONにします。
 * @author munokura
 *
 * @help
 * レベルアップ後に指定スイッチをONにします。
 * 自動的にOFFにはならない点に注意してください。
 * 
 * 下記のような使用方法を想定しています。
 * ・コモンイベントの並列処理のスイッチ
 * ・他プラグインとの組み合わせ
 * 
 * ----- プラグイン例 -----
 * MZ用
 * ・Keke_TimingCommon（タイミングコモン）
 * https://kekeelabo.com/
 * 
 * MV用
 * ・FTKR_ExBattleEvent
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_ExBattleEvent.ja.md
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param levelUpSwitch
 * @text レベルアップ後にONするスイッチ
 * @desc レベルアップ後にONするスイッチです。
 * @type switch
 * @default 0
 * 
 * @param raiseSwitch
 * @text 有効化スイッチ
 * @desc 指定スイッチがONの時、このプラグインを動作させます。「なし」の場合、常に動作します。
 * @type switch
 * @default 0
 */

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_levelUpSwitch = Number(parameters['levelUpSwitch'] || 0);
    const PRM_raiseSwitch = Number(parameters['raiseSwitch'] || 0);

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function () {
        const raise = PRM_raiseSwitch === 0 ? true : $gameSwitches.value(PRM_raiseSwitch);
        if (raise) {
            $gameSwitches.setValue(PRM_levelUpSwitch, true);
        }
        _Game_Actor_levelUp.call(this);
    };

})();
