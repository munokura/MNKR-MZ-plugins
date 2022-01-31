/*
 * --------------------------------------------------
 * MNKR_HideParamMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideParamMZ.js
 * @plugindesc 各シーン（アイテム・スキル・装備・ステータス・並び替え・戦闘）で指定項目を非表示にします。
 * @author munokura
 *
 * @help
 * 各シーン（アイテム・スキル・装備・ステータス・並び替え・戦闘）で
 * 指定項目を非表示にします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param level
 * @text レベル表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc レベルを表示するか指定します。
 * 
 * @param exp
 * @text 経験値表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 経験値関係情報を表示するか指定します。
 * 
 * @param gauge
 * @text ゲージ一式表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc ゲージ一式(HP/MP/TP)を表示するか指定します。
 *
 */

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const param = {};
  param.level = parameters['level'] === 'true';
  param.exp = parameters['exp'] === 'true';
  param.gauge = parameters['gauge'] === 'true';


  const _Window_StatusBase_drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
  Window_StatusBase.prototype.drawActorLevel = function (actor, x, y) {
    if (param.level) {
      _Window_StatusBase_drawActorLevel.call(this, actor, x, y);
    }
  };

  const _Window_Status_drawExpInfo = Window_Status.prototype.drawExpInfo;
  Window_Status.prototype.drawExpInfo = function (x, y) {
    if (param.exp) {
      _Window_Status_drawExpInfo.call(this, x, y);
    }
  };

  const _Sprite_Gauge_redraw = Sprite_Gauge.prototype.redraw;
  Sprite_Gauge.prototype.redraw = function () {
    if (param.gauge) {
      _Sprite_Gauge_redraw.call(this);
    }
  };

})();