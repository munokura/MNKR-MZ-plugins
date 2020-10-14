/*
 * --------------------------------------------------
 * MNKR_TMAnimeLightMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - アニメ付き明かり
// バージョン: 2.0.1
// 最終更新日: 2016/12/02
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMAnimeLightMZ.js
 * @plugindesc イベントにアニメーション付きの明かりを表示します。
 *
 * @author tomoaky (改変 munokura)
 *
 * @param range
 * @text アニメーションの大きさ
 * @type number
 * @decimals 2
 * @desc アニメーションの大きさ
 * 初期値: 0.10 ( 0.10 でプラスマイナス 10% の拡大縮小アニメ)
 * @default 0.10
 *
 * @param defaultZ
 * @text アニメーションのZ座標
 * @type number
 * @decimals
 * @desc アニメーションのZ座標
 * 初期値: 4
 * @default 4
 *
 * @param frames
 * @text アニメーションのフレーム数
 * @type number
 * @decimals
 * @desc アニメーションにかけるフレーム数
 * 初期値: 30
 * @default 30
 *
 * @help
 * 準備:
 *   明かり画像を img/system フォルダに保存してください。
 *   ファイル名は自由に変更可能です。
 *   イベント毎に違う画像を表示することもできます。
 *
 *
 * 使い方:
 *   イベントのメモ欄に <animeLight:ファイル名> というタグを書き込めば、
 *   明かりが表示されるようになります。
 *
 *   明かりの位置もタグを使って調整することができます。
 *
 *
 * メモ欄(イベント)タグ:
 *   <animeLight:TMAnimeLight1 192 24 -44 4>
 *     画像 TMAnimeLight1.png を不透明度 192 で、イベントの足元から右に 24、
 *     上に 44 ドットずらした位置にZ座標 4 で表示します。
 *     不透明度の最大値は 255 です。
 *
 *   イベントのメモ欄以外に、実行内容の一番上にある注釈コマンド内でも
 *   同様のタグで名前を設定することができます。
 *   メモ欄と注釈の両方にタグがある場合は注釈が優先されます。
 *
 *   メモ欄タグ、注釈で、Z座標の後に
 *   1 という数値を付与することでアニメーションのない画像を表示できます。
 *   例: <animeLight:TMAnimeLight1 192 0 0 4 1>
 *   この場合Z座標を省略することはできません。
 *
 * 
 * プラグインパラメータ補足:
 *   defaultZ
 *     明かりの描画順を設定します、これによりイベントよりも下に表示するか
 *     上に表示するかが決まります。
 *     0 … プライオリティ『通常キャラの下』より下
 *     2 … プライオリティ『通常キャラと同じ』より下
 *     4 … プライオリティ『通常キャラと同じ』より上
 *     6 … プライオリティ『通常キャラの上』より上
 *
 * 
 * プラグインコマンド:
 *   animeLight 1 TMAnimeLight1 255 0 -44 4
 *     イベント 1 番に明かりを適用します。
 *     イベント番号、ファイル名、不透明度、X補正、Y補正、プライオリティ
 *     の順に設定してください。
 *     Z座標を省略した場合はプラグインパラメータ animeLightZ の値を
 *     使用します。
 *
 *   animeLight 1
 *     イベント 1 番の明かりを削除します。
 *
 *   イベント番号(ひとつ目の数値)は以下の規則にしたがって対象を指定します。
 *     -1     … プレイヤーを対象にする
 *     0      … コマンドを実行しているイベントを対象にする
 *     1 以上 … その番号のイベントを対象にする
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command animeLight
 * @text 明かりの描画
 * @desc 明かりの描画を実行します。
 *
 * @arg eventId
 * @text イベントID
 * @desc 明かりを描画するイベントIDを指定。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg file
 * @text 画像ファイル
 * @desc 明かりになる画像ファイル
 * @type file
 * @dir img/system
 * @default
 * 
 * @arg opacity
 * @text 不透明度
 * @desc 不透明度を指定。0:透明
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg offsetX
 * @text X補正
 * @desc X座標補正。正の値:右方向 / 負の値:左方向
 * @type number
 * @default 0
 * 
 * @arg offsetY
 * @text Y補正
 * @desc Y座標補正。正の値:下方向 / 負の値:上方向
 * @type number
 * @default 0
 * 
 * @arg priority
 * @text プライオリティ
 * @desc 0:[通常キャラの下]より下 / 2:[通常キャラと同じ]より下 / 
 * 4:[通常キャラと同じ]より上 / 6:[通常キャラの上]より上
 * @type number
 * @default 6
 * 
 * @arg animation
 * @text アニメーション動作
 * @desc アニメーション動作(拡大縮小リピート)させます。
 * @type boolean
 * @on 動作する
 * @off 動作しない
 * @default true
 * 
 * 
 * @command animeLightRemove
 * @text 明かりの消去
 * @desc 明かりの描画を消去します。
 *
 * @arg eventId
 * @text イベントID
 * @desc 明かりを消去するイベントIDを指定。
 * -1:プレイヤー / 0:実行イベント / 1以上:番号のイベント
 * @type number
 * @min -1
 * @default 0
 * 
 */

var TMPlugin = TMPlugin || {};

if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (() => {
    'use strict';

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
  'use strict';

  const pluginName = "MNKR_TMAnimeLightMZ";
  const parameters = PluginManager.parameters(pluginName);
  const Range = Number(parameters['range'] || 0.1);
  const DefaultZ = Number(parameters['defaultZ'] || 4);
  const Frames = Number(parameters['frames'] || 30);

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this.createAnimeLightSinTable();
  };

  Game_Temp.prototype.createAnimeLightSinTable = function () {
    this._animeLightSinTable = [];
    for (let i = 0; i < Frames; i++) {
      this._animeLightSinTable[i] = Math.sin(Math.PI * i / (Frames / 2)) *
        Range + 1;
    }
  };

  Game_Temp.prototype.animeLightSin = function (index) {
    return this._animeLightSinTable[index];
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  Game_CharacterBase.prototype.requestAnimeLight = function () {
    this._requestAnimeLight = true;
  };

  Game_CharacterBase.prototype.onChangeAnimeLight = function () {
    this._requestAnimeLight = false;
  };

  Game_CharacterBase.prototype.isAnimeLightRequested = function () {
    return this._requestAnimeLight;
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  const _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function () {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      const animeLight = this.loadTagParam('animeLight');
      if (animeLight) {
        const arr = animeLight.split(' ');
        this._animeLight = arr[0];
        this._animeLightOpacity = arr[1] || 255;
        this._animeLightShiftX = arr[2] || 0;
        this._animeLightShiftY = arr[3] || 0;
        this._animeLightZ = arr[4] || DefaultZ;
        this._animeLightNone = arr[5] === '1';
      }
    } else {
      this._animeLight = '';
      this._animeLightOpacity = 255;
      this._animeLightShiftX = 0;
      this._animeLightShiftY = 0;
      this._animeLightZ = DefaultZ;
      this._animeLightNone = false;
    }
    this.requestAnimeLight();
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "animeLightRemove", function (args) {
    const character = this.character(Number(args.eventId));

    if (character) {
      character._animeLight = arr[1];
      character._animeLightOpacity = arr[2] || 255;
      character._animeLightShiftX = arr[3] || 0;
      character._animeLightShiftY = arr[4] || 0;
      character._animeLightZ = arr[5] || DefaultZ;
      character._animeLightNone = arr[6] === '1';
      character.requestAnimeLight();
      character.requestAnimeLight();
    }

  });

  PluginManager.registerCommand(pluginName, "animeLight", function (args) {
    const character = this.character(Number(args.eventId));
    const file = String(args.file);
    const opacity = Number(args.opacity);
    const offsetX = Number(args.offsetX);
    const offsetY = Number(args.offsetY);
    const priority = Number(args.priority);
    const doSetup = args.animation === "true";

    if (character) {
      character._animeLight = file;
      character._animeLightOpacity = opacity;
      character._animeLightShiftX = offsetX;
      character._animeLightShiftY = offsetY;
      character._animeLightZ = priority;
      character._animeLightNone = doSetup;
      character.requestAnimeLight();
    }

  });

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  const _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    _Sprite_Character_update.call(this);
    this.updateAnimeLight();
  };

  Sprite_Character.prototype.updateAnimeLight = function () {
    if (this._character.isAnimeLightRequested() ||
      this._animeLight !== this._character._animeLight) {
      this._character.onChangeAnimeLight();
      this._animeLight = this._character._animeLight;
      if (this._animeLight) {
        if (!this._animeLightSprite) {
          this._animeLightSprite = new Sprite_AnimeLight(this);
          this.parent.addChild(this._animeLightSprite);
        }
        this._animeLightSprite.refresh(this._animeLight);
      } else {
        this.parent.removeChild(this._animeLightSprite);
        this._animeLightSprite = null;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_AnimeLight
  //

  function Sprite_AnimeLight() {
    this.initialize.apply(this, arguments);
  }

  Sprite_AnimeLight.prototype = Object.create(Sprite.prototype);
  Sprite_AnimeLight.prototype.constructor = Sprite_AnimeLight;

  Sprite_AnimeLight.prototype.initialize = function (characterSprite) {
    Sprite.prototype.initialize.call(this);
    this._characterSprite = characterSprite;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.blendMode = 1;
    this._animeCount = 0;
  };

  Sprite_AnimeLight.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.x = this._characterSprite.x + this._shiftX;
    this.y = this._characterSprite.y + this._shiftY;
    if (!this._characterSprite._character._animeLightNone) {
      this._animeCount++;
      if (this._animeCount === Frames) this._animeCount = 0;
      const n = $gameTemp.animeLightSin(this._animeCount);
      this.scale.set(n, n);
    }
  };

  Sprite_AnimeLight.prototype.refresh = function (fileName) {
    this.bitmap = ImageManager.loadSystem(fileName);
    this.opacity = +this._characterSprite._character._animeLightOpacity;
    this._shiftX = +this._characterSprite._character._animeLightShiftX;
    this._shiftY = +this._characterSprite._character._animeLightShiftY;
    this.x = this._characterSprite.x + this._shiftX;
    this.y = this._characterSprite.y + this._shiftY;
    this.z = +this._characterSprite._character._animeLightZ;
  };
})();
