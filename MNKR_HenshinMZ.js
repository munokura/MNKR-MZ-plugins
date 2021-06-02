/*
 * --------------------------------------------------
 * MNKR_HenshinMZ.js
 *   Ver.1.1.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HenshinMZ.js
 * @plugindesc プラグインコマンドでアクターを入れ替えられます。
 * @author munokura
 *
 * @help
 * プラグインコマンドでアクターを入れ替えられます。
 * パーティの並び順がそのままで入れ替わります。
 * 
 * マップでも戦闘中でも入れ替えられます。
 * 主人公の入換や変身を表現する等への使用を想定しています。
 * 
 * 
 * プラグインコマンド
 * ・アクター入れ替え
 * 
 * 注意点
 * 下記の状況では、何も起こりません。
 * - パーティに変身前のアクターがいない場合
 * - パーティに変身後のアクターがいる場合
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command henshin
 * @text アクター入れ替え
 * @desc アクターを並び順を変えずに入れ替えます。
 *
 * @arg ActorId1
 * @text 入換前のアクターID
 * @desc 入換前のアクターIDを指定します。
 * @type actor
 * @default
 *
 * @arg ActorId2
 * @text 入換後のアクターID
 * @desc 入換後のアクターIDを指定します。
 * @type actor
 * @default
 */

(() => {

  'use strict'

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  // 2021/06/02 chronicle氏に提示いただいたコードに全面差し替え

  PluginManager.registerCommand(pluginName, "henshin", args => {
    const actor = $gameActors.actor(Number(args.ActorId1));
    if (actor) actor.transform(Number(args.ActorId2));
  });

  Game_Actor.prototype.transform = function (actorId) {
    const allMemberIndex = actor => $gameParty.allMembers().indexOf(actor);

    const index = allMemberIndex(this);
    const transformActor = $gameActors.actor(actorId);
    let transformIndex = allMemberIndex(transformActor);
    if (!transformActor || index < 0 || transformIndex >= 0) return;

    const wasBattleMember = $gameParty.battleMembers().includes(this);
    if (wasBattleMember) $gameParty._transformActorId = actorId;
    $gameParty.addActor(actorId);
    transformIndex = allMemberIndex(transformActor);
    if (transformIndex >= 0) {
      $gameParty.swapOrder(index, allMemberIndex(transformActor));
      if (wasBattleMember) $gameParty._transformActorId = this.actorId();
      $gameParty.removeActor(this.actorId());
    }
    $gameParty._transformActorId = null;
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function () {
    _Game_Party_initialize.apply(this, arguments);
    this._transformActorId = null;
  };

  const _Game_Party_battleMembers = Game_Party.prototype.battleMembers;
  Game_Party.prototype.battleMembers = function () {
    const members = _Game_Party_battleMembers.apply(this, arguments);
    if (this._transformActorId) members.push($gameActors.actor(this._transformActorId));
    return members;
  };

})();