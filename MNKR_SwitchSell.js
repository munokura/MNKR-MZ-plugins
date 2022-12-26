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
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SwitchSell.js
 * @plugindesc 指定スイッチがONの時、売却できないアイテムを作ります。
 * @author munokura
 *
 * @help
 * 指定スイッチがONの時、売却できないアイテム・武器・防具を作ります。
 * アイテム等のメモ欄に
 * <MNKR_SwitchSell>
 * と入れてください。
 * 
 * プラグインパラメーターで指定したスイッチがONの時に、
 * ショップで売却できなくなります。
 * 
 * 購入可能で、売却不可のアイテムが作れます。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param switchId
 * @text 売却不可スイッチ
 * @type switch
 * @default 0
 * @desc ON時にメモタグがあるアイテムが売却不可になります。
 * 無指定の場合、常に売却できなくなります。
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
