/*
 * --------------------------------------------------
 * MNKR_BattleStartCommon.js
 *   Ver.2.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleStartCommon.js
@plugindesc Replaces the message at the start of battle with a common event.
@author example
@license MIT License

@help
Replaces the battle start message with a common event.

Specify the variable to use as a parameter.
The variable's value will be used as the common event ID.

If you want to display a battle start message after a common event,
add the following script (same code as in the core) to the common event.

$gameTroop.enemyNames().forEach(function(name) {
$gameMessage.add(TextManager.emerge.format(name));
});
if (this._preemptive) {
$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
} else if (this._surprise) {
$gameMessage.add(TextManager.surprise.format($gameParty.name()));
}

Example
◆Combat animation display: Entire enemy group, Light/Entire group 3
◆Weight: 60 frames
◆Script:
$gameTroop.enemyNames().forEach(function(name) {
$gameMessage.add(TextManager.emerge.format(name));
});
if (this._preemptive) {
$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
} else if (this._surprise) {
$gameMessage.add(TextManager.surprise.format($gameParty.name()));
}

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param variableId
@text Designated variables
@desc Variable ID that specifies a common event. Executes the common event whose variable value is ID. If none, it will behave the same as if the value was 0.
@type variable
@default 1

@param valueZero
@text Handling variable values of 0
@desc Whether to display the default battle start message if the specified variable's value is 0
@type boolean
@on display
@off hidden
@default false
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleStartCommon.js
@plugindesc 戦闘開始時のメッセージをコモンイベントに置き換えます。
@author munokura

@help
戦闘開始時のメッセージをコモンイベントに置き換えます。

パラメーターで使用する変数を指定してください。
変数の値をコモンイベントIDとして実行します。

コモンイベント後に戦闘開始メッセージを表示したい場合、
コモンイベントに下記のスクリプト（コアと同じ記述）を追加してください。

$gameTroop.enemyNames().forEach(function(name) {
    $gameMessage.add(TextManager.emerge.format(name));
});
if (this._preemptive) {
    $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
} else if (this._surprise) {
    $gameMessage.add(TextManager.surprise.format($gameParty.name()));
}

例
◆戦闘アニメーションの表示：敵グループ全体, 光/全体3
◆ウェイト：60フレーム
◆スクリプト：
$gameTroop.enemyNames().forEach(function(name) {
    $gameMessage.add(TextManager.emerge.format(name));
});
if (this._preemptive) {
    $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
} else if (this._surprise) {
    $gameMessage.add(TextManager.surprise.format($gameParty.name()));
}


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param variableId
@text 指定変数
@type variable
@desc コモンイベントを指定する変数ID。変数値がIDのコモンイベントを実行します。なしの場合、値が0と同じ動作になります。
@default 1

@param valueZero
@text 変数値が0の処理
@type boolean
@on 表示
@off 非表示
@desc 指定変数の値が0の場合に、デフォルトの戦闘開始メッセージを表示するかどうか
@default false
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_variableId = Number(parameters['variableId'] || 0);
    const PRM_valueZero = parameters['valueZero'] === 'true';

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if (PRM_valueZero && $gameVariables.value(PRM_variableId) === 0) {
            _BattleManager_displayStartMessages.call(this);
        } else {
            $gameTemp.reserveCommonEvent($gameVariables.value(PRM_variableId));
        }
    };

})();