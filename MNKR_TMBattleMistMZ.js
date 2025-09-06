/*
 * --------------------------------------------------
 * MNKR_TMBattleMistMZ.js
 *   Ver.1.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMBattleMistMZ.js
@plugindesc Displays fog-like effects in battle scenes.
@author munokura
@license MIT License

@help
How to Use:

Save the fog image in the img/system folder.

The default filename is mist.png.
If you change the filename,
please also change the mistImage plugin parameter.

The image is set to the game's 816*624 resolution, so changing the resolution
may cause display distortion.
Adjust the plugin parameter value to suit.

Plugin Commands:

stopMist
Disables Battle Mist. This setting is also saved in your save data,
and the fog will not be displayed until the startMist command is executed.

startMist
Enables Battle Mist if it is disabled.

onMistMirror
Inverts the fog's movement direction. This function is only available in side
view. This setting is also saved in your save data,
and will remain inverted until the offMistMirror command is executed.

offMistMirror
Cancels the inversion of the fog's movement direction. This function is only
available in side view.

setFrontMist
Makes the fog flow the same as in front view, even in side view battles.

setSideMist
Allows fog to flow in the same way as in side view, even when combat is in
front view.

# Contact
This is a plugin originally created for RPG Maker MV, adapted for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param mistImage
@text Fog Image
@desc The name of the image file to use as fog.
@type file
@default mist
@require 1
@dir img/system/

@param mistNumber
@text Number of Fog Sprites
@desc The number of fog sprites to display.
@type number
@default 32

@param mistTopSide
@text SV fog top coordinates
@desc The top coordinate of the range where fog is displayed in side view.
@type number
@default 200

@param mistRangeSide
@text SV Mist Y Range
@desc The Y-range at which fog is displayed in side view.
@type number
@default 300

@param mistTopFront
@text FV fog top coordinate
@desc The top coordinate of the area where fog is displayed in the front view.
@type number
@default 240

@param mistRangeFront
@text FV fog Y range
@desc The Y-range at which fog is displayed in the front view.
@type number
@default 340

@param mistScale
@text Fog expansion rate
@desc Fog sprite magnification.
@default 1.00

@param mistOpacityMax
@text Max Fog Opacity
@desc The maximum opacity of the fog sprite.
@type number
@default 224
@min 0
@max 255

@command startMist
@text Battle Mist Enabled
@desc Enables fog if it is disabled.

@command stopMist
@text Battle Mist Nullification
@desc Disable fog.

@command onMistMirror
@text Battle Mist direction inversion
@desc Reverses the direction of fog movement. This function is only available in side view.

@command offMistMirror
@text Cancel Battle Mist direction reversal
@desc Cancels the mist movement direction inversion. This function is only available in side view.

@command setFrontMist
@text Battle Mist Sync Front View
@desc Even if the battle is in side view, the fog will flow in the same way as in front view.

@command setSideMist
@text Battle Mist Synchronized Side View
@desc Even if the battle is in front view, the fog will flow in the same way as in side view.
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMBattleMistMZ.js
@plugindesc 戦闘シーンにそれっぽい霧を表示します。
@author tomoaky (改変:munokura)

@help
使い方:

  霧の画像を img/system フォルダに保存してください。

  デフォルトのファイル名は mist.png となっています。
  ファイル名を変更する場合、
  プラグインパラメータの mistImage も一緒に変更してください。

  ゲーム画面の解像度 816*624 に合わせてあるため、解像度を変更すると
  表示が乱れる場合があります。
  プラグインパラメータの値をいじって調整してください。


プラグインコマンド:

  stopMist
    バトルミストを無効にします。この設定はセーブデータにも記録され、
    startMist コマンドが実行されるまで霧が表示されなくなります。

  startMist
    無効になっているバトルミストを有効にします。

  onMistMirror
    霧の移動方向を反転します。サイドビュー限定の機能です。この設定は
    セーブデータにも記録され、offMistMirror コマンドが実行されるまで
    反転したままとなります。

  offMistMirror
    霧の移動方向反転を解除します。サイドビュー限定の機能です。

  setFrontMist
    戦闘がサイドビューであっても霧をフロントビューと同じ流れにします。

  setSideMist
    戦闘がフロントビューであっても霧をサイドビューと同じ流れにします。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param mistImage
@text 霧画像
@desc 霧として利用する画像ファイル名。
初期値: mist
@default mist
@require 1
@dir img/system/
@type file

@param mistNumber
@text 霧スプライト数
@type number
@desc 表示する霧スプライトの数です。
初期値: 32
@default 32

@param mistTopSide
@text SV霧上端座標
@type number
@desc サイドビューで霧を表示する範囲の上端の座標。
初期値: 200
@default 200

@param mistRangeSide
@text SV霧Y範囲
@type number
@desc サイドビューで霧を表示するY方向の範囲。
初期値: 300
@default 300

@param mistTopFront
@text FV霧上端座標
@type number
@desc フロントビューで霧を表示する範囲の上端の座標。
初期値: 240
@default 240

@param mistRangeFront
@text FV霧Y範囲
@type number
@desc フロントビューで霧を表示するY方向の範囲。
初期値: 340
@default 340

@param mistScale
@text 霧の拡大率
@desc 霧スプライトの拡大率。
初期値: 1.00
@default 1.00

@param mistOpacityMax
@text 霧の最大不透明度
@type number
@min 0
@max 255
@desc 霧スプライトの最大不透明度。
初期値: 224
@default 224


@command startMist
@text バトルミスト有効化
@desc 無効になっている霧を有効にします。

@command stopMist
@text バトルミスト無効化
@desc 霧を無効にします。

@command onMistMirror
@text バトルミスト方向反転
@desc 霧の移動方向を反転します。サイドビュー限定の機能です。

@command offMistMirror
@text バトルミスト方向反転解除
@desc 霧の移動方向反転を解除します。サイドビュー限定の機能です。

@command setFrontMist
@text バトルミスト同期フロントビュー
@desc 戦闘がサイドビューであっても霧をフロントビューと同じ流れにします。

@command setSideMist
@text バトルミスト同期サイドビュー
@desc 戦闘がフロントビューであっても霧をサイドビューと同じ流れにします。
*/

//=============================================================================
// TMPlugin - バトルミスト
// バージョン: 2.1.0
// 最終更新日: 2018/11/28
// 配布元  : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================



var Imported = Imported || {};
Imported.TMBattleMist = true;
var TMPlugin = TMPlugin || {};

(() => {
	'use strict';

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

	TMPlugin.BattleMist = {};
	TMPlugin.BattleMist.Parameters = PluginManager.parameters(pluginName);
	TMPlugin.BattleMist.MistImage = TMPlugin.BattleMist.Parameters['mistImage'] || 'mist';
	TMPlugin.BattleMist.MaxMists = +(TMPlugin.BattleMist.Parameters['mistNumber'] || 32);
	TMPlugin.BattleMist.TopSide = +(TMPlugin.BattleMist.Parameters['mistTopSide'] || 200);
	TMPlugin.BattleMist.RangeSide = +(TMPlugin.BattleMist.Parameters['mistRangeSide'] || 300);
	TMPlugin.BattleMist.TopFront = +(TMPlugin.BattleMist.Parameters['mistTopFront'] || 240);
	TMPlugin.BattleMist.RangeFront = +(TMPlugin.BattleMist.Parameters['mistRangeFront'] || 340);
	TMPlugin.BattleMist.Scale = +(TMPlugin.BattleMist.Parameters['mistScale'] || 1);
	TMPlugin.BattleMist.OpacityMax = +(TMPlugin.BattleMist.Parameters['mistOpacityMax'] || 224);

	//-----------------------------------------------------------------------------
	// Game_System
	//

	Game_System.prototype.isMistEnabled = function () {
		if (this._mistEnabled === undefined) this._mistEnabled = true;
		return this._mistEnabled;
	};

	Game_System.prototype.disableMist = function () {
		this._mistEnabled = false;
	};

	Game_System.prototype.enableMist = function () {
		this._mistEnabled = true;
	};

	Game_System.prototype.mistMirror = function () {
		return this._mistMirror;
	};

	Game_System.prototype.setMistMirror = function (mirror) {
		this._mistMirror = mirror;
	};

	Game_System.prototype.isSideMist = function () {
		if (!this._mistDirection) {
			return this.isSideView();
		}
		return this._mistDirection === 6;
	};

	Game_System.prototype.setMistDirection = function (direction) {
		this._mistDirection = direction;
	};

	//-----------------------------------------------------------------------------
	// PluginManager
	//

	PluginManager.registerCommand(pluginName, "startMist", args => {
		$gameSystem.enableMist();
	});

	PluginManager.registerCommand(pluginName, "stopMist", args => {
		$gameSystem.disableMist();
	});

	PluginManager.registerCommand(pluginName, "onMistMirror", args => {
		$gameSystem.setMistMirror(true);
	});

	PluginManager.registerCommand(pluginName, "offMistMirror", args => {
		$gameSystem.setMistMirror(false);
	});

	PluginManager.registerCommand(pluginName, "setFrontMist", args => {
		$gameSystem.setMistDirection(2);
	});

	PluginManager.registerCommand(pluginName, "setSideMist", args => {
		$gameSystem.setMistDirection(6);
	});

	//-----------------------------------------------------------------------------
	// Sprite_BattleMist
	//

	function Sprite_BattleMist() {
		this.initialize.apply(this, arguments);
	}

	Sprite_BattleMist.prototype = Object.create(Sprite.prototype);
	Sprite_BattleMist.prototype.constructor = Sprite_BattleMist;

	Sprite_BattleMist.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this.loadBitmap();
		this.blendMode = 1;
		this.z = 5;
		this.anchor.x = 0.5;
		this.anchor.y = 1;
	};

	Sprite_BattleMist.prototype.loadBitmap = function () {
		this.bitmap = ImageManager.loadSystem(TMPlugin.BattleMist.MistImage);
	};

	Sprite_BattleMist.prototype.setRandomPosition = function () {
		if ($gameSystem.isSideMist()) {
			this.resetSideView();
			let w = this.width * this.scale.x;
			this.x = Math.random() * (Graphics.width + w) - w / 2 - this.parent.x;
		} else {
			this.resetFrontView();
			this.y = Math.random() * TMPlugin.BattleMist.RangeFront + TMPlugin.BattleMist.TopFront;
		}
		this.update();
	};

	Sprite_BattleMist.prototype.resetSideView = function () {
		let r = Math.random();
		this._count = Math.floor(Math.random() * 180);
		this.y = r * TMPlugin.BattleMist.RangeSide + TMPlugin.BattleMist.TopSide;
		r = (r + 0.5) * TMPlugin.BattleMist.Scale;
		this.scale.set(r, r);
		this._vx = this.scale.x * 2 - 0.5;
		if ($gameSystem.mistMirror()) {
			this.x = Graphics.width + this.width / 2 * this.scale.x;
			this._vx = 0 - this._vx;
		} else {
			this.x = -this.width / 2 * this.scale.x;
		}
		this.x -= this.parent.x;
	};

	Sprite_BattleMist.prototype.resetFrontView = function () {
		let r = Math.random();
		this.x = r * Graphics.width;
		this.y = TMPlugin.BattleMist.TopFront;
		this._vx = (this.x - Graphics.width / 2) * 0.01;
		this.x -= this.parent.x;
	};

	Sprite_BattleMist.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if ($gameSystem.isSideMist()) {
			this.updateSideView();
		} else {
			this.updateFrontView();
		}
	};

	Sprite_BattleMist.prototype.updateSideView = function () {
		this.x += this._vx;
		this._count++;
		if (this._count >= 180) {
			this._count = 0;
		}
		this.opacity = TMPlugin.BattleMist.OpacityMax - 16 + Math.sin(this._count * Math.PI / 90) * 16;
		if ($gameSystem.mistMirror()) {
			if (this.x + this.width / 2 * this.scale.x < 0 - this.parent.x) {
				this.resetSideView();
			}
		} else {
			if (this.x - this.width / 2 * this.scale.x > Graphics.width - this.parent.x) {
				this.resetSideView();
			}
		}
	};

	Sprite_BattleMist.prototype.updateFrontView = function () {
		this.x += this._vx;
		this.y += TMPlugin.BattleMist.Scale;
		let w = this.width / 2;
		if (this.y > TMPlugin.BattleMist.RangeFront + TMPlugin.BattleMist.TopFront ||
			this.x < 0 - w - this.parent.x || this.x > Graphics.width + w - this.parent.x) {
			this.resetFrontView();
		}
		this.updateScaleFront();
		this.updateOpacityFront();
	};

	Sprite_BattleMist.prototype.updateScaleFront = function () {
		let r = (0.5 + (this.y - TMPlugin.BattleMist.TopFront) / TMPlugin.BattleMist.RangeFront) *
			TMPlugin.BattleMist.Scale;
		this.scale.set(r, r);
	};

	Sprite_BattleMist.prototype.updateOpacityFront = function () {
		let borderY = TMPlugin.BattleMist.TopFront + TMPlugin.BattleMist.RangeFront * 0.8;
		if (this.y > borderY) {
			this.opacity = (1 - (this.y - borderY) / (TMPlugin.BattleMist.RangeFront * 0.2)) *
				TMPlugin.BattleMist.OpacityMax;
		} else {
			this.opacity = Math.min((this.y - TMPlugin.BattleMist.TopFront) / TMPlugin.BattleMist.Scale * 8,
				TMPlugin.BattleMist.OpacityMax);
		}
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle
	//

	const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
	Spriteset_Battle.prototype.createLowerLayer = function () {
		_Spriteset_Battle_createLowerLayer.call(this);
		this.createMists();
		this._back1Sprite.z = 0;
		this._back2Sprite.z = 1;
		for (let i = 0; i < this._enemySprites.length; i++) {
			this._enemySprites[i].z = 5;
		}
		this.updateActors();
		for (let j = 0; j < this._actorSprites.length; j++) {
			this._actorSprites[j].z = 5;
		}
	};

	Spriteset_Battle.prototype.createMists = function () {
		this._mistSprites = [];
		if ($gameSystem.isMistEnabled()) {
			for (let i = 0; i < TMPlugin.BattleMist.MaxMists; i++) {
				this._mistSprites[i] = new Sprite_BattleMist();
				this._battleField.addChild(this._mistSprites[i]);
				this._mistSprites[i].setRandomPosition();
			}
		}
	};

	const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
	Spriteset_Battle.prototype.update = function () {
		_Spriteset_Battle_update.call(this);
		this._sortBattleField();
	};

	Spriteset_Battle.prototype._sortBattleField = function () {
		this._battleField.children.sort(function (a, b) {
			a.z = a.z != null ? a.z : 10;
			b.z = b.z != null ? b.z : 10;
			if (a.z !== b.z) {
				return a.z - b.z;
			} else if (a.y !== b.y) {
				return a.y - b.y;
			} else {
				return a.spriteId - b.spriteId;
			}
		});
	};

})();