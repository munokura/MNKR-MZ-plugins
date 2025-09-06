/*
 * --------------------------------------------------
 * MNKR_LeaderSpeed.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LeaderSpeed.js
@plugindesc The player's movement speed will change depending on the leading actor.
@author munokura
@license MIT License

@help
Varies the player's movement speed depending on the leading actor.

Enter the following tag in the actor's memo field:
<MNKR_LeaderSpeed:x>
Where x is a value specifying the movement speed. (Recommended values: 1 to 6)
The default in RPG Maker is 4.
The higher the value, the faster the movement speed.
If the leading actor has no tag, it will default to 4.

Example
<MNKR_LeaderSpeed:6>

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without the author's
permission, and there are no restrictions on use (commercial, R18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LeaderSpeed.js
@plugindesc 先頭のアクターによって、プレイヤーの移動速度を変化させます。
@author munokura

@help
先頭のアクターによって、プレイヤーの移動速度を変化させます。

アクターのメモ欄に下記のタグを入れてください。
<MNKR_LeaderSpeed:x>
x には移動スピードを指定する値を入れてください。（推奨値：1から6）
ツクールのデフォルトは4です。
大きいほど移動速度が速くなります。
タグが入っていないアクターが先頭の場合、4になります。

例
<MNKR_LeaderSpeed:6>


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function () {
    _Game_Player_refresh.call(this);
    const leader = $gameParty.leader();
    const speed = Number(leader ? (leader.actor().meta.MNKR_LeaderSpeed || 4) : 4);
    $gamePlayer.setMoveSpeed(speed);
  };

})();