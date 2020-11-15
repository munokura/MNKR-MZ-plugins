/*
 * --------------------------------------------------
 * MNKR_TMCharacterExMZ Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - キャラクター表示拡張
// バージョン: 2.0.2
// 最終更新日: 2016/12/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMCharacterExMZ.js
 * @plugindesc イベントに表示位置補正、回転、拡大の機能を追加します。
 * @author tomoaky (改変 munokura)
 *
 * @help
 * 使い方:
 *
 *   イベントのメモ欄にタグを書き込むことで、表示位置や拡大率、回転角度の
 *   設定ができます。
 *
 *   イベント画像の原点のデフォルト位置は、[0.5,1.0]です。
 *   （左上から[x:+24,y:-48]ピクセル）
 * 
 *   イベント画像の中心を軸に回転させたい場合は angle タグと一緒に
 *   <anchorY:0.5> を設定してください。
 *
 *   イベントページが変化した際、次のページでタグ設定がないパラメータは
 *   変化前の状態がそのまま引き継がれます。
 *
 *
 * メモ欄(イベント)タグ:
 *
 *   <chrShift:0 0>         # 表示位置補正値を変更
 *   <chrAngle:0>           # 回転角度を変更 ( 0 ～ 359 )
 *   <chrScale:1.0 1.0>     # 拡大率を変更 ( 1.0 で等倍)
 *   <chrAnchor:0.5 1.0>    # 原点位置を変更
 *
 *   数値が 2 つあるタグはX方向とY方向の設定をそれぞれ指定してください。
 * 
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグでパラメータを設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *
 * スクリプトコマンド:
 * 
 *   イベントコマンド『移動ルートの設定』で
 *   下記のスクリプトを使用してください。
 *   通常のイベントで使用するとエラーになるのでご注意ください。
 *
 *   this.setChrShift(-10, 5);
 *     このイベントの元画像から表示位置を左に10、下に5ずらす。
 *
 *   this.setChrAngle(180);
 *     このイベントを元画像から180度回転して表示。
 *
 *   this.setChrScale(2, 1);
 *     このイベントの元画像から幅だけを2倍に拡大表示。
 *
 *   this.setChrScaleRate(1, 1.5);
 *     このイベントの元画像から拡大補正率を幅はそのまま、高さ1.5倍で表示。
 *
 *
 * プラグインコマンド:
 *
 *   イベント番号(ひとつ目の数値)は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤー
 *     0      … コマンドを実行しているイベント
 *     1 以上 … 番号のイベント
 *
 *   chrShift 1 5 -3
 *     イベント 1 番を右に 5、上に 3 ドットずらします。
 *
 *   chrAngle 1 90
 *     イベント 1 番を右に 90 度回転させます。
 *
 *   chrScale 2 1.5 0.5
 *     イベント 2 番の幅を 50% 拡大し、高さを半分に縮小します。
 *
 *   chrScaleRate 3 1.3 0.7
 *     イベント 3 番の拡大補正率を幅 1.3 倍、高さ 0.7 倍に設定します。
 *     拡大補正率は setChrScale による拡大率とは別に乗算され、
 *     時間経過で等倍に戻ります。
 *
 *   chrClear 1
 *     イベント 1 番に適用されている chrShift、chrAngle、chrScale の効果を
 *     すべて解除します。
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param landingAnimation
 * @text ジャンプ後拡大補正
 * @desc ジャンプ後の着地時に拡大補正率を自動的に適用する。
 * 初期値: true (有効:true / 無効:false)
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * 
 * 
 * @command chrShift
 * @text イベント位置調整
 * @desc イベントをずらします。
 *
 * @arg eventId
 * @text イベントID
 * @desc 表示位置を変更するイベントID。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg offsetX
 * @text 横方向ドット量
 * @desc イベントを横方向にずらすドット量。
 * 基本位置から正の値で右、負の値で左にずれます。
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * 
 * @arg offsetY
 * @text 縦方向ドット量
 * @desc イベントを縦方向にずらすドット量。
 * 基本位置から正の値で下、負の値で上にずれます。
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * 
 * 
 * @command chrAngle
 * @text イベント回転
 * @desc イベントを右に回転します。
 *
 * @arg eventId
 * @text イベントID
 * @desc 表示位置を変更するイベントID。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg angle
 * @text 回転度数
 * @desc イベントを右方向に回転させる度数。
 * 基本位置から右方向に回転します。
 * @type number
 * @min 0
 * @max 359
 * @default 0
 * 
 * 
 * @command chrScale
 * @text イベント拡大縮小
 * @desc イベントを拡大縮小します。
 *
 * @arg eventId
 * @text イベントID
 * @desc 表示位置を変更するイベントID。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg scaleX
 * @text 横方向拡大率
 * @desc イベントを横方向に拡大する百分率。
 * 基本位置から絶対値が大きいと大きく、負の値で左右反転します。
 * @default 1.00
 * 
 * @arg scaleY
 * @text 縦方向拡大率
 * @desc イベントを縦方向に拡大する百分率。
 * 基本位置から絶対値が大きいと大きく、負の値で上下反転します。
 * @default 1.00
 * 
 * 
 * @command chrScaleRate
 * @text イベント拡大補正率
 * @desc イベントを拡大補正率を指定します。拡大率とは別に乗算され、時間経過で等倍に戻ります。
 *
 * @arg eventId
 * @text イベントID
 * @desc 表示位置を変更するイベントID。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg scaleX
 * @text 横方向拡大補正率
 * @desc イベント横方向の拡大補正率。
 * @default 1.00
 * 
 * @arg scaleY
 * @text 縦方向拡大補正率
 * @desc イベント縦方向の拡大補正率。
 * @default 1.00
 * 
 * 
 * @command chrClear
 * @text イベント設定解除
 * @desc 他のプラグインコマンドで指定した効果を解除します。
 *
 * @arg eventId
 * @text イベントID
 * @desc 表示位置を変更するイベントID。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 */

var Imported = Imported || {};
Imported.TMCharacterEx = true;
var TMPlugin = TMPlugin || {};

if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;

  (() => {
    "use strict";

    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function () {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function () {
      this._commentParams = {};
      let re = /<([^<>:]+)(:?)([^>]*)>/g;
      let list = this.list();
      for (let i = 0; i < list.length; i++) {
        let command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (; ;) {
            let match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function (paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  TMPlugin.CharacterEx = {};
  TMPlugin.CharacterEx.Parameters = PluginManager.parameters(pluginName);
  TMPlugin.CharacterEx.LandingAnimation = TMPlugin.CharacterEx.Parameters['landingAnimation'] === 'true';

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    _Game_CharacterBase_initMembers.call(this);
    this.initChrParams();
  };

  Game_CharacterBase.prototype.initChrParams = function () {
    this._chrShiftX = 0;
    this._chrShiftY = 0;
    this._chrAngle = 0;
    this._chrScaleX = 1.0;
    this._chrScaleY = 1.0;
    this._chrAnchorX = 0.5;
    this._chrAnchorY = 1;
    this._chrScaleRateX = 1;
    this._chrScaleRateY = 1;
  };

  const _Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
  Game_CharacterBase.prototype.screenX = function () {
    return _Game_CharacterBase_screenX.call(this) + this._chrShiftX;
  };

  const _Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
  Game_CharacterBase.prototype.screenY = function () {
    return _Game_CharacterBase_screenY.call(this) + this._chrShiftY;
  };

  Game_CharacterBase.prototype.screenAngle = function () {
    return this._chrAngle;
  };

  Game_CharacterBase.prototype.screenScaleX = function () {
    return this._chrScaleX * this._chrScaleRateX;
  };

  Game_CharacterBase.prototype.screenScaleY = function () {
    return this._chrScaleY * this._chrScaleRateY;
  };

  Game_CharacterBase.prototype.screenAnchorX = function () {
    return this._chrAnchorX;
  };

  Game_CharacterBase.prototype.screenAnchorY = function () {
    return this._chrAnchorY;
  };

  Game_CharacterBase.prototype.setChrShift = function (shiftX, shiftY) {
    if (shiftX != null && shiftY != null) {
      this._chrShiftX = +shiftX;
      this._chrShiftY = +shiftY;
    }
  };

  Game_CharacterBase.prototype.setChrAngle = function (angle) {
    if (angle != null) {
      this._chrAngle = angle * Math.PI / 180;
    }
  };

  Game_CharacterBase.prototype.setChrScale = function (scaleX, scaleY) {
    if (scaleX != null && scaleY != null) {
      this._chrScaleX = +scaleX;
      this._chrScaleY = +scaleY;
    }
  };

  Game_CharacterBase.prototype.setChrScaleRate = function (scaleRateX, scaleRateY) {
    if (scaleRateX != null && scaleRateY != null) {
      this._chrScaleRateX = +scaleRateX;
      this._chrScaleRateY = +scaleRateY;
    }
  };

  Game_CharacterBase.prototype.setChrAnchor = function (anchorX, anchorY) {
    if (anchorX != null && anchorY != null) {
      this._chrAnchorX = +anchorX;
      this._chrAnchorY = +anchorY;
    }
  };

  const _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function () {
    _Game_CharacterBase_updateJump.call(this);
    if (TMPlugin.CharacterEx.LandingAnimation && this._jumpCount === 0) {
      this.setChrScaleRate(1.3, 0.7);
    }
  };

  const _Game_CharacterBase_updateAnimation = Game_CharacterBase.prototype.updateAnimation;
  Game_CharacterBase.prototype.updateAnimation = function () {
    _Game_CharacterBase_updateAnimation.call(this);
    if (this._chrScaleRateX < 1) {
      this._chrScaleRateX = Math.min(this._chrScaleRateX + 0.05, 1);
    } else if (this._chrScaleRateX > 1) {
      this._chrScaleRateX = Math.max(this._chrScaleRateX - 0.05, 1);
    }
    if (this._chrScaleRateY < 1) {
      this._chrScaleRateY = Math.min(this._chrScaleRateY + 0.05, 1);
    } else if (this._chrScaleRateY > 1) {
      this._chrScaleRateY = Math.max(this._chrScaleRateY - 0.05, 1);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  const _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function () {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      let chrShift = this.loadTagParam('chrShift');
      if (chrShift) this.setChrShift.apply(this, chrShift.split(' '));
      this.setChrAngle(this.loadTagParam('chrAngle'));
      let chrScale = this.loadTagParam('chrScale');
      if (chrScale) this.setChrScale.apply(this, chrScale.split(' '));
      let chrAnchor = this.loadTagParam('chrAnchor');
      if (chrAnchor) this.setChrAnchor.apply(this, chrAnchor.split(' '));
    } else {
      this.initChrParams();
    }
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "chrShift", function (args) {
    const arr = [args.eventId, args.offsetX, args.offsetY];
    let character = this.character(+arr[0]);
    if (character) character.setChrShift(arr[1], arr[2]);
  });

  PluginManager.registerCommand(pluginName, "chrAngle", function (args) {
    const arr = [args.eventId, args.angle];
    let character = this.character(+arr[0]);
    if (character) character.setChrAngle(arr[1]);
  });

  PluginManager.registerCommand(pluginName, "chrScale", function (args) {
    const arr = [args.eventId, args.scaleX, args.scaleY];
    let character = this.character(+arr[0]);
    if (character) character.setChrScale(arr[1], arr[2]);
  });

  PluginManager.registerCommand(pluginName, "chrScaleRate", function (args) {
    const arr = [args.eventId, args.scaleX, args.scaleY];
    let character = this.character(+arr[0]);
    if (character) character.setChrScaleRate(arr[1], arr[2]);
  });

  PluginManager.registerCommand(pluginName, "chrClear", function (args) {
    const arr = [args.eventId];
    let character = this.character(+arr[0]);
    if (character) {
      character.setChrShift(0, 0);
      character.setChrAngle(0);
      character.setChrScale(1.0, 1.0);
    }
  });

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  const _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function () {
    _Sprite_Character_updateOther.call(this);
    this.rotation = this._character.screenAngle();
    this.scale.set(this._character.screenScaleX(), this._character.screenScaleY());
    this.anchor.set(this._character.screenAnchorX(), this._character.screenAnchorY());
  };

})();