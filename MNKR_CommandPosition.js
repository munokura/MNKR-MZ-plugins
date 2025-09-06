/*
 * --------------------------------------------------
 * MNKR_CommandPosition.js
 *   Ver.1.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommandPosition.js
@plugindesc Change the display position of the main menu.
@author example
@license MIT License

@help
Specifies the display position of the main menu.

If you disable the status window, the Skills, Equipment, Status, and Sort
commands will be unavailable (the program will freeze when selected).

If you want to hide the status window and use the Skills, Equipment, Status,
and Sort commands, do not hide them with this plugin, but hide them with
another plugin.

The number of menu lines will be automatically reflected if you specify 0, but
if you have added commands with another plugin, they will not be reflected as
is.

Basically, you should specify the number of lines.

There are no plugin commands.

# Contact
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on usage (commercial, R18, etc.).

@param commandPosition
@text Menu Position
@desc Specify the menu display position. The number is the position on the numeric keypad.
@type number
@default 7
@min 1
@max 9

@param commandRows
@text Number of menu lines
@desc Specifies the number of lines in the menu. If you set it to 0, it will change according to the number of commands.
@type number
@default 8

@param statusWindowHide
@text Disable the status window
@desc Disables the status window. Skill, equipment, status, and sort commands will be unavailable.
@type boolean
@on Disable
@off Do not disable
@default true

@param goldWindowHide
@text Hide money window
@desc Hides the money window.
@type boolean
@on hidden
@off display
@default true
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommandPosition.js
@plugindesc メインメニューの表示位置を変更します。
@author munokura
@help
メインメニューの表示位置を指定します。

ステータスウィンドウ無効化をすると、
スキル・装備・ステータス・並び替え
のコマンドが使えなく（選択するとフリーズするように）なります。

ステータスウィンドウを非表示にし、
スキル・装備・ステータス・並び替え
のコマンドを使用したい場合、このプラグインでは非表示せずに、
他のプラグインで非表示にしてください。

メニュー行数は0を指定すると自動的に反映しますが、
他のプラグインでコマンドを追加していると、そのままでは反映されません。
基本的に行数を指定してください。


プラグインコマンドはありません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param commandPosition
@text メニュー位置
@type number
@min 1
@max 9
@desc メニューの表示位置を指定します。数字はテンキーの位置
@default 7

@param commandRows
@text メニュー行数
@type number
@desc メニューの行数を指定します。0にすると、コマンド数に併せて変動します。
@default 8

@param statusWindowHide
@text ステータスウィンドウ無効化
@type boolean
@on 無効化
@off 無効化しない
@desc ステータスウィンドウを無効化します。スキル、装備、ステータス、並び替えのコマンドが使えなくなります。
@default true

@param goldWindowHide
@text 所持金ウィンドウ非表示
@type boolean
@on 非表示
@off 表示
@desc 所持金ウィンドウを非表示にします。
@default true
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_commandPosition = Number(parameters['commandPosition'] || 7);
    const PRM_commandRows = Number(parameters['commandRows'] || 8);
    const PRM_statusWindowHide = parameters['statusWindowHide'] === 'true';
    const PRM_goldWindowHide = parameters['goldWindowHide'] === 'true';

    const _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function () {
        if (PRM_statusWindowHide) {
            _Scene_Menu_createStatusWindow.call(this);
            this._statusWindow.hide();
        } else {
            _Scene_Menu_createStatusWindow.call(this);
        }
    };

    const _Scene_Menu_createGoldWindow = Scene_Menu.prototype.createGoldWindow;
    Scene_Menu.prototype.createGoldWindow = function () {
        if (!PRM_goldWindowHide) {
            _Scene_Menu_createGoldWindow.call(this);
        }
    };

    Scene_Menu.prototype.commandWindowRectangles = function (width, height) {
        const leftX = 0;
        const midX = Graphics.boxWidth / 2 - width / 2;
        const rightX = Graphics.boxWidth - width;
        const topY = this.mainAreaTop();
        const midY = this.mainAreaHeight() / 2 - height / 2;
        const bottomY = this.mainAreaHeight() - height;
        return [
            null,

            new Rectangle(leftX, bottomY, width, height),
            new Rectangle(midX, bottomY, width, height),
            new Rectangle(rightX, bottomY, width, height),

            new Rectangle(leftX, midY, width, height),
            new Rectangle(midX, midY, width, height),
            new Rectangle(rightX, midY, width, height),

            new Rectangle(leftX, topY, width, height),
            new Rectangle(midX, topY, width, height),
            new Rectangle(rightX, topY, width, height)
        ];
    };

    Scene_Menu.prototype.commandWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(PRM_commandRows === 0 ? countCommand() : PRM_commandRows, true);
        return this.commandWindowRectangles(ww, wh)[PRM_commandPosition];
    };

    function countCommand() {
        return $dataSystem.menuCommands.filter(commandEnabled => commandEnabled).length + 2;
    };

})();