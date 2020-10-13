/*
 * --------------------------------------------------
 * MNKR_AddTitleLink Ver.0.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AddTitleLink.js
 * @plugindesc タイトルメニューにリンクコマンドを追加します。
 * @author munokura
 *
 * @param Command Text
 * @text コマンド表示名
 * @desc タイトルメニューに表示するコマンド名
 * @default サイトリンク
 * 
 * @param url
 * @text URL
 * @typr string
 * @desc リンク先のURL
 * @default https://tkool.jp/mz/
 *
 * @help
 * タイトルメニューにリンクコマンドを追加します。
 *
 * プラグインコマンドはありません。
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    'use strict';
    const pluginName = 'MNKR_AddTitleLink';
    const parameters = PluginManager.parameters(pluginName);
    const commandText = String(parameters['Command Text'] || "");
    const url = String(parameters['url'] || "");

    const _Window_TitleCommand_prototype_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_prototype_makeCommandList.call(this);
        if (commandText) {
            this.addCommand(commandText, "MNKR_urlCommandName");
        }
    };

    const _Scene_Title_prototype_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler("MNKR_urlCommandName", this.MNKR_urlCommand.bind(this));
    };

    Scene_Title.prototype.MNKR_urlCommand = function() {
        window.open(url, '_blank');
        this._commandWindow.activate();
    };

})();