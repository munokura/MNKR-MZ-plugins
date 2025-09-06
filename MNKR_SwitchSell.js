/*
 * --------------------------------------------------
 * MNKR_SwitchSell.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchSell.js
@plugindesc When the specified switch is ON, it will create an item that cannot be sold.
@author example
@license MIT License

@help
Creates items, weapons, and armor that cannot be sold when the specified
switch is ON.
Enter <MNKR_SwitchSell>
in the memo field for items, etc.

When the switch specified in the plugin parameters is ON,
the item will not be able to be sold in the shop.

Creates items that can be purchased but cannot be sold.

# Contact Information
This is a plugin originally created for RPG Maker MV ported for MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author,
and there are no restrictions on its use (commercial, 18+, etc.).

@param switchId
@text No Sale Switch
@desc When ON, items with note tags cannot be sold.
@type switch
@default 0
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchSell.js
@plugindesc 指定スイッチがONの時、売却できないアイテムを作ります。
@author munokura

@help
指定スイッチがONの時、売却できないアイテム・武器・防具を作ります。
アイテム等のメモ欄に
<MNKR_SwitchSell>
と入れてください。

プラグインパラメーターで指定したスイッチがONの時に、
ショップで売却できなくなります。

購入可能で、売却不可のアイテムが作れます。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param switchId
@text 売却不可スイッチ
@type switch
@default 0
@desc ON時にメモタグがあるアイテムが売却不可になります。
無指定の場合、常に売却できなくなります。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const switchId = Number(parameters['switchId'] || 0);

  const _Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
  Window_ShopSell.prototype.isEnabled = function (item) {
    const switchSell = switchId === 0 ? true : $gameSwitches.value(switchId);
    var isTag = false;
    if (item && item.meta) {
      isTag = item.meta.MNKR_SwitchSell;
    }
    return (switchSell && isTag) ? false : _Window_ShopSell_isEnabled.call(this, item);
  };

})();