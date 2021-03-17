/*
 * --------------------------------------------------
 * MNKR_LeaderSpeed.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LeaderSpeed.js
 * @plugindesc 先頭のアクターによって、プレイヤーの移動速度を変化させます。
 * @author munokura
 *
 * @help
 * 先頭のアクターによって、プレイヤーの移動速度を変化させます。
 * 
 * アクターのメモ欄に下記のタグを入れてください。
 * <MNKR_LeaderSpeed:x>
 * x には移動スピードを指定する値を入れてください。（推奨値：1から8）
 * ツクールのデフォルトは4です。
 * 大きいほど移動速度が速くなります。
 * タグが入っていないアクターが先頭の場合、ツクールのデフォルトの4になります。
 * 
 * 例
 * <MNKR_LeaderSpeed:8>
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
  "use strict";

  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function () {
    _Game_Player_refresh.call(this);
    const leaderMeta = Number($gameParty.leader().actor().meta.MNKR_LeaderSpeed);
    const speed = leaderMeta ? leaderMeta : 4;
    $gamePlayer.setMoveSpeed(speed);
  };

})();