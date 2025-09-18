
/*
 * --------------------------------------------------
 * MNKR_RandomTreasure.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*---------------------------------------------------------------------------*
* 2018/09/05 kido
* https://kido0617.github.io/
* Ver.1.3
* This software is released under the MIT license.
* http://opensource.org/licenses/mit-license.php
*---------------------------------------------------------------------------*/

// v1.0.1 DarkPlasma氏にリファクタをいただき、修正。
// v1.0.0 MZ用に移植。MVとの互換性なし。

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomTreasure.js
@plugindesc v1.0.1 Random Treasure Chest Plugin
@author kido,munokura
@license MIT License

@help
Random Treasure Chest Plugin
This plugin makes it easy to implement a treasure chest that randomly acquires
items.

It simplifies the process of randomly acquiring items.

Plugin Command: Prepare Gacha Processing
Shop Processing
Plugin Command: Acquire Item

Use this plugin with the above settings.
The shop processing will be replaced with the gacha information (items and
number of wins).

You can also obtain information about the last item acquired from
$gameLastRandomTreasure
.

# Contact Information
This plugin was originally created for RPG Maker MV and has been adapted for
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission, and there are
no restrictions on its use (commercial, 18+, etc.).

@param itemName
@text Item name substitution variable
@desc Variable to store the name of the acquired item
@type variable
@default 0

@param itemIcon
@text Item icon number substitution variable
@desc Variable to store the icon number of the acquired item
@type variable
@default 0

@param itemLot
@text Item Gacha number assignment variable
@desc A variable to store the number of gacha items obtained (used for effects based on rarity, etc.)
@type variable
@default 0

@command randomTreasure
@text Random treasure chest action
@desc Determines the action to be taken after the command.
@arg action
@text operation
@desc Gacha processing preparation: Replace the following "shop processing" with the gacha options and number / Item acquisition: Acquire the item drawn in the gacha
@type select
@default start
@option Gacha processing preparation
@value start
@option Item Acquisition
@value get
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomTreasure.js
@plugindesc v1.0.1 ランダム宝箱プラグイン
@author munokura (原作:kido)

@help
ランダム宝箱プラグイン
ランダムにアイテムを入手できる宝箱を楽に実装するプラグインです。

ランダムにアイテムを取得するイベントを簡略化します。

プラグインコマンド：ガチャ処理準備
ショップの処理
プラグインコマンド：アイテム取得

と設定して使います。
ショップの処理内容がガチャの内容（アイテムと当選数）に置き換わります。

最後に入手したアイテムの情報を
  $gameLastRandomTreasure
から取得することもできます。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param itemName
@text アイテム名代入変数
@desc 取得したアイテムの名前を入れる変数
@type variable
@default 0

@param itemIcon
@text アイテムアイコン番号代入変数
@desc 取得したアイテムのアイコン番号を入れる変数
@type variable
@default 0

@param itemLot
@text アイテムのガチャ本数代入変数
@desc 取得したアイテムのガチャの本数を入れる変数(レア度に応じた演出などに使う)
@type variable
@default 0

@command randomTreasure
@text ランダム宝箱動作
@desc コマンド後の動作を決めます。

@arg action
@text 動作
@type select
@option ガチャ処理準備
@value start
@option アイテム取得
@value get
@default start
@desc ガチャ処理準備:以降の「ショップの処理」をガチャの選択肢と数に置換 / アイテム取得:ガチャで引いたアイテムを取得
*/


(() => {

    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const NAME_VAR = Number(parameters['itemName'] || 0);
    const ICON_VAR = Number(parameters['itemIcon'] || 0);
    const RATE_VAR = Number(parameters['itemLot'] || 0);

    PluginManager.registerCommand(pluginName, "randomTreasure", args => {
        const lottery = String(args.action);

        switch (lottery) {
            case 'start':
                $gameTemp.randomTreasureStart = true;
                break;
            case 'get':
                getRandom();
                break;
        }
    });

    function getRandom() {
        if (!$gameSystem.randomTreasures || !$gameSystem.randomTreasures.length) {
            $gameSystem.lastRandomTreasure = null;
            return null;
        }
        let rand = Math.randomInt($gameSystem.randomTreasures
            .reduce((current, previous) => current + previous.rate, 0)
        );
        let sum = 0;
        const winItem = $gameSystem.randomTreasures.find(treasure => {
            sum += treasure.rate;
            return rand < sum;
        });
        const item = getItem(winItem.type, winItem.id);

        $gameParty.gainItem(item, 1);

        $gameSystem.lastRandomTreasure = item;
        if (NAME_VAR !== -1) $gameVariables.setValue(NAME_VAR, item.name);
        if (ICON_VAR !== -1) $gameVariables.setValue(ICON_VAR, item.iconIndex);
        if (RATE_VAR !== -1) $gameVariables.setValue(RATE_VAR, winItem.rate);
    };

    /**
     * アイテム種別とアイテムIDからアイテムデータを返す
     * @param {number} type アイテム種別
     * @param {number} id アイテムID
     * @return {MZ.Item | MZ.Weapon | MZ.Armor}
     */
    function getItem(type, id) {
        let item;
        switch (type) {
            case 0:
                item = $dataItems[id];
                break;
            case 1:
                item = $dataWeapons[id];
                break;
            case 2:
                item = $dataArmors[id];
                break;
        }
        return item;
    };

    // Shop Processing
    const _command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function (params) {
        if (!$gameParty.inBattle()) {
            if ($gameTemp.randomTreasureStart) {
                $gameTemp.randomTreasureStart = false;
                let goodsList = [params];
                while (this.nextEventCode() === 605) {
                    this._index++;
                    goodsList.push(this.currentCommand().parameters);
                }
                $gameSystem.randomTreasures = goodsList.map(goods => {
                    let item = getItem(goods[0], goods[1]);
                    return {
                        type: goods[0],
                        id: goods[1],
                        rate: goods[2] === 0 ? item.price : goods[3]
                    };
                });
                return true;
            }
        }
        return _command302.apply(this, arguments);
    };

})();