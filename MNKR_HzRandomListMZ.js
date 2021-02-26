/*
 * --------------------------------------------------
 * MNKR_HzRandomListMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*
Copyright (c) <2016> <hiz>
MITライセンスの下で公開されています。
*/

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HzRandomListMZ.js
 * @plugindesc 重複の無いランダム値リストを作成できます
 * @author hiz (改変:munokura)
 * 
 * @help
 * 特定の整数範囲の重複の無いランダム値を作成し、一つずつ取得できます。
 * 例えば１から６のランダム値を作成した場合、
 * １から６の値を重複なくランダムな順番で取得することができます。
 * 夜店のくじ等の（店がズルしてなければ）引き続ければいつかは当たるくじや、
 * ランダム値を使いたいけど同じ値が重複することは避けたい場合等に使えます。
 * ※ ランダム値の状態はセーブファイルに保存されます。
 *  
 * プラグイン コマンド:
 *   hzrandomCreate id min max loop
 * # min~max(max含む)のID[id]の乱数リストを作成します
 * # loopは任意設定です。（1:LOOP ON それ以外：LOOP OFF）
 *
 *   hzrandomNext id varNo
 * # ID[id]の乱数リストの次の要素を取得して、変数[varNo]にセットします。
 * # 乱数リストの要素を全て取得した場合、
 * # LOOP ONの場合、最初の要素から取得し直します。
 * # LOOP OFFの場合、乱数リストをシャッフルします。
 *
 *   hzrandomShuffle id
 * # ID[id]の乱数リストをシャッフルします。
 *
 * 使用例）
 *   hzrandomCreate 1 1 3 false
 * -> 1~3の乱数リスト（ID=1）を作成（LOOP OFF）
 *    例） [3, 1, 2]
 * 
 *   hzrandomNext 1 1
 * -> 乱数リストの次の要素（上記例では3）を取得し、変数1に代入
 *   hzrandomNext 1 1
 * 
 * -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 *   hzrandomNext 1 1
 * 
 * -> 乱数リストの次の要素（上記例では2）を取得し、変数1に代入
 *   hzrandomNext 1 1
 * 
 * -> 乱数リストの要素を全て取得したため、乱数リストをシャッフル
 *    例） [2, 1, 3]
 *    乱数リストの次の要素（上記例では2）を取得し、変数1に代入
 * 
 *   hzrandomNext 1 1
 * -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 * 
 *   hzrandomShuffle 1
 * -> 乱数リストをシャッフル
 *    例） [1, 3, 2]
 * 
 *   hzrandomNext 1 1
 * -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command hzrandomCreate
 * @text 乱数リスト作成
 * @desc 乱数リストを作成します。
 *
 * @arg id
 * @text 乱数リストID
 * @desc 乱数リストを管理するIDを指定します。
 * @type Number
 * @default 1
 * 
 * @arg min
 * @text 最小値
 * @desc 乱数リスト内の最小値を指定します。
 * @type Number
 * @default 1
 * 
 * @arg max
 * @text 最大値
 * @desc 乱数リスト内の最大値を指定します。
 * @type Number
 * @default 3
 * 
 * @arg loop
 * @text ループ
 * @desc 乱数リストが全て引き終わった後、最初からやり直します。
 * @type boolean
 * @on ループする
 * @off ループしない
 * @default false
 * 
 * 
 * @command hzrandomNext
 * @text 乱数取得
 * @desc 乱数をリストから取得して、変数に代入します。
 *
 * @arg id
 * @text 乱数リストID
 * @desc 乱数リストを管理するIDを指定します。
 * @type Number
 * @default 1
 * 
 * @arg varNo
 * @text 変数ID
 * @desc 引いた値を代入する変数を指定。
 * @type variable
 * @default 0
 * 
 * 
 * @command hzrandomShuffle
 * @text シャッフル
 * @desc 乱数リストをシャッフルします。
 *
 * @arg id
 * @text 乱数リストID
 * @desc 乱数リストを管理するIDを指定します。
 * @type Number
 * @default 1
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    function convertEscape(txt) { return Window_Base.prototype.convertEscapeCharacters(txt) };

    PluginManager.registerCommand(pluginName, "hzrandomCreate", arr => {
        let args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.unshift("CREATE");
        // 「HZRANDOM CREATE」：ランダムリストの作成
        let id = Number(convertEscape(args[1]));
        let min = Number(convertEscape(args[2]));
        let max = Number(convertEscape(args[3]));
        let loop = args[4] != null ? String(convertEscape(args[4])) === 'true' : false;
        $gameSystem.putHzRandomList(id, new HzRandomList(min, max, loop));
    });

    PluginManager.registerCommand(pluginName, "hzrandomNext", arr => {
        let args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.unshift("NEXT");
        // 「HZRANDOM NEXT」：ランダムリストの次の要素を取得
        let id = Number(convertEscape(args[1]));
        let varNo = Number(convertEscape(args[2]));
        let nextValue = $gameSystem.getNextHzRandomList(id);
        if (nextValue != null) {
            $gameVariables.setValue(varNo, nextValue);
        }
    });

    PluginManager.registerCommand(pluginName, "hzrandomShuffle", arr => {
        let args = Object.entries(arr).map(([key, value]) => `${value}`);
        args.unshift("SHUFFLE");
        // 「HZRANDOM NEXT」：ランダムリストの再シャッフル
        let id = Number(convertEscape(args[1]));
        $gameSystem.shuffleHzRandomList(id);
    });

    //
    // ランダムリストはGame_Systemに保管。（セーブファイルに保存するため）
    //
    Game_System.prototype.putHzRandomList = function (id, list) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        this._hzrandomList[id] = list;
    };

    Game_System.prototype.getNextHzRandomList = function (id) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        if (!this._hzrandomList[id]) {
            return null;
        }
        return HzRandomList.next(this._hzrandomList[id]);
    };

    Game_System.prototype.shuffleHzRandomList = function (id) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        if (!this._hzrandomList[id]) {
            return;
        }
        HzRandomList.shuffle(this._hzrandomList[id]);
    };

    function HzRandomList() {
        this.initialize.apply(this, arguments);
    }

    /**
    * 初期化処理
    * @returns {Array|HzRandomList_L1.HzRandomList._list}
    */
    HzRandomList.prototype.initialize = function (min, max, loop) {
        this._min = min;
        this._max = max;
        this._loop = loop;
        if (this._min > this._max) {
            let tmp = this._min;
            this._min = this._max;
            this._max = tmp;
        }
        // min~max（max含む）の配列を作成
        this._list = new Array(this._max - this._min + 1);
        for (let i = 0; i < this._max - this._min + 1; i++) {
            this._list[i] = this._min + i;
        }
        // 配列のシャッフル
        shuffle(this._list);
        // 次回取得時の配列のINDEX設定
        this._index = 0;
    };

    /**
    * ランダムリストの次の要素を返す
    * @returns {Array}
    */
    HzRandomList.next = function (list) {
        if (list._index >= list._list.length) {
            if (!list._loop) {
                // ループ設定OFFの場合、配列を再シャッフル
                shuffle(list._list);
            }
            // INDEXを0に戻す
            list._index = 0;
        }
        // ランダムリストの要素を取得
        let value = list._list[list._index];
        // インデックスをカウントアップ
        list._index++;
        return value;
    };

    /**
    * 配列を再度シャッフルする
    * @returns {undefined}
    */
    HzRandomList.shuffle = function (list) {
        // 配列を再シャッフル
        shuffle(list._list);
        // INDEXを0に戻す
        list._index = 0;
    };

    /**
    * 配列のシャッフル用関数
    * @param {type} array
    * @returns {unresolved}
    */
    function shuffle(array) {
        let n = array.length, t, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }

})();