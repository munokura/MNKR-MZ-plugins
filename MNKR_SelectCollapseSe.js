/*
 * --------------------------------------------------
 * MNKR_SelectCollapseSe Ver.0.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectCollapseSe.js
 * @plugindesc 敵消滅の効果音を敵キャラ毎に指定できます。
 * @author munokura
 *
 * @help
 * 敵消滅の効果音を敵キャラ毎に指定できます。
 * 
 * 下記のタグを敵キャラのメモ欄に入れてください。
 * 
 * <CollapseSeFile:ファイル名>
 *   ※必須。audio/se/内のファイル名。大文字小文字を区別。拡張子省略。
 * 
 * <CollapseVPP:音量,ピッチ,位相>
 *   ※省略時は <CollapseVPP:90, 100, 0> と同動作になります。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @noteParam CollapseSeFile
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 */


(() => {
  "use strict";

  let CollapseSe = '';

  const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
  Game_Enemy.prototype.performCollapse = function () {
    Game_Battler.prototype.performCollapse.call(this);
    CollapseSe = this.enemy().meta.CollapseSeFile ? String(this.enemy().meta.CollapseSeFile) : null;
    if (CollapseSe) {
      this.performCollapseMetaSe();
    } else {
      _Game_Enemy_performCollapse.call(this);
    }
  };

  Game_Enemy.prototype.performCollapseMetaSe = function () {
    Game_Battler.prototype.performCollapse.call(this);
    if (this.collapseType() === 0 && (CollapseSe !== null)) {
      const Param = this.enemy().meta.CollapseVPP ? JsonEx.parse(`[${this.enemy().meta.CollapseVPP}]`) : [90, 100, 0];
      const CollapseSeAudio = { "name": CollapseSe, "volume": Param[0], "pitch": Param[1], "pan": Param[2] };
      this.requestEffect('collapse');
      AudioManager.playSe(CollapseSeAudio);
    }
  };

})();
