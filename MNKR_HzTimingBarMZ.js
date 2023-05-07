/*
 * --------------------------------------------------
 * MNKR_HzTimingBarMZ.js
 *   Ver.0.1.2
 * Copyright (c) 2022 Munokura
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
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HzTimingBarMZ.js
 * @plugindesc タイミングを合わせてボタン入力するタイミングバーを実行します。
 * @author hiz (改変 munokura)
 * 
 * @help
 * タイミングを合わせてボタン入力するタイミングバーを実行します。
 * プラグインコマンドでタイミングバーを設定・実行します。
 * 
 * カーソルがバー終了地点に向かって動きます。
 * 何もない範囲で入力した時点で終了し、0が代入されます。
 * 終了までに、ヒット(1)・クリティカル(2)のどちらかを入力したポイントの高い方が
 * 変数に代入されます。
 * ただし、入力必須範囲がある場合、それを入力していないと0が代入されます。
 * 
 * バー末端に来るか、クリア条件（必須、ヒット、クリティカルの全てをヒット済）
 * を満たした時点で変数が代入され終了します。
 * 
 * 
 * コマンドヘルプ補足
 * [hit_area] 
 * ヒット範囲の最小値・最大値を0から100の間で設定。
 * min-max
 * 例）
 * 70-90
 *        
 * [critical_area]
 * クリティカル範囲の最小値・最大値を0から100の間で設定。
 * min-max
 * 例）
 * 90-95
 * 
 * [require_area]
 * 入力必須範囲（複数可）の最小値・最大値を0から100の間で設定。
 * min-max,min-max,...
 * 入力必須範囲で全てボタン入力しないとヒット範囲・クリティカル範囲で
 * ボタン入力してもミスになります。
 *    ※ 必ずヒット範囲・クリティカル範囲より前になるように設定して下さい。
 * 例）
 * 10-20        # 必須エリアは10から20の範囲
 * 20-30,50-60  # 必須エリアは20から30・50から60の範囲
 * 無入力        # 必須エリア無し
 * 
 * 
 * このプラグインについて
 *   RPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
 *   お問い合わせは改変者へお願いいたします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * Ver.0.0.1 by munokura (2022/4/11)
 * MZへ移植
 * 変数に値が代入されない不具合を修正
 * 
 * Ver.0.0.2 by munokura (2022/4/12)
 * プラグインコマンド後に文章の表示がない場合、無限ループになる不具合を修正
 * 必須エリアが他エリアの後ろにある場合、必ずミスになる不具合を修正
 * 
 * Ver.0.0.3 by munokura (2023/5/7)
 * クリティカルの後にヒットを取ると、ヒットの値を取得する不具合を修正
 * 
 * Ver.0.0.4 by munokura (2023/5/7)
 * 2回目以降に前回のスコアが影響してしまう不具合を修正
 * 
 * Ver.0.1.0 by munokura (2023/5/7)
 * ヒット時にクリア条件が揃っている場合、末端まで待たずにクリアする仕様変更
 * 
 * @param bar width
 * @type number
 * @text バーの幅
 * @desc バーの幅
 * @default 500
 *
 * @param required SE
 * @type file
 * @reauire 1
 * @dir audio/se/
 * @text 必須エリアヒット時SE
 * @desc 必須エリアヒット時のSE
 * @default Decision2
 *
 * @param hit SE
 * @type file
 * @reauire 1
 * @dir audio/se/
 * @text ヒットエリアヒット時SE
 * @desc ヒットエリアヒット時のSE
 * @default Attack2
 * 
 * @param critical SE
 * @type file
 * @reauire 1
 * @dir audio/se/
 * @text クリティカルエリアヒット時SE
 * @desc クリティカルエリアヒット時のSE
 * @default Attack3
 *
 * @param miss SE
 * @type file
 * @reauire 1
 * @dir audio/se/
 * @text 入力時（失敗）SE
 * @desc 入力時（失敗）のSE
 * @default Buzzer1
 * 
 * 
 * @command HzTimingBar
 * @text タイミングバー実行
 * @desc タイミングバーを実行します。
 *
 * @arg varNumber
 * @text 結果代入変数ID
 * @desc 結果を返す変数番号。ミスの場合は0・ヒットの場合は1・クリティカルの場合は2が返される。
 * @type variable
 * @default 0
 *
 * @arg hitArea
 * @text ヒット範囲
 * @desc ヒット範囲の最小値・最大値を0から100の間で設定。min-max
 * @default 70-90
 *
 * @arg criticalArea
 * @text クリティカル範囲
 * @desc クリティカル範囲の最小値・最大値を0から100の間で設定。min-max
 * 使用しない場合、無入力
 * @default 10-20
 *
 * @arg requireArea
 * @text 入力必須範囲
 * @desc 入力必須範囲（複数可）の最小値・最大値を0から100の間で設定。min-max,min-max。使用しない場合、無入力
 * @default 
 *
 * @arg x
 * @text コマンド位置X
 * @desc コマンドの表示位置を指定。-1で画面中央
 * @type number
 * @min -1
 * @default -1
 *
 * @arg y
 * @text コマンド位置Y
 * @desc コマンドの表示位置を指定。-1で画面中央
 * @type number
 * @min -1
 * @default -1
 */

// 必須エリア追加
// 必須エリアヒット時、効果音を出す
// プラグインコマンド
// TODO:アイテム・スキル使用時の実行
// TODO:状態異常の効果追加（エリア非表示・高速/低速）

(function () {
    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    var parameters = PluginManager.parameters(pluginName);

    var requiredSe = parameters['required SE'];
    var hitSe = parameters['hit SE'];
    var criticalSe = parameters['critical SE'];
    var missSe = parameters['miss SE'];
    var result = 0;
    var hitAreaHitted = false;
    var criticalAreaHitted = false;

    PluginManager.registerCommand(pluginName, "HzTimingBar", function (obj) {
        result = 0;
        var args = Object.entries(obj).map(([key, value]) => `${value}`);
        this.setWaitMode("hzTimingBar");
        var varNo = Number(args[0]);
        var hitAreaParm = String(args[1]);
        var criticalAreaParm = args[2] || false;
        var requiredAreaParm = args[3] ? '[' + args[3] + ']' : false;
        var x = Number(args[4] || -1) < 0 ? Graphics.width / 2 : Number(args[4]);
        var y = Number(args[5] || -1) < 0 ? Graphics.height / 2 : Number(args[5]);

        if (!hitAreaParm) {
            hitAreaHitted = true;
        }

        if (!criticalAreaParm) {
            criticalAreaHitted = true;
        }

        var hitArea = hitAreaParm.split("-").map(function (elm) { return Number(elm); });
        if (criticalAreaParm) {
            var criticalArea = criticalAreaParm.split("-").map(function (elm) { return Number(elm); });
        } else {
            var criticalArea = null;
        }
        if (requiredAreaParm) {
            var requiredAreas = requiredAreaParm.substring(1, requiredAreaParm.length - 1).split(",").map(function (requiredArea) {
                return requiredArea.split("-").map(function (elm) {
                    return Number(elm);
                });
            });
        } else {
            var requiredAreas = null;
        }
        // this._timingBar = new HzTimingBar(x, y, hitArea, criticalArea, requiredAreas);
        // 変数が代入されないバグ修正
        this._timingBar = new HzTimingBar(x, y, hitArea, criticalArea, requiredAreas, varNo);
    });

    // 待機状態の更新用関数に機能追加
    var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function () {
        var waiting = null;
        switch (this._waitMode) {
            case 'hzTimingBar':
                // 待機状態の更新
                // ※ waitingには必ずtrueかfalseをセットすること！
                waiting = this._timingBar.update();
                if (!waiting) {
                    // 終了処理
                    this._timingBar.terminate();
                    this._timingBar = null;
                }
                break;
        }
        if (waiting !== null) {
            if (!waiting) {
                this._waitMode = '';
            }
            return waiting;
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    // コマンド入力実行用クラス
    function HzTimingBar() {
        this.initialize.apply(this, arguments);
    }

    HzTimingBar.DELAY = 20;
    HzTimingBar.maxFrame = 100;
    HzTimingBar.WIDTH = parameters['bar width'] ? Number(parameters['bar width']) : 500;
    HzTimingBar.HEIGHT = 10;
    HzTimingBar.RADIUS = 4;
    HzTimingBar.speed = 1;

    // 初期化処理（プロパティの初期化・スプライトの作成等を行う）
    // HzTimingBar.prototype.initialize = function (x, y, hitArea, criticalArea, requiredAreas) {
    //     this._varNo = 1;
    // 変数が代入されないバグ修正
    // 

    HzTimingBar.prototype.initialize = function (x, y, hitArea, criticalArea, requiredAreas, varNo) {
        this._hitArea = hitArea;
        this._varNo = varNo;
        $gameVariables.setValue(this._varNo, 0);
        // クリティカルエリアが無いとバーの左に表示されるのを修正
        // this._criticalArea = criticalArea != null ? criticalArea : [-1, 0];
        this._criticalArea = criticalArea != null ? criticalArea : [];
        this._requiredAreas = requiredAreas != null ? requiredAreas : [];
        this._frame = -HzTimingBar.DELAY;
        this._hitRequired = [];
        for (var i = 0; i < this._requiredAreas.length; i++) {
            this._hitRequired.push(this._requiredAreas[i].length != 2);
        }

        // 描画コンテナ
        this._container = new Sprite();
        this._container.position.set(x - HzTimingBar.WIDTH / 2, y - HzTimingBar.HEIGHT / 2);

        // 枠
        var barFrameBmp = new Bitmap(HzTimingBar.WIDTH + 4, HzTimingBar.HEIGHT + 4);
        // var framePath = roundedRectangle(barFrameBmp.context, 2, 2, HzTimingBar.WIDTH, HzTimingBar.HEIGHT, HzTimingBar.RADIUS);
        roundedRectangle(barFrameBmp.context, 2, 2, HzTimingBar.WIDTH, HzTimingBar.HEIGHT, HzTimingBar.RADIUS);
        barFrameBmp.context.fillStyle = "#FFFFFF";
        barFrameBmp.context.lineWidth = 2;
        barFrameBmp.context.strokeStyle = "#000000";
        barFrameBmp.context.fill();
        barFrameBmp.context.stroke();
        var barFrame = new Sprite(barFrameBmp);
        barFrame.position.set(-2, -2);
        this._container.addChild(barFrame);

        // 必須エリア
        for (var i = 0; i < this._requiredAreas.length; i++) {
            var requiredArea = this._requiredAreas[i];
            var reqWidth = HzTimingBar.WIDTH * (requiredArea[1] - requiredArea[0]) / HzTimingBar.maxFrame;
            var reqBmp = new Bitmap(reqWidth, HzTimingBar.HEIGHT - 1);
            reqBmp.context.fillStyle = "#43D197";
            reqBmp.context.rect(0, 1, reqWidth, HzTimingBar.HEIGHT - 1);
            reqBmp.context.fill();
            var req = new Sprite(reqBmp);
            req.position.set(HzTimingBar.WIDTH * requiredArea[0] / HzTimingBar.maxFrame, 0);
            this._container.addChild(req);
        }

        // ヒットエリア
        var hitWidth = HzTimingBar.WIDTH * (this._hitArea[1] - this._hitArea[0]) / HzTimingBar.maxFrame;
        var hitBmp = new Bitmap(hitWidth, HzTimingBar.HEIGHT - 1);
        hitBmp.context.fillStyle = "#EBCE41";
        hitBmp.context.rect(0, 1, hitWidth, HzTimingBar.HEIGHT - 1);
        hitBmp.context.fill();
        var hit = new Sprite(hitBmp);
        hit.position.set(HzTimingBar.WIDTH * this._hitArea[0] / HzTimingBar.maxFrame, 0);
        this._container.addChild(hit);

        // クリティカルエリア
        var criticalWidth = HzTimingBar.WIDTH * (this._criticalArea[1] - this._criticalArea[0]) / HzTimingBar.maxFrame;
        var criticalBmp = new Bitmap(criticalWidth, HzTimingBar.HEIGHT - 1);
        criticalBmp.context.fillStyle = "#E47237";
        criticalBmp.context.rect(0, 1, criticalWidth, HzTimingBar.HEIGHT - 1);
        criticalBmp.context.fill();
        var critical = new Sprite(criticalBmp);
        critical.position.set(HzTimingBar.WIDTH * this._criticalArea[0] / HzTimingBar.maxFrame, 0);
        this._container.addChild(critical);

        // カーソル
        var cursorBmp = new Bitmap(18, 32 + HzTimingBar.HEIGHT + 2);
        cursorBmp.context.fillStyle = "#000000";
        cursorBmp.context.strokeStyle = "#FFFFFF";
        cursorBmp.context.lineWidth = 1;
        cursorBmp.context.moveTo(1, 1);
        cursorBmp.context.lineTo(17, 1);
        cursorBmp.context.lineTo(9, 17);
        cursorBmp.context.lineTo(1, 1);
        cursorBmp.context.moveTo(9, HzTimingBar.HEIGHT + 17);
        cursorBmp.context.lineTo(17, HzTimingBar.HEIGHT + 33);
        cursorBmp.context.lineTo(1, HzTimingBar.HEIGHT + 33);
        cursorBmp.context.lineTo(9, HzTimingBar.HEIGHT + 17);
        cursorBmp.context.fill();
        cursorBmp.context.stroke();
        this._cursor = new Sprite(cursorBmp);
        this._cursor.opacity = 0;
        this._cursor.position.set(-9, -17);
        this._container.addChild(this._cursor);

        SceneManager._scene._spriteset.addChild(this._container);

    };

    // 更新処理（終了時はfalseを返す）
    HzTimingBar.prototype.update = function () {
        // タイマーによる時間制限
        if ($gameTimer.isWorking() && $gameTimer._frames === 0) {
            // 終了（失敗）
            if (missSe) {
                AudioManager.playSe({ name: missSe, volume: 90, pitch: 100, pan: 0 });
            }
            $gameVariables.setValue(this._varNo, 0);
            return false;
        }
        this._frame += HzTimingBar.speed;
        // カーソルアニメーション
        if (this._frame >= 0) {
            this._cursor.x = HzTimingBar.WIDTH * this._frame / HzTimingBar.maxFrame;
            this._cursor.opacity = 255;
        } else {
            this._cursor.x = 0;
            this._cursor.opacity = (HzTimingBar.DELAY + this._frame) / HzTimingBar.DELAY * 255;
        }
        // 時間経過でミス
        if (this._frame > HzTimingBar.maxFrame) {
            // 設計ミスと予想：タイムオーバーで必須エリア未クリア時にミス判定
            if (!this.allRequiredAreaHitted()) {
                $gameVariables.setValue(this._varNo, 0);
                if (missSe) {
                    AudioManager.playSe({ name: missSe, volume: 90, pitch: 100, pan: 0 });
                }
            }
            return false;
        }
        // ボタン押下時の判定
        // ボタン押下時の判定 (マウス対応追加)
        var inputCheck = Input.isTriggered('ok') || TouchInput.isTriggered();
        if (inputCheck && this._frame >= 0) {

            // 必須エリアチェック
            for (var i = 0; i < this._requiredAreas.length; i++) {
                var requiredArea = this._requiredAreas[i];
                if (requiredArea[0] <= this._frame && this._frame < requiredArea[1]) {
                    this._hitRequired[i] = true;
                    if (requiredSe) {
                        AudioManager.playSe({ name: requiredSe, volume: 90, pitch: 100, pan: 0 });
                    }
                    return true;
                }
            }

            if (this._criticalArea[0] <= this._frame && this._frame < this._criticalArea[1]) {
                // if (this.allRequiredAreaHitted()) {
                // result = 2;
                result = result > 2 ? result : 2;
                if (criticalSe) {
                    AudioManager.playSe({ name: criticalSe, volume: 90, pitch: 100, pan: 0 });
                }
                $gameVariables.setValue(this._varNo, result);
                criticalAreaHitted = true;
                if (this.allRequiredAreaHitted() && hitAreaHitted && criticalAreaHitted) {
                    return false;
                }
                return true;
                // }
            } else if (this._hitArea[0] <= this._frame && this._frame < this._hitArea[1]) {
                // if (this.allRequiredAreaHitted()) {
                // result = 1;
                result = result > 1 ? result : 1;
                if (hitSe) {
                    AudioManager.playSe({ name: hitSe, volume: 90, pitch: 100, pan: 0 });
                }
                $gameVariables.setValue(this._varNo, result);
                hitAreaHitted = true;
                if (this.allRequiredAreaHitted() && hitAreaHitted && criticalAreaHitted) {
                    return false;
                }
                return true;
                // }
            }
            // if (result === 0) {
            if (missSe) {
                AudioManager.playSe({ name: missSe, volume: 90, pitch: 100, pan: 0 });
            }
            result = 0;
            $gameVariables.setValue(this._varNo, result);
            this._frame = HzTimingBar.maxFrame;
            // }
            // $gameVariables.setValue(this._varNo, result);
            // return false;
        }
        return true;
    };

    HzTimingBar.prototype.allRequiredAreaHitted = function () {
        for (var i = 0; i < this._hitRequired.length; i++) {
            if (this._hitRequired[i] === false) {
                return false;
            }
        }
        return true;
    };

    // 終了処理
    HzTimingBar.prototype.terminate = function () {
        SceneManager._scene._spriteset.removeChild(this._container);
        this._container = null;
    };

    // 角丸長方形を描画
    function roundedRectangle(ctx, top, left, width, height, borderRadius) {
        ctx.beginPath();
        ctx.moveTo(left + borderRadius, top);
        ctx.lineTo(left + width - borderRadius, top);
        ctx.quadraticCurveTo(left + width, top, left + width, top + borderRadius);
        ctx.lineTo(left + width, top + height - borderRadius);
        ctx.quadraticCurveTo(left + width, top + height, left + width - borderRadius, top + height);
        ctx.lineTo(left + borderRadius, top + height);
        ctx.quadraticCurveTo(left, top + height, left, top + height - borderRadius);
        ctx.lineTo(left, top + borderRadius);
        ctx.quadraticCurveTo(left, top, left + borderRadius, top);
        ctx.closePath();
    }
})();
