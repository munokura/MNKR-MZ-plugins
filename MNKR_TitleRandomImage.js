/*
 * --------------------------------------------------
 * MNKR_TitleRandomImage Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TitleRandomImage.js
 * @plugindesc (未完成)タイトル画像をランダムに変更します。
 * @author munokura
 *
 * @help
 * (未完成)タイトル画像をランダムに変更します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
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
  const titleImages = parameters['titleImages'];

  console.log(titleImages);
  console.log(titleImages.length);

  const _Scene_Title_initialize = Scene_Title.prototype.initialize;
  Scene_Title.prototype.initialize = function () {
    _Scene_Title_initialize.apply(this, arguments);
    this.changeTitleRandom();
  };

  Scene_Title.prototype.changeTitleRandom = function () {
    let titleImagesTest = ["Beach", "Bigtree"];
    $dataSystem.title1Name = titleImagesTest[Math.floor(Math.random() * titleImagesTest.length)];
  };

})();