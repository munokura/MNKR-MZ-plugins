/*
 * --------------------------------------------------
 * MNKR_HideParamMZ.js
 *   Ver.0.1.0
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HideParamMZ.js
 * @plugindesc 各シーンで指定項目を非表示にします。
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
 * @text レベル
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc レベルを表示するか指定します。
 * 
 * @param exp
 * @text 経験値
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 経験値関係情報を表示するか指定します。
 * 
 * @param gauge
 * @text ゲージ一式
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc ゲージ一式(HP/MP/TP)を表示するか指定します。
 * 
 * @param atk
 * @text 攻撃力
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 攻撃力を表示するか指定します。
 * 
 * @param def
 * @text 防御力
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 防御力を表示するか指定します。
 * 
 * @param mat
 * @text 魔法力
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 魔法力を表示するか指定します。
 * 
 * @param mdf
 * @text 魔法防御
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 魔法防御を表示するか指定します。
 * 
 * @param agi
 * @text 敏捷性
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 敏捷性を表示するか指定します。
 * 
 * @param luk
 * @text 運
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc 運を表示するか指定します。
 *
 */

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_level = parameters['level'] === 'true';
  const PRM_exp = parameters['exp'] === 'true';
  const PRM_gauge = parameters['gauge'] === 'true';
  const PRM_displayParam = [];
  PRM_displayParam.push(parameters['atk'] === 'true');
  PRM_displayParam.push(parameters['def'] === 'true');
  PRM_displayParam.push(parameters['mat'] === 'true');
  PRM_displayParam.push(parameters['mdf'] === 'true');
  PRM_displayParam.push(parameters['agi'] === 'true');
  PRM_displayParam.push(parameters['luk'] === 'true');

  const hasHideParam = PRM_displayParam.some((element) => element === false);

  let statusLineY = 0;

  const _Window_StatusBase_drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
  Window_StatusBase.prototype.drawActorLevel = function (actor, x, y) {
    if (PRM_level) {
      _Window_StatusBase_drawActorLevel.call(this, actor, x, y);
    }
  };

  const _Window_Status_drawExpInfo = Window_Status.prototype.drawExpInfo;
  Window_Status.prototype.drawExpInfo = function (x, y) {
    if (PRM_exp) {
      _Window_Status_drawExpInfo.call(this, x, y);
    }
  };

  const _Sprite_Gauge_redraw = Sprite_Gauge.prototype.redraw;
  Sprite_Gauge.prototype.redraw = function () {
    if (PRM_gauge) {
      _Sprite_Gauge_redraw.call(this);
    }
  };

  const _Window_StatusParams_drawItem = Window_StatusParams.prototype.drawItem;
  Window_StatusParams.prototype.drawItem = function (index) {
    if (hasHideParam) {
      statusLineY = index === 0 ? 0 : statusLineY;
      const paramId = index + 2;
      if (PRM_displayParam[index]) {
        const rect = this.itemLineRect(statusLineY);
        statusLineY++;
        const name = TextManager.param(paramId);
        const value = this._actor.param(paramId);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, rect.x, rect.y, 160);
        this.resetTextColor();
        this.drawText(value, rect.x + 160, rect.y, 60, "right");
      }
    } else {
      _Window_StatusParams_drawItem.call(this, index);
    }
  };

  const _Window_EquipStatus_drawAllParams = Window_EquipStatus.prototype.drawAllParams;
  Window_EquipStatus.prototype.drawAllParams = function () {
    if (hasHideParam) {
      let equipLineY = 0;
      for (let i = 0; i < 6; i++) {
        equipLineY = i === 0 ? 0 : equipLineY;
        if (PRM_displayParam[i]) {
          equipLineY++;
          const x = this.itemPadding();
          const y = this.paramY(equipLineY);
          this.drawItem(x, y, 2 + i);
        }
      }
    } else {
      _Window_EquipStatus_drawAllParams.call(this);
    }
  };

})();
