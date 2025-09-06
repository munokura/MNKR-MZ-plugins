/*
 * --------------------------------------------------
 * MNKR_TMEquipStatusExMZ.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMEquipStatusExMZ.js
@plugindesc Edit the equipment status display items.
@author munokura
@license MIT License

@help
Edits the equipment status display items.

How to use:

Plugin parameter details:

paramList
The available parameters are as follows:
0 ... HP
1 ... MP
2 ... Attack Power
3 ... Defense Power
4 ... Magic Power
5 ... Magic Defense
6 ... Agility
7 ... Luck

There are no plugin commands.

# Contact Information
This is a plugin originally created for RPG Maker MV ported for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission, and there are
no restrictions on its use (commercial, 18+, etc.).

@param paramList
@text Display Parameters
@desc The parameter numbers to be displayed are separated by spaces.
@type string
@default 0 1 2 3 4 5 6 7

@param face
@text Face image display
@desc Displays a face image in the equipment scene. Up to 7 display parameters can be displayed on the screen.
@type boolean
@on display
@off hidden
@default false
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMEquipStatusExMZ.js
@author tomoaky (改変:munokura)
@plugindesc 装備ステータスの表示項目を編集します。

@help
装備ステータスの表示項目を編集します。

使い方:

プラグインパラメータ補足:

  paramList
    使用できるパラメータは以下のとおりです。
    0 … ＨＰ
    1 … ＭＰ
    2 … 攻撃力
    3 … 防御力
    4 … 魔法力
    5 … 魔法防御
    6 … 敏捷性
    7 … 運

  プラグインコマンドはありません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param paramList
@text 表示パラメータ
@type string
@desc 表示するパラメータ番号を半角スペースで区切って並べます。
初期値: 0 1 2 3 4 5 6 7
@default 0 1 2 3 4 5 6 7

@param face
@text 顔画像表示
@type boolean
@on 表示
@off 非表示
@desc 装備シーンに顔画像を表示します。画面に収まる表示パラメーターが7個までになります。
@default false
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



var Imported = Imported || {};
Imported.TMEquipStatusEx = true;

(() => {
  'use strict';

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const paramList = parameters['paramList'].split(' ').map(Number);
  const face = String(parameters['face']) === 'true';

  //-----------------------------------------------------------------------------
  // Window_EquipStatus
  //

  Window_EquipStatus.prototype.numVisibleRows = function () {
    return paramList.length + 1;
  };

  Window_EquipStatus.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor) {
      let nameRect = this.itemLineRect(0);
      this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
      if (face) {
        this.drawActorFace(this._actor, nameRect.x, nameRect.height);
        for (let i = 0; i < paramList.length; i++) {
          const x = this.itemPadding();
          const y = this.paramY(i);
          this.drawItem(x, y, paramList[i]);
        }
      } else {
        for (let i = 0; i < paramList.length; i++) {
          this.drawItem(0, this.lineHeight() * (1 + i), paramList[i]);
        }
      }
    }
  };

})();