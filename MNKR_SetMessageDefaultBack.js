/*
 * --------------------------------------------------
 * MNKR_SetMessageDefaultBack Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SetMessageDefaultBack.js
 * @plugindesc 「文章の表示」コマンドのデフォルト指定の背景を変更します。
 * @author munokura
 *
 * @help
 * RPGツクールMZ・MVで「文章の表示」コマンドのデフォルト指定の背景は
 * 「ウィンドウ」が指定されています。
 * これを別の背景タイプに変更します。
 *
 * プラグインパラメータで背景のデフォルトを指定して下さい。
 * 「文章の表示」コマンドの背景指定「ウィンドウ」を
 * プラグインで指定した「暗くする」や「透明」の背景に変更して表示されます。
 *
 * 「ウィンドウ」タイプの背景を使う必要がある場合、
 * 「文章の表示」コマンドの背景を、
 * プラグインパラメーターで指定したタイプと同じ背景に設定します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * 謝辞
 * 
 * このプラグインは蔦森くいな氏作
 *   メッセージウィンドウ背景デフォルト指定プラグイン
 * の仕様を参考に作成を開始しました。
 * 最初は全く違うコードだったのですが、
 * 整理して比較した結果、上記プラグインと非常に似通ったコードになりました。
 * 当方のコードのほうがチープと思うのですが、
 * 蔦森くいな氏のコードが理解できませんでした。
 * そして、上記プラグインがMZで動くことが判明しました…という経緯があります。
 * せっかく作ったので、公開することにしました。
 * 
 * 
 * @param messageDefaultBack
 * @text 文章の表示のデフォルト背景
 * @type select
 * @option 暗くする
 * @value dark
 * @option 透明
 * @value clear
 * @desc デフォルトにする文章の表示の背景タイプ
 * @default clear
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const messageDefaultBack = Number(parameters['messageDefaultBack'] === "dark" ? 1 : 2);

    const _Game_Message_setBackground = Game_Message.prototype.setBackground;
    Game_Message.prototype.setBackground = function (background) {
        switch (background) {
            case 0:
                background = messageDefaultBack;
                break;
            case messageDefaultBack:
                background = 0;
                break;
        }
        _Game_Message_setBackground.call(this, background);
    };

})();