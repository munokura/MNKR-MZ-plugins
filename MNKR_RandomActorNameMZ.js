/*
 * --------------------------------------------------
 * MNKR_RandomActorNameMZ.js
 *   Ver.0.0.0a
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
 * @param nameLists
 * @text 名前リスト
 * @desc 名前リストを設定します。
 * @type struct<nameList>[]
 * @default ["{\"listName\":\"list1\",\"actorNames\":\"[\\\"アーサー\\\",\\\"ランド\\\"]\"}","{\"listName\":\"list2\",\"actorNames\":\"[\\\"マリア\\\",\\\"リンダ\\\"]\"}"]
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
 * @arg selectListName
 * @text リストID
 * @desc 名前を変更する候補リストのIDを指定します。
 * @default 
 */

/*~struct~nameList:
 * @param listName
 * @text リスト名
 * @string
 * @default list1
 * @desc 名前の候補リストのリスト名。重複のない名前にしてください。
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
  const pluginParameters = PluginManager.parameters(pluginName);
  const variableId = Number(pluginParameters['variableId']);

  const settings = {
    nameLists: JSON.parse(pluginParameters.nameLists || '[]').map((e) => {
      return ((parameter) => {
        const parsed = JSON.parse(parameter);
        return {
          listName: String(parsed.listName || ''),
          actorNames: JSON.parse(parsed.actorNames || '[]').map((e) => {
            return String(e || '');
          }),
        };
      })(e || '{}');
    }),
  };

  PluginManager.registerCommand(pluginName, "changeName", args => {
    const actorId = Number(args.actorId);
    const selectListName = String(args.selectListName);
    const arr = settings.nameLists;
    const filterArr = arr.filter(el => el.listName === selectListName);
    const arrNames = filterArr[0].actorNames;
    const changeName = arrNames[Math.floor(Math.random() * arrNames.length)];
    if (variableId > 0) {
      $gameVariables.setValue(variableId, changeName);
    }
    $gameActors.actor(actorId).setName(changeName);
  });

})();