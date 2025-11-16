/**
 * --------------------------------------------------
 * MNKR_OptimizeEffekseerTexture.js
 *   Ver.0.1.0
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@plugindesc Effekseerの未使用テクスチャを検出・整理します
@author munokura
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_OptimizeEffekseerTexture.js

@help
# 概要
RPGツクールMZのデプロイメントの選択肢「未使用ファイルを除外する」では、
Effekseer内のテクスチャは除外対象になりません。

このプラグインを使用・実行することで、
Effekseerアニメーションで実際に使用されているテクスチャを検出し、
未使用のテクスチャファイルを整理できます。

# 使い方
## 基本的な使い方
プラグインコマンド「テクスチャを整理」を実行するだけで、
退避→検出→復元→レポート出力が自動的に行われます。

## 手動での使い方（デバッグ用）
1. プラグインコマンド「テクスチャを退避」を実行。
2. プラグインコマンド「必要なテクスチャを検出」を実行。
3. プラグインコマンド「必要なテクスチャを復元」を実行。
4. 必要に応じて「未使用テクスチャを削除」でバックアップを削除。

# 注意
- Node.js環境(テストプレー時)でのみ動作します。
- 必ずバックアップを取ってから実行してください。
- effects/Texture/フォルダ内のファイルが移動・削除されます。
それ以外のフォルダは調査対象外です。
- 公開するゲームではプラグインを無効にしてください。

# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param backupFolderName
@text バックアップフォルダ名
@desc テクスチャを退避するフォルダ名
@default Texture_Backup
@type string

@param outputFilePath
@text 結果ファイル出力先
@desc 結果を出力するCSVファイルパス（プロジェクトフォルダからの相対パス）
@default EffekseerTextureReport.csv
@type string

@param errorLogFilePath
@text 処理ログ出力先
@desc 処理ログを出力するファイルパス（プロジェクトフォルダからの相対パス）
@default EffekseerTextureProcess.txt
@type string

@param csvHeader1
@text CSVヘッダー1列目
@desc CSVの1列目のヘッダー名
@default 使用efkefc
@type string

@param csvHeader2
@text CSVヘッダー2列目
@desc CSVの2列目のヘッダー名
@default efkefcテクスチャ
@type string

@param waitFrames
@text 待機フレーム数
@desc 各エフェクト読み込み後の待機フレーム数（エフェクト数が多い場合は増やしてください）
@default 60
@type number
@min 10
@max 300

@param renameToMatchCase
@text ファイル名の大文字小文字を統一
@desc 復元時に要求されたファイル名に合わせて、テクスチャファイル名をリネームします
@default false
@type boolean

@param startMessage
@text 開始メッセージ
@desc 処理開始時に表示するメッセージ
@default テクスチャ整理を開始します\n\n※この処理中はテストプレイ画面をアクティブに保ってください\n\n続行しますか?
@type string

@param completeMessage
@text 完了メッセージ
@desc 処理完了時に表示するメッセージ（{count}は復元数に置き換えられます）
@default 処理が完了しました\n復元したテクスチャ: {count}個
@type string

@command organizeTextures
@text テクスチャを整理
@desc テクスチャの退避・検出・復元を自動的に行います

@arg doBackup
@text テクスチャを退避
@desc テクスチャを退避するかどうか
@type boolean
@default true

@arg doDetect
@text 必要なテクスチャを検出
@desc 必要なテクスチャを検出するかどうか
@type boolean
@default true

@arg doRestore
@text 必要なテクスチャを復元
@desc 必要なテクスチャを復元するかどうか
@type boolean
@default true

@command backupTextures
@text テクスチャを退避（手動）
@desc effects/Texture/を一時的にバックアップフォルダに移動します

@command detectRequiredTextures
@text 必要なテクスチャを検出（手動）
@desc 全エフェクトを読み込み、必要なテクスチャを記録します

@command restoreTextures
@text 必要なテクスチャを復元（手動）
@desc 検出された必要なテクスチャのみをバックアップから復元します

@command deleteUnusedTextures
@text 未使用テクスチャを削除
@desc バックアップフォルダ内の未使用テクスチャを削除します（復元不可）
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const PRMS = PluginManager.parameters(pluginName);
    const PRM_backupFolderName = PRMS['backupFolderName'] || 'Texture_Backup';
    const PRM_outputFilePath = PRMS['outputFilePath'] || '';
    const PRM_errorLogFilePath = PRMS['errorLogFilePath'] || 'EffekseerTextureErrors.txt';
    const PRM_csvHeader1 = PRMS['csvHeader1'] || '使用efkefc';
    const PRM_csvHeader2 = PRMS['csvHeader2'] || 'efkefcテクスチャ';
    const PRM_waitFrames = Number(PRMS['waitFrames']) || 60;
    const PRM_renameToMatchCase = PRMS['renameToMatchCase'] === 'true';
    const PRM_startMessage = PRMS['startMessage'] || 'テクスチャ整理を開始します\n\n※この処理中はテストプレイ画面をアクティブに保ってください\n\n続行しますか?';
    const PRM_completeMessage = PRMS['completeMessage'] || '処理が完了しました\\n復元したテクスチャ: {count}個';

    // テクスチャ記録用
    const textureLog = {
        requiredTextures: new Set(),     // 必要なテクスチャファイル名
        effectTextureMap: new Map(),     // effectName → テクスチャファイル名の配列
        missingTextures: new Set(),      // 読み込みエラーが出たテクスチャ
        renamed: [],                     // リネームしたファイル
        errors: [],                      // エラーログ
        processLog: []                   // 処理ログ（すべてのコンソール出力）
    };

    // 統計情報
    const statistics = {
        startTime: 0,
        detectedCount: 0,
        restoredCount: 0,
        errorCount: 0
    };

    // ログ記録用関数
    function addLog(message, isError = false) {
        const timestamp = new Date().toLocaleTimeString('ja-JP');
        const logMessage = `[${timestamp}] ${message}`;
        textureLog.processLog.push(logMessage);

        if (isError) {
            console.error(message);
        } else {
            console.log(message);
        }
    }

    // Node.js モジュール
    let fs = null;
    let path = null;

    if (Utils.isNwjs()) {
        fs = require('fs');
        path = require('path');
    }

    //-----------------------------------------------------------------------------
    // プラグインコマンド登録
    //-----------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, 'organizeTextures', args => {
        const doBackup = args.doBackup === 'true';
        const doDetect = args.doDetect === 'true';
        const doRestore = args.doRestore === 'true';

        if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.startTextureOrganization(doBackup, doDetect, doRestore);
        } else {
            console.warn('[OptimizeEffekseerTexture] マップ画面で実行してください');
        }
    });

    PluginManager.registerCommand(pluginName, 'backupTextures', args => {
        backupTextures();
    });

    PluginManager.registerCommand(pluginName, 'detectRequiredTextures', args => {
        if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.startTextureDetection();
        } else {
            console.warn('[OptimizeEffekseerTexture] マップ画面で実行してください');
        }
    });

    PluginManager.registerCommand(pluginName, 'restoreTextures', args => {
        restoreRequiredTextures();
    });

    PluginManager.registerCommand(pluginName, 'deleteUnusedTextures', args => {
        deleteUnusedTextures();
    });

    //-----------------------------------------------------------------------------
    // ダイアログ表示（alert/confirmで代替）
    //-----------------------------------------------------------------------------

    function showDialog(title, message) {
        const fullMessage = `${title}\n\n${message}`;
        addLog(`[ダイアログ] ${title}: ${message}`);

        if (Utils.isNwjs()) {
            alert(fullMessage);
        } else {
            console.log(fullMessage);
        }
    }

    function showConfirmDialog(title, message) {
        const fullMessage = `${title}\n\n${message}`;
        addLog(`[確認ダイアログ] ${title}: ${message}`);

        if (Utils.isNwjs()) {
            return confirm(fullMessage);
        } else {
            console.log(fullMessage);
            return true;
        }
    }

    //-----------------------------------------------------------------------------
    // エラーログ記録
    //-----------------------------------------------------------------------------

    function addError(category, message) {
        const errorMessage = `[${category}] ${message}`;
        textureLog.errors.push(errorMessage);
        statistics.errorCount++;
        addLog('[ERROR] ' + errorMessage, true);
    }

    function saveProcessLog() {
        if (!fs || !path) return;

        const projectPath = path.dirname(process.mainModule.filename);
        const fullPath = path.join(projectPath, PRM_errorLogFilePath);

        const now = new Date();
        const dateStr = now.toLocaleString('ja-JP');

        let content = '';
        content += '========================================\n';
        content += 'Optimize Effekseer Texture - Process Log\n';
        content += `実行日時: ${dateStr}\n`;
        content += '========================================\n\n';

        // すべての処理ログを出力
        textureLog.processLog.forEach(log => {
            content += log + '\n';
        });

        content += '\n========================================\n';
        content += '処理結果:\n';
        content += `- 検出したテクスチャ: ${statistics.detectedCount}個\n`;
        content += `- 復元したテクスチャ: ${statistics.restoredCount}個\n`;
        content += `- エラー数: ${statistics.errorCount}個\n`;

        const elapsedTime = ((Date.now() - statistics.startTime) / 1000).toFixed(1);
        content += `- 処理時間: ${elapsedTime}秒\n`;
        content += '========================================\n';

        if (textureLog.errors.length > 0) {
            content += '\n========================================\n';
            content += 'エラー詳細:\n';
            content += '========================================\n';
            textureLog.errors.forEach(error => {
                content += error + '\n';
            });
            content += '========================================\n';
        }

        try {
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(fullPath, content, 'utf8');
            addLog(`[OptimizeEffekseerTexture] 処理ログを出力しました: ${fullPath}`);
        } catch (e) {
            console.error('[OptimizeEffekseerTexture] 処理ログ出力失敗:', e.message);
        }
    }

    //-----------------------------------------------------------------------------
    // Scene_Map - テクスチャ整理機能
    //-----------------------------------------------------------------------------

    const _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function () {
        _Scene_Map_initialize.call(this);
        this.initializeTextureDetection();
    };

    Scene_Map.prototype.initializeTextureDetection = function () {
        this._textureDetectionMode = false;
        this._textureDetectionIndex = 0;
        this._textureDetectionList = [];
        this._organizationMode = false;
        this._organizationStep = 0;
        this._organizationConfig = null;
    };

    Scene_Map.prototype.startTextureOrganization = function (doBackup, doDetect, doRestore) {
        // 初期化
        textureLog.requiredTextures.clear();
        textureLog.effectTextureMap.clear();
        textureLog.missingTextures.clear();
        textureLog.renamed = [];
        textureLog.errors = [];
        textureLog.processLog = [];
        statistics.startTime = Date.now();
        statistics.detectedCount = 0;
        statistics.restoredCount = 0;
        statistics.errorCount = 0;

        // 確認ダイアログ
        const confirmed = showConfirmDialog(
            'テクスチャ整理',
            PRM_startMessage
        );

        if (!confirmed) {
            addLog('[OptimizeEffekseerTexture] 処理がキャンセルされました');
            return;
        }

        addLog('========================================');
        addLog('[OptimizeEffekseerTexture] テクスチャ整理開始');
        addLog('========================================');

        this._organizationMode = true;
        this._organizationStep = 0;
        this._organizationConfig = { doBackup, doDetect, doRestore };

        // ステップ1: 退避
        if (doBackup) {
            this.executeBackupStep();
        } else {
            this._organizationStep = 1;
        }
    };

    Scene_Map.prototype.executeBackupStep = function () {
        addLog('[ステップ1] テクスチャを退避中...');
        const result = backupTextures();
        if (!result) {
            addError('退避', '既存のバックアップを使用して続行します');
        }
        this._organizationStep = 1;
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        this.updateTextureOrganization();
        this.updateTextureDetection();
    };

    Scene_Map.prototype.updateTextureOrganization = function () {
        if (!this._organizationMode) return;

        const config = this._organizationConfig;

        // ステップ1完了後、ステップ2へ
        if (this._organizationStep === 1 && config.doDetect) {
            this._organizationStep = 2;
            addLog('[ステップ2] 必要なテクスチャを検出中...');
            this.startTextureDetection();
            return;
        }

        // ステップ1完了、検出不要の場合、ステップ3へ
        if (this._organizationStep === 1 && !config.doDetect) {
            this._organizationStep = 3;
        }

        // ステップ2は検出処理で自動的にステップ3に移行

        // ステップ3: 復元
        if (this._organizationStep === 3 && config.doRestore) {
            this._organizationStep = 4;
            addLog('[ステップ3] 必要なテクスチャを復元中...');
            const count = restoreRequiredTextures();
            statistics.restoredCount = count;
        }

        // 完了
        if (this._organizationStep === 4 ||
            (this._organizationStep === 3 && !config.doRestore)) {
            this.completeTextureOrganization();
        }
    };

    Scene_Map.prototype.completeTextureOrganization = function () {
        this._organizationMode = false;
        this._organizationStep = 0;

        addLog('========================================');
        addLog('[OptimizeEffekseerTexture] テクスチャ整理完了');
        addLog('========================================');

        // 処理ログ出力（常に出力）
        saveProcessLog();

        // 完了ダイアログ
        const elapsedTime = ((Date.now() - statistics.startTime) / 1000).toFixed(1);
        let message = PRM_completeMessage.replace('{count}', statistics.restoredCount);

        if (statistics.errorCount > 0) {
            message += `\nエラー: ${statistics.errorCount}個（詳細はログファイルを確認）`;
        }

        message += `\n処理時間: ${elapsedTime}秒`;
        message = message.replace(/\\n/g, '\n');

        showDialog('テクスチャ整理完了', message);
    };

    //-----------------------------------------------------------------------------
    // テクスチャ退避
    //-----------------------------------------------------------------------------

    function backupTextures() {
        if (!fs || !path) {
            addError('退避', 'Node.js環境でのみ実行できます');
            return false;
        }

        const projectPath = path.dirname(process.mainModule.filename);
        const texturePath = path.join(projectPath, 'effects', 'Texture');
        const backupPath = path.join(projectPath, 'effects', PRM_backupFolderName);

        if (!fs.existsSync(texturePath)) {
            addError('退避', `Textureフォルダが存在しません: ${texturePath}`);
            return false;
        }

        if (fs.existsSync(backupPath)) {
            console.warn('[OptimizeEffekseerTexture] バックアップフォルダが既に存在します:', backupPath);
            console.warn('[OptimizeEffekseerTexture] 既存のバックアップを使用します');
            return false;
        }

        try {
            fs.renameSync(texturePath, backupPath);
            addLog('[OptimizeEffekseerTexture] テクスチャを退避しました');
            addLog('  移動元: ' + texturePath);
            addLog('  移動先: ' + backupPath);

            // 空のTextureフォルダを作成
            fs.mkdirSync(texturePath);
            addLog('[OptimizeEffekseerTexture] 空のTextureフォルダを作成しました');
            return true;
        } catch (e) {
            addError('退避', e.message);
            return false;
        }
    }

    //-----------------------------------------------------------------------------
    // Scene_Map - テクスチャ検出機能
    //-----------------------------------------------------------------------------

    Scene_Map.prototype.startTextureDetection = function () {
        if (!this._organizationMode) {
            console.log('========================================');
            console.log('[OptimizeEffekseerTexture] テクスチャ検出開始');
            console.log('========================================');
        }

        // 初期化されていない場合は初期化
        if (typeof this._textureDetectionMode === 'undefined') {
            this.initializeTextureDetection();
        }

        if (!this._organizationMode) {
            textureLog.requiredTextures.clear();
            textureLog.effectTextureMap.clear();
            textureLog.missingTextures.clear();
            textureLog.renamed = [];
            textureLog.errors = [];
        }

        if (!$dataAnimations) {
            addError('検出', '$dataAnimationsが存在しません');
            return;
        }

        // Effekseerアニメーションのみ抽出
        this._textureDetectionList = [];
        for (let i = 1; i < $dataAnimations.length; i++) {
            const anim = $dataAnimations[i];
            if (anim && anim.effectName) {
                this._textureDetectionList.push(anim);
            }
        }

        if (this._textureDetectionList.length === 0) {
            console.warn('[OptimizeEffekseerTexture] Effekseerアニメーションが見つかりません');
            if (this._organizationMode) {
                this._organizationStep = 3;
            }
            return;
        }

        console.log(`[OptimizeEffekseerTexture] ${this._textureDetectionList.length}個のエフェクトを検出します`);

        // エラー監視を開始（一度だけ）
        setupErrorMonitoring();

        this._textureDetectionMode = true;
        this._textureDetectionIndex = 0;
        this._textureDetectionWaitFrames = 0;
        this._currentEffectName = null;

        // 即座に検出開始
        this.processTextureDetection();
    };

    Scene_Map.prototype.updateTextureDetection = function () {
        if (!this._textureDetectionMode) return;

        // 待機フレームがある場合は待つ
        if (this._textureDetectionWaitFrames > 0) {
            this._textureDetectionWaitFrames--;
            return;
        }

        // 前回のエフェクトで検出されたテクスチャを記録
        if (this._currentEffectName && this._currentEffectTextures) {
            if (this._currentEffectTextures.size > 0) {
                textureLog.effectTextureMap.set(
                    this._currentEffectName,
                    Array.from(this._currentEffectTextures)
                );
                console.log(`  → ${this._currentEffectTextures.size}個のテクスチャを検出`);
            } else {
                console.log(`  → テクスチャなし`);
            }
        }

        // 全エフェクト処理完了
        if (this._textureDetectionIndex >= this._textureDetectionList.length) {
            this._textureDetectionMode = false;
            this.onTextureDetectionComplete();
            return;
        }

        // 次のエフェクトを処理
        this.processTextureDetection();
    };

    Scene_Map.prototype.processTextureDetection = function () {
        if (this._textureDetectionIndex >= this._textureDetectionList.length) return;

        const anim = this._textureDetectionList[this._textureDetectionIndex];
        const effectName = anim.effectName;

        console.log(`[${this._textureDetectionIndex + 1}/${this._textureDetectionList.length}] ${anim.name} (${effectName})`);

        // 現在のエフェクト用にテクスチャセットを作成
        this._currentEffectName = effectName;
        this._currentEffectTextures = new Set();

        // エフェクトを読み込んでエラーを待つ
        try {
            if (Graphics.effekseer) {
                const effectPath = 'effects/' + effectName + '.efkefc';
                Graphics.effekseer.loadEffect(effectPath);
            }
        } catch (e) {
            addError('検出', `エフェクト "${effectName}" の読み込み中にエラー: ${e.message}`);
        }

        // 次のエフェクトへ
        this._textureDetectionIndex++;

        // エラーが発生するまで待機
        this._textureDetectionWaitFrames = PRM_waitFrames;
    };

    Scene_Map.prototype.onTextureDetectionComplete = function () {
        // 最後のエフェクトのテクスチャを記録
        if (this._currentEffectName && this._currentEffectTextures) {
            if (this._currentEffectTextures.size > 0) {
                textureLog.effectTextureMap.set(
                    this._currentEffectName,
                    Array.from(this._currentEffectTextures)
                );
                console.log(`  → ${this._currentEffectTextures.size}個のテクスチャを検出`);
            } else {
                console.log(`  → テクスチャなし`);
            }
        }

        console.log('========================================');
        console.log('[OptimizeEffekseerTexture] 検出完了');
        console.log(`[OptimizeEffekseerTexture] 累積検出数: ${textureLog.missingTextures.size}個`);
        console.log('========================================');

        // 最終的に検出された全テクスチャを記録
        if (textureLog.missingTextures.size > 0) {
            textureLog.requiredTextures = new Set(textureLog.missingTextures);
            statistics.detectedCount = textureLog.requiredTextures.size;

            console.log('\n【検出されたテクスチャ】');
            Array.from(textureLog.requiredTextures).forEach(tex => {
                console.log(`  ✓ ${tex}`);
            });
        }

        // CSV出力
        if (PRM_outputFilePath) {
            saveResultsToFile();
        }

        // 整理モードの場合、次のステップへ
        if (this._organizationMode) {
            this._organizationStep = 3;
        }
    };

    //-----------------------------------------------------------------------------
    // エラー監視
    //-----------------------------------------------------------------------------

    let isMonitoringErrors = false;

    function setupErrorMonitoring() {
        if (isMonitoringErrors) return;
        isMonitoringErrors = true;

        console.log('[OptimizeEffekseerTexture] エラー監視を開始しました');

        // Imageオブジェクトのエラーを捕捉
        const originalImage = window.Image;
        window.Image = function () {
            const img = new originalImage();

            const originalSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');

            Object.defineProperty(img, 'src', {
                set: function (value) {
                    // エラーハンドラを先に設定
                    img.addEventListener('error', function () {
                        if (value && value.includes('effects/Texture/')) {
                            const match = value.match(/effects[\/\\]Texture[\/\\]([^\/\\?#]+)/i);
                            if (match) {
                                const filename = match[1];
                                textureLog.missingTextures.add(filename);

                                // 現在処理中のエフェクトに記録
                                if (SceneManager._scene && SceneManager._scene._currentEffectTextures) {
                                    SceneManager._scene._currentEffectTextures.add(filename);
                                }

                                console.log(`[OptimizeEffekseerTexture] ✓ テクスチャ検出: ${filename}`);
                            }
                        }
                    });

                    // 元のsrcを設定
                    originalSrc.set.call(img, value);
                },
                get: function () {
                    return originalSrc.get.call(img);
                }
            });

            return img;
        };

        // XMLHttpRequestをフック
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._url = url;
            return originalOpen.call(this, method, url, ...args);
        };

        XMLHttpRequest.prototype.send = function (...args) {
            this.addEventListener('error', function () {
                if (this._url && this._url.includes('effects/Texture/')) {
                    const match = this._url.match(/effects[\/\\]Texture[\/\\]([^\/\\?#]+)/i);
                    if (match) {
                        const filename = match[1];
                        textureLog.missingTextures.add(filename);

                        if (SceneManager._scene && SceneManager._scene._currentEffectTextures) {
                            SceneManager._scene._currentEffectTextures.add(filename);
                        }

                        console.log(`[OptimizeEffekseerTexture] ✓ テクスチャ検出(XHR): ${filename}`);
                    }
                }
            });

            this.addEventListener('load', function () {
                if (this.status === 404 && this._url && this._url.includes('effects/Texture/')) {
                    const match = this._url.match(/effects[\/\\]Texture[\/\\]([^\/\\?#]+)/i);
                    if (match) {
                        const filename = match[1];
                        textureLog.missingTextures.add(filename);

                        if (SceneManager._scene && SceneManager._scene._currentEffectTextures) {
                            SceneManager._scene._currentEffectTextures.add(filename);
                        }

                        console.log(`[OptimizeEffekseerTexture] ✓ テクスチャ検出(404): ${filename}`);
                    }
                }
            });

            return originalSend.call(this, ...args);
        };

        // Fetchもフック
        const originalFetch = window.fetch;
        window.fetch = function (url, ...args) {
            return originalFetch.call(this, url, ...args).catch(error => {
                if (typeof url === 'string' && url.includes('effects/Texture/')) {
                    const match = url.match(/effects[\/\\]Texture[\/\\]([^\/\\?#]+)/i);
                    if (match) {
                        const filename = match[1];
                        textureLog.missingTextures.add(filename);

                        if (SceneManager._scene && SceneManager._scene._currentEffectTextures) {
                            SceneManager._scene._currentEffectTextures.add(filename);
                        }

                        console.log(`[OptimizeEffekseerTexture] ✓ テクスチャ検出(fetch): ${filename}`);
                    }
                }
                throw error;
            });
        };
    }

    //-----------------------------------------------------------------------------
    // テクスチャ復元
    //-----------------------------------------------------------------------------

    function restoreRequiredTextures() {
        if (!fs || !path) {
            addError('復元', 'Node.js環境でのみ実行できます');
            return 0;
        }

        console.log('========================================');
        console.log('[OptimizeEffekseerTexture] テクスチャ復元開始');
        console.log('========================================');

        // effectTextureMapからrequiredTexturesを再構築
        if (textureLog.requiredTextures.size === 0 && textureLog.effectTextureMap.size > 0) {
            console.log('[OptimizeEffekseerTexture] effectTextureMapから必要なテクスチャを再構築します...');
            textureLog.requiredTextures.clear();
            for (const [effectName, textures] of textureLog.effectTextureMap.entries()) {
                textures.forEach(tex => textureLog.requiredTextures.add(tex));
            }
            console.log(`[OptimizeEffekseerTexture] ${textureLog.requiredTextures.size}個のテクスチャを再構築しました`);
        }

        if (textureLog.requiredTextures.size === 0) {
            addError('復元', '必要なテクスチャが記録されていません。先に「必要なテクスチャを検出」を実行してください');
            return 0;
        }

        const projectPath = path.dirname(process.mainModule.filename);
        const texturePath = path.join(projectPath, 'effects', 'Texture');
        const backupPath = path.join(projectPath, 'effects', PRM_backupFolderName);

        if (!fs.existsSync(backupPath)) {
            addError('復元', `バックアップフォルダが存在しません: ${backupPath}`);
            return 0;
        }

        // バックアップフォルダ内のファイル一覧を取得
        const backupFiles = fs.readdirSync(backupPath);
        console.log(`[OptimizeEffekseerTexture] ${textureLog.requiredTextures.size}個のテクスチャを復元します...`);

        let restoredCount = 0;
        for (const texture of textureLog.requiredTextures) {
            const srcPath = path.join(backupPath, texture);
            let dstPath = path.join(texturePath, texture);

            // ファイルの存在確認（大文字小文字の違いを考慮）
            if (!fs.existsSync(srcPath)) {
                // 大文字小文字を無視して検索
                const found = backupFiles.find(f => f.toLowerCase() === texture.toLowerCase());
                if (found) {
                    const actualSrcPath = path.join(backupPath, found);

                    try {
                        if (PRM_renameToMatchCase && found !== texture) {
                            // リネームして復元
                            fs.copyFileSync(actualSrcPath, dstPath);
                            textureLog.renamed.push(`${found} → ${texture}`);
                            console.log(`  ✓ 復元+リネーム: ${found} → ${texture}`);
                        } else {
                            dstPath = path.join(texturePath, found);
                            fs.copyFileSync(actualSrcPath, dstPath);
                            console.log(`  ✓ 復元: ${found}`);
                        }
                        restoredCount++;
                    } catch (e) {
                        addError('復元', `ファイル "${texture}" の復元に失敗: ${e.message}`);
                    }
                } else {
                    addError('復元', `ファイル "${texture}" が見つかりません`);
                }
            } else {
                try {
                    fs.copyFileSync(srcPath, dstPath);
                    console.log(`  ✓ 復元: ${texture}`);
                    restoredCount++;
                } catch (e) {
                    addError('復元', `ファイル "${texture}" の復元に失敗: ${e.message}`);
                }
            }
        }

        console.log('========================================');
        console.log(`[OptimizeEffekseerTexture] ${restoredCount}個のファイルを復元しました`);

        if (textureLog.renamed.length > 0) {
            console.log(`[OptimizeEffekseerTexture] ${textureLog.renamed.length}個のファイルをリネームしました`);
        }
        console.log('========================================');

        return restoredCount;
    }

    //-----------------------------------------------------------------------------
    // 未使用テクスチャ削除
    //-----------------------------------------------------------------------------

    function deleteUnusedTextures() {
        if (!fs || !path) {
            console.error('[OptimizeEffekseerTexture] Node.js環境でのみ実行できます');
            return;
        }

        const projectPath = path.dirname(process.mainModule.filename);
        const backupPath = path.join(projectPath, 'effects', PRM_backupFolderName);

        if (!fs.existsSync(backupPath)) {
            console.error('[OptimizeEffekseerTexture] バックアップフォルダが存在しません');
            return;
        }

        // 確認メッセージ
        console.warn('========================================');
        console.warn('[OptimizeEffekseerTexture] 警告');
        console.warn('バックアップフォルダを削除します。この操作は元に戻せません。');
        console.warn('本当に削除する場合は、以下をコンソールで実行してください:');
        console.warn(`  confirmDeleteBackup()`);
        console.warn('========================================');

        // グローバル関数として確認用関数を登録
        window.confirmDeleteBackup = function () {
            try {
                deleteFolderRecursive(backupPath);
                console.log('[OptimizeEffekseerTexture] バックアップフォルダを削除しました');
                delete window.confirmDeleteBackup;
            } catch (e) {
                console.error('[OptimizeEffekseerTexture] 削除エラー:', e.message);
            }
        };
    }

    function deleteFolderRecursive(folderPath) {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(file => {
                const curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(folderPath);
        }
    }

    //-----------------------------------------------------------------------------
    // ファイル出力
    //-----------------------------------------------------------------------------

    function saveResultsToFile() {
        if (!fs || !path) {
            console.warn('[OptimizeEffekseerTexture] Node.js環境ではないためファイル出力できません');
            return;
        }

        if (!PRM_outputFilePath) {
            console.log('[OptimizeEffekseerTexture] 出力ファイルパスが設定されていません');
            return;
        }

        const projectPath = path.dirname(process.mainModule.filename);
        const fullPath = path.join(projectPath, PRM_outputFilePath);

        // CSV形式で出力
        let content = '';

        // ヘッダー行
        content += `${PRM_csvHeader1},${PRM_csvHeader2}\n`;

        // エフェクトごとのテクスチャを出力
        for (const [effectName, textures] of textureLog.effectTextureMap.entries()) {
            for (const texture of textures) {
                content += `${effectName},${texture}\n`;
            }
        }

        try {
            // 出力先ディレクトリを作成
            const dir = path.dirname(fullPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`[OptimizeEffekseerTexture] レポートを出力しました: ${fullPath}`);
            console.log(`[OptimizeEffekseerTexture] エフェクト数: ${textureLog.effectTextureMap.size}`);
            console.log(`[OptimizeEffekseerTexture] 総テクスチャ数: ${textureLog.requiredTextures.size}`);
        } catch (e) {
            addError('CSV出力', `ファイル出力エラー: ${e.message}`);
        }
    }

})();