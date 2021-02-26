/*
 * --------------------------------------------------
 * MNKR_OpenWindowLinks.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OpenWindowLinks.js
 * @plugindesc 新しいウィンドウに指定されたURLを開くプラグインコマンドを追加します。
 * @author munokura
 * 
 * @help
 * 新しいウィンドウに指定されたURLを開くプラグインコマンドを提供します。
 *
 * 謝辞
 *   コードの主要部分はトリアコンタン氏が公開しているコードです。
 *   https://gist.github.com/triacontane/8992baccfb35f985ec93107b8ced6c30
 *   トリアコンタン氏の活動に感謝申し上げます。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @command newWindow
 * @text New Window Open URL
 * @desc 指定のURLをブラウザで開きます。
 *
 * @arg text
 * @type string
 * @text URL
 * @desc 開くURLを設定します。
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    let url = "";

    PluginManager.registerCommand(pluginName, "newWindow", args => {
        url = String(args.text);

        if (Utils.isNwjs()) {
            var exec = require('child_process').exec;
            switch (process.platform) {
                case 'win32':
                    exec('rundll32.exe url.dll,FileProtocolHandler "' + url + '"');
                    break;
                default:
                    exec('open "' + url + '"');
                    break;
            }
        } else {
            window.open(url);
        }
    });

})();