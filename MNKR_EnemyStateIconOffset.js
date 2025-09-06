/*
 * --------------------------------------------------
 * MNKR_EnemyStateIconOffset.js
 *   Ver.0.0.4
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EnemyStateIconOffset.js
@plugindesc Offsets the Y coordinate of the state icon for each enemy character.
@author example
@license MIT License

@help
This offsets the Y coordinate of the state icon for each enemy character.
Enter the following in the memo field for the enemy character whose state
position you want to change.
<MNKR_EnemyStateIconOffset:y>
y: Positive or negative integer

Example
<MNKR_EnemyStateIconOffset:100>
Displays the state icon 100 pixels lower than normal.

No plugin commands are available.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EnemyStateIconOffset.js
@plugindesc 敵キャラ毎にステートアイコンのY座標をオフセットします。
@author munokura

@help
敵キャラ毎にステートアイコンのY座標をオフセットします。
ステート位置を変更したい敵キャラのメモ欄に下記を入力してください。
<MNKR_EnemyStateIconOffset:y>
y:正負の整数

例
<MNKR_EnemyStateIconOffset:100>
ステートアイコンを通常より100ピクセル下に表示する。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
  Sprite_Enemy.prototype.updateStateSprite = function () {
    _Sprite_Enemy_updateStateSprite.call(this);
    const offSetY = Number(this._battler.enemy().meta.MNKR_EnemyStateIconOffset || 0);
    if (offSetY !== 0) {
      this._stateIconSprite.y += offSetY;
    }
  };

})();