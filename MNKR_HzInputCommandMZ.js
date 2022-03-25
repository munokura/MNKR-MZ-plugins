/*
 * --------------------------------------------------
 * MNKR_HzInputCommandMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*
Copyright (c) <2016> <hiz>
MITライセンスの下で公開されています。
*/

/*
 *  プラグインコマンド:
 *   HzCommand [mode] [switch_no] [command] [x] [y] [align]  # コマンド入力起動
 *   
 *   [mode] 
 *    【必須】入力モード。
 *        1:入力ミスしても入力を継続　2:入力ミスしたらその時点で失敗
 *   [switch_no]
 *    【必須】入力結果をセットするスイッチ番号を指定します。
 * 
 * 
 *   [x]
 *     【任意】コマンドの表示位置を指定します。（デフォルトでは画面中央）
 *   [y]
 *     【任意】コマンドの表示位置を指定します。（デフォルトでは画面中央）
 *   [align]
 *     【任意】コマンドの表示の基準を指定します。（デフォルトでは"center"）
 *       left:左端基準 center:中央基準 right:右端基準
 *   
 *  コマンド例）
 *    HzCommand 1 1 2486          # コマンド「↓←↑→」。入力ミスしても処理継続。失敗/成功はスイッチ番号１にセットされる。
 *    HzCommand 2 1 <2486,4>      # コマンドには「↓←↑→」のキーがランダムで4個セットされる。
 *                                # 入力ミスしたらその場で失敗。失敗/成功はスイッチ番号１にセットされる。
 *   HzCommand 1 1 2486 0 40 left # コマンド「↓←↑→」。入力ミスしても処理継続。失敗/成功はスイッチ番号１にセットされる。
 *                                # コマンドの表示位置は画面左上端。
 *                                
*/

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_HzInputCommandMZ.js
 * @plugindesc 方向キーとボタンでのコマンド入力を実行します。
 * @author hiz (改変 munokura)
 * 
 * @help
 * 方向キーとボタンでのコマンド入力を実行するプラグインコマンドが使えます。
 * 
 * --- 入力コマンド【必須】 ---
 * コマンドの内容を指定します。
 * 
 * 2:↓ 4:← 6:→ 8:↑ z:Zキー x:Xキー
 * 
 * 例） 2486z
 * ↓←↑→Zキー
 * 
 * また、以下のように記述することでコマンドをランダムで設定できます。
 * （複数繋げて設定可）
 * <[コマンドに含めるキー],[入力数]>
 * 
 * 例） <2468,2>
 * ↓←、↑↑、→←等、コマンドに「↓←↑→」のキーがランダムで2個セットされる
 * 
 * <2468,4><zx,1>
 * ↓←↑→Zキー、↑↑→←Xキー等、コマンドに「↓←↑→」のキーが
 * ランダムで4個セットされた後にZキー又はXキーが1個セットされる
 * 
 * NG例）
 * <2468,4>z
 * ランダム指定と直接指定を混ぜる事はできません。
 * <2468,4><z,1>のように記述して下さい。
 * 
 * 
 * ※ 時間制限を設ける場合
 *   時間制限を設ける場合は、予めツクールのタイマーを起動して下さい。
 *   タイマーが0秒になった際にコマンド入力が強制終了され、失敗となります。
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
 * @param success SE
 * @text 入力成功SE
 * @desc 入力時（成功）のSE
 * @default Decision2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param miss SE
 * @text 入力失敗SE
 * @desc 入力時（失敗）のSE
 * @default Buzzer1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param penalty
 * @text 入力ミス時不能時間
 * @desc 入力ミス時の入力不能時間（フレーム）
 * @default 10
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * 
 * @command HzCommand
 * @text コマンド入力開始
 * @desc 方向キーとボタンでのコマンド入力を実行します。
 *
 * @arg mode
 * @text 入力ミス時継続
 * @desc true:入力ミスしても入力を継続 / false:入力ミスしたらその時点で失敗
 * @default true
 * @type boolean
 * @on 入力を継続
 * @off その時点で失敗
 *
 * @arg switch_no
 * @text 結果スイッチID(必須)
 * @desc 入力結果をセットするスイッチ番号を指定します。「なし」の場合、1のスイッチを操作します。
 * @default 1
 * @type switch
 *
 * @arg command_input
 * @text 入力コマンド(必須)
 * @desc コマンドの内容を指定します。詳細はヘルプ文章参照
 * @default <2468,2>
 *
 * @arg command_x
 * @text コマンド表示位置X
 * @desc コマンドの表示位置を指定します。（-1で画面中央）
 * @default -1
 * @type number
 * @min -1
 *
 * @arg command_y
 * @text コマンド表示位置Y
 * @desc コマンドの表示位置を指定します。（-1で画面中央）
 * @default -1
 * @type number
 * @min -1
 *
 * @arg command_align
 * @text コマンド表示基準
 * @desc コマンドの表示の基準を指定します。
 * @type select
 * @option 中央
 * @value center
 * @option 左
 * @value left
 * @option 右
 * @value right
 * @default center
 */

(function () {

    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    var parameters = PluginManager.parameters(pluginName);
    var successSe = parameters['success SE'];
    var missSe = parameters['miss SE'];
    var penaltyFrame = Number(parameters['penalty'] || 0);

    PluginManager.registerCommand(pluginName, "HzCommand", function (arr) {
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        this.setWaitMode("hzCommand");
        // var x = args[3] != null ? Number(args[3]) : SceneManager._screenWidth/2;
        // var y = args[4] != null ? Number(args[4]) : SceneManager._screenHeight/2;
        var mode = args[0] === "true" ? 1 : 2;
        var switchId = args[1] === "0" ? 1 : Number(args[1]);
        var x = args[3] > 0 ? Number(args[3]) : Graphics.width / 2;
        var y = args[4] > 0 ? Number(args[4]) : Graphics.height / 2;
        var align = args[5] || "center";
        // ランダムコマンドの処理
        var com = args[2];
        var randCom = com.match(/<([2468zx]*),(\d*)>+/g);
        if (randCom != null) {
            com = "";
            randCom.forEach(function (randComParmOrg) {
                var randComParm = randComParmOrg.match(/<([2468zx]*),(\d*)>/);
                for (var i = 1; i < randComParm.length; i += 2) {
                    var target = randComParm[i];
                    var num = Number(randComParm[i + 1]);
                    var result = "";
                    for (var j = 0; j < num; j++) {
                        com += target[Math.randomInt(target.length)];
                    }
                }
            });
        }
        // this._inputCommand = new HzInputCommand(x, y, com, align, Number(args[0]), Number(args[1]));
        this._inputCommand = new HzInputCommand(x, y, com, align, mode, switchId);
    });

    // 待機状態の更新用関数に機能追加
    var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function () {
        var waiting = null;
        switch (this._waitMode) {
            case 'hzCommand':
                // 待機状態の更新
                // ※ waitingには必ずtrueかfalseをセットすること！
                waiting = this._inputCommand.update();
                if (!waiting) {
                    // 終了処理
                    this._inputCommand.terminate();
                    this._inputCommand = null;
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
    function HzInputCommand() {
        this.initialize.apply(this, arguments);
    }

    var bmpCursorRight = new Bitmap(80, 70);
    drawCursorRight(bmpCursorRight.context);
    var bmpButtonZ = new Bitmap(80, 80);
    drawButtonZ(bmpButtonZ.context);
    var bmpButtonX = new Bitmap(80, 80);
    drawButtonX(bmpButtonX.context);

    function createCursorSprite(d, x, y) {
        var sprite = new Sprite(bmpCursorRight);
        sprite.anchor = new Point(0.5, 0.5);
        switch (d) {
            case 2:
                // down
                sprite.rotation = Math.PI / 2.0;
                break;
            case 4:
                // left
                sprite.rotation = Math.PI;
                break;
            case 6:
                // right
                sprite.rotation = 0;
                break;
            case 8:
                // up
                sprite.rotation = -Math.PI / 2.0;
                break;
        }
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }

    function createButtonSprite(type, x, y) {
        var sprite;
        switch (type) {
            case 1:
                sprite = new Sprite(bmpButtonZ);
                break;
            case 2:
                sprite = new Sprite(bmpButtonX);
                break;
            case 3:
                sprite = new Sprite(bmpButtonC);
                break;
        }
        sprite.anchor = new Point(0.5, 0.5);
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }

    // 初期化処理（プロパティの初期化・スプライトの作成等を行う）
    HzInputCommand.prototype.initialize = function (x, y, command, align, mode, switchNo) {
        this._mode = mode;            // モード。 1:ミスを許す 2:ミスを許さない
        this._switchNo = switchNo;    // 結果を返すスイッチの番号
        this._sprites = [];           // コマンド表示用スプライト
        this._command = command;     // コマンドの内容
        this._cursorIdx = 0;          // コマンドの入力位置
        this._penalty = 0;            // コマンド入力ミス時のペナルティ

        var space = 80;
        if (align === "center") {
            x -= command.length * space / 2;
        } else if (align === "right") {
            x -= command.length * space;
        }
        x += space / 2;
        for (var i = 0; i < command.length; i++) {
            var c = command.charAt(i);
            switch (c) {
                case '2':
                    this._sprites.push(createCursorSprite(2, x + space * i, y));
                    break;
                case '4':
                    this._sprites.push(createCursorSprite(4, x + space * i, y));
                    break;
                case '6':
                    this._sprites.push(createCursorSprite(6, x + space * i, y));
                    break;
                case '8':
                    this._sprites.push(createCursorSprite(8, x + space * i, y));
                    break;
                case 'z':
                    this._sprites.push(createButtonSprite(1, x + space * i, y));
                    break;
                case 'x':
                    this._sprites.push(createButtonSprite(2, x + space * i, y));
                    break;
            }
        }

        this._sprites.forEach(function (elm) {
            SceneManager._scene._spriteset.addChild(elm);
        });

    };

    // 入力チェック
    HzInputCommand.prototype.checkInput = function () {
        if (Input.isTriggered('down')) {
            if (this._command.charAt(this._cursorIdx) === '2') {
                return 1;
            } else {
                return 2;
            }
        } else if (Input.isTriggered('left')) {
            if (this._command.charAt(this._cursorIdx) === '4') {
                return 1;
            } else {
                return 2;
            }
        } else if (Input.isTriggered('right')) {
            if (this._command.charAt(this._cursorIdx) === '6') {
                return 1;
            } else {
                return 2;
            }
        } else if (Input.isTriggered('up')) {
            if (this._command.charAt(this._cursorIdx) === '8') {
                return 1;
            } else {
                return 2;
            }
        } else if (Input.isTriggered('ok')) {
            if (this._command.charAt(this._cursorIdx) === 'z') {
                return 1;
            } else {
                return 2;
            }
        } else if (Input.isTriggered('cancel')) {
            if (this._command.charAt(this._cursorIdx) === 'x') {
                return 1;
            } else {
                return 2;
            }
        }
        return 0;
    };

    // 更新処理（終了時はfalseを返す）
    HzInputCommand.prototype.update = function () {
        // タイマーによる時間制限
        if ($gameTimer.isWorking() && $gameTimer._frames === 0) {
            // 終了（失敗）
            $gameSwitches.setValue(this._switchNo, false);
            return false;
        }
        // ミス時のペナルティ処理
        if (this._penalty > 0) {
            this._penalty--;
            return true;
        }
        // 入力チェック
        var result = this.checkInput();
        if (result === 1) {
            // 成功
            SceneManager._scene._spriteset.removeChild(this._sprites[this._cursorIdx]);
            if (successSe) {
                AudioManager.playSe({ name: successSe, volume: 90, pitch: 100, pan: 0 });
            }
            this._cursorIdx++;
            if (this._cursorIdx >= this._command.length) {
                // 終了（成功）
                $gameSwitches.setValue(this._switchNo, true);
                return false;
            }
        } else if (result === 2) {
            // 失敗
            this._penalty = penaltyFrame;     // nフレーム入力不可
            if (this._mode === 2) {
                // 終了（失敗）
                $gameSwitches.setValue(this._switchNo, false);
                return false;
            } else if (missSe) {
                // 失敗時SE再生
                AudioManager.playSe({ name: missSe, volume: 90, pitch: 100, pan: 0 });
            }
        }
        return true;
    };

    // 終了処理
    HzInputCommand.prototype.terminate = function () {
        this._sprites.forEach(function (sprite) {
            SceneManager._scene._spriteset.removeChild(sprite);
        });
        this._sprites = null;
    };

    //------------------------------------------------------------------------------
    // これより下は画像描画命令
    //------------------------------------------------------------------------------

    function drawCursorRight(ctx) {
        ctx.save();
        ctx.scale(0.75, 0.75);
        ctx.translate(-152.231330, -218.079330);
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 8.000000;
        ctx.fillStyle = 'rgb(80, 134, 220)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(254.536500, 264.319920);
        ctx.lineTo(201.980250, 222.079330);
        ctx.lineTo(202.050650, 244.214100);
        ctx.lineTo(159.231330, 244.214100);
        ctx.lineTo(159.231330, 284.923750);
        ctx.lineTo(202.179450, 284.923750);
        ctx.lineTo(202.249850, 307.216520);
        ctx.lineTo(254.536480, 264.319920);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function drawButtonZ(ctx) {
        ctx.save();
        ctx.scale(0.75, 0.75);
        ctx.translate(-44, -345);
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5.000000;
        ctx.fillStyle = 'rgb(230, 97, 137)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.arc(96.124840, 398.933620, 46.428570, 0.000000, 6.28318531, 1);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10.000000;
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(74.734076, 376.500690);
        ctx.lineTo(117.425680, 376.101070);
        ctx.lineTo(74.263246, 421.631480);
        ctx.lineTo(117.914560, 421.765550);
        ctx.stroke();
        ctx.restore();
    }

    function drawButtonX(ctx) {
        ctx.save();
        ctx.scale(0.75, 0.75);
        ctx.translate(-164, -346);
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5.000000;
        ctx.fillStyle = 'rgb(232, 148, 53)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.arc(214.919560, 398.933620, 46.428570, 0.000000, 6.28318531, 1);
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -751.417610, 87.013260);
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10.000000;
        ctx.fillStyle = 'rgb(244, 122, 188)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(942.093520, 287.171650);
        ctx.lineTo(990.580840, 336.669120);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10.000000;
        ctx.fillStyle = 'rgb(244, 122, 188)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(990.580840, 287.171650);
        ctx.lineTo(942.093520, 336.669120);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.restore();
    }


    function drawButtonC(ctx) {
        ctx.save();
        ctx.scale(0.75, 0.75);
        ctx.translate(-280, -346);
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5.000000;
        ctx.fillStyle = 'rgb(91, 230, 49)';
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.arc(333.714290, 398.933620, 46.428570, 0.000000, 6.28318531, 1);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10.000000;
        ctx.miterLimit = 4;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(359.726850, 410.737590);
        ctx.bezierCurveTo(354.315550, 422.419290, 341.631550, 428.900890, 328.994350, 426.442000);
        ctx.bezierCurveTo(316.357150, 423.983080, 307.028850, 413.218390, 306.392550, 400.359980);
        ctx.bezierCurveTo(305.756150, 387.501530, 313.976150, 375.868440, 326.308750, 372.173830);
        ctx.bezierCurveTo(338.641350, 368.479220, 351.903450, 373.676810, 358.441650, 384.767200);
        ctx.stroke();
        ctx.restore();
    }
})();
