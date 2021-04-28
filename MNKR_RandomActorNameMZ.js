/*
 * --------------------------------------------------
 * MNKR_RandomActorNameMZ.js
 *   Ver.0.0.0
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorNameMZ.js
 * @plugindesc アクターの名前をランダムに変更します。
 * @author munokura
 *
 * @help
 * アクターの名前をランダムに変更します。
 * 
 * 
 * プラグインパラメーターに入力したものが、選択候補になります。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param variableId
 * @text 名前保存変数
 * @desc ランダムに設定された名前を保存する変数を指定してください。無指定の場合、保存しません。
 * @type variable
 * @default 0
 * 
 * @param nameList
 * @text 名前リスト
 * @desc 名前リストを設定します。
 * @type struct<listParam>[]
 * @default ["{\"listNumber\":\"1\",\"actorNames\":\"[\\\"アーサー\\\",\\\"マイケル\\\"]\"}","{\"listNumber\":\"2\",\"actorNames\":\"[\\\"マリア\\\",\\\"スージー\\\"]\"}"]
 * 
 * 
 * @command changeName
 * @text 名前の変更
 * @desc アクターの名前を変更します。
 *
 * @arg actorId
 * @text アクター
 * @desc 名前を変更するアクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg listId
 * @text リストID
 * @desc 名前を変更する候補リストのIDを指定します。
 * @default 
 */

/*~struct~listParam:
 * @param listNumber
 * @text リスト番号
 * @type number
 * @default 0
 * @desc 名前の候補リストのリスト番号
 *
 * @param actorNames
 * @text 名前候補
 * @default 
 * @type []
 * @desc 名前候補の内容を入れてください。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const variableId = Number(parameters['variableId']);
  const nameList = JSON.parse(parameters['nameList'] || '{}');

  PluginManager.registerCommand(pluginName, "changeName", args => {
    const actorId = Number(args.actorId);
    const listId = Number(args.listId);
    console.log(actorId);
    console.log(listId);
    console.log(nameList);
    console.log(nameList.listNumber);
    console.log(nameList.actorNames);

    // const name = nameList.listNumber[Math.floor(Math.random() * nameList.listNumber.length)];

    // if (variableId > 0) {
    //   $gameVariables.setValue(variableId, name);
    // }
    // $gameActors.actor(actorId).setName(name);
  });

})();