/*
 * --------------------------------------------------
 * MNKR_TMByeCommandMZ.js
 *   Ver.1.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
//=============================================================================
// TMPlugin - さよならコマンド
// バージョン: 1.0.0
// 最終更新日: 2017/01/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMByeCommandMZ.js
@plugindesc Added the ability to separate from companions to the menu commands.
@author tomoaky,munokura
@license MIT License

@help
How to Use:

This plugin adds the "Bye" menu command.
This command cannot be executed if there is one or fewer party members.

Memo Tag (Actor):

<disableBye>
Actors with this tag in the memo field cannot be bidden.

Plugin Commands:

disableBye
Disables the "Bye" command from the menu.

enableBye
Restores a disabled "Bye" command.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, R18+, etc.).

@param byeCommand
@text Command Display
@desc Command name for the goodbye command.
@default 別れる

@param byeSe
@text sound effect files
@desc The file name of the sound effect to be played when the goodbye command is executed.
@type file
@default Decision1
@require 1
@dir audio/se/

@param byeSeParam
@text Sound effect parameters
@desc Goodbye command sound effect parameters
@type struct<seParam>
@default {"volume":"90","pitch":"100","pan":"0"}

@param clearEquipments
@text Remove equipment
@desc Should I remove my equipment just before we split up?
@type boolean
@on remove
@off Do not remove
@default false

@command disableBye
@text Disable Goodbye Command
@desc Disables the Goodbye command from the menu commands.

@command enableBye
@text Enable Goodbye Command
@desc Reverts the disabled goodbye command.
*/

/*~struct~seParam:
@param volume
@text volume
@desc Goodbye command sound effect volume
@type number
@default 90
@max 100

@param pitch
@text pitch
@desc Goodbye command sound effect pitch
@type number
@default 100
@min 50
@max 150

@param pan
@text phase
@desc Goodbye command sound effect phase
@type number
@default 0
@min -100
@max 100
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMByeCommandMZ.js
@author tomoaky (改変:munokura)
@plugindesc メニューコマンドに仲間と別れる機能を追加します。

@help
使い方:

  このプラグインを導入するとメニューコマンドに『別れる』が追加されます。
  パーティメンバーが 1 名以下の場合、コマンドを実行することはできません。


メモ欄タグ（アクター）:

  <disableBye>
    メモ欄にこのタグがついているアクターは別れることができません。


プラグインコマンド:

  disableBye
    さよならコマンドをメニューコマンドから使用不可にします。

  enableBye
    使用不可にしたさよならコマンドを元に戻します。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param byeCommand
@text コマンド表示
@desc さよならコマンドのコマンド名。
初期値: 別れる
@default 別れる

@param byeSe
@text 効果音ファイル
@desc さよならコマンド実行時に鳴らす効果音のファイル名
初期値: Decision1
@default Decision1
@require 1
@dir audio/se/
@type file

@param byeSeParam
@text 効果音パラメータ
@desc さよならコマンド効果音のパラメータ
初期値: {"volume":"90","pitch":"100","pan":"0"}
@default {"volume":"90","pitch":"100","pan":"0"}
@type struct<seParam>

@param clearEquipments
@text 装備を外す
@desc 分かれる直前に装備を外すか？
@type boolean
@on 外す
@off 外さない
@default false

@command disableBye
@text さよならコマンド無効化
@desc さよならコマンドをメニューコマンドから使用不可にします。


@command enableBye
@text さよならコマンド有効化
@desc 使用不可にしたさよならコマンドを元に戻します。
*/

/*~struct~seParam:ja
@param volume
@text 音量
@default 90
@type number
@max 100
@desc さよならコマンド効果音の音量

@param pitch
@text ピッチ
@default 100
@type number
@min 50
@max 150
@desc さよならコマンド効果音のピッチ

@param pan
@text 位相
@default 0
@type number
@min -100
@max 100
@desc さよならコマンド効果音の位相
*/


var Imported = Imported || {};
Imported.TMByeCommand = true;
var TMPlugin = TMPlugin || {};

(() => {
  'use strict';

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  TMPlugin.ByeCommand = {};
  TMPlugin.ByeCommand.Parameters = PluginManager.parameters(pluginName);
  TMPlugin.ByeCommand.ByeCommand = TMPlugin.ByeCommand.Parameters['byeCommand'] || '別れる';
  TMPlugin.ByeCommand.ByeSe = JSON.parse(TMPlugin.ByeCommand.Parameters['byeSeParam'] || '{}');
  TMPlugin.ByeCommand.ByeSe.name = TMPlugin.ByeCommand.Parameters['byeSe'] || '';
  TMPlugin.ByeCommand.clearEquipments = TMPlugin.ByeCommand.Parameters['clearEquipments'] === 'true';

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isByeEnabled = function () {
    if (this._byeEnabled == null) this._byeEnabled = true;
    return this._byeEnabled;
  };

  Game_System.prototype.disableBye = function () {
    this._byeEnabled = false;
  };

  Game_System.prototype.enableBye = function () {
    this._byeEnabled = true;
  };

  //-----------------------------------------------------------------------------
  // PluginManager
  //

  PluginManager.registerCommand(pluginName, "disableBye", function () {
    $gameSystem.disableBye();
  });

  PluginManager.registerCommand(pluginName, "enableBye", function () {
    $gameSystem.enableBye();
  });

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    let enabled = this.isByeEnabled();
    this.addCommand(TMPlugin.ByeCommand.ByeCommand, 'bye', enabled);
    _Window_MenuCommand_addOriginalCommands.call(this);
  };

  Window_MenuCommand.prototype.isByeEnabled = function () {
    return $gameParty.size() >= 2 && $gameSystem.isByeEnabled();
  };

  //-----------------------------------------------------------------------------
  // Window_MenuStatus
  //

  Window_MenuStatus.prototype.setByeMode = function (byeMode) {
    this._byeMode = byeMode;
  };

  const _Window_MenuStatus_processOk = Window_MenuStatus.prototype.processOk;
  Window_MenuStatus.prototype.processOk = function () {
    if (this._byeMode) {
      Window_Selectable.prototype.processOk.call(this);
    } else {
      _Window_MenuStatus_processOk.call(this);
    }
  };

  const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
  Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
    if (this._byeMode) {
      let actor = $gameParty.members()[this.index()];
      return actor && !actor.actor().meta.disableBye;
    } else {
      return _Window_MenuStatus_isCurrentItemEnabled.call(this);
    }
  };

  const _Window_MenuStatus_playOkSound = Window_Selectable.prototype.playOkSound;
  Window_Selectable.prototype.playOkSound = function () {
    if (this._byeMode) {
      AudioManager.playSe(TMPlugin.ByeCommand.ByeSe);
    } else {
      _Window_MenuStatus_playOkSound.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('bye', this.commandBye.bind(this));
  };

  Scene_Menu.prototype.commandBye = function () {
    this._statusWindow.setByeMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok', this.onByeOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onByeCancel.bind(this));
  };

  Scene_Menu.prototype.onByeOk = function () {
    let index = this._statusWindow.index();
    let actor = $gameParty.members()[index];
    // 機能追加
    if (TMPlugin.ByeCommand.clearEquipments) {
      $gameActors.actor(actor.actorId()).clearEquipments();
    }

    $gameParty.removeActor(actor.actorId());
    this._statusWindow.refresh();
    let n = $gameParty.size();
    if (n === 1) {
      this._commandWindow.refresh();
      this.onByeCancel();
    } else {
      if (this._statusWindow.index() >= n) {
        this._statusWindow.select(n - 1);
      }
      this._statusWindow.activate();
    }
  };

  Scene_Menu.prototype.onByeCancel = function () {
    this._statusWindow.deselect();
    this._statusWindow.setByeMode(false);
    this._commandWindow.activate();
  };

})();