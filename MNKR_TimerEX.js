/*
 * --------------------------------------------------
 * MNKR_TimerEX.js
 *   Ver.1.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimerEX.js
@plugindesc You can count up/down the timer and toggle its visibility.
@author munokura
@license MIT License

@help
This allows you to count up or down a timer.
You can show or hide the timer with a switch.

Regardless of whether the timer is counting up or down, the value when it
stops is saved to a variable.
The saved value is the frame value (1 frame = 1/60 seconds).
To convert to minutes or seconds, please calculate and use.

There are no plugin commands.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param countUpSwitch
@text Count-up activation switch
@desc Counts up when the specified switch is ON. Counts down when the switch is OFF.
@type switch
@default 0

@param hideSwitch
@text Timer hide switch
@desc The timer is hidden when the specified switch is ON. It is displayed when it is OFF.
@type switch
@default 0

@param countStopValue
@text Saved Variable ID
@desc Variable ID to save the value when the timer is stopped. The acquired value is the frame value (1 frame: 1/60 seconds).
@type variable
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TimerEX.js
@plugindesc タイマーをカウントアップ・ダウン、表示・非表示を切り替えできるようにします。
@author munokura

@help
タイマーをカウントアップ・ダウンできるようにします。
タイマーをスイッチで表示・非表示を切り替えられます。

カウントアップ・ダウンに関わらず、タイマー停止時の値を変数に保存します。
保存される値はフレーム値(1フレーム:1/60秒)です。
分や秒に換算する場合、計算して使用してください。


プラグインコマンドはありません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param countUpSwitch
@text カウントアップ発動スイッチ
@type switch
@desc 指定スイッチがON時カウントアップ。OFF時カウントダウン。
無指定の場合、常にカウントアップになります。
@default 0

@param hideSwitch
@text タイマー非表示スイッチ
@type switch
@desc 指定スイッチがON時タイマーを非表示。OFF時に表示。
無指定の場合、常に表示になります。
@default 0

@param countStopValue
@text 保存変数ID
@type variable
@desc タイマーを停止した時の値を保存する変数ID。取得値はフレーム値(1フレーム:1/60秒)
@default 0
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const countUpSwitch = Number(parameters['countUpSwitch'] || 0);
    const hideSwitch = Number(parameters['hideSwitch'] || 0);
    const countStopValue = Number(parameters['countStopValue'] || 0);

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

    const _Sprite_Timer_redraw = Sprite_Timer.prototype.redraw;
    Sprite_Timer.prototype.redraw = function () {
        if ((!$gameSwitches.value(hideSwitch) || hideSwitch === 0)) {
            _Sprite_Timer_redraw.call(this);
        } else {
            this.bitmap.clear();
        }
    };

})();