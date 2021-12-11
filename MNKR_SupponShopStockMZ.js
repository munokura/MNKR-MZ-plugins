/*
 * --------------------------------------------------
 * MNKR_SupponShopStockMZ.js
 *   Ver.0.0.7
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//============================================================================
// SupponShopStock.js
//============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SupponShopStockMZ.js
 * 
 * @plugindesc 在庫システムを有するお店を設定します。
 * @author Suppon (改変 munokura)
 *
 * @help
 * 以下の機能をプラグインコマンドで使用してください。
 *
 * - ショップの作成
 * - アイテムの追加
 * - 武器の追加
 * - 防具の追加
 * - アイテムの削除
 * - 武器の削除
 * - 防具の削除
 * - ショップの起動
 * - ショップの削除
 * - 変数管理しないアイテムの在庫数を、指定して変数に代入
 *
 * 
 * このプラグインについて
 *   RPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
 *   お問い合わせは改変者へお願いいたします。
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param Label of stock Number
 * @text 在庫数の表記
 * @desc 在庫数の表記を設定します
 * @default 在庫数
 *
 * @param Label of sold out
 * @text 売り切れの表記
 * @desc 売り切れの表記を設定します
 * @default 売り切れ
 *
 * @param Display option
 * @text 在庫数を表示
 * @type boolean
 * @on 在庫数を表示
 * @off 在庫数を非表示
 * @desc true にすると在庫数が、持っている数の横に表示されます。
 * @default false
 *
 * @param Display option space
 * @text オプション表示スペース
 * @desc 持っている数と在庫数の表示スペースです。
 * @default 12
 * 
 * 
 * @command makeShop
 * @text ショップ作成
 * @desc ショップを作成します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 * 
 * @arg shopType
 * @text ショップタイプ
 * @desc ショップタイプの指定。
 * @type select
 * @option 購買専門（売却不可）
 * @value 0
 * @option 購買、売却可能
 * @value 1
 * @option 購買、売却可能、売却品が商品に追加
 * @value 2
 * @default 2
 *
 * 
 * @command addItem
 * @text アイテム追加
 * @desc ショップにアイテムを追加します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg itemId
 * @text 追加アイテム
 * @desc 追加するアイテムのIDです。
 * @type item
 * @default 1
 *
 * @arg variableId
 * @text 在庫の変数ID
 * @desc 在庫の個数を割り当てる変数のIDです。-1にする（テキストタブ指定）と変数は使わず、在庫は内部のデータで処理されます。
 * @type variable
 * @default -1
 *
 * @arg stock
 * @text 在庫数
 * @desc 在庫数の設定値です。
 * @default 1
 *
 * 
 * @command addWeapon
 * @text 武器追加
 * @desc ショップに武器を追加します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg weaponId
 * @text 追加武器
 * @desc 追加する武器のIDです。
 * @type weapon
 * @default 1
 *
 * @arg variableId
 * @text 在庫の変数ID
 * @desc 在庫の個数を割り当てる変数のIDです。-1にする（テキストタブ指定）と変数は使わず、在庫は内部のデータで処理されます。
 * @type variable
 * @default -1
 *
 * @arg stock
 * @text 在庫数
 * @desc 在庫数の設定値です。
 * @default 1
 *
 * 
 * @command addArmor
 * @text 防具追加
 * @desc ショップに防具を追加します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg armorId
 * @text 追加防具
 * @desc 追加する防具のIDです。
 * @type armor
 * @default 1
 *
 * @arg variableId
 * @text 在庫の変数ID
 * @desc 在庫の個数を割り当てる変数のIDです。-1にする（テキストタブ指定）と変数は使わず、在庫は内部のデータで処理されます。
 * @type variable
 * @default -1
 *
 * @arg stock
 * @text 在庫数
 * @desc 在庫数の設定値です。
 * @default 1
 *
 * 
 * @command removeItem
 * @text アイテム削除
 * @desc ショップからアイテムを削除します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg itemId
 * @text 削除アイテム
 * @desc 削除するアイテムのIDです。
 * @type item
 * @default 1
 *
 * 
 * @command removeWeapon
 * @text 武器削除
 * @desc ショップから武器を削除します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg weaponId
 * @text 削除武器
 * @desc 削除する武器のIDです。
 * @type weapon
 * @default 1
 *
 * 
 * @command removeArmor
 * @text 防具削除
 * @desc ショップから防具を削除します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg armorId
 * @text 削除防具
 * @desc 削除する防具のIDです。
 * @type armor
 * @default 1
 *
 * 
 * @command openShop
 * @text ショップを開く
 * @desc ショップを開きます。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg sort
 * @text ソートオプション
 * @desc 購買時のソートオプションです。
 * @type select
 * @option 追加した順
 * @value 0
 * @option アイテムID順、武器ID順、防具ID順
 * @value 1
 * @option カテゴリー選択中でID順
 * @value 2
 * @default 2
 *
 * 
 * @command deleteShop
 * @text ショップを削除
 * @desc ショップを削除します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * 
 * @command getNumItem
 * @text 在庫アイテム数取得
 * @desc 在庫アイテム数を変数に代入します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg itemId
 * @text アイテムID
 * @desc 取得するアイテムのIDです。
 * @type item
 * @default 1
 *
 * @arg variableId
 * @text 変数ID
 * @desc 在庫の個数を代入する変数のIDです。
 * @type variable
 * @default 1
 *
 * 
 * @command getNumWeapon
 * @text 在庫武器数取得
 * @desc 在庫武器数を変数に代入します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg weaponId
 * @text 武器ID
 * @desc 取得する武器のIDです。
 * @type weapon
 * @default 1
 *
 * @arg variableId
 * @text 変数ID
 * @desc 在庫の個数を代入する変数のIDです。
 * @type variable
 * @default 1
 *
 * 
 * @command getNumArmor
 * @text 在庫防具数取得
 * @desc 在庫防具数を変数に代入します。
 *
 * @arg shopName
 * @text ショップの名前
 * @desc ショップの名前です。数値でも構いません。
 * @default shop1
 *
 * @arg armorId
 * @text 防具ID
 * @desc 取得する防具のIDです。
 * @type armor
 * @default 1
 *
 * @arg variableId
 * @text 変数ID
 * @desc 在庫の個数を代入する変数のIDです。
 * @type variable
 * @default 1
 * 
 */

(function () {

    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    var parameters = PluginManager.parameters(pluginName);
    var StockLabel = String(parameters['Label of stock Number'] || '在庫数');
    var SoldOutLabel = String(parameters['Label of sold out'] || '売り切れ');
    var DisplayOption1 = parameters['Display option'] === 'true';
    var Option1Space = Number(parameters['Display option space']);

    PluginManager.registerCommand(pluginName, "makeShop", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        $gameSystem.supponSSmakeShop(args);
    });

    PluginManager.registerCommand(pluginName, "addItem", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 0);
        $gameSystem.supponSSaddGoods(args);
    });

    PluginManager.registerCommand(pluginName, "addWeapon", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 1);
        $gameSystem.supponSSaddGoods(args);
    });

    PluginManager.registerCommand(pluginName, "addArmor", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 2);
        $gameSystem.supponSSaddGoods(args);
    });

    PluginManager.registerCommand(pluginName, "removeItem", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 0);
        $gameSystem.supponSSremoveGoods(args);
    });

    PluginManager.registerCommand(pluginName, "removeWeapon", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 1);
        $gameSystem.supponSSremoveGoods(args);
    });

    PluginManager.registerCommand(pluginName, "removeArmor", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 2);
        $gameSystem.supponSSremoveGoods(args);
    });

    PluginManager.registerCommand(pluginName, "deleteShop", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        $gameSystem.supponSSdeleteShop(args);
    });

    PluginManager.registerCommand(pluginName, "openShop", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        $gameSystem.supponSSopenShop(args);
    });

    PluginManager.registerCommand(pluginName, "getNumItem", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 0);
        $gameSystem.supponSSgetNumItem(args);
    });

    PluginManager.registerCommand(pluginName, "getNumWeapon", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 1);
        $gameSystem.supponSSgetNumItem(args);
    });

    PluginManager.registerCommand(pluginName, "getNumArmor", arr => {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.splice(1, 0, 2);
        $gameSystem.supponSSgetNumItem(args);
    });

    Game_System.prototype.supponSScheckData = function () {
        this._supponSS = this._supponSS || [];
    }

    Game_System.prototype.supponSSmakeShop = function (args) {
        this.supponSScheckData();
        var redundancy = this._supponSS.some(function (element) {
            return element[0] === args[0];
        })
        if (redundancy) { return };
        if (!args[1]) { args[1] = 1 };
        this._supponSS.push([args[0], [], args[1]]);//[shopid, goods, shoptype]
    }

    Game_System.prototype.supponSSaddGoods = function (args) {
        var shop = this.supponSSsearchShop(args);
        args.shift();
        args.splice(2, 0, 0, 0);
        if (shop) {
            var redundancy = false;
            shop[1].forEach(function (element) {
                if (element[0] == args[0] && element[1] == args[1]) {
                    element = args;
                    redundancy = true;
                }
            })
            if (args[5]) {
                args[4] > 0 ? $gameVariables.setValue(Number(args[4]), Number(args[5])) : 0;
            } else {
                args[5] = 0;
            }
            if (!redundancy) { shop[1].push(args) }
        }
    }

    Game_System.prototype.supponSSremoveGoods = function (args) {
        var shop = this.supponSSsearchShop(args);
        if (!shop) { return };
        shop[1] = shop[1].filter(function (element) {
            return !(args[1] == element[0] && args[2] == element[1]);
        })
    }

    Game_System.prototype.supponSSsearchShop = function (args) {
        this.supponSScheckData();
        var shop = null;
        this._supponSS.forEach(function (element) {
            if (args[0] === element[0]) { shop = element }
        })
        if (!shop) {
            console.log('Not exist shop of ' + args[0] + ' !!');
        }
        return shop;
    }

    Game_System.prototype.supponSSdeleteShop = function (args) {
        this._supponSS = this._supponSS.filter(function (element) {
            return !(element[0] == args[0]);
        })
    }

    Game_System.prototype.supponSSopenShop = function (args) {
        var shop = this.supponSSsearchShop(args);
        if (shop) {
            SceneManager.push(Scene_supponSSshop);
            var purchaseOnly = shop[2] == 0;
            var sortType = args[1];
            SceneManager.prepareNextScene(shop, purchaseOnly, sortType);
        }
    }

    Game_System.prototype.supponSSgetNumItem = function (args) {
        if (!args[2]) { return }
        var shop = this.supponSSsearchShop(args)
        var goodsElement = null;
        if (shop) {
            goodsElement = shop[1].find(function (element) {
                return element[0] == args[1] && element[1] == args[2];
            })
        }
        if (goodsElement) {
            if (Number(goodsElement[4]) > 0) {
                var n = $gameVariables.value(goodsElement[4]);
            } else {
                var n = goodsElement[5];
            }
            $gameVariables.setValue(Number(args[3]), Number(n));
        } else {
            $gameVariables.setValue(Number(args[3]), 0);
        }
    }

    function Scene_supponSSshop() {
        this.initialize.apply(this, arguments);
    };

    SceneManager.isSupponSS = function () {
        return this._scene.constructor === Scene_supponSSshop;
    }

    Scene_supponSSshop.prototype = Object.create(Scene_Shop.prototype);
    Scene_supponSSshop.prototype.constructor = Scene_supponSSshop;

    Scene_supponSSshop.prototype.initialize = function () {
        Scene_Shop.prototype.initialize.call(this);
        this._trade = '';// 'buy' or 'sell';
    };

    Scene_supponSSshop.prototype.prepare = function (shop, purchaseOnly, sortType) {
        this._shop = shop;
        this._sortTyep = sortType;
        this._originalGoods = this._shop[1];
        this._goods = this._shop[1];
        this._purchaseOnly = purchaseOnly;
        this._item = null;
    };

    Scene_supponSSshop.prototype.sortGoods = function () {
        this._goods = [];
        if (this._sortTyep == 1) {
            for (let i = 0; i < this._originalGoods.length; i++) {
                this._goods.push(this._originalGoods[i]);
            }
            this._goods.sort(function (a, b) {
                return a[0] - b[0] || a[0] == b[0] && a[1] - b[1]
            })
        } else if (this._sortTyep == 2) {
            const type = ["item", "weapon", "armor", "keyItem"].indexOf(this._categoryWindow.currentSymbol());  //Dark Plasma 2021.12.11
            // var type = this._categoryWindow.index();
            this._goods = this._originalGoods.filter(function (element) {
                return (element[0] == type);
            })
            this._goods.sort(function (a, b) { return a[1] - b[1] })
        } else {
            this._goods = this._originalGoods;
        }
        this._buyWindow._shopGoods = this._goods;
    }

    Scene_supponSSshop.prototype.commandBuy = function () {
        this._trade = 'buy';
        if (this._sortTyep == 2) {
            // this._categoryWindow._list[3].enabled = false;//大事なもの選択不可   MZ対策
            Window_Selectable.prototype.refresh.call(this._categoryWindow);
            this._categoryWindow.setItemWindow(null);
            this._categoryWindow.show();
            this._categoryWindow.activate();
            return;
        }
        this.sortGoods();
        Scene_Shop.prototype.commandBuy.call(this);
    };

    Scene_supponSSshop.prototype.onCategoryOk = function () {
        if (this._trade == 'sell') {
            Scene_Shop.prototype.onCategoryOk.call(this);
            return;
        }
        this._categoryWindow.hide();
        this.sortGoods();
        this._buyWindow.select(0);
        Scene_Shop.prototype.commandBuy.call(this);
    };

    Scene_supponSSshop.prototype.onCategoryCancel = function () {
        if (this._trade == 'sell') {
            Scene_Shop.prototype.onCategoryCancel.call(this);
        } else {
            this._categoryWindow.hide();
            this._categoryWindow.deactivate();
            Scene_Shop.prototype.onBuyCancel.call(this);
        }
    };

    Scene_supponSSshop.prototype.onBuyCancel = function () {
        if (this._sortTyep != 2) {
            Scene_Shop.prototype.onBuyCancel.call(this);
            return;
        }
        this._dummyWindow.show();
        this._buyWindow.hide();
        this._statusWindow.hide();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
        this._categoryWindow.show();
        this._categoryWindow.activate();
    };

    Scene_supponSSshop.prototype.commandSell = function () {
        this._trade = 'sell';
        // this._categoryWindow._list[3].enabled = true;//大事なもの選択可  MZ対策
        Window_Selectable.prototype.refresh.call(this._categoryWindow);
        this._categoryWindow.setItemWindow(this._sellWindow);
        Scene_Shop.prototype.commandSell.call(this);
    };

    Scene_supponSSshop.prototype.stockNumber = function () {
        if (this._trade == 'buy') {
            return this._buyWindow.stockNumber();
        } else if (this._trade == 'sell') {
            var goodsElement = this.goodsElement();
            if (goodsElement) {
                if (goodsElement[4] > 0) {
                    return $gameVariables.value(Number(goodsElement[4]));
                } else if (goodsElement[4] == -1) {
                    return goodsElement[5];
                }
            } else {
                return null;
            }
        }
    }

    Scene_supponSSshop.prototype.stockId = function () {
        if (this._trade == 'buy') {
            return this._buyWindow.stockId();
        } else if (this._trade == 'sell') {
            var goodsElement = this.goodsElement()
            if (goodsElement) {
                if (goodsElement[4] > 0) {
                    return goodsElement[4];
                }
            }
        }
    }

    Scene_supponSSshop.prototype.goodsElement = function () {
        if (this._trade == 'buy') {
            return this._goods[this._buyWindow.index()];
        } else if (this._trade == 'sell') {
            return this.searchGoodsElement();
        }
    }

    Scene_supponSSshop.prototype.searchGoodsElement = function () {
        var type = this.itemTypeAndId()[0];
        var id = this.itemTypeAndId()[1];
        var goodsElement = null;
        this._originalGoods.forEach(function (element) {
            if (element[0] == type && element[1] == id) {
                goodsElement = element;
            }
        })
        return goodsElement;
    }

    Scene_supponSSshop.prototype.itemTypeAndId = function () {
        if (DataManager.isItem(this._item)) {
            var type = 0;
        } else if (DataManager.isWeapon(this._item)) {
            var type = 1;
        } else if (DataManager.isArmor(this._item)) {
            var type = 2;
        } else {
            var type = null;
        }
        return [type, (this._item ? this._item.id : null)];
    }

    Scene_supponSSshop.prototype.makeGoodsElement = function () {
        var type = Number(this.itemTypeAndId()[0]);
        var id = Number(this.itemTypeAndId()[1]);
        return [type, id, 0, 0, -1, 0];
    }

    Scene_supponSSshop.prototype.doBuy = function (number) {
        Scene_Shop.prototype.doBuy.call(this, number);
        this.processStockBuy(number);
    };

    Scene_supponSSshop.prototype.processStockBuy = function (number) {
        var element = this.goodsElement();
        if (this.stockId() > 0) {
            $gameVariables.setValue(this.stockId(), this.stockNumber() - number)
        } else if (this.stockId() == -1) {
            var lastStock = element[5];
            element[5] = lastStock - number;
        }
    }

    Scene_supponSSshop.prototype.maxBuy = function () {
        var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
        max = Math.min(max, this.stockNumber());
        var price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

    Scene_supponSSshop.prototype.doSell = function (number) {
        $gameParty.gainGold(number * this.sellingPrice());
        $gameParty.loseItem(this._item, number);
        this.processStockSell(number);
    };

    Scene_supponSSshop.prototype.processStockSell = function (number) {
        var goodsElement = this.goodsElement();
        if (goodsElement) {
            if (goodsElement[4] > 0) {
                var lastNumber = $gameVariables.value(goodsElement[4]);
                $gameVariables.setValue(goodsElement[4], lastNumber + number);
            } else if (goodsElement[4] == -1) {
                goodsElement[5] = Number(goodsElement[5]) + number;
            }
        } else if (this._shop[2] == 2) {
            goodsElement = this.makeGoodsElement();
            goodsElement[5] = number;
            this._originalGoods.push(goodsElement);
            this.sortGoods();
        }
    }

    Window_ShopBuy.prototype.stockId = function () {
        if (this._shopGoods.length > 0) {
            return this._shopGoods[this._index][4];
        } else {
            return null
        }
    };

    Window_ShopBuy.prototype.stockNumber = function () {
        if (this.stockId() > 0) {
            return $gameVariables.value(this.stockId());
        } else if (this.stockId() == -1) {
            return this._shopGoods[this._index][5];
        }
    };

    var _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
    Window_ShopBuy.prototype.drawItem = function (index) {
        if (!SceneManager.isSupponSS()) {
            _Window_ShopBuy_drawItem.call(this, index);
            return;
        }
        var item = this._data[index];
        var rect = this.itemRect(index);
        var priceWidth = 96;
        rect.width -= this.textPadding();
        if (this._shopGoods[index][4] > 0) {
            var stockNumber = $gameVariables.value(this._shopGoods[index][4]);
        } else if (this._shopGoods[index][4] == -1) {
            var stockNumber = this._shopGoods[index][5]
        }
        this.changePaintOpacity(this.isEnabled(item) && stockNumber > 0);
        this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
        var text = (stockNumber > 0 ? this.price(item) : SoldOutLabel);
        this.drawText(text, rect.x + rect.width - priceWidth,
            rect.y, priceWidth, 'right');
        this.changePaintOpacity(true);
    };

    var _Window_ShopBuy_isCurrentItemEnabled = Window_ShopBuy.prototype.isCurrentItemEnabled;
    Window_ShopBuy.prototype.isCurrentItemEnabled = function () {
        if (SceneManager.isSupponSS()) {
            return (_Window_ShopBuy_isCurrentItemEnabled.call(this) && this.stockNumber() > 0)
        } else {
            return _Window_ShopBuy_isCurrentItemEnabled.call(this)
        }
    };

    var _Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
    Window_ShopBuy.prototype.updateHelp = function () {
        if (this._statusWindow && SceneManager.isSupponSS()) {
            this._statusWindow.setStock(this.stockNumber());
        }
        _Window_ShopBuy_updateHelp.call(this);
    };

    var _Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
    Window_ShopSell.prototype.updateHelp = function () {
        if (this._statusWindow && SceneManager.isSupponSS()) {
            SceneManager._scene._item = this.item();
            this._statusWindow.setStock(SceneManager._scene.stockNumber());
        }
        _Window_ShopSell_updateHelp.call(this);
    };

    var _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function (x, y, width, height) {
        this._stockNumber = null;
        _Window_ShopStatus_initialize.call(this, x, y, width, height);
    };

    Window_ShopStatus.prototype.setStock = function (number) {
        this._stockNumber = number;
    };

    Window_ShopStatus.prototype.stockNumber = function () {
        return SceneManager._scene.stockNumber();
    }

    var _Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
    Window_ShopStatus.prototype.drawPossession = function (x, y) {
        if (DisplayOption1) {
            this.drawPossession2(x, y);
        } else {
            _Window_ShopStatus_drawPossession.call(this, x, y);
        }
    };

    Window_ShopStatus.prototype.isNeedDrawStock = function () {
        return (SceneManager.isSupponSS() && this._stockNumber);
    }

    Window_ShopStatus.prototype.drawStockNumber = function (x, y, width) {
        var possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(StockLabel, x, y, width - possessionWidth);
        this.resetTextColor();
        var n = this._stockNumber || 0;
        this.drawText(this._stockNumber, x, y, width, 'right');
    }

    Window_ShopStatus.prototype.drawPossession2 = function (x, y) {
        var width = (this.contents.width - x) / 2;
        var possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText($gameParty.numItems(this._item), x, y, width, 'right');
        if (this.isNeedDrawStock()) {
            this.drawStockNumber(x + width + Option1Space, y, width - Option1Space);
        }
    }

    var _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function () {
        _Scene_Shop_onSellOk.call(this);
        if (this._statusWindow && SceneManager.isSupponSS()) {
            this._statusWindow.setStock(this._statusWindow.stockNumber());
            this._statusWindow.refresh();
        }
    };

    // MVJoint

    Window_Base.prototype.textPadding = function () {
        return 6;
    };

})();
