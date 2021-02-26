/*
 * --------------------------------------------------
 * MNKR_TitleRandomImage.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TitleRandomImage.js
 * @plugindesc タイトル画像をランダムに変更します。
 * @author munokura
 *
 * @help
 * タイトル画像をランダムに変更し表示します。
 * 
 * 画像を /img/titles1 内に入れ、
 * プラグインパラメーターで指定することで、表示候補になります。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param titleImages
 * @desc タイトル画像リストを設定します
 * @text タイトル画像リスト
 * @type file[]
 * @require 1
 * @dir img/titles1
 * @default
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const titleImages = JSON.parse(parameters['titleImages']);

  const _Scene_Title_initialize = Scene_Title.prototype.initialize;
  Scene_Title.prototype.initialize = function () {
    _Scene_Title_initialize.apply(this, arguments);
    $dataSystem.title1Name = titleImages[Math.floor(Math.random() * titleImages.length)];
  };

})();