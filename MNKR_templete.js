/*
 * --------------------------------------------------
 * MNKR_templete.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_templete.js
@plugindesc @author munokura
@author munokura
@license MIT License

@help
This is a template for creating plugins. It has no functionality.

There are no plugin commands.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
MZ.
Please contact the original author for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author, and there are no restrictions on its use (commercial, 18+, etc.).

@param dataType
@text Data Types

@param string
@text string type
@type string
@default sample
@parent dataType

@param number
@text Numeric types
@type number
@default 0.01
@min -9007
@max 9007
@decimals 2
@parent dataType

@param boolean
@text Logical types
@type boolean
@on ON
@off OFF
@default false
@parent dataType

@param array
@text Array types
@type string[]
@default ["sample", "0", "false"]
@parent dataType

@param struct
@text structural type
@type struct<struct1>
@default {"param1":"window.innerWidth","param2":"window.innerHeight"}
@parent dataType

@param otherType
@text Special types

@param file
@text file
@type file
@default img/animations
@require 1
@parent otherType

@param fileImg
@text File (fixed parent hierarchy)
@type file
@default animations
@require 1
@dir img
@parent otherType

@param fileImgAnimations
@text File (fixed child hierarchy)
@type file
@require 1
@dir img/animations
@parent otherType

@param select
@text Select box
@type select
@default 1
@option option1
@value 1
@option option2
@value 2
@parent otherType

@param combo
@text Combo box
@type combo
@default option1
@option option1
@option option2
@parent otherType

@param note
@text Notes
@type note
@default "<meta1:sample1>\n<meta2:sample2>"
@parent otherType

@param database
@text Database Reference

@param variable
@text variable
@type variable
@default 0
@parent database

@param switch
@text switch
@type switch
@default 0
@parent database

@param actor
@text actor
@type actor
@default 0
@parent database

@param class
@text Occupation
@type class
@default 0
@parent database

@param skill
@text skill
@type skill
@default 0
@parent database

@param item
@text item
@type item
@default 0
@parent database

@param weapon
@text weapon
@type weapon
@default 0
@parent database

@param armor
@text Armor
@type armor
@default 0
@parent database

@param enemy
@text Enemy characters
@type enemy
@default 0
@parent database

@param troop
@text Enemy Group
@type troop
@default 0
@parent database

@param state
@text State
@type state
@default 0
@parent database

@param animation
@text animation
@type animation
@default 0
@require 1
@parent database

@param tileset
@text Tile Set
@type tileset
@default 0
@parent database

@param common_event
@text Common Events
@type common_event
@default 0
@parent database

@param input
@text Basic Input
@type select
@option Tab
@value tab
@option A button / Enter / Space / Z
@value ok
@option X button / Shift
@value shift
@option Control / Alt
@value control
@option Escape / Numpad 0 / X / Insert
@value escape
@option RB button / Page down / W
@value pagedown
@option LB button / Page up / Q
@value pageup
@option Down button / Cursor down / Numeric keypad 2
@value down
@option Left button / Cursor left / Numeric keypad 4
@value left
@option Right button / Cursor right / Numeric keypad 6
@value right
@option Up button / Cursor up / Numeric keypad 8
@value up
@option F9
@value debug
*/

/*~struct~struct1:
@param param1
@default sample1

@param param2
@default sample2
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_templete.js
@plugindesc
@author munokura

@help
プラグイン作成用テンプレートです。機能は何もありません。


プラグインコマンドはありません。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param dataType
@text データ型

@param string
@text 文字列型
@type string
@default sample
@parent dataType

@param number
@text 数値型
@type number
@min -9007
@max 9007
@decimals 2
@default 0.01
@parent dataType

@param boolean
@text 論理型
@type boolean
@on ON
@off OFF
@default false
@parent dataType

@param array
@text 配列型
@type string[]
@default ["sample", "0", "false"]
@parent dataType

@param struct
@text 構造型
@type struct<struct1>
@default {"param1":"window.innerWidth","param2":"window.innerHeight"}
@parent dataType

@param otherType
@text 特殊なタイプ

@param file
@text ファイル
@type file
@require 1
@default img/animations
@parent otherType

@param fileImg
@text ファイル (親階層固定)
@type file
@require 1
@dir img
@default animations
@parent otherType

@param fileImgAnimations
@text ファイル (子階層固定)
@type file
@require 1
@dir img/animations
@default
@parent otherType

@param select
@text セレクトボックス
@type select
@option option1
@value 1
@option option2
@value 2
@default 1
@parent otherType

@param combo
@text コンボボックス
@type combo
@option option1
@option option2
@default option1
@parent otherType

@param note
@text ノート
@type note
@default "<meta1:sample1>\n<meta2:sample2>"
@parent otherType

@param database
@text データベースの参照

@param variable
@text 変数
@type variable
@default 0
@parent database

@param switch
@text スイッチ
@type switch
@default 0
@parent database

@param actor
@text アクター
@type actor
@default 0
@parent database

@param class
@text 職業
@type class
@default 0
@parent database

@param skill
@text スキル
@type skill
@default 0
@parent database

@param item
@text アイテム
@type item
@default 0
@parent database

@param weapon
@text 武器
@type weapon
@default 0
@parent database

@param armor
@text 防具
@type armor
@default 0
@parent database

@param enemy
@text 敵キャラ
@type enemy
@default 0
@parent database

@param troop
@text 敵グループ
@type troop
@default 0
@parent database

@param state
@text ステート
@type state
@default 0
@parent database

@param animation
@text アニメーション
@type animation
@require 1
@default 0
@parent database

@param tileset
@text タイルセット
@type tileset
@default 0
@parent database

@param common_event
@text コモンイベント
@type common_event
@default 0
@parent database

@param input
@text 基本入力
@type select
@option Tab
@value tab
@option Aボタン / Enter / スペース / Z
@value ok
@option Xボタン / Shift
@value shift
@option Control / Alt
@value control
@option Escape / テンキー0 / X / Insert
@value escape
@option RBボタン / Pagedown / W
@value pagedown
@option LBボタン / Pageup / Q
@value pageup
@option 下ボタン / カーソル下 / テンキー2
@value down
@option 左ボタン / カーソル左 / テンキー4
@value left
@option 右ボタン / カーソル右 / テンキー6
@value right
@option 上ボタン / カーソル上 / テンキー8
@value up
@option F9
@value debug
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const number = Number(parameters['Number'] || 0);
  const boolean = String(parameters['boolean']) === 'true';

  // MZプラグインコマンド 1
  PluginManager.registerCommand(pluginName, "コマンド名", args => {
    // 処理
  });

  // MZプラグインコマンド 2
  PluginManager.registerCommand(pluginName, "コマンド名", function (args) {
    // 処理
  });

  // MVプラグインコマンド
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command === pluginName) {
      //処理
    }
  };

})();