/*
 * --------------------------------------------------
 * MNKR_HenshinMZ Ver.1.0.1
 * Copyright (c) 2020 Munokura
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
 * henshin 変身前アクターID 変身後アクターID
 * 
 * 使用例
 * henshin 1 8
 * ID1のアクターがID8のアクターと入れ替わります。
 * 
 * 注意点
 * 下記の状況では、何も起こりません。
 * - パーティに変身前のアクターがいない場合
 * - パーティに変身後のアクターがいる場合
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
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

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  PluginManager.registerCommand(pluginName, "henshin", args => {
    const actorId1 = Number(args.ActorId1);
    const actorId2 = Number(args.ActorId2);
    if ($gameParty._actors.contains(actorId1) && !$gameParty._actors.contains(actorId2)) {
      const i = $gameParty._actors.indexOf(actorId1);
      $gameParty._actors.splice(i, 1, actorId2);
      $gamePlayer.refresh();
      $gameMap.requestRefresh();
    }
  });

})();