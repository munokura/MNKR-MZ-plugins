/*
 * --------------------------------------------------
 * MNKR_EnemyIcon Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EnemyIcon.js
 * @param Default Icon
 * @text デフォルトアイコン
 * @type string
 * @desc メモタグを入れない場合に表示するアイコン。デフォルト16
 * 0にすると、非表示で左に詰まります。
 * @default 16
 *
 * @plugindesc 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 * @help
 * 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <EnemyIcon:アイコンID>
 *
 * 例
 * <EnemyIcon:64>
 */

(function() {
    'use strict';
    const parameters = PluginManager.parameters('MNKR_EnemyIcon');
    const defaultIcon = parseInt(parameters['Default Icon'] || 16);

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem
    Window_BattleEnemy.prototype.drawItem = function(index) {
        const enemy = this._enemies[index];
        const icon = parseInt(enemy.enemy().meta.EnemyIcon) || defaultIcon;
        if (icon) {
            const name = enemy.name();
            const rect = this.itemLineRect(index);
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, rect.width - textMargin);
            this.resetTextColor();
            this.drawIcon(icon, rect.x, iconY);
            this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
        } else {
            _Window_BattleEnemy_drawItem.apply(this, arguments);
        };
    };

})();