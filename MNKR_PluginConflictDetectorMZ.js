/**
 * --------------------------------------------------
 * MNKR_PluginConflictDetectorMZ.js
 *   Ver.0.1.0
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@plugindesc 使用中プラグインの競合調査資料としてレポート出力します。
@author munokura
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_PluginConflictDetectorMZ.js

@command executeDetection
@text レポート出力実行
@desc プラグイン競合検出レポートを手動で出力します。

@param outputEnabled
@text 出力を有効化
@desc レポート出力機能を有効にします
@type boolean
@default true

@param outputPath
@text 出力先フォルダ
@desc CSVファイルの出力先フォルダ（末尾にスラッシュ必須）
@type string
@default data/

@param outputTiming
@text 出力タイミング
@desc レポートを出力するタイミング
@type select
@option 起動時
@value start
@option F8キー
@value f8
@option プラグインコマンド
@value pluginCommand
@default start

@param showCompletionDialog
@text 完了ダイアログを表示
@desc レポート出力完了時にダイアログを表示します
@type boolean
@default true

@param excludePlugins
@text 除外するプラグイン
@desc 検出から除外するプラグイン名（カンマ区切り）
@type string
@default

@param Header_01_List
@text [01] リストCSV ヘッダー
@desc 01_plugin_list.csvのヘッダーをカンマ区切りで指定 (例: Order,File Name)
@default ロード順序,ファイル名

@param Header_02_Details
@text [02] 詳細CSV ヘッダー
@desc 02_override_details.csvのヘッダーをカンマ区切りで指定 (例: Method,Plugin File)
@default 対象メソッド,操作プラグインファイル名

@param Header_03_Summary
@text [03] 集計CSV ヘッダー
@desc 03_override_summary.csvのヘッダーをカンマ区切りで指定 (例: Method,Count,Plugin List)
@default 対象メソッド,総上書きプラグイン数,対象プラグインファイル名リスト

@help
# このプラグインについて
このプラグインは、他のプラグインがコアスクリプトのメソッドを
どのように上書き・エイリアスしているかを自動検出し、
CSVレポートとして出力します。

どのファイルがどのメソッドを上書きしているかを特定し、
競合調査資料として出力します。

# 主な機能
1. プラグインファイル内のコアメソッド上書き箇所をテキストで直接検出
2. 検出された全オーバーライドの記録 (ファイル名とメソッド名の関連付け)
3. ロード順序リストの出力
4. CSV形式でのレポート出力

# 出力ファイル
- 01_plugin_list.csv
プラグインのロード順序リスト
- 02_override_details.csv
詳細なオーバーライド情報（ファイル名とメソッドの一覧）
- 03_override_summary.csv
オーバーライドされたメソッドの集計と上書きプラグインリスト

# プラグインコマンド
「レポート出力実行」
手動で検出を実行します

# 注意事項
- PC版（Node.js環境）でのみCSVファイルが出力され、
プラグインファイルの読み込みが可能です。
- 難読化されたプラグインや動的にメソッドを変更するプラグインは、
正確に検出できない場合があります。

# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';

    // グローバル定数の定義
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const PRMS = PluginManager.parameters(pluginName);

    // パラメータ取得
    const config = {
        outputEnabled: PRMS['outputEnabled'] === 'true',
        outputPath: String(PRMS['outputPath'] || 'data/'),
        outputTiming: String(PRMS['outputTiming'] || 'start'),
        showCompletionDialog: PRMS['showCompletionDialog'] === 'true',
        excludePlugins: String(PRMS['excludePlugins'] || '').split(',').map(s => s.trim()).filter(s => s),
        headerList: String(PRMS['Header_01_List'] || 'ロード順序,ファイル名').split(','),
        headerDetails: String(PRMS['Header_02_Details'] || '対象メソッド,操作プラグインファイル名').split(','),
        headerSummary: String(PRMS['Header_03_Summary'] || '対象メソッド,総上書きプラグイン数,対象プラグインファイル名リスト').split(','),
    };

    // プラグインコマンド登録（MZ形式）
    PluginManager.registerCommand(pluginName, 'executeDetection', args => {
        console.log('[' + pluginName + '] プラグインコマンド実行');
        executeConflictDetection();
    });

    // 定数定義
    const OutputTiming = { START: 'start', F8: 'f8', PLUGIN_COMMAND: 'pluginCommand' };

    //-----------------------------------------------------------------------------
    // CoreClassList & Regex
    //-----------------------------------------------------------------------------

    // 検出対象となるコアクラスのリスト
    const CORE_CLASSES = [
        'Game_Temp', 'Game_System', 'Game_Timer', 'Game_Message', 'Game_Switches',
        'Game_Variables', 'Game_SelfSwitches', 'Game_Screen', 'Game_Picture',
        'Game_Item', 'Game_Action', 'Game_ActionResult', 'Game_BattlerBase',
        'Game_Battler', 'Game_Actor', 'Game_Enemy', 'Game_Actors', 'Game_Unit',
        'Game_Party', 'Game_Troop', 'Game_Map', 'Game_CommonEvent', 'Game_CharacterBase',
        'Game_Character', 'Game_Player', 'Game_Follower', 'Game_Followers', 'Game_Vehicle',
        'Game_Event', 'Game_Interpreter',
        'Scene_Base', 'Scene_Boot', 'Scene_Title', 'Scene_Map', 'Scene_MenuBase',
        'Scene_Menu', 'Scene_Item', 'Scene_Skill', 'Scene_Equip', 'Scene_Status',
        'Scene_Options', 'Scene_File', 'Scene_Save', 'Scene_Load', 'Scene_GameEnd',
        'Scene_Shop', 'Scene_Name', 'Scene_Debug', 'Scene_Battle', 'Scene_Gameover',
        'Sprite_Base', 'Sprite_Clickable', 'Sprite_Button', 'Sprite_Character', 'Sprite_Battler',
        'Sprite_Actor', 'Sprite_Enemy', 'Sprite_Animation', 'Sprite_AnimationMV', 'Sprite_Damage',
        'Sprite_StateIcon', 'Sprite_StateOverlay', 'Sprite_Weapon', 'Sprite_Balloon',
        'Sprite_Picture', 'Sprite_Timer', 'Sprite_Destination', 'Sprite_Gauge',
        'Spriteset_Base', 'Spriteset_Map', 'Spriteset_Battle',
        'Window_Base', 'Window_Scrollable', 'Window_Selectable', 'Window_Command', 'Window_HorzCommand',
        'Window_Help', 'Window_Gold', 'Window_MenuCommand',
        'Window_MenuStatus', 'Window_MenuActor', 'Window_ItemCategory', 'Window_ItemList',
        'Window_SkillType', 'Window_SkillStatus', 'Window_SkillList', 'Window_EquipStatus',
        'Window_EquipCommand', 'Window_EquipSlot', 'Window_EquipItem', 'Window_Status',
        'Window_StatusBase', 'Window_StatusParams', 'Window_StatusEquip',
        'Window_Options', 'Window_SavefileList', 'Window_ShopCommand', 'Window_ShopBuy',
        'Window_ShopSell', 'Window_ShopNumber', 'Window_ShopStatus', 'Window_NameEdit',
        'Window_NameInput', 'Window_NameBox', 'Window_ChoiceList', 'Window_NumberInput', 'Window_EventItem',
        'Window_Message', 'Window_ScrollText', 'Window_MapName', 'Window_BattleLog',
        'Window_PartyCommand', 'Window_ActorCommand', 'Window_BattleStatus', 'Window_BattleActor',
        'Window_BattleEnemy', 'Window_BattleSkill', 'Window_BattleItem', 'Window_TitleCommand',
        'Window_GameEnd', 'Window_DebugRange', 'Window_DebugEdit',
        'BattleManager', 'DataManager', 'ConfigManager', 'StorageManager',
        'ImageManager', 'AudioManager', 'SoundManager', 'TextManager',
        'ColorManager', 'SceneManager', 'PluginManager', 'EffectManager'
    ];

    const CLASS_PATTERN_STRING = '(' + CORE_CLASSES.join('|') + ')';

    const OVERRIDE_PATTERN = new RegExp(
        CLASS_PATTERN_STRING +
        '\\.prototype\\.' +
        '([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=' +
        '[^;]*?(?:function|\\{|=)',
        'g'
    );

    const ALIAS_PATTERN = new RegExp(
        '(?:var|const|let)\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=\\s*' +
        CLASS_PATTERN_STRING +
        '\\.prototype\\.' +
        '([a-zA-Z_$][a-zA-Z0-9_$]*)',
        'g'
    );


    //-----------------------------------------------------------------------------
    // ConflictDetector (Static Analysis Version)
    //-----------------------------------------------------------------------------

    function ConflictDetector() {
        this._conflicts = [];
        this._conflictMap = {};
    }

    ConflictDetector.prototype.analyze = function () {
        if (!FileWriter.isNodeJS()) {
            console.error('[' + pluginName + '] 静的解析はNode.js (PC版) 環境でのみ実行可能です。');
            return [];
        }

        console.log('[' + pluginName + '] プラグインファイルの静的解析を開始します...');

        const plugins = $plugins.filter(p => p.status).map(p => p.name);

        for (let i = 0; i < plugins.length; i++) {
            const fileNameWithoutExt = plugins[i];

            if (fileNameWithoutExt === pluginName) continue;

            try {
                const fullPath = 'js/plugins/' + fileNameWithoutExt + '.js';
                const content = FileWriter.readFileContent(fullPath);

                this.detectOverridesInFile(fileNameWithoutExt + '.js', content);
            } catch (e) {
                console.warn('[' + pluginName + '] ファイル読み込みエラーまたは解析エラー:', fileNameWithoutExt, e.message);
            }
        }

        console.log('[' + pluginName + '] 静的解析完了: ' + this._conflicts.length + '件の上書き/エイリアスを記録');

        this._conflicts = [];
        for (const methodName in this._conflictMap) {
            const overrides = this._conflictMap[methodName];

            const uniquePlugins = {};
            overrides.forEach(function (o) {
                if (!uniquePlugins[o.pluginName]) uniquePlugins[o.pluginName] = [];
                uniquePlugins[o.pluginName].push(o);
            });

            const conflict = {
                methodName: methodName,
                plugins: overrides,
                pluginCount: Object.keys(uniquePlugins).length,
                uniquePlugins: Object.keys(uniquePlugins),
            };

            this._conflicts.push(conflict);
        }

        this._conflicts.sort(function (a, b) {
            return a.methodName.localeCompare(b.methodName);
        });

        return this._conflicts;
    };

    ConflictDetector.prototype.getConflictCounts = function () {
        const counts = { high: 0, low: 0 };
        for (let i = 0; i < this._conflicts.length; i++) {
            if (this._conflicts[i].pluginCount >= 2) {
                counts.high++;
            } else {
                counts.low++;
            }
        }
        return counts;
    };

    ConflictDetector.prototype.detectOverridesInFile = function (fileName, content) {
        let match;

        // 1. 直接上書きパターンを検出
        OVERRIDE_PATTERN.lastIndex = 0;
        while ((match = OVERRIDE_PATTERN.exec(content)) !== null) {
            const className = match[1];
            const methodName = match[2];
            const fullMethodName = className + '.prototype.' + methodName;

            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: '直接上書き',
                isOverride: true
            });
        }

        // 2. エイリアス保存パターンを検出
        ALIAS_PATTERN.lastIndex = 0;
        while ((match = ALIAS_PATTERN.exec(content)) !== null) {
            const aliasVar = match[1];
            const className = match[2];
            const methodName = match[3];
            const fullMethodName = className + '.prototype.' + methodName;

            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: 'エイリアス保存',
                isOverride: false,
                aliasVariable: aliasVar
            });
        }
    };

    ConflictDetector.prototype.recordConflict = function (data) {
        if (!this._conflictMap[data.methodName]) {
            this._conflictMap[data.methodName] = [];
        }
        this._conflictMap[data.methodName].push(data);
        console.log('[' + pluginName + '] 検出:', data.methodName, 'by', data.pluginName, '(', data.overrideType, ')');
    };


    //-----------------------------------------------------------------------------
    // CSV Generator
    //-----------------------------------------------------------------------------

    ConflictDetector.prototype.generateCSVReport = function () {
        return {
            pluginList: this.generatePluginListCSV(),       // 01_plugin_list.csv
            details: this.generateDetailsCSV(),             // 02_override_details.csv (詳細リスト)
            summary: this.generateSummaryCSV()              // 03_override_summary.csv (集計リスト)
        };
    };

    // 01_plugin_list.csv: ロード順序リスト
    ConflictDetector.prototype.generatePluginListCSV = function () {
        let csv = config.headerList.join(',') + '\n';
        const plugins = $plugins.filter(p => p.status);

        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            csv += (i + 1) + ',"' + plugin.name + '.js"\n';
        }
        return csv;
    };

    // 02_override_details.csv: 詳細リスト
    ConflictDetector.prototype.generateDetailsCSV = function () {
        let csv = config.headerDetails.join(',') + '\n';

        for (let i = 0; i < this._conflicts.length; i++) {
            const conflict = this._conflicts[i];

            const recordedPlugins = {};

            for (let j = 0; j < conflict.plugins.length; j++) {
                const plugin = conflict.plugins[j];

                if (!recordedPlugins[plugin.pluginName]) {
                    csv += conflict.methodName + ',';
                    csv += plugin.pluginName + '\n';
                    recordedPlugins[plugin.pluginName] = true;
                }
            }
        }

        return csv;
    };

    // 03_override_summary.csv: 集計リスト
    ConflictDetector.prototype.generateSummaryCSV = function () {
        let csv = config.headerSummary.join(',') + '\n';

        for (let i = 0; i < this._conflicts.length; i++) {
            const conflict = this._conflicts[i];
            const uniquePluginNames = conflict.uniquePlugins.join('|');
            csv += conflict.methodName + ',' + conflict.pluginCount + ',"' + uniquePluginNames + '"\n';
        }

        return csv;
    };


    //-----------------------------------------------------------------------------
    // Utility Functions (File I/O & Dialog)
    //-----------------------------------------------------------------------------

    function FileWriter() {
        throw new Error('This is a static class');
    }

    FileWriter.isNodeJS = function () {
        return typeof require !== 'undefined' && typeof process !== 'undefined';
    };

    FileWriter.getPath = function (filePath) {
        const path = require('path');
        const basePath = path.dirname(process.mainModule.filename);
        return path.join(basePath, filePath);
    };

    FileWriter.readFileContent = function (filePath) {
        if (!this.isNodeJS()) {
            throw new Error('Node.js環境でのみファイル読み込みが可能です。');
        }
        const fs = require('fs');
        const fullPath = this.getPath(filePath);
        let content = fs.readFileSync(fullPath, { encoding: 'utf8' });
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        return content;
    };

    FileWriter.writeCSV = function (filename, content, callback) {
        if (this.isNodeJS()) {
            this.writeCSVNode(filename, content, callback);
        } else {
            this.writeCSVBrowser(filename, content, callback);
        }
    };

    FileWriter.writeCSVNode = function (filename, content, callback) {
        try {
            const fs = require('fs');
            const path = require('path');

            const basePath = path.dirname(process.mainModule.filename);
            const fullPath = path.join(basePath, config.outputPath, filename);

            console.log('[' + pluginName + '] ファイル書き込み先:', fullPath);

            fs.writeFileSync(fullPath, '\uFEFF' + content, 'utf8');

            console.log('[' + pluginName + '] ファイル書き込み成功:', filename);
            callback({ success: true, path: fullPath });
        } catch (error) {
            console.error('[' + pluginName + '] ファイル書き込みエラー:', error);
            callback({ success: false, error: error.message });
        }
    };

    FileWriter.writeCSVBrowser = function (filename, content, callback) {
        console.log('[' + pluginName + '] ブラウザ版では直接ファイル出力できません');
        console.log('=== ' + filename + ' ===');
        console.log(content);
        console.log('=================');

        callback({
            success: false,
            error: 'ブラウザ版では直接ファイル出力できません。コンソールからコピーしてください。'
        });
    };

    function showReportDialog(reportData) {
        console.log('[' + pluginName + '] ダイアログ表示開始');
        let message = '=== プラグイン オーバーライド/競合調査レポート ===\n\n';

        if (reportData.success) {
            message += '✓ 出力完了\n\n';
            message += '出力先: ' + (reportData.path || config.outputPath) + '\n\n';
            message += '出力ファイル:\n';
            message += '  - 01_plugin_list.csv (ロード順序リスト)\n';
            message += '  - 02_override_details.csv (詳細な一次資料: ファイルとメソッドの関連付け)\n';
            message += '  - 03_override_summary.csv (集計/上書きプラグインリスト)\n\n';

            const totalMethods = reportData.conflictCount || 0;
            message += '--- 検出されたオーバーライドメソッド ---\n';
            message += '合計: ' + totalMethods + '件のメソッドが上書きされています。\n\n';

            if (totalMethods === 0) {
                message += 'コアスクリプトの上書きは検出されませんでした。\n';
            } else {
                const counts = reportData.counts;
                message += '  高リスク (2件以上のプラグインによる上書き): ' + counts.high + '件\n';
                message += '  低リスク (1件のプラグインによる上書き): ' + counts.low + '件\n';
                message += '\n【調査方法】\n';
                message += '1.「03_override_summary.csv」で上書き回数が多いメソッドを特定。\n';
                message += '2.「02_override_details.csv」で対象プラグインファイル名を特定。\n';
                message += '3.「01_plugin_list.csv」でファイルのロード順序を特定。\n';
            }
        } else {
            message += '× 出力失敗\n\n';
            message += 'エラー内容:\n';
            message += (reportData.error || '不明なエラー') + '\n\n';
        }

        alert(message);
    }

    function logReportToConsole(reportData) {
        console.log('%c[プラグインコマンド] レポート出力完了',
            'color: #0f0; font-weight: bold; font-size: 14px;');

        if (reportData.success) {
            console.log('出力先: ' + reportData.path);

            if (reportData.conflictCount === 0) {
                console.log('%cコアスクリプトの上書きは検出されませんでした', 'color: #0f0; font-weight: bold;');
            } else {
                console.log('高リスク (2件以上のオーバーライド): ' + reportData.counts.high + '件');
                console.log('低リスク (1件のオーバーライド): ' + reportData.counts.low + '件');
            }
        } else {
            console.error('エラー: ' + reportData.error);
        }
    }

    //-----------------------------------------------------------------------------
    // Hooks
    //-----------------------------------------------------------------------------

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);

        console.log('[' + pluginName + '] Scene_Boot.start フック実行');

        if (config.outputTiming === OutputTiming.START) {
            console.log('[' + pluginName + '] 1秒後にオーバーライド検出実行予定');
            setTimeout(function () {
                console.log('[' + pluginName + '] タイマー発火、オーバーライド検出実行');
                executeConflictDetection();
            }, 1000);
        }
    };

    if (config.outputTiming === OutputTiming.F8) {
        const _Input_onKeyDown = Input._onKeyDown;
        Input._onKeyDown = function (event) {
            _Input_onKeyDown.call(this, event);

            if (event.keyCode === 119) { // F8
                console.log('[' + pluginName + '] F8キー検出、オーバーライド検出実行');
                executeConflictDetection();
            }
        };
    }

    //-----------------------------------------------------------------------------
    // Main Logic
    //-----------------------------------------------------------------------------

    let conflictDetector = null;
    let reportGenerated = false;

    function executeConflictDetection() {
        console.log('[' + pluginName + '] executeConflictDetection 開始');

        if (!config.outputEnabled) {
            console.log('[' + pluginName + '] 出力が無効化されています');
            return;
        }

        if (reportGenerated) {
            console.log('[' + pluginName + '] レポートは既に生成されています');
            return;
        }

        if (!FileWriter.isNodeJS()) {
            showReportDialog({ success: false, error: '静的解析にはNode.js (PC版) 環境が必要です。' });
            return;
        }

        console.log('[' + pluginName + '] ConflictDetector インスタンス化');
        conflictDetector = new ConflictDetector();

        console.log('[' + pluginName + '] 解析開始');
        const conflicts = conflictDetector.analyze();

        console.log('[' + pluginName + '] 検出されたオーバーライドメソッド数: ' + conflicts.length);

        console.log('[' + pluginName + '] CSVレポート生成開始');
        const csvReport = conflictDetector.generateCSVReport();
        const counts = conflictDetector.getConflictCounts();

        console.log('[' + pluginName + '] CSV書き込み開始');

        let completedCount = 0;
        const results = {};
        const totalFiles = 3;

        function checkCompletion() {
            completedCount++;
            if (completedCount === totalFiles) {
                const reportData = {
                    success: results.pluginList && results.pluginList.success &&
                        results.details && results.details.success &&
                        results.summary && results.summary.success,
                    path: (results.summary && results.summary.path) || config.outputPath,
                    error: (results.pluginList && results.pluginList.error) || (results.details && results.details.error) || (results.summary && results.summary.error),
                    counts: counts,
                    conflictCount: conflicts.length
                };

                reportGenerated = true;

                console.log('[' + pluginName + '] レポート生成完了');
                console.log('  success:', reportData.success);
                console.log('  counts:', reportData.counts);

                if (config.showCompletionDialog) {
                    showReportDialog(reportData);
                } else {
                    logReportToConsole(reportData);
                }
            }
        }

        // CSV書き込み（3ファイル）
        FileWriter.writeCSV('01_plugin_list.csv', csvReport.pluginList, function (result) {
            console.log('[' + pluginName + '] pluginList書き込み結果:', result);
            results.pluginList = result;
            checkCompletion();
        });

        FileWriter.writeCSV('02_override_details.csv', csvReport.details, function (result) {
            console.log('[' + pluginName + '] details書き込み結果:', result);
            results.details = result;
            checkCompletion();
        });

        FileWriter.writeCSV('03_override_summary.csv', csvReport.summary, function (result) {
            console.log('[' + pluginName + '] summary書き込み結果:', result);
            results.summary = result;
            checkCompletion();
        });
    }

})();