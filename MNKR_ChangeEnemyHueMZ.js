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
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeEnemyHueMZ.js
 * @plugindesc ステートが付与された敵キャラの色相を変更できます。
 * @author munokura
 *
 * @help
 * ステートが付与された敵キャラの色相を変更できます。
 * 
 * ステートのメモ欄に下記のタグを入力してください。
 * <MNKR_ChangeEnemyHue:色相値>
 * 色相値は0以上360以下で指定してください。
 * タグが書かれたステートを付与された敵キャラの色相を変更します。
 * 複数のステートが関係する場合、ステートIDが小さいものを優先します。
 * 
 * 記入例
 * <MNKR_ChangeEnemyHue:100>
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
