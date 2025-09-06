/*
 * --------------------------------------------------
 * MNKR_HideFace.js
 *   Ver.1.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideFace.js
@plugindesc You can hide the face image and specify the display gauge width of the menu.
@author example
@license MIT License

@help
You can hide face images and specify the width of the menu display gauge.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param gaugeInMenu
@text Menu Gauge Width
@desc Specify the gauge to be displayed in the menu scene
@type number
@default 320

@param gaugeInSkill
@text Skill Gauge Width
@desc Specify the gauge to be displayed during the skill scene
@type number
@default 320

@param gaugeInStatus
@text Status Gauge Width
@desc Specify the gauge to be displayed in the menu
@type number
@default 320
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideFace.js
@plugindesc 顔画像を非表示にし、メニューの表示ゲージ幅を指定できます。
@author munokura

@help
顔画像を非表示にし、メニューの表示ゲージ幅を指定できます。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。

@param gaugeInMenu
@text メニューのゲージ幅
@desc メニューシーンで表示されるゲージを指定
ツクールデフォルト:128
@default 320
@type number

@param gaugeInSkill
@text スキルのゲージ幅
@desc スキルシーンで表示されるゲージを指定
ツクールデフォルト:128
@default 320
@type number

@param gaugeInStatus
@text ステータスのゲージ幅
@desc メニューで表示されるゲージを指定
ツクールデフォルト:128
@default 320
@type number
*/

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const gaugeInMenu = Number(parameters['gaugeInMenu'] || 128);
  const gaugeInSkill = Number(parameters['gaugeInSkill'] || 128);
  const gaugeInStatus = Number(parameters['gaugeInStatus'] || 128);

  //メニュー・スキル・ステータスシーンのゲージ幅
  Sprite_Gauge.prototype.bitmapWidth = function () {
    const isSceneMenu = SceneManager._scene.constructor.name;
    switch (isSceneMenu) {
      case 'Scene_Menu':
        return gaugeInMenu;
      case 'Scene_Skill':
        return gaugeInSkill;
      case 'Scene_Status':
        return gaugeInStatus;
      default:
        return 128;
    }
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