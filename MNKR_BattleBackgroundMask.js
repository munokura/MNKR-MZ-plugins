/*
 * --------------------------------------------------
 * MNKR_BattleBackgroundMask.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*:
 * @target MZ MV
 * @plugindesc 戦闘シーンの背景をマスクし、ウィンドウっぽく表示できます。
 * @author munokura
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_BattleBackgroundMask.js
 *
 * @help
 * # 機能
 * 戦闘シーンの背景をマスクし、敵グループの領域のみに表示します。
 * その外側には現在のマップ画面のスナップショットが表示されます。
 * 
 * マスクの範囲・位置等はプラグインパラメータで設定してください。
 *
 * # 注意
 * - 戦闘テスト時、マップシーン以外からの戦闘開始時は、
 * スナップショットがないため、枠外は黒になります。
 *
 * # 利用規約
 * MITライセンスです。
 * https://licenses.opensource.jp/MIT/MIT.html
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param MaskSettings
 * @text マスク範囲・位置設定
 * @default
 *
 * @param maskWidth
 * @text マスクの幅
 * @parent MaskSettings
 * @type number
 * @min -1
 * @desc マスクの幅をピクセルで指定。(-1で画面幅の半分)
 * @default -1
 *
 * @param maskHeight
 * @text マスクの高さ
 * @parent MaskSettings
 * @type number
 * @min -1
 * @desc マスクの高さをピクセルで指定。(-1で画面高さの半分)
 * @default -1
 *
 * @param maskX
 * @text マスクのX座標
 * @parent MaskSettings
 * @type number
 * @min -1
 * @desc マスクのX座標(左端)をピクセルで指定。(-1で画面中央)
 * @default -1
 *
 * @param maskY
 * @text マスクのY座標
 * @parent MaskSettings
 * @type number
 * @min -1
 * @desc マスクのY座標(上端)をピクセルで指定。(-1で画面中央)
 * @default 48
 *
 * @param FrameSettings
 * @text 枠設定
 * @default
 *
 * @param frameColor
 * @text 枠の色
 * @parent FrameSettings
 * @type string
 * @desc 枠の色を16進数で指定 (例: #FFFFFF for white, #808080 for gray)
 * @default #D0E0FF
 *
 * @param frameWidth
 * @text 枠の太さ
 * @parent FrameSettings
 * @type number
 * @min 0
 * @desc 枠の太さをピクセルで指定。
 * @default 6
 *
 * @param cornerRadius
 * @text 枠の角の丸み
 * @parent FrameSettings
 * @type number
 * @min 0
 * @desc 枠の角の丸み半径をピクセルで指定。(枠と背景マスクに影響)
 * @default 8
 */

(() => {
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.maskWidthParam = Number(parameters['maskWidth'] || -1);
    param.maskHeightParam = Number(parameters['maskHeight'] || -1);
    param.maskXParam = Number(parameters['maskX'] || -1);
    param.maskYParam = Number(parameters['maskY'] || -1);
    param.frameColor = parameters['frameColor'] || '#D0E0FF';
    param.frameWidth = Number(parameters['frameWidth'] || 6);
    param.cornerRadius = Number(parameters['cornerRadius'] || 8);

    // マスクの実際のサイズと位置を計算するヘルパー関数
    let _calculatedMaskRect = null; // ピクセル単位のマスク矩形

    function calculateMaskRects() {
        const screenWidth = Graphics.width;
        const screenHeight = Graphics.height;

        const calculatedWidth = param.maskWidthParam === -1 ? screenWidth / 2 : param.maskWidthParam;
        const calculatedHeight = param.maskHeightParam === -1 ? screenHeight / 2 : param.maskHeightParam;

        let calculatedX;
        if (param.maskXParam === -1) {
            calculatedX = (screenWidth - calculatedWidth) / 2;
        } else {
            calculatedX = param.maskXParam;
        }

        let calculatedY;
        if (param.maskYParam === -1) {
            calculatedY = (screenHeight - calculatedHeight) / 2;
        } else {
            calculatedY = param.maskYParam;
        }

        _calculatedMaskRect = {
            x: calculatedX,
            y: calculatedY,
            width: calculatedWidth,
            height: calculatedHeight,
            centerX: calculatedX + calculatedWidth / 2,
            centerY: calculatedY + calculatedHeight / 2
        };
    }

    const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function () {
        calculateMaskRects();
        _Spriteset_Battle_initialize.call(this);
    };

    const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function () {
        this._mapSnapshotSprite = new Sprite();
        this.addChild(this._mapSnapshotSprite);

        if (SceneManager._scene instanceof Scene_Map) {
            const bitmap = Bitmap.snap(SceneManager._scene);
            this._mapSnapshotSprite.bitmap = bitmap;
            this._mapSnapshotSprite.x = 0;
            this._mapSnapshotSprite.y = 0;
        } else {
            this._mapSnapshotSprite.visible = false;
            console.warn(`[${pluginName}] No map snapshot available. (Not in Scene_Map, e.g., Battle Test without map specified)`);
        }

        _Spriteset_Battle_createBattleback.call(this);

        if (this._back1Sprite) {
            const maskGraphics = new PIXI.Graphics();
            maskGraphics.beginFill(0xFFFFFF, 1);

            maskGraphics.drawRoundedRect(
                _calculatedMaskRect.x + 2,
                _calculatedMaskRect.y + 2,
                _calculatedMaskRect.width - 4,
                _calculatedMaskRect.height - 4,
                param.cornerRadius
            );
            maskGraphics.endFill();

            this.addChild(maskGraphics);
            this._back1Sprite.mask = maskGraphics;
            this._back1Sprite._maskGraphics = maskGraphics;
        }

        if (this._back2Sprite) {
            this._back2Sprite.visible = false;
        }

        this._battleMaskFrameSprite = new PIXI.Graphics();
        this.addChild(this._battleMaskFrameSprite);

        const framePosX = _calculatedMaskRect.x;
        const framePosY = _calculatedMaskRect.y;
        const frameSizeWidth = _calculatedMaskRect.width;
        const frameSizeHeight = _calculatedMaskRect.height;

        const parsedColor = parseInt(param.frameColor.replace('#', '0x'), 16);

        const halfFrameWidth = param.frameWidth / 2;
        const adjustedRadius = Math.max(0, param.cornerRadius);

        this._battleMaskFrameSprite.lineStyle(param.frameWidth, parsedColor, 1);
        this._battleMaskFrameSprite.drawRoundedRect(
            framePosX + halfFrameWidth,
            framePosY + halfFrameWidth,
            frameSizeWidth - param.frameWidth,
            frameSizeHeight - param.frameWidth,
            adjustedRadius
        );
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        _Scene_Battle_terminate.call(this);
        if (this._spriteset) {
            if (this._spriteset._mapSnapshotSprite) {
                this._spriteset._mapSnapshotSprite.destroy();
                this._spriteset._mapSnapshotSprite = null;
            }
            if (this._spriteset._back1Sprite && this._spriteset._back1Sprite._maskGraphics) {
                this._spriteset._back1Sprite.mask = null; // マスクを解除
                this._spriteset._back1Sprite._maskGraphics.destroy(); // マスクオブジェクトを破棄
                this._spriteset._back1Sprite._maskGraphics = null;
            }
            if (this._spriteset._battleMaskFrameSprite) {
                this._spriteset._battleMaskFrameSprite.destroy();
                this._spriteset._battleMaskFrameSprite = null;
            }
        }
        _calculatedMaskRect = null;
    };

})();