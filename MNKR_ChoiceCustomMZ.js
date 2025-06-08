/*
 * --------------------------------------------------
 * MNKR_ChoiceCustomMZ.js
 * Ver.0.1.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChoiceCustomMZ.js
 * @plugindesc 選択肢の列数・行数・Y軸位置を変更する機能を追加します。
 * @author munokura
 *
 * @help
 * # 機能
 * 選択肢の列数・行数・Y軸位置を変更する機能を追加します。
 * イベントコマンド「プラグインコマンド」で選択肢の表示を制御できます。
 *
 * # プラグインコマンドの使い方
 *
 * イベントコマンド「プラグインコマンド」を開き、
 * このプラグイン名「MNKR_ChoiceCustomMZ」を選択すると、
 * 以下のコマンドが表示されます。使いたい機能を選択し、引数を設定してください。
 *
 * ## 列数の設定 (SetChoiceColumns)
 * - 選択肢の列数を設定します。
 * - 引数「列数」に2以上を指定してください。
 *
 * ### 使用例：2列表示
 * プラグインコマンド：MNKR_ChoiceCustomMZ
 * コマンド名：列数の設定
 * 引数：
 * 列数: 2
 *
 * ## 行数の設定 (SetChoiceRows)
 * - 選択肢の表示行数を設定します。
 * - 引数「行数」に1以上を指定してください。
 *
 * ### 使用例：2行表示
 * プラグインコマンド：MNKR_ChoiceCustomMZ
 * コマンド名：行数の設定
 * 引数：
 * 行数: 2
 *
 * ## Y軸位置の設定 (SetChoiceYPosition)
 * - 選択肢のY軸位置を設定します。
 * - 引数「Y座標」に0以上を指定してください。
 *
 * ### 使用例：画面最上部
 * プラグインコマンド：MNKR_ChoiceCustomMZ
 * コマンド名：Y軸位置の設定
 * 引数：
 * Y座標: 0
 *
 * ## 設定のリセット (ResetChoiceSettings)
 * - すべての設定をデフォルト（1列表示など）に戻します。
 * - 場所移動後も設定は引き継がれるため、不要になった場合は
 * このコマンドでリセットしてください。
 *
 * # 注意事項
 *
 * ## Y軸位置について
 * - Y座標の値が大きすぎてウィンドウが画面外にはみ出る場合、
 * 自動的に画面最下部に調整されます。
 *
 * ## 行数と列数の組み合わせ
 * - 行数指定は、列数指定と組み合わせて使用できます。
 * - 「表示行数 × 列数」が選択肢の総数より少ない場合、
 * ウィンドウはスクロール可能になります。
 *
 * ### 使用例：2列×3行の表示（最大6個の選択肢を表示）
 * 以下の2つのプラグインコマンドを連続して実行します。
 *
 * プラグインコマンド：列数の設定 (列数: 2)
 * プラグインコマンド：行数の設定 (行数: 3)
 *
 * # 利用規約
 *
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 *
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @command SetChoiceCustom
 * @text 選択肢のカスタム設定
 * @desc 選択肢の列数・行数・Y軸位置を設定します。
 *
 * @arg rows
 * @text 行数
 * @desc 1以上の数値を指定してください。
 * @type number
 * @min 1
 * @default 6
 *
 * @arg columns
 * @text 列数
 * @desc 1以上の数値を指定してください。
 * @type number
 * @min 1
 * @default 2
 *
 * @arg yPosition
 * @text Y座標
 * @desc 0以上の数値を指定してください。
 * @type number
 * @min 0
 * @default 0
 *
 * @command ResetChoiceSettings
 * @text 設定のリセット
 * @desc 全ての設定をデフォルトに戻します。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    // 設定値を保持する変数
    const settings = {
        columns: 0,
        rows: 0,
        yPosition: -1
    };

    // 設定をリセットする関数
    function resetSettings() {
        settings.columns = 0;
        settings.rows = 0;
        settings.yPosition = -1;
    }

    // --- プラグインコマンドの登録 ---
    PluginManager.registerCommand(pluginName, "SetChoiceCustom", args => {
        settings.columns = Number(args.columns);
        settings.rows = Number(args.rows);
        settings.yPosition = Number(args.yPosition);
    });

    PluginManager.registerCommand(pluginName, "ResetChoiceCustom", args => {
        resetSettings();
    });

    // --- ニューゲーム、ロード時に設定をリセット ---
    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        resetSettings();
    };

    const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function () {
        _Game_System_onAfterLoad.call(this);
        resetSettings();
    };


    // --- 選択肢ウィンドウの拡張 ---
    const _Window_ChoiceList_maxCols = Window_ChoiceList.prototype.maxCols;
    Window_ChoiceList.prototype.maxCols = function () {
        return settings.columns > 0 ? settings.columns : _Window_ChoiceList_maxCols.call(this);
    };

    const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
    Window_ChoiceList.prototype.windowWidth = function () {
        if (settings.columns <= 0) {
            return _Window_ChoiceList_windowWidth.call(this);
        }
        const width = this.maxChoiceWidth() * settings.columns + this.padding * 2;
        return Math.min(width, Graphics.boxWidth);
    };

    const _Window_ChoiceList_windowHeight = Window_ChoiceList.prototype.windowHeight;
    Window_ChoiceList.prototype.windowHeight = function () {
        if (settings.rows > 0) {
            return this.fittingHeight(settings.rows);
        }
        if (settings.columns <= 0) {
            return _Window_ChoiceList_windowHeight.call(this);
        }
        return this.fittingHeight(Math.ceil(this.numVisibleRows() / settings.columns));
    };

    const _Window_ChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
    Window_ChoiceList.prototype.numVisibleRows = function () {
        return settings.rows > 0 ? settings.rows : _Window_ChoiceList_numVisibleRows.call(this);
    };

    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
        _Window_ChoiceList_updatePlacement.call(this);
        if (settings.yPosition < 0) {
            return;
        }
        const maxY = Graphics.boxHeight - this.windowHeight();
        this.y = Math.min(settings.yPosition, maxY);
    };

})();