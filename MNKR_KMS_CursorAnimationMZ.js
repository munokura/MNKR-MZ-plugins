/*
 * --------------------------------------------------
 * MNKR_KMS_CursorAnimationMZ.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// KMS_CursorAnimation.js
//  last update: 2016/12/24
//=============================================================================

/**
 * The MIT License
 * 
 * Copyright © 2015 TOMY
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_KMS_CursorAnimationMZ.js
 * @plugindesc カーソルの位置にアニメーションを表示します。
 * @author TOMY (改変 munokura)
 *
 * @help
 * カーソルの位置にアニメーションを表示します。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param Radius X
 * @text アニメX半径
 * @type number
 * @decimals
 * @default 16
 * @desc アニメーションの X 方向半径をピクセル単位で指定します。
 *
 * @param Radius Y
 * @text アニメY半径
 * @type number
 * @decimals
 * @default 16
 * @desc アニメーションの Y 方向半径をピクセル単位で指定します。
 *
 * @param Animation speed
 * @text アニメ速度
 * @type number
 * @decimals 2
 * @default 1.50
 * @desc アニメーションの速度です。
 * 大きいほど速くなります。
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const radiusX = Number(parameters['Radius X'] || 16);
    const radiusY = Number(parameters['Radius Y'] || 16);
    const animationSpeed = Number(parameters['Animation speed'] || 1.5);

    //-----------------------------------------------------------------------------
    // Window

    Window.prototype.isCursorActive = function () {
        return this.visible &&
            this.active &&
            this.isOpen() &&
            this._cursorRect.width > 0 &&
            this._cursorRect.height > 0;
    };

    Window.prototype.getRelativeCursorPosition = function () {
        const pad = this._padding;
        const x = this.x + this._cursorRect.x + pad - this.origin.x;
        const y = this.y + this._cursorRect.y + pad - this.origin.y + this._cursorRect.height / 2;

        return new Point(x, y);
    };

    //-----------------------------------------------------------------------------
    // Sprite_AnimationCursorParticle
    //
    // カーソル位置に表示するアニメーションのパーティクル的なスプライトです。

    function Sprite_AnimationCursorParticle() {
        this.initialize.apply(this, arguments);
    }

    // Sprite_AnimationCursorParticle.prototype = Object.create(Sprite_Base.prototype);
    Sprite_AnimationCursorParticle.prototype = Object.create(Sprite.prototype);

    Sprite_AnimationCursorParticle.prototype.constructor = Sprite_AnimationCursorParticle;

    Sprite_AnimationCursorParticle.prototype.MIN_SPEED = 2;

    Sprite_AnimationCursorParticle.prototype.initialize = function () {
        // Sprite_Base.prototype.initialize.call(this);
        Sprite.prototype.initialize.call(this);

        this._delta = 0;
        this._color = 'green';
        this.setupBitmap();
        this.setDestination(new Point(0, 0), 0);
        this.x = Graphics.width / 2;
        this.y = Graphics.height / 2;
        this.z = 100;
        this.visible = true;
        this.opacity = 0;
    };

    Sprite_AnimationCursorParticle.prototype.setupBitmap = function () {
        this.bitmap = new Bitmap(1, 1); // dummy

        this._lineBitmap = new Bitmap(64, 3);
        this.redrawLine();

        const ropeCount = 8;
        this._ropePoints = []
        for (let i = 0; i < ropeCount; ++i) {
            this._ropePoints.push(new PIXI.Point(i * 8, 0));
        }

        // For Pixi v4
        this._rope = new PIXI.mesh.Rope(
            new PIXI.Texture.fromCanvas(this._lineBitmap._canvas),
            this._ropePoints);
        this._rope.blendMode = PIXI.BLEND_MODES.ADD;

        this.addChild(this._rope);
    };

    Sprite_AnimationCursorParticle.prototype.redrawLine = function () {
        this._lineBitmap.gradientFillRect(0, 0, this._lineBitmap.width, this._lineBitmap.height, 'black', this._color);
    };

    Sprite_AnimationCursorParticle.prototype.setDestination = function (point, opacity) {
        this._destinationPoint = point;
        this._destinationOpacity = opacity;
    };

    Sprite_AnimationCursorParticle.prototype.update = function () {
        // Sprite_Base.prototype.update.call(this);
        Sprite.prototype.update.call(this);

        this.updatePosition();
    };

    Sprite_AnimationCursorParticle.prototype.updatePosition = function () {
        this.updateRope();

        if (this.x == this._destinationPoint.x &&
            this.y == this._destinationPoint.y &&
            this.opacity == this._destinationOpacity) {
            return;
        }

        this.x = this.forwardValue(this.x, this._destinationPoint.x);
        this.y = this.forwardValue(this.y, this._destinationPoint.y);
        this.opacity = this.forwardValue(this.opacity, this._destinationOpacity, 1.5);
    };

    Sprite_AnimationCursorParticle.prototype.forwardValue = function (fromVal, toVal, coef) {
        coef = coef || 1;

        let diff = (toVal - fromVal) * coef;
        const absDiff = Math.abs(diff);
        if (absDiff <= this.MIN_SPEED) {
            return toVal;
        }

        diff = Math.max(Math.sqrt(absDiff) / 2, this.MIN_SPEED);

        if (toVal < fromVal) {
            diff = -diff;
        }

        return fromVal + diff;
    };

    Sprite_AnimationCursorParticle.prototype.updateRope = function () {
        const dx = this._destinationPoint.x - this.x;
        const dy = this._destinationPoint.y - this.y;
        const radDelta = this._delta * Math.PI;
        const count = this._ropePoints.length;
        for (let i = 0; i < count; ++i) {
            const omega = i * 0.1 + Graphics.frameCount / 60 * animationSpeed;
            this._ropePoints[i].x =
                radiusX * Math.sin(omega * 3 + radDelta) + dx * i / count;
            this._ropePoints[i].y =
                radiusY * Math.sin(omega * 4 + radDelta) + dy * i / count;
        }
    };

    /**
     * アニメーションの時間差
     *
     * @property delta
     * @type     Number
     */
    Object.defineProperty(Sprite_AnimationCursorParticle.prototype, 'delta', {
        get: function () {
            return this._delta;
        },
        set: function (value) {
            this._delta = value;
        },
        configurable: true
    });

    /**
     * ラインの描画色
     *
     * @property color
     * @type     CSS color code
     */
    Object.defineProperty(Sprite_AnimationCursorParticle.prototype, 'color', {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this.redrawLine();
        },
        configurable: true
    });

    //-----------------------------------------------------------------------------
    // Sprite_AnimationCursor
    //
    // カーソル位置に表示するアニメーションスプライトです。


    function Sprite_AnimationCursor() {
        this.initialize.apply(this, arguments);
    }

    // Sprite_AnimationCursor.prototype = Object.create(Sprite_Base.prototype);
    Sprite_AnimationCursor.prototype = Object.create(Sprite.prototype);

    Sprite_AnimationCursor.prototype.constructor = Sprite_AnimationCursor;

    Sprite_AnimationCursor.prototype.initialize = function () {
        // Sprite_Base.prototype.initialize.call(this);
        Sprite.prototype.initialize.call(this);

        this.x = 0;
        this.y = 0;
        this.z = 100;
        this.visible = true;
        this._frameCount = 0;
        this._windowLayers = [];
        this._activeWindow = null;
        this.resetPosition();
        this.createParticles();
    };

    Sprite_AnimationCursor.prototype.createParticles = function () {
        const colors = ['red', 'orange', 'green', 'cyan', 'violet'];
        for (let i = 0; i < colors.length; ++i) {
            const particle = new Sprite_AnimationCursorParticle();
            particle.delta = i * 2.0 / colors.length;
            particle.color = colors[i];
            this.addChild(particle);
        }
    };

    Sprite_AnimationCursor.prototype.resetPosition = function () {
        this._focus = new Point(Graphics.width / 2, Graphics.height / 2);
        this._targetOpacity = 0;
        this.notifyParticle();
    };

    Sprite_AnimationCursor.prototype.notifyParticle = function () {
        this.children.forEach(function (child) {
            child.setDestination(this._focus, this._targetOpacity);
        }, this);
    };

    Sprite_AnimationCursor.prototype.update = function () {
        // Sprite_Base.prototype.update.call(this);
        Sprite.prototype.update.call(this);

        this.updatePosition();
        this.children.forEach(function (child) {
            child.update();
        }, this);
    };

    Sprite_AnimationCursor.prototype.updatePosition = function () {
        this.updateActiveWindow();
    };

    Sprite_AnimationCursor.prototype.updateActiveWindow = function () {
        if (!this.isActiveWindow(this._activeWindow)) {
            this._activeWindow = this.findActiveWindow();
        }

        // 移動先の座標を設定
        if (this._activeWindow) {
            const pos = this._activeWindow.getRelativeCursorPosition();
            const layer = this.getParentWindowLayer(this._activeWindow);
            if (layer) {
                pos.x += layer.x;
                pos.y += layer.y;
            }
            this._focus = pos;
            this._targetOpacity = 255;
        } else {
            this._targetOpacity = 0;
        }
        this.notifyParticle();
    };

    Sprite_AnimationCursor.prototype.isActiveWindow = function (window) {
        return window && window.isCursorActive();
    };

    Sprite_AnimationCursor.prototype.getParentWindowLayer = function (window) {
        if (!window) {
            return null;
        }

        for (let i = 0; i < this._windowLayers.length; i++) {
            let layer = this._windowLayers[i];
            if (window.parent === layer) {
                return layer;
            }
        }

        return null;
    };

    Sprite_AnimationCursor.prototype.findActiveWindow = function () {
        let window = null;
        for (let i = 0; i < this._windowLayers.length && window == null; i++) {
            this._windowLayers[i].children.some(function (child) {
                if (child instanceof Window && child.isCursorActive()) {
                    window = child;
                    return true;
                } else {
                    return false;
                }
            });
        }

        return window;
    };

    Sprite_AnimationCursor.prototype.addWindowLayer = function (layer) {
        if (layer && !this._windowLayers.contains(layer)) {
            this._windowLayers.push(layer);
        }
    };


    //-----------------------------------------------------------------------------
    // Scene_Base

    Scene_Base.prototype.createAnimationCursor = function () {
        this._animationCursor = new Sprite_AnimationCursor();
    };

    Scene_Base.prototype.startAnimationCursor = function () {
        this._animationCursor.addWindowLayer(this._windowLayer);
        this.addChild(this._animationCursor);
    };

    Scene_Base.prototype.updateAnimationCursor = function () {
        this._animationCursor.update();
    };

    const _KMS_CursorAnimation_Scene_Base_create = Scene_Base.prototype.create;
    Scene_Base.prototype.create = function () {
        _KMS_CursorAnimation_Scene_Base_create.call(this);
        this.createAnimationCursor();
    };

    const _KMS_CursorAnimation_Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function () {
        _KMS_CursorAnimation_Scene_Base_start.call(this);
        this.startAnimationCursor();
    };

    const _KMS_CursorAnimation_Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _KMS_CursorAnimation_Scene_Base_update.call(this);
        this.updateAnimationCursor();
    };

})();