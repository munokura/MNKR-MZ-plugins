/*
 * --------------------------------------------------
 * MNKR_EnemyIconMZ.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MNKR_EnemyIcon.js
 * @plugindesc 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 * @author munokura
 *
 * @help
 * 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <MNKR_EnemyIcon:アイコンID>
 *
 * 例
 * <MNKR_EnemyIcon:64>
 * 
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param defaultIcon
 * @text デフォルトアイコン
 * @type number
 * @desc メモタグを入れない場合に表示するアイコン。デフォルト16
 * 0にすると、非表示で左に詰まります。
 * @default 16
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_defaultIcon = Number(parameters['defaultIcon'] || 16);

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem
    Window_BattleEnemy.prototype.drawItem = function (index) {
        const enemyObj = this._enemies[index];
        const icon = Number(enemyObj.enemy().meta.MNKR_EnemyIcon) || PRM_defaultIcon;
        if (icon > 0) {
            const name = enemyObj.name();
            const rect = this.itemLineRect(index);
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, rect.width - textMargin);
            this.resetTextColor();
            this.drawIcon(icon, rect.x, iconY);
            this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
        } else {
            _Window_BattleEnemy_drawItem.call(this, index);
        };
    };

})();
