/*
 * --------------------------------------------------
 * MNKR_EnemyStateIconOffset.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EnemyStateIconOffset.js
 * @plugindesc 敵キャラ毎にステートアイコンのY座標をオフセットします。
 * @author munokura
 *
 * @help
 * 敵キャラ毎にステートアイコンのY座標をオフセットします。
 * ステート位置を変更したい敵キャラのメモ欄に下記を入力してください。
 * <MNKR_EnemyStateIconOffset:y>
 * y:正負の整数
 * 
 * 例
 * <MNKR_EnemyStateIconOffset:100>
 * ステートアイコンを通常より100ピクセル下に表示する。
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

  const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
  Sprite_Enemy.prototype.updateStateSprite = function () {
    const offSetY = Number($dataEnemies[this._battler._enemyId].meta.MNKR_EnemyStateIconOffset || 0);
    if (offSetY === 0) {
      _Sprite_Enemy_updateStateSprite.call(this);
    } else {
      this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9) + offSetY;
    }
  };

})();