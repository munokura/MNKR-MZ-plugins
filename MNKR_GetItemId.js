/*
 * --------------------------------------------------
 * MNKR_GetItemId.js
 *   Ver.1.0.0
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_GetItemId.js
 * @plugindesc アイテムを使用した時、アイテムIDを指定変数に代入します。アイテムを使用すると開始するイベント等が作成できます。
 * @author munokura
 *
 * @help
 * アイテムを使用した時、アイテムIDを指定変数に代入します。
 * タグ指定していないアイテムを使用すると、0を代入します。
 * 
 * イベントの出現条件・条件分岐に使用することで、
 * アイテムを使用すると開始するイベント等が作成できます。
 * 
 * 
 * 使い方
 * 使用対象にしたいアイテムのメモ欄に下記のタグを入れてください。
 * <MNKR_GetItemId>
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param itemIdVariables
 * @text アイテムID代入変数
 * @type variable
 * @default 0
 * @desc タグ指定されたアイテムを使用した時にIDを代入する先の変数です。
 */


(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_itemIdVariables = Number(parameters['itemIdVariables'] || 0);

    const _Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function () {
        _Scene_Item_onItemOk.call(this);
        const getItemId = this.item().meta.MNKR_GetItemId;
        if (getItemId) {
            const usedItemId = this.item().id;
            $gameVariables.setValue(PRM_itemIdVariables, usedItemId);
        } else {
            $gameVariables.setValue(PRM_itemIdVariables, 0);
        }
    };

})();
