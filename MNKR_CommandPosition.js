/*
 * --------------------------------------------------
 * MNKR_CommandPosition Ver.0.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_CommandPosition.js
 * @plugindesc (試作中)メインメニューの表示位置を変更します。
 * @author munokura
 *
 * @param Command Position
 * @text メニュー位置
 * @type number
 * @min 1
 * @max 9
 * @desc メニューの表示位置を指定します。数字はテンキーの位置
 * @default 7
 *
 * @param Command Rows
 * @text メニュー行数
 * @type number
 * @desc メニューの行数を指定します。0にすると、コマンド数に併せて変動します。
 * @default 8
 * 
 * @param Status Window Hide
 * @text ステータスウィンドウ無効化
 * @type boolean
 * @on 無効化
 * @off 無効化しない
 * @desc ステータスウィンドウを無効化します。スキル、装備、ステータス、並び替えのコマンドが使えなくなります。
 * @default true
 *
 * @param Gold Window Hide
 * @text 所持金ウィンドウ非表示
 * @type boolean
 * @on 非表示
 * @off 表示
 * @desc 所持金ウィンドウを非表示にします。
 * @default true
 *
 * @help
 * 試作中です。
 * メニューの行数関連が未実装です。
 * 
 * メインメニューの表示位置を指定します。
 * 
 * ステータスウィンドウ無効化をすると、
 * スキル・装備・ステータス・並び替え
 * のコマンドが使えなく（選択するとフリーズするように）なります。
 * 
 * ステータスウィンドウを非表示にし、
 * スキル・装備・ステータス・並び替え
 * のコマンドを使用したい場合、このプラグインでは無効化せずに、
 * 他のプラグインで無効化してください。
 * 
 *
 * プラグインコマンドはありません。
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    'use strict';
    const parameters = PluginManager.parameters('MNKR_CommandPosition');
    const commandPosition = Number(parameters['Command Position'] || 7);
    const commandRows = Number(parameters['Command Rows'] || 8);
    const statusWindowHide = eval(parameters['Status Window Hide'] || "true");
    const goldWindowHide = eval(parameters['Gold Window Hide'] || "true");

    const _Scene_Menu_prototype_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function () {
        if (statusWindowHide) {
            _Scene_Menu_prototype_createStatusWindow.call(this);
            this._statusWindow.hide();
        } else {
            _Scene_Menu_prototype_createStatusWindow.call(this);
        }
    };

    Scene_Menu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        if (!goldWindowHide) {
            this.createGoldWindow();
        }
        this.createStatusWindow();
    };

    // const _Scene_Menu_prototype_commandWindowRect = Scene_Menu.prototype.commandWindowRect;
    Scene_Menu.prototype.commandWindowRect = function () {
        const padding = $gameSystem.windowPadding();
        const lineHeight = $gameSystem.mainFontSize() + padding * 2;
        // const lineHeight = 36;
        // const lineHeight = $gameSystem.mainFontSize();
        const ww = this.mainCommandWidth();
        const wh = commandRows * lineHeight - padding * 2;
        const wh2 = this.mainAreaHeight();
        let wx = 0;
        let wy = 0;

        switch (commandPosition) {
            case 1:
                wx = 0;
                wy = wh2 - wh;
                break;
            case 2:
                wx = Graphics.boxWidth / 2 - ww / 2;
                wy = wh2 - wh;
                break;
            case 3:
                wx = Graphics.boxWidth - ww;
                wy = wh2 - wh;
                break;
            case 4:
                wx = 0;
                wy = wh2 / 2 - wh / 2;
                break;
            case 5:
                wx = Graphics.boxWidth / 2 - ww / 2;
                wy = wh2 / 2 - wh / 2;
                break;
            case 6:
                wx = Graphics.boxWidth - ww;
                wy = wh2 / 2 - wh / 2;
                break;
            case 7:
                wx = 0;
                wy = this.mainAreaTop();
                break;
            case 8:
                wx = Graphics.boxWidth / 2 - ww / 2;
                wy = this.mainAreaTop();
                break;
            case 9:
                wx = Graphics.boxWidth - ww;
                wy = this.mainAreaTop();
                break;
            default:
                wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
                wy = this.mainAreaTop();
        }
        return new Rectangle(wx, wy, ww, wh);
    };

})();