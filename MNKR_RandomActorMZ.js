/*
 * --------------------------------------------------
 * MNKR_RandomActorMZ.js
 *   Ver.0.0.3
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorMZ.js
 * @plugindesc ソシャゲ風キャラのガチャが作れるプラグインです。
 * @author munokura
 *
 * @help
 * ソシャゲ風キャラのガチャが作れるプラグインです。
 * 
 * プラグインコマンドで、ガチャを設定します。
 * 新しいアクターを引くと、パーティに参加します。
 * 既にパーティにいるアクターを引くとレベルが上がります。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param actorIdVariable
 * @text アクターID変数
 * @type variable
 * @default 0
 * @desc 取得アクターIDを代入する変数。
 *
 * @param weightVariable
 * @text 重み値変数
 * @type variable
 * @default 0
 * @desc 取得アクターの重みを代入する変数。
 *
 * @param levelUpDisplay
 * @text レベルアップ表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @desc レベルアップにメッセージの表示をするか指定します。
 * 
 * 
 * @command randomActor
 * @desc ランダムに取得するアクターを指定します。
 * @text ランダムアクター取得
 * 
 * @arg randomActorList
 * @text アクターリスト
 * @type struct<actorList>[]
 * @default []
 * @desc ガチャ対象になるアクターのリストです。
 */
/*~struct~actorList:
 * @param actor
 * @text アクター
 * @type actor
 * @default 0
 * @dexc 取得できるアクター
 * 
 * @param weight
 * @text 重み
 * @desc 重み。大きいほど当たりやすくなります。
 * @type number
 * @default 1
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_actorIdVariable = Number(parameters['actorIdVariable'] || 0);
  const PRM_weightVariable = Number(parameters['weightVariable'] || 0);
  const PRM_levelUpDisplay = parameters['levelUpDisplay'] === 'true';

  PluginManager.registerCommand(pluginName, "randomActor", function (args) {

    // 無くても動くように後処理でNumberしているが、ここで整形するベターな方法を求む
    // const listArray = JSON.parse(args.randomActorList).map(element => JSON.parse(element));
    // for (let i = 0; i < listArray.length; i++) {
    //   listArray[i].actor = Number(listArray[i].actor);
    //   listArray[i].weight = Number(listArray[i].weight);
    // }

    const listArray = JSON.parse(args.randomActorList)
      .map(JSON.parse)
      .map((element) => ({
        actor: Number(element.actor),
        weight: Number(element.weight),
      }));

    const getActorId = gachaActor(listArray);
    getActor(getActorId);

  });

  function gachaActor(listArray) {

    // アクターガチャ配列生成:gemini氏によるリファクタリング
    // let gachaArray = [];
    // for (let i = 0; i < listArray.length; i++) {
    //   for (let j = 0; j < listArray[i].weight; j++) {
    //     gachaArray.push(Number(listArray[i].actor));
    //   }
    // }
    // const gachaArray = listArray.flatMap((element) => Array(element.weight).fill(Number(element.actor)));
    const gachaArray = listArray.flatMap((element) => Array(element.weight).fill(element.actor));

    const randomValue = Math.floor(Math.random() * gachaArray.length);
    const getActorId = gachaArray[randomValue];
    $gameVariables.setValue(PRM_actorIdVariable, getActorId);

    // 重み取得：基本設計からやり直したら、より簡便になる可能性
    // const actorListArray = listArray.map(listArray => Number(listArray.actor));
    const actorListArray = listArray.map(listArray => listArray.actor);
    const weightIndex = actorListArray.findIndex((element) => element === getActorId);
    const getWeight = listArray[weightIndex].weight;
    $gameVariables.setValue(PRM_weightVariable, getWeight);

    return getActorId;
  }

  function getActor(getActorId) {
    const hasActor = $gameParty.members().contains($gameActors.actor(getActorId));
    if (hasActor) {
      const actorLevel = $gameActors.actor(getActorId)._level;
      $gameActors.actor(getActorId).changeLevel(actorLevel + 1, PRM_levelUpDisplay);
    } else {
      $gameParty.addActor(getActorId);
    }
  }

})();
