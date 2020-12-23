/*
 * --------------------------------------------------
 * MNKR_BB_FesHensuuWindowMZ Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// BB_FesHensuuWindow.js
// Copyright (c) 2017 BB ENTERTAINMENT
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BB_FesHensuuWindowMZ.js
 * @plugindesc 変数の名前と値を表示するウィンドウを追加するプラグイン
 * @author ビービー（改変 munokura）
 *
 * @help
 * ◆概要
 * RPGツクールフェスの機能の一つである
 * 変数の名前と値を表示するウィンドウを追加するプラグインです。
 * このプラグインでは最大4つまで変数の名前と値を表示することができます。
 * 
 * ◆使用方法
 * プラグインパラメータ【A_VariableId】～【D_VariableId】で指定した変数に
 * 格納されている数値で表示する変数を切り替えることができます。
 * 使用例：
 * 【A_VariableId】で1を指定した場合に変数1の値が5の時
 * ウィンドウの一番上に変数5の名前と値が表示されます。
 * 
 * ◆プラグインパラメータの説明
 * 【ShowWindowSwitch】
 * ウィンドウを表示するスイッチのIDを指定。
 * ここで指定したIDのスイッチがONのときウィンドウが表示されます。
 * 
 * 【A_VariableId】
 * 表示枠A(一番上)に表示する変数を指定する変数のID
 * ここで指定したIDの変数に格納されている数値が実際に表示される変数のIDです。
 * 
 * 【B_VariableId】
 * 表示枠B(上から二番目)に表示する変数を指定する変数のID
 * ここで指定したIDの変数に格納されている数値が実際に表示される変数のIDです。
 * 
 * 【C_VariableId】
 * 表示枠C(上から三番目)に表示する変数を指定する変数のID
 * ここで指定したIDの変数に格納されている数値が実際に表示される変数のIDです。
 * 
 * 【D_VariableId】
 * 表示枠D(一番下)に表示する変数を指定する変数のID
 * ここで指定したIDの変数に格納されている数値が実際に表示される変数のIDです。
 * 
 * 【FontSize】
 * ウィンドウに表示される変数の名前と値のフォントサイズを指定。
 * 
 * 【NameFontColor】
 * ウィンドウに表示される変数の名前のフォントカラーを指定。
 * 
 * 【UnderLineOpacity】
 * 変数の下に表示する線の透明度を指定。(0で非表示)
 * 
 * 【BetweenNameAndValue】
 * 変数の名前と値の間に表示する記号を指定。(空白で非表示)
 * 
 * 【FesWindowX】
 * 変数表示ウィンドウの表示位置のX座標を指定。
 *
 * 【FesWindowY】
 * 変数表示ウィンドウの表示位置のX座標を指定。
 *
 * 【ShowMaxItem】
 * 変数表示ウィンドウの行数(高さ)を指定。
 * ※ゲーム中に変更することはできません。
 * 
 * 
 * このプラグインについて
 *   ビービー氏がRPGツクールMV用に作成されたものを
 *   ムノクラがRPGツクールMZ用に移植したものです。
 *   原作者への連絡はお控えください。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param ShowWindowSwitch
 * @text ウィンドウ表示スイッチID
 * @type switch
 * @desc ウィンドウを表示するスイッチのIDを指定。
 * 初期値: 1
 * @default 1
 * 
 * @param A_VariableId
 * @text 枠A変数ID
 * @type variable
 * @desc 表示枠Aに表示する変数を指定する変数のIDを指定。
 * 初期値: 0
 * @default 0
 * 
 * @param B_VariableId
 * @text 枠B変数ID
 * @type variable
 * @desc 表示枠Bに表示する変数を指定する変数のIDを指定。
 * 初期値: 0
 * @default 0
 * 
 * @param C_VariableId
 * @text 枠C変数ID
 * @type variable
 * @desc 表示枠Cに表示する変数を指定する変数のIDを指定。
 * 初期値: 0
 * @default 0
 * 
 * @param D_VariableId
 * @text 枠D変数ID
 * @type variable
 * @desc 表示枠Dに表示する変数を指定する変数のIDを指定。
 * 初期値: 0
 * @default 0
 * 
 * @param FontSize
 * @text フォントサイズ
 * @desc フォントサイズを指定。
 * 初期値: 26
 * @default 26
 * 
 * @param NameFontColor
 * @text 変数名の文字色
 * @type number
 * @min 0
 * @max 31
 * @desc 変数の名前のフォントカラーを指定。
 * 初期値: 0（白）
 * @default 0
 * 
 * @param UnderLineOpacity
 * @text 変数下線の透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 変数の下に表示する線の透明度を指定。(0で非表示)
 * 初期値: 96
 * @default 96
 * 
 * @param BetweenNameAndValue
 * @text 変数名と値区切り記号
 * @type string
 * @desc 変数の名前と値の間に表示する記号を指定。(空白で非表示)
 * 初期値: :
 * @default :
 * 
 * 
 * @param FesWindowX
 * @text ウィンドウX座標
 * @desc 変数表示ウィンドウの表示位置のX座標
 * 初期値: 0
 * @default 0
 * 
 * @param FesWindowY
 * @text ウィンドウY座標
 * @desc 変数表示ウィンドウの表示位置のY座標。タッチUIと重ならないように配置してください。初期値: 64
 * @default 64
 * 
 * @param ShowMaxItem
 * @text ウィンドウ行数
 * @type number
 * @min 1
 * @max 4
 * @desc 変数表示ウィンドウの行数を指定。
 * 初期値: 4
 * @default 4
 */

(function () {
    'use strict';
    //-----------------------------------------------------------------------------
    // プラグインパラメータ管理
    //-----------------------------------------------------------------------------
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const BBFSWSID = Number(parameters['ShowWindowSwitch']);
    const BBFAV = Number(parameters['A_VariableId']);
    const BBFBV = Number(parameters['B_VariableId']);
    const BBFCV = Number(parameters['C_VariableId']);
    const BBFDV = Number(parameters['D_VariableId']);
    const BBFFS = Number(parameters['FontSize']);
    const BBFFC = Number(parameters['NameFontColor']);
    const BBFULO = Number(parameters['UnderLineOpacity']);
    const BBFBNAV = String(parameters['BetweenNameAndValue']);
    const BBFWX = Number(parameters['FesWindowX']);
    const BBFWY = Number(parameters['FesWindowY']);
    const BBFSMI = Number(parameters['ShowMaxItem']);

    const _Scene_map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        this._FesWindow = new Window_Fes();
        this.addWindow(this._FesWindow);
        _Scene_map_createAllWindows.call(this);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        this._FesWindow.setText();
        // 指定スイッチで起動
        if ($gameSwitches.value(BBFSWSID)) {
            this._FesWindow.show();
        } else {
            this._FesWindow.hide();
        }
    };

    // Window_Fes
    function Window_Fes() {
        this.initialize.apply(this, arguments);
    };

    Window_Fes.prototype = Object.create(Window_Base.prototype);
    Window_Fes.prototype.constructor = Window_Fes;

    Window_Fes.prototype.initialize = function () {
        let x = BBFWX;
        let y = BBFWY;
        let width = Graphics.width / 2;
        let height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    Window_Fes.prototype.windowHeight = function () {
        return this.fittingHeight(BBFSMI);
    };

    Window_Fes.prototype.setText = function (str) {
        this._text = str;
        this.refresh();
    };

    // ウィンドウに載せる内容
    Window_Fes.prototype.refresh = function () {
        this.contents.clear();
        this.contents.fontSize = BBFFS;//追記
        let width1 = 26 * 9;
        let width2 = 26 * 4;
        let x = Graphics.width / 2 - width2 - 36;
        let BY = 0;
        let CY = 0;
        let DY = 0;
        if (BBFAV) {
            this.changeTextColor(this.textColor(BBFFC));
            this.drawText($dataSystem.variables[BBFAV], 0, 0, width1);
            this.resetTextColor();
            this.drawText(BBFBNAV, width1 + 11, 0, 13);
            this.drawText($gameVariables.value(BBFAV), x, 0, width2, 'right');
            this.contents.paintOpacity = BBFULO;
            this.contents.fillRect(0, this.lineHeight() - 2, Graphics.width / 2, 2, this.normalColor());
            this.contents.paintOpacity = 255;
            BY += this.lineHeight();
            CY += this.lineHeight();
            DY += this.lineHeight();
        }
        if (BBFBV) {
            this.changeTextColor(this.textColor(BBFFC));
            this.drawText($dataSystem.variables[BBFBV], 0, BY, width1);
            this.resetTextColor();
            this.drawText(BBFBNAV, width1 + 11, BY, 13);
            this.drawText($gameVariables.value(BBFBV), x, BY, width2, 'right');
            this.contents.paintOpacity = BBFULO;
            this.contents.fillRect(0, this.lineHeight() + BY - 2, Graphics.width / 2, 2, this.normalColor());
            this.contents.paintOpacity = 255;
            CY += this.lineHeight();
            DY += this.lineHeight();
        }
        if (BBFCV) {
            this.changeTextColor(this.textColor(BBFFC));
            this.drawText($dataSystem.variables[BBFCV], 0, CY, width1);
            this.resetTextColor();
            this.drawText(BBFBNAV, width1 + 11, CY, 13);
            this.drawText($gameVariables.value(BBFCV), x, CY, width2, 'right');
            this.contents.paintOpacity = BBFULO;
            this.contents.fillRect(0, this.lineHeight() + CY - 2, Graphics.width / 2, 2, this.normalColor());
            this.contents.paintOpacity = 255;
            DY += this.lineHeight();
        }
        if (BBFDV) {
            this.changeTextColor(this.textColor(BBFFC));
            this.drawText($dataSystem.variables[BBFDV], 0, DY, width1);
            this.resetTextColor();
            this.drawText(BBFBNAV, width1 + 11, DY, 13);
            this.drawText($gameVariables.value(BBFDV), x, DY, width2, 'right');
            this.contents.paintOpacity = BBFULO;
            this.contents.fillRect(0, this.lineHeight() + DY - 2, Graphics.width / 2, 2, this.normalColor());
            this.contents.paintOpacity = 255;
        }
    };

    // ウィンドウの余白
    Window_Fes.prototype.standardPadding = function () {
        return 18;
    };

    //-----------------------------------------------------------------------------
    // MV Joint
    //-----------------------------------------------------------------------------

    function isRect(value) {
        return (typeof value) === "object";
    }

    function rectlize(x, y, w, h) {
        if (isRect(x)) {
            return x;
        }
        const newRect = new Rectangle(x, y, w, h);
        return newRect;
    }

    const Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, w, h) {
        const rect = rectlize(x, y, w, h);
        Window_Base_initialize.call(this, rect);
    };

    const colorList = {
        crisisColor: ColorManager.crisisColor,
        ctGaugeColor1: ColorManager.ctGaugeColor1,
        ctGaugeColor2: ColorManager.ctGaugeColor2,
        damageColor: ColorManager.damageColor,
        deathColor: ColorManager.deathColor,
        deathColor: ColorManager.dimColor1,
        dimColor2: ColorManager.dimColor2,
        gaugeBackColor: ColorManager.gaugeBackColor,
        hpColor: ColorManager.hpColor,
        hpGaugeColor1: ColorManager.hpGaugeColor1,
        hpGaugeColor2: ColorManager.hpGaugeColor2,
        itemBackColor1: ColorManager.itemBackColor1,
        itemBackColor2: ColorManager.itemBackColor2,
        mpColor: ColorManager.mpColor,
        mpCostColor: ColorManager.mpCostColor,
        mpGaugeColor1: ColorManager.mpGaugeColor1,
        mpGaugeColor2: ColorManager.mpGaugeColor2,
        normalColor: ColorManager.normalColor,
        outlineColor: ColorManager.outlineColor,
        paramchangeTextColor: ColorManager.paramchangeTextColor,
        pendingColor: ColorManager.pendingColor,
        powerDownColor: ColorManager.powerDownColor,
        powerUpColor: ColorManager.powerUpColor,
        systemColor: ColorManager.systemColor,
        textColor: ColorManager.textColor,
        tpColor: ColorManager.tpColor,
        tpCostColor: ColorManager.tpCostColor,
        tpGaugeColor1: ColorManager.tpGaugeColor1,
        tpGaugeColor2: ColorManager.tpGaugeColor2
    };

    for (const key in colorList) {
        if (colorList.hasOwnProperty(key)) {
            const element = colorList[key];
            Window_Base.prototype[key] = function () {
                return element.apply(this, arguments);
            };

        }
    }

})();