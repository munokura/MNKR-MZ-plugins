/*
 * --------------------------------------------------
 * MNKR_SelectCollapseSe.js
 *   Ver.0.0.5
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectCollapseSe.js
@plugindesc You can specify the sound effect for enemy disappearance for each enemy character.
@author munokura
@license MIT License

@help
You can specify the enemy disappearance sound effect for each enemy character.

Enter the following tag in the enemy character's memo field:

<CollapseSeFile:filename>
Required. File name in audio/se/. Case-sensitive. Extension omitted.

<CollapseVPP:volume,pitch,phase>
If omitted, it will behave the same as <CollapseVPP:90, 100, 0>.

No plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without the author's
permission, and there are no restrictions on usage (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SelectCollapseSe.js
@plugindesc 敵消滅の効果音を敵キャラ毎に指定できます。
@author munokura

@help
敵消滅の効果音を敵キャラ毎に指定できます。

下記のタグを敵キャラのメモ欄に入れてください。

<CollapseSeFile:ファイル名>
  ※必須。audio/se/内のファイル名。大文字小文字を区別。拡張子省略。

<CollapseVPP:音量,ピッチ,位相>
  ※省略時は <CollapseVPP:90, 100, 0> と同動作になります。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@noteParam CollapseSeFile
@noteRequire 1
@noteDir audio/se/
@noteType file
@noteData enemies
*/

(() => {
  "use strict";

  const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
  Game_Enemy.prototype.performCollapse = function () {
    Game_Battler.prototype.performCollapse.call(this);
    const collapseSe = this.enemy().meta.CollapseSeFile || false;
    if (collapseSe) {
      this.performCollapseMetaSe(collapseSe);
    } else {
      _Game_Enemy_performCollapse.call(this);
    }
  };

  Game_Enemy.prototype.performCollapseMetaSe = function (collapseSe) {
    Game_Battler.prototype.performCollapse.call(this);
    if (this.collapseType() === 0) {
      const VppMeta = this.enemy().meta.CollapseVPP;
      const seParam = VppMeta ? VppMeta.split(',').map(Number) : [90, 100, 0];
      const collapseSeAudio = { "name": collapseSe, "volume": seParam[0], "pitch": seParam[1], "pan": seParam[2] };
      this.requestEffect('collapse');
      AudioManager.playSe(collapseSeAudio);
    }
  };

})();