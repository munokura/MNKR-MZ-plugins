/*
 * --------------------------------------------------
 * MNKR_ChangeMenuSe.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_ChangeMenuSe.js
 * @plugindesc メニューを開閉するSEを変更します。
 * @author munokura
 *
 * @help
 * メニューを開閉するSEを変更します。
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param callMenuSe
 * @text メニューを開くSE
 * @desc メニューを開くSEのパラメータ
 * 初期値: {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
 * @default {"name":"Damage3","volume":"90","pitch":"100","pan":"0"}
 * @type struct<seParam>
 * 
 * @param closeMenuSe
 * @text メニューを閉じるSE
 * @desc メニューを閉じるSEのパラメータ
 * 初期値: {"name":"Dog","volume":"90","pitch":"100","pan":"0"}
 * @default {"name":"Dog","volume":"90","pitch":"100","pan":"0"}
 * @type struct<seParam>
 */

/*~struct~seParam:
 * @param name
 * @text ファイル名
 * @default
 * @require 1
 * @dir audio/se/
 * @type file
 * @desc SEのファイル名
 *
 * @param volume
 * @text 音量
 * @default 90
 * @type number
 * @max 100
 * @desc SEの音量
 *
 * @param pitch
 * @text ピッチ
 * @default 100
 * @type number
 * @min 50
 * @max 150
 * @desc SEのピッチ
 *
 * @param pan
 * @text 位相
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * @desc SEの位相
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_callMenuSe = JSON.parse(parameters['callMenuSe'] || '{}');
    const PRM_closeMenuSe = JSON.parse(parameters['closeMenuSe'] || '{}');

    const hasCallMenuSe = PRM_callMenuSe.name !== '';
    const hasCloseMenuSe = PRM_closeMenuSe.name !== '';

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function () {
        if (hasCallMenuSe) {
            AudioManager.playSe(PRM_callMenuSe);
            SceneManager.push(Scene_Menu);
            Window_MenuCommand.initCommandPosition();
            $gameTemp.clearDestination();
            this._mapNameWindow.hide();
            this._waitCount = 2;
        } else {
            _Scene_Map_callMenu.call(this);
        }
    };

    const _Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_MenuCommand.prototype.processCancel = function () {
        if (hasCloseMenuSe) {
            AudioManager.playSe(PRM_closeMenuSe);
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
        } else {
            _Window_Selectable_processCancel.call(this);
        }
    };

})();
