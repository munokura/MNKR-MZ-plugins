/*
 * --------------------------------------------------
 * MNKR_HideFace Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideFace.js
 * @plugindesc 顔画像を非表示にし、メニューの表示ゲージ幅を指定できます。
 * @author munokura
 *
 * @help
 * 顔画像を非表示にし、メニューの表示ゲージ幅を指定できます。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param Gauge Width
 * @text ゲージ幅
 * @type number
 * @desc メニューで表示されるゲージの幅を指定
 * ツクールデフォルト:128
 * @default 320
 */

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const gaugeWidth = Number(parameters['Gauge Width'] || 0);

  //メニュー・スキル・ステータスシーンのゲージ幅
  const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
  Sprite_Gauge.prototype.bitmapWidth = function () {
    const isSceneMenu = SceneManager._scene.constructor.name;
    return (['Scene_Menu', 'Scene_Skill', 'Scene_Status'].includes(isSceneMenu)) ? gaugeWidth : _Sprite_Gauge_bitmapWidth.call(this);
  };

  //メニュー画面の位置調整
  Window_MenuStatus.prototype.drawItemStatus = function (index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x + 32;
    const y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    this.drawActorSimpleStatus(actor, x, y);
  };

  //メニュー画面内の各アクター表示
  Window_MenuStatus.prototype.drawItemImage = function (index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const width = ImageManager.faceWidth;
    const height = rect.height - 2;
    this.changePaintOpacity(actor.isBattleMember());
    this.changePaintOpacity(true);
  };

  //ステータス画面
  Window_Status.prototype.drawBlock2 = function () {
    const y = this.block2Y();
    this.drawBasicInfo(32, y);
    this.drawExpInfo(456, y);
  };

  //スキル画面
  Window_SkillStatus.prototype.refresh = function () {
    Window_StatusBase.prototype.refresh.call(this);
    if (this._actor) {
      const x = this.colSpacing() / 2;
      const h = this.innerHeight;
      const y = h / 2 - this.lineHeight() * 1.5;
      this.drawActorSimpleStatus(this._actor, x, y);
    }
  };

  //ゲージ位置
  Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
    const lineHeight = this.lineHeight();
    const x2 = x + 160;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.placeBasicGauges(actor, x2, y + lineHeight);
  };

})();