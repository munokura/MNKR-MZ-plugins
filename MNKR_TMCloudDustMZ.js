/*
 * --------------------------------------------------
 * MNKR_TMCloudDustMZ Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - つちけむり
// バージョン: 2.1.0
// 最終更新日: 2017/08/10
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMCloudDustMZ.js
 * @plugindesc ジャンプとダッシュに土煙のエフェクトを追加します。
 * 任意のタイミングで土煙を表示することもできます。
 *
 * @author tomoaky (改変 munokura)
 *
 * @help
 * 使い方:
 *
 *   土煙の画像を img/system フォルダに保存してください。
 *   ファイル名はデフォルトで Dust1.png となっています。
 *   ファイル名を変更する場合は
 *   プラグインパラメータの dustImage も一緒に変更してください。
 *
 *   プラグインを有効にすると、
 *   キャラクターがジャンプ後に着地したタイミングで
 *   土煙が表示されるようになります。
 *   プレイヤーがダッシュ（shiftキー押しながら or クリック）で移動する時にも
 *   土煙が表示されます。
 *
 *   プラグインコマンドで任意のタイミングで指定した座標に
 *   土煙を表示することもできます。
 * 
 *
 * プラグインパラメータ補足:
 *
 *   dustImage
 *     土煙の画像ファイル名を拡張子抜きで指定します。
 *     ファイルは img/system フォルダに保存してください。
 *
 *   maxDusts
 *     このパラメータに指定した数を超える土煙を同時に表示しようとした場合は
 *     何も表示されず、プラグインコマンドは無視されます。
 *     数値を大きくすればたくさんの土煙を表示することができますが、
 *     それだけ処理が重くなり、低スペック環境ではFPSが低下する原因になります。
 *
 *   jumpDusts
 *     キャラクターをイベントコマンド『移動ルートの設定』などでジャンプ後、
 *     着地の際に表示する土煙の数です。
 *     数値の分だけ土煙が重なり、より濃い土煙になります。
 *     0 を指定すれば着地時の土煙は表示されなくなります。
 * 
 *   dashDusts
 *     プレイヤーがダッシュで移動した際に表示する土煙の数です。
 *     数値の分だけ土煙が重なり、より濃い土煙になります。
 *     0 を指定すればダッシュ時の土煙は表示されなくなります。
 * 
 * 
 * プラグインコマンド:
 *
 *   setDustXy 5 8
 *     指定した座標に土煙を表示します。数値はイベントコマンド『場所移動』で
 *     利用する座標と同じです、画面のドット数ではありません。
 *     setDustXy 5.5 8 のように小数点以下を入力することによって座標(5, 8)と
 *     座標(6, 8)の中間を指定することもできます。
 *
 *   setDustXy 5 8 3
 *     指定した座標に土煙を 3 つ表示します。設定が省略された場合は 1 つしか
 *     表示されません。
 *
 *   setDustXy 5 8 1 0.04
 *     表示する土煙の移動速度を設定します。設定が省略された場合は 0.02 が
 *     適用されます。
 *
 *   setDustXy 5 8 1 0.02 3.14
 *     表示する土煙の移動方向を限定します。数値は右を 0 として、時計回りに
 *     6.28 で 1 周となります。
 *     上記のように3.14を指定した場合は土煙が左に向かって少し移動します。
 *
 *   setDustEvent 3
 *     イベント 3 番の足元に土煙を表示します。0 を指定した場合はコマンドを
 *     実行しているイベント自体が、-1 を指定した場合はプレイヤーが対象に
 *     なります。
 *     setDustXy と同様に土煙の数や移動方向、移動速度も指定できます。
 *     イベント番号に続けて、土煙の数、移動速度、移動方向の順に数値を
 *     足していってください。
 * 
 *   setJumpDusts 5
 *     ジャンプの着地時に表示するスプライト数を指定した値に変更します。
 * 
 *   setDashDusts 3
 *     ダッシュ時に表示するスプライト数を指定した値に変更します。
 * 
 *   stopDust
 *     新しい土煙が表示できなくなります。
 *     すでに表示されている土煙には影響しません。
 * 
 *   startDust
 *     stopDust の効果を解除し、新しい土煙を表示できるようにします。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * 
 * @param dustImage
 * @text 土煙の画像
 * @desc 土煙として利用する画像ファイル名
 * 初期値: Dust1
 * @default Dust1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param maxDusts
 * @type number
 * @text 同時表示スプライト数
 * @desc 同時に表示できるスプライトの数
 * 初期値: 64
 * @default 64
 *
 * @param jumpDusts
 * @type number
 * @text ジャンプ着地時スプライト数
 * @desc ジャンプの着地時に表示するスプライト数
 * 初期値: 5
 * @default 5
 *
 * @param dashDusts
 * @type number
 * @text ダッシュ時スプライト数
 * @desc ダッシュ時に表示するスプライト数
 * 初期値: 3
 * @default 3
 * 
 * 
 * @command setDustXy
 * @text マップに土煙を表示
 * @desc 指定したマップ座標に土煙を表示します。
 *
 * @arg setX
 * @text X座標
 * @desc 表示するX座標です。
 * 整数で『場所移動』で利用する座標になります。
 * @type number
 * @decimals 2
 * @default 0.00
 *
 * @arg setY
 * @text Y座標
 * @desc 表示するY座標です。
 * 整数で『場所移動』で利用する座標になります。
 * @type number
 * @decimals 2
 * @default 0.00
 * 
 * @arg dusts
 * @text スプライト数
 * @desc 表示するスプライト数
 * @type number
 * @default 3
 * 
 * @arg speed
 * @text 移動速度
 * @desc 土煙の移動速度を設定します。
 * @type number
 * @decimals 2
 * @default 0.02
 * 
 * @arg direction
 * @text 移動方向
 * @desc 土煙の移動方向を設定します。
 * 数値は右を0として、時計回りに6.28で1周となります。
 * @type number
 * @decimals 2
 * @default 0.00
 * 
 * 
 * @command setDustEvent
 * @text イベントに土煙を表示
 * @desc イベントの足元に土煙を表示します。
 *
 * @arg EventId
 * @text イベントID
 * @desc 表示するイベントID
 * -1:プレイヤー / 0:実行イベント / 1以上:イベントID
 * @type number
 * @min -1
 * @default 0
 * 
 * @arg dusts
 * @text スプライト数
 * @desc 表示するスプライト数
 * @type number
 * @default 3
 * 
 * @arg speed
 * @text 移動速度
 * @desc 土煙の移動速度を設定します。
 * @type number
 * @decimals 2
 * @default 0.02
 * 
 * @arg direction
 * @text 移動方向
 * @desc 土煙の移動方向を設定します。
 * 数値は右を0として、時計回りに6.28で1周となります。
 * @type number
 * @decimals 2
 * @default 0.00
 * 
 * 
 * @command setJumpDusts
 * @text ジャンプ着地時スプライト数変更
 * @desc ジャンプの着地時に表示するスプライト数を指定した値に変更します。
 *
 * @arg dusts
 * @text スプライト数
 * @desc ジャンプの着地時に表示するスプライト数
 * @type number
 * @default 0
 * 
 * 
 * @command setDashDusts
 * @text ダッシュ時スプライト数変更
 * @desc ダッシュ時に表示するスプライト数を指定した値に変更します。
 *
 * @arg dusts
 * @text スプライト数
 * @desc ダッシュ時に表示するスプライト数
 * @type number
 * @default 0
 * 
 * 
 * @command stopDust
 * @text 土煙の追加停止
 * @desc 新しい土煙を追加表示できなくします。
 * 既に表示されている土煙には影響しません。
 * 
 * 
 * @command startDust
 * @text 土煙の追加停止の解除
 * @desc 新しい土煙を追加表示できるようにします。
 */

var Imported = Imported || {};
Imported.TMCloudDust = true;

var TMPlugin = TMPlugin || {};

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  TMPlugin.CloudDust = {};
  TMPlugin.CloudDust.Parameters = PluginManager.parameters(pluginName);
  TMPlugin.CloudDust.DustImage = TMPlugin.CloudDust.Parameters['dustImage'] || Dust1;
  TMPlugin.CloudDust.MaxDusts = +(TMPlugin.CloudDust.Parameters['maxDusts'] || 64);
  TMPlugin.CloudDust.JumpDusts = +(TMPlugin.CloudDust.Parameters['jumpDusts'] || 5);
  TMPlugin.CloudDust.DashDusts = +(TMPlugin.CloudDust.Parameters['dashDusts'] || 3);

  function Game_CloudDust() {
    this.initialize.apply(this, arguments);
  }

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.jumpDusts = function () {
    if (this._jumpDusts != null) return this._jumpDusts;
    return TMPlugin.CloudDust.JumpDusts;
  };

  Game_System.prototype.dashDusts = function () {
    if (this._dashDusts != null) return this._dashDusts;
    return TMPlugin.CloudDust.DashDusts;
  };

  Game_System.prototype.setJumpDusts = function (n) {
    this._jumpDusts = n;
  };

  Game_System.prototype.setDashDusts = function (n) {
    this._dashDusts = n;
  };

  Game_System.prototype.isDustEnabled = function () {
    if (this._dustEnabled == null) this._dustEnabled = true;
    return this._dustEnabled;
  };

  Game_System.prototype.enableDust = function () {
    this._dustEnabled = true;
  };

  Game_System.prototype.disableDust = function () {
    this._dustEnabled = false;
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupCloudDusts();
  };

  Game_Map.prototype.setupCloudDusts = function () {
    this._cloudDusts = [];
    for (let i = 0; i < TMPlugin.CloudDust.MaxDusts; i++) {
      this._cloudDusts.push(new Game_CloudDust());
    }
  };

  Game_Map.prototype.cloudDusts = function () {
    return this._cloudDusts;
  };

  Game_Map.prototype.addCloudDust = function (x, y, speed, radian) {
    if (!$gameSystem.isDustEnabled()) return;
    for (let i = 0; i < TMPlugin.CloudDust.MaxDusts; i++) {
      if (!this._cloudDusts[i].exists()) {
        this._cloudDusts[i].setup(x, y, speed, radian);
        break;
      }
    }
  };

  const _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function (sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateCloudDusts();
  };

  Game_Map.prototype.updateCloudDusts = function () {
    this.cloudDusts().forEach(function (cloudDust) {
      cloudDust.update();
    });
  };

  //-----------------------------------------------------------------------------
  // Game_CloudDust
  //

  Game_CloudDust.prototype.initialize = function () {
    this._x = 0;
    this._y = 0;
    this._count = 0;
    this._scale = new Point(1.0, 1.0);
  };

  Game_CloudDust.prototype.setup = function (x, y, speed, radian) {
    this._x = +x;
    this._y = +y;
    this._opacity = 180;
    this._count = 30;
    if (radian != null) {
      radian = +radian + Math.random() * 1.5 - 0.75;
    } else {
      radian = Math.random() * Math.PI * 2;
    }
    speed = +(speed || 0.02);
    this._vx = Math.cos(radian) * speed;
    this._vy = Math.sin(radian) * speed;
    this._rotation = radian;
    this._scale.x = 1.0;
    this._scale.y = 1.0;
  };

  Game_CloudDust.prototype.screenX = function () {
    let tw = $gameMap.tileWidth();
    return Math.round($gameMap.adjustX(this._x) * tw);
  };

  Game_CloudDust.prototype.screenY = function () {
    let th = $gameMap.tileHeight();
    return Math.round($gameMap.adjustY(this._y) * th);
  };

  Game_CloudDust.prototype.opacity = function () {
    return this._opacity;
  };

  Game_CloudDust.prototype.rotation = function () {
    return this._rotation;
  };

  Game_CloudDust.prototype.scale = function () {
    return this._scale;
  };

  Game_CloudDust.prototype.exists = function () {
    return this._count > 0;
  };

  Game_CloudDust.prototype.update = function () {
    if (this._count > 0) {
      this._count--;
      this._x += this._vx;
      this._y += this._vy;
      this._vy -= 0.0008;
      this._opacity -= 6;
      this._scale.x += 0.02;
      this._scale.y += 0.02;
    }
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  Game_CharacterBase.prototype.addCloudDust = function (speed, radian) {
    $gameMap.addCloudDust(this._realX + 0.5, this._realY + 1.0, speed, radian);
  };

  const _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function () {
    _Game_CharacterBase_updateJump.call(this);
    if (this._jumpCount === 0) {
      for (let i = 0; i < $gameSystem.jumpDusts(); i++) {
        this.addCloudDust(0.02, i % 2 * Math.PI);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
  Game_Player.prototype.moveStraight = function (d) {
    let n = $gameSystem.dashDusts();
    let radian;
    if (n > 0) {
      if (this.isDashing() && this.canPass(this.x, this.y, d)) {
        if (d === 2) {
          radian = Math.PI * 1.5;
        } else if (d === 4) {
          radian = 0;
        } else if (d === 6) {
          radian = Math.PI;
        } else {
          radian = Math.PI / 2;
        }
        for (let i = 0; i < n; i++) {
          this.addCloudDust(0.03, radian);
        }
      }
    }
    _Game_Player_moveStraight.call(this, d);
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "setDustXy", args => {
    const arr = [args.setX, args.setY, args.dusts, args.speed, args.direction];
    let n = parseInt(arr[2] || 1);
    for (let i = 0; i < n; i++) {
      $gameMap.addCloudDust(arr[0], arr[1], arr[3], arr[4]);
    }
  });

  PluginManager.registerCommand(pluginName, "setDustEvent", function (args) {
    const arr = [args.EventId, args.dusts, args.speed, args.direction];
    let character = this.character(+arr[0]);
    if (character) {
      let n = parseInt(arr[1] || 1);
      for (let i = 0; i < n; i++) {
        character.addCloudDust(arr[2], arr[3]);
      }
    }
  });

  PluginManager.registerCommand(pluginName, "setJumpDusts", args => {
    const arr = [args.dusts];
    $gameSystem.setJumpDusts(+arr[0]);
  });

  PluginManager.registerCommand(pluginName, "setDashDusts", args => {
    const arr = [args.dusts];
    $gameSystem.setDashDusts(+arr[0]);
  });

  PluginManager.registerCommand(pluginName, "stopDust", args => {
    $gameSystem.disableDust();
  });

  PluginManager.registerCommand(pluginName, "startDust", args => {
    $gameSystem.enableDust();
  });

  //-----------------------------------------------------------------------------
  // Sprite_CloudDust
  //

  function Sprite_CloudDust() {
    this.initialize.apply(this, arguments);
  }

  Sprite_CloudDust.prototype = Object.create(Sprite.prototype);
  Sprite_CloudDust.prototype.constructor = Sprite_CloudDust;

  Sprite_CloudDust.prototype.initialize = function (cloudDust) {
    Sprite.prototype.initialize.call(this);
    this._cloudDust = cloudDust;
    this.scale = this._cloudDust.scale();
    this.visible = false;
    this.createBitmap();
  };

  Sprite_CloudDust.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this._cloudDust.exists()) {
      this.visible = true;
      this.x = this._cloudDust.screenX();
      this.y = this._cloudDust.screenY();
      this.opacity = this._cloudDust.opacity();
      this.rotation = this._cloudDust.rotation();
    } else {
      this.visible = false;
    }
  };

  Sprite_CloudDust.prototype.createBitmap = function () {
    this.bitmap = ImageManager.loadSystem(TMPlugin.CloudDust.DustImage);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.z = 3;
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createCloudDust();
  };

  Spriteset_Map.prototype.createCloudDust = function () {
    this._cloudDustSprites = [];
    $gameMap.cloudDusts().forEach(function (cloudDust) {
      this._cloudDustSprites.push(new Sprite_CloudDust(cloudDust));
    }, this);
    for (let i = 0; i < this._cloudDustSprites.length; i++) {
      this._tilemap.addChild(this._cloudDustSprites[i]);
    }
  };

})();