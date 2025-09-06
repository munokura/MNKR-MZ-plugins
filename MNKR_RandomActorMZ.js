/*
 * --------------------------------------------------
 * MNKR_RandomActorMZ.js
 *   Ver.0.0.5
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorMZ.js
@plugindesc This is a plugin that allows you to create gachas of social game-style characters.
@author munokura
@license MIT License

@help
This plugin lets you create a social game-style character gacha.

Use plugin commands to set up the gacha.
When you acquire a new actor, they join your party.
When you acquire an actor already in your party, their level increases.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, R18+, etc.).

@param actorIdVariable
@text Actor ID variable
@desc A variable to assign the acquired actor ID.
@type variable
@default 0

@param weightVariable
@text Weight variable
@desc A variable to assign the weight of the actor to.
@type variable
@default 0

@param levelUpDisplay
@text Level up display
@desc Specify whether to display a message when leveling up.
@type boolean
@on display
@off hidden
@default false

@command randomActor
@text Get a random actor
@desc Specifies the actor to randomly pick.
@arg randomActorList
@text Actor List
@desc This is a list of actors who are eligible for gacha.
@type struct<actorList>[]
@default []
*/

/*~struct~actorList:
@param actor
@text actor
@type actor
@default 0

@param weight
@text Weight
@desc Weight. The larger the weight, the easier it is to hit.
@type number
@default 1
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorMZ.js
@plugindesc ソシャゲ風キャラのガチャが作れるプラグインです。
@author munokura

@help
ソシャゲ風キャラのガチャが作れるプラグインです。

プラグインコマンドで、ガチャを設定します。
新しいアクターを取得すると、パーティに参加します。
既にパーティにいるアクターを取得するとレベルが上がります。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param actorIdVariable
@text アクターID変数
@type variable
@default 0
@desc 取得アクターIDを代入する変数。

@param weightVariable
@text 重み値変数
@type variable
@default 0
@desc 取得アクターの重みを代入する変数。

@param levelUpDisplay
@text レベルアップ表示
@type boolean
@on 表示
@off 非表示
@default false
@desc レベルアップにメッセージの表示をするか指定します。


@command randomActor
@desc ランダムに取得するアクターを指定します。
@text ランダムアクター取得

@arg randomActorList
@text アクターリスト
@type struct<actorList>[]
@default []
@desc ガチャ対象になるアクターのリストです。
*/

/*~struct~actorList:ja
@param actor
@text アクター
@type actor
@default 0
@dexc 取得できるアクター

@param weight
@text 重み
@desc 重み。大きいほど当たりやすくなります。
@type number
@default 1
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_actorIdVariable = Number(parameters['actorIdVariable'] || 0);
  const PRM_weightVariable = Number(parameters['weightVariable'] || 0);
  const PRM_levelUpDisplay = parameters['levelUpDisplay'] === 'true';

  PluginManager.registerCommand(pluginName, "randomActor", function (args) {
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
    const gachaArray = listArray.flatMap((element) => Array(element.weight).fill(element.actor));
    const randomValue = Math.floor(Math.random() * gachaArray.length);
    const getActorId = gachaArray[randomValue];
    $gameVariables.setValue(PRM_actorIdVariable, getActorId);

    const actorListArray = listArray.map(listArray => listArray.actor);
    const weightIndex = actorListArray.findIndex((element) => element === getActorId);
    const getWeight = listArray[weightIndex].weight;
    $gameVariables.setValue(PRM_weightVariable, getWeight);

    return getActorId;
  }

  function getActor(getActorId) {
    const hasActor = $gameParty.members().contains($gameActors.actor(getActorId));
    if (hasActor) {
      const actorLevel = $gameActors.actor(getActorId).level;
      $gameActors.actor(getActorId).changeLevel(actorLevel + 1, PRM_levelUpDisplay);
    } else {
      $gameParty.addActor(getActorId);
    }
  }

})();