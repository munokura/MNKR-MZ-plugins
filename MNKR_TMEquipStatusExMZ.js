/*
 * --------------------------------------------------
 * MNKR_TMEquipStatusExMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - 装備ステータス編集
// バージョン: 1.0.0
// 最終更新日: 2017/10/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMEquipStatusExMZ.js
 * @author tomoaky (改変 munokura)
 * @plugindesc 装備ステータスの項目を自由に編集します。
 *
 * @param paramList
 * @text 表示パラメータ
 * @type string
 * @desc 表示するパラメータ番号を半角スペースで区切って並べます。
 * 初期値: 0 1 2 3 4 5 6 7
 * @default 0 1 2 3 4 5 6 7
 *
 * @param face
 * @text 顔画像表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc 装備シーンに顔画像を表示します。画面に収まる表示パラメーターが7個までになります。
 * @default false
 * 
 * @help
 * 使い方:
 * 
 * プラグインパラメータ補足:
 * 
 *   paramList
 *     使用できるパラメータは以下のとおりです。
 *     0 … ＨＰ
 *     1 … ＭＰ
 *     2 … 攻撃力
 *     3 … 防御力
 *     4 … 魔法力
 *     5 … 魔法防御
 *     6 … 敏捷性
 *     7 … 運
 *
 *   プラグインコマンドはありません。
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

  const pluginName = 'MNKR_TMEquipStatusExMZ';
  const parameters = PluginManager.parameters(pluginName);
  const paramList = parameters['paramList'].split(' ').map(Number);
  const face = eval(parameters['face'] || 'false');

  //-----------------------------------------------------------------------------
  // Window_EquipStatus
  //

  Window_EquipStatus.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor) {
      const nameRect = this.itemLineRect(0);
      this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
      if (face) {
        this.drawActorFace(this._actor, nameRect.x, nameRect.height);
        for (let i = 0; i < paramList.length; i++) {
          const x = this.itemPadding();
          const y = this.paramY(i);
          this.drawItem(x, y, i);
        }
      } else {
        for (let i = 0; i < paramList.length; i++) {
          this.drawItem(0, this.lineHeight() * (1 + i), paramList[i]);
        }
      }
    }
  };

})();
