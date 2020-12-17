/*
 * --------------------------------------------------
 * MNKR_DeleteBackSpriteMZ Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_DeleteBackSpriteMZ.js
 * @plugindesc コマンド個別の黒い背景を全て非表示にします。
 * @author munokura
 *
 * @help
 * RPGツクールMVになかったコマンド個別に黒い背景がRPGツクールMZで追加されました。
 * これを全て非表示にします。
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

  const _Window_createContentsBackSprite = Window.prototype._createContentsBackSprite;
  Window.prototype._createContentsBackSprite = function () {
    _Window_createContentsBackSprite.call(this);
    this._contentsBackSprite.alpha = 0;
  };

})();
