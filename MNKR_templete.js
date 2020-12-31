/*
 * --------------------------------------------------
 * MNKR_templete Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_templete.js
 * @plugindesc 
 * @author munokura
 *
 * @help
 * このプラグインについて
 *   RPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
 *   お問い合わせは改変者へお願いいたします。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * @param dataType
 * @text データ型
 *
 * @param string
 * @text 文字列型
 * @type string
 * @default sample
 * @parent dataType
 *
 * @param number
 * @text 数値型
 * @type number
 * @min -9007
 * @max 9007
 * @decimals 2
 * @default 0.01
 * @parent dataType
 *
 * @param boolean
 * @text 論理型
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 * @parent dataType
 *
 * @param array
 * @text 配列型
 * @type string[]
 * @default ["sample", "0", "false"]
 * @parent dataType
 *
 * @param struct
 * @text 構造型
 * @type struct<struct1>
 * @default {"param1":"window.innerWidth","param2":"window.innerHeight"}
 * @parent dataType
 *
 * @param otherType
 * @text 特殊なタイプ
 *
 * @param file
 * @text ファイル
 * @type file
 * @require 1
 * @default img/animations
 * @parent otherType
 *
 * @param fileImg
 * @text ファイル (親階層固定)
 * @type file
 * @require 1
 * @dir img
 * @default animations
 * @parent otherType
 *
 * @param fileImgAnimations
 * @text ファイル (子階層固定)
 * @type file
 * @require 1
 * @dir img/animations
 * @default
 * @parent otherType
 *
 * @param select
 * @text セレクトボックス
 * @type select
 * @option option1
 * @value 1
 * @option option2
 * @value 2
 * @default 1
 * @parent otherType
 *
 * @param combo
 * @text コンボボックス
 * @type combo
 * @option option1
 * @option option2
 * @default option1
 * @parent otherType
 *
 * @param note
 * @text ノート
 * @type note
 * @default "<meta1:sample1>\n<meta2:sample2>"
 * @parent otherType
 *
 * @param database
 * @text データベースの参照
 *
 * @param variable
 * @text 変数
 * @type variable
 * @default 0
 * @parent database
 *
 * @param switch
 * @text スイッチ
 * @type switch
 * @default 0
 * @parent database
 *
 * @param actor
 * @text アクター
 * @type actor
 * @default 0
 * @parent database
 *
 * @param class
 * @text 職業
 * @type class
 * @default 0
 * @parent database
 *
 * @param skill
 * @text スキル
 * @type skill
 * @default 0
 * @parent database
 *
 * @param item
 * @text アイテム
 * @type item
 * @default 0
 * @parent database
 *
 * @param weapon
 * @text 武器
 * @type weapon
 * @default 0
 * @parent database
 *
 * @param armor
 * @text 防具
 * @type armor
 * @default 0
 * @parent database
 *
 * @param enemy
 * @text 敵キャラ
 * @type enemy
 * @default 0
 * @parent database
 *
 * @param troop
 * @text 敵グループ
 * @type troop
 * @default 0
 * @parent database
 *
 * @param state
 * @text ステート
 * @type state
 * @default 0
 * @parent database
 *
 * @param animation
 * @text アニメーション
 * @type animation
 * @require 1
 * @default 0
 * @parent database
 *
 * @param tileset
 * @text タイルセット
 * @type tileset
 * @default 0
 * @parent database
 *
 * @param common_event
 * @text コモンイベント
 * @type common_event
 * @default 0
 * @parent database
 *
 * @param input
 * @text 基本入力
 * @type select
 * @option Tab
 * @value tab
 * @option Aボタン / Enter / スペース / Z
 * @value ok
 * @option Xボタン / Shift
 * @value shift
 * @option Control / Alt
 * @value control
 * @option Escape / テンキー0 / X / Insert
 * @value escape
 * @option RBボタン / Pagedown / W
 * @value pagedown
 * @option LBボタン / Pageup / Q
 * @value pageup
 * @option 下ボタン / カーソル下 / テンキー2
 * @value down
 * @option 左ボタン / カーソル左 / テンキー4
 * @value left
 * @option 右ボタン / カーソル右 / テンキー6
 * @value right
 * @option 上ボタン / カーソル上 / テンキー8
 * @value up
 * @option F9
 * @value debug
 */

/*~struct~struct1:
 * @param param1
 * @default sample1
 *
 * @param param2
 * @default sample2
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const number = Number(parameters['Number'] || 0);
  const String = String(parameters['String'] || "");
  const boolean = String(parameters['boolean']) === 'true';

})();