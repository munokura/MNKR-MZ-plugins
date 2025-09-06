/*
 * --------------------------------------------------
 * MNKR_AddTitleLink.js
 *   Ver.0.0.6
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddTitleLink.js
@plugindesc Adds a link command to the title menu.
@author munokura
@license MIT License

@help
Adds a link command to the title menu.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param commandText
@text Command Display Name
@desc Command name to display in the title menu
@default サイトリンク

@param url
@text URL
@desc Link URL
@default https://tkool.jp/mz/
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddTitleLink.js
@plugindesc タイトルメニューにリンクコマンドを追加します。
@author munokura

@help
タイトルメニューにリンクコマンドを追加します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param commandText
@text コマンド表示名
@desc タイトルメニューに表示するコマンド名
@default サイトリンク

@param url
@text URL
@typr string
@desc リンク先のURL
@default https://tkool.jp/mz/
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_commandText = parameters['commandText'] || "サイトリンク";
    const PRM_url = parameters['url'] || "https://tkool.jp/mz/";

    const _Window_TitleCommand_prototype_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function () {
        _Window_TitleCommand_prototype_makeCommandList.call(this);
        this.addCommand(PRM_commandText, "MNKR_urlCommandName");
    };

    const _Scene_Title_prototype_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function () {
        _Scene_Title_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler("MNKR_urlCommandName", this.MNKR_urlCommand.bind(this));
    };

    Scene_Title.prototype.MNKR_urlCommand = function () {
        window.open(PRM_url);
        this._commandWindow.activate();
    };

})();