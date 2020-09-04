/*---------------------------------------------------------------------------*
 * 2018/09/05 kido
 * https://kido0617.github.io/
 * Ver.1.3
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 *---------------------------------------------------------------------------*/

/*
 * --------------------------------------------------
 * MNKR_RandomTreasure Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

// v1.0.0 MZ用に移植。MVとの互換性なし。

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomTreasure.js
 * @plugindesc v1.0.0 ランダム宝箱プラグイン
 * @author munokura (原作:kido)
 * 
 * @param itemName
 * @text アイテム名代入変数
 * @desc 取得したアイテムの名前を入れる変数
 * @type variable
 * @default 0
 * 
 * @param itemIcon
 * @text アイテムアイコン番号代入変数
 * @desc 取得したアイテムのアイコン番号を入れる変数
 * @type variable
 * @default 0
 * 
 * @param itemLot
 * @text アイテムのガチャ本数代入変数
 * @desc 取得したアイテムのガチャの本数を入れる変数(レア度に応じた演出などに使う)
 * @type variable
 * @default 0
 * 
 * @command randomTreasure
 * @text ランダム宝箱動作
 * @desc コマンド後の動作を決めます。
 * 
 * @arg action
 * @text 動作
 * @type select
 * @option ガチャ処理準備
 * @value start
 * @option アイテム取得
 * @value get
 * @default start
 * @desc ガチャ処理準備:以降の「ショップの処理」をガチャの選択肢と数に置換 / アイテム取得:ガチャで引いたアイテムを取得
 * 
 * @help
 * ランダム宝箱プラグイン
 * ランダムにアイテムを入手できる宝箱を楽に実装するプラグインです。
 * 
 * ランダムにアイテムを取得するイベントを簡略化します。
 * 
 * プラグインコマンド：ガチャ処理準備
 * ショップの処理
 * プラグインコマンド：アイテム取得
 * 
 * と設定して使います。
 * ショップの処理内容がガチャの内容（アイテムと当選数）に置き換わります。
 *
 * 
 * 利用規約
 *   MITライセンスです。
 *   http://opensource.org/licenses/mit-license.php
 */

(function () {
    'use strict';

    const parameters = PluginManager.parameters('MNKR_RandomTreasure');
    const NAME_VAR = Number(parameters['itemName'] || 0);
    const ICON_VAR = Number(parameters['itemIcon'] || 0);
    const RATE_VAR = Number(parameters['itemLot'] || 0);

    const pluginName = "MNKR_RandomTreasure";
    let lottery = "";

    PluginManager.registerCommand(pluginName, "randomTreasure", args => {
        lottery = String(args.action);

        switch (lottery) {
            case 'start':
                $gameTemp.randomTreasureStart = true;
                break;
            case 'get':
                getRandom.call(this);
                break;
        }
    });

    function getRandom() {
        if (!$gameSystem.randomTreasures || !$gameSystem.randomTreasures.length) {
            $gameSystem.lastRandomTreasure = null;
            return null;
        }
        let sum = 0;
        $gameSystem.randomTreasures.forEach(function (treasure) {
            sum += treasure.rate;
        });
        let rand = Math.randomInt(sum);
        let item, id, type, rate;
        sum = 0;
        for (let i = 0; i < $gameSystem.randomTreasures.length; i++) {
            sum += $gameSystem.randomTreasures[i].rate;
            if (rand < sum) {
                id = $gameSystem.randomTreasures[i].id;
                type = $gameSystem.randomTreasures[i].type;
                rate = $gameSystem.randomTreasures[i].rate;
                item = getItem(type, id);
                break;
            }
        }

        let params = [id, 0, 0, 1, false];

        switch (type) {
            case 0:
                Game_Interpreter.prototype.command126(params);
                break;
            case 1:
                Game_Interpreter.prototype.command127(params);
                break;
            default:
                Game_Interpreter.prototype.command128(params);
        }

        $gameSystem.lastRandomTreasure = item;
        if (NAME_VAR != -1) $gameVariables.setValue(NAME_VAR, item.name);
        if (ICON_VAR != -1) $gameVariables.setValue(ICON_VAR, item.iconIndex);
        if (RATE_VAR != -1) $gameVariables.setValue(RATE_VAR, rate);
    };

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
                let data = [];
                goodsList.forEach(function (goods) {
                    let item = getItem(goods[0], goods[1]);
                    data.push({
                        type: goods[0],
                        id: goods[1],
                        rate: goods[2] === 0 ? item.price : goods[3]
                    });
                }, this);
                $gameSystem.randomTreasures = data;
                return true;
            }
        }
        return _command302.apply(this, arguments);
    };

})();