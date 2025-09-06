/*
 * --------------------------------------------------
 * MNKR_ChangeEnemyHueMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeEnemyHueMZ.js
@plugindesc You can change the hue of enemy characters that have been given a state.
@author munokura
@license MIT License

@help
You can change the hue of enemy characters assigned a state.

Enter the following tag in the state's memo field.
<MNKR_ChangeEnemyHue:HueValue>
The hue value must be between 0 and 360.
This tag changes the hue of enemy characters assigned the state with the tag.
If multiple states are involved, the state with the lowest state ID takes
priority.

Example
<MNKR_ChangeEnemyHue:100>

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeEnemyHueMZ.js
@plugindesc ステートが付与された敵キャラの色相を変更できます。
@author munokura

@help
ステートが付与された敵キャラの色相を変更できます。

ステートのメモ欄に下記のタグを入力してください。
<MNKR_ChangeEnemyHue:色相値>
色相値は0以上360以下で指定してください。
タグが書かれたステートを付与された敵キャラの色相を変更します。
複数のステートが関係する場合、ステートIDが小さいものを優先します。

記入例
<MNKR_ChangeEnemyHue:100>


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
  Sprite_Enemy.prototype.updateBitmap = function () {
    _Sprite_Enemy_updateBitmap.call(this);
    const enemyStatesArray = this._enemy.states();
    const hasHueStateObject = enemyStatesArray.find(value => value.meta.MNKR_ChangeEnemyHue);
    if (hasHueStateObject) {
      const hue = Number(hasHueStateObject.meta.MNKR_ChangeEnemyHue);
      if (this._battlerHue !== hue) {
        const name = this._enemy.battlerName();
        this._battlerHue = hue;
        this.loadBitmap(name);
        this.setHue(hue);
        this.initVisibility();
      }
    }
  };

})();