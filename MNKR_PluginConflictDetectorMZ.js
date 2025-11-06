/**
 * --------------------------------------------------
 * MNKR_PluginConflictDetectorMZ.js
 *   Ver.0.3.0
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/**
 * Ver.0.3.0
 * - 出力ファイル名を変更（誤解削減のため）
 *   02_override_details.csv → 02_method_details.csv
 *   03_override_summary.csv → 03_method_summary.csv
 * - 用語を「オーバーライド」から「メソッド」に統一
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

@param pluginSeparator
@text プラグイン名区切り文字
@desc 複数プラグインを区切る記号(デフォルト: |)
@type string
@default |

@param enableDebugLog
@text デバッグログを表示
@desc コンソールに詳細なデバッグログを表示します
@type boolean
@default false

@param Header_01_List
@text [01] リストCSV ヘッダー
@desc 01_plugin_list.csvのヘッダーをカンマ区切りで指定
@default ロード順序,ファイル名

@param Header_02_Details
@text [02] 詳細CSV ヘッダー
@desc 02_method_details.csvのヘッダーをカンマ区切りで指定
@default 対象メソッド,操作プラグインファイル名

@param Header_03_Summary
@text [03] 集計CSV ヘッダー
@desc 03_method_summary.csvのヘッダーをカンマ区切りで指定
@default 対象メソッド,定義プラグイン数,対象プラグインファイル名リスト

@help
# このプラグインについて
このプラグインは、他のプラグインを自動検出し、CSVレポートとして出力します。
競合調査時のみにプラグインをONにしてください。
それ以外の場面ではOFFにすることを推奨します。

## プラグイン管理画面の配置
このプラグインは、プラグイン管理画面の最下部に配置してください。
上部に配置すると、それより下のプラグインを検出できません。

# 主な機能
1. プラグインファイル内のコアメソッド上書き箇所をテキストで直接検出
2. ES6 class構文で書かれたメソッドの検出
3. MixIn関数内のメソッド検出
4. 検出された全オーバーライドの記録
5. CSV形式でのレポート出力

# 出力ファイル
- 01_plugin_list.csv: プラグインのロード順序リスト
- 02_method_details.csv: 詳細なメソッドのリスト
- 03_method_summary.csv: メソッドの集計とプラグインリスト

# CSVの見方と競合調査手順

## 検出されるメソッドについて
このプラグインは以下のメソッドを検出します:
- コアスクリプトのメソッドの上書き・エイリアス
- プラグインが独自に定義した新規メソッド

## 競合リスクの判断基準
03_method_summary.csvの「定義プラグイン数」列を確認:
- 2以上: 複数のプラグインが同じメソッドを定義 → 競合リスク高
- 1: 単一のプラグインのみが定義 → 通常は問題なし

## 調査手順
1. 03_method_summary.csvを開く
2. 「定義プラグイン数」列で2以上の行を探す
3. 該当メソッドを02_method_details.csvで詳細確認
4. 01_plugin_list.csvでプラグインのロード順序を確認
5. 必要に応じてプラグインの順序を変更、または併用を避ける

## 注意事項
- 「定義プラグイン数」が1のメソッドは、通常競合しません。
- ただし、コアスクリプトの重要なメソッドを上書きしている場合、
  他のプラグインとの相性に注意が必要です。
- PCバージョン(Node.js環境)でのみCSVファイルが出力されます。
- 難読化されたプラグインは正確に検出できない場合があります。

# プラグインコマンド
レポート出力実行

# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const PRMS = PluginManager.parameters(pluginName);

    const config = {
        outputEnabled: PRMS['outputEnabled'] === 'true',
        outputPath: String(PRMS['outputPath'] || 'data/'),
        outputTiming: String(PRMS['outputTiming'] || 'start'),
        showCompletionDialog: PRMS['showCompletionDialog'] === 'true',
        excludePlugins: String(PRMS['excludePlugins'] || '').split(',').map(s => s.trim()).filter(s => s),
        pluginSeparator: String(PRMS['pluginSeparator'] || '|'),
        enableDebugLog: PRMS['enableDebugLog'] === 'true',
        headerList: String(PRMS['Header_01_List'] || 'ロード順序,ファイル名').split(','),
        headerDetails: String(PRMS['Header_02_Details'] || '対象メソッド,操作プラグインファイル名').split(','),
        headerSummary: String(PRMS['Header_03_Summary'] || '対象メソッド,総上書きプラグイン数,対象プラグインファイル名リスト').split(','),
    };

    const OutputTiming = { START: 'start', F8: 'f8', PLUGIN_COMMAND: 'pluginCommand' };

    function debugLog() {
        if (config.enableDebugLog) {
            console.log.apply(console, ['[' + pluginName + ']'].concat(Array.from(arguments)));
        }
    }

    PluginManager.registerCommand(pluginName, 'executeDetection', args => {
        executeConflictDetection();
    });

    //-----------------------------------------------------------------------------
    // Core Classes & Patterns
    //-----------------------------------------------------------------------------

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
        CLASS_PATTERN_STRING + '\\.prototype\\.([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=[^;]*?(?:function|\\{|=)',
        'g'
    );

    const ALIAS_PATTERN = new RegExp(
        '(?:var|const|let)\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=\\s*' +
        CLASS_PATTERN_STRING + '\\.prototype\\.([a-zA-Z_$][a-zA-Z0-9_$]*)',
        'g'
    );

    const CLASS_DECLARATION_PATTERN_CORE = new RegExp(
        'class\\s+(' + CLASS_PATTERN_STRING + ')\\s+extends\\s+[a-zA-Z_$][a-zA-Z0-9_$]*\\s*\\{',
        'g'
    );

    const CLASS_DECLARATION_PATTERN_ALL = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s+extends\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\{/g;

    const MIXIN_FUNCTION_PATTERN = new RegExp(
        'function\\s+[a-zA-Z_$][a-zA-Z0-9_$]*_?[Mm]ix[Ii]n\\s*\\(\\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*\\)',
        'g'
    );

    //-----------------------------------------------------------------------------
    // ConflictDetector
    //-----------------------------------------------------------------------------

    function ConflictDetector() {
        this._conflicts = [];
        this._conflictMap = {};
    }

    ConflictDetector.prototype.analyze = function () {
        if (!FileWriter.isNodeJS()) {
            console.error('[' + pluginName + '] 静的解析はNode.js環境でのみ実行可能です。');
            return [];
        }

        debugLog('プラグインファイルの静的解析を開始');

        const plugins = $plugins.filter(p => p.status).map(p => p.name);

        for (let i = 0; i < plugins.length; i++) {
            const fileNameWithoutExt = plugins[i];
            if (fileNameWithoutExt === pluginName) continue;

            try {
                const fullPath = 'js/plugins/' + fileNameWithoutExt + '.js';
                const content = FileWriter.readFileContent(fullPath);
                this.detectOverridesInFile(fileNameWithoutExt + '.js', content);
            } catch (e) {
                console.warn('[' + pluginName + '] ファイル読み込みエラー:', fileNameWithoutExt, e.message);
            }
        }

        debugLog('静的解析完了:', Object.keys(this._conflictMap).length, '件のメソッドを検出');

        this._conflicts = [];
        for (const methodName in this._conflictMap) {
            const overrides = this._conflictMap[methodName];
            const uniquePlugins = {};

            overrides.forEach(function (o) {
                if (!uniquePlugins[o.pluginName]) uniquePlugins[o.pluginName] = [];
                uniquePlugins[o.pluginName].push(o);
            });

            this._conflicts.push({
                methodName: methodName,
                plugins: overrides,
                pluginCount: Object.keys(uniquePlugins).length,
                uniquePlugins: Object.keys(uniquePlugins),
            });
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

        OVERRIDE_PATTERN.lastIndex = 0;
        while ((match = OVERRIDE_PATTERN.exec(content)) !== null) {
            const fullMethodName = match[1] + '.prototype.' + match[2];
            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: '直接上書き',
                isOverride: true
            });
        }

        ALIAS_PATTERN.lastIndex = 0;
        while ((match = ALIAS_PATTERN.exec(content)) !== null) {
            const fullMethodName = match[2] + '.prototype.' + match[3];
            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: 'エイリアス保存',
                isOverride: false,
                aliasVariable: match[1]
            });
        }

        this.detectClassMethodsInFile(fileName, content, true);
        this.detectClassMethodsInFile(fileName, content, false);
        this.detectMixInMethodsInFile(fileName, content);
    };

    ConflictDetector.prototype.detectClassMethodsInFile = function (fileName, content, coreOnly) {
        let classMatch;
        const pattern = coreOnly ? CLASS_DECLARATION_PATTERN_CORE : CLASS_DECLARATION_PATTERN_ALL;
        pattern.lastIndex = 0;

        debugLog('class構文検出:', fileName, coreOnly ? 'コアクラス' : '全クラス');

        while ((classMatch = pattern.exec(content)) !== null) {
            const className = classMatch[1];
            const classStartIndex = classMatch.index + classMatch[0].length;
            const classBody = this.extractClassBody(content, classStartIndex);

            if (classBody) {
                debugLog('クラス検出:', className);
                this.extractMethodsFromClassBody(fileName, className, classBody);
            }
        }
    };

    ConflictDetector.prototype.detectMixInMethodsInFile = function (fileName, content) {
        let mixinMatch;
        MIXIN_FUNCTION_PATTERN.lastIndex = 0;

        while ((mixinMatch = MIXIN_FUNCTION_PATTERN.exec(content)) !== null) {
            const paramName = mixinMatch[1];
            const functionBody = this.extractFunctionBody(content, mixinMatch.index + mixinMatch[0].length);

            if (functionBody) {
                const actualClassName = this.guessClassNameFromMixInCall(content, mixinMatch.index, paramName);
                if (actualClassName) {
                    debugLog('MixIn検出:', actualClassName);
                    this.extractMixInMethods(fileName, actualClassName, paramName, functionBody);
                }
            }
        }
    };

    ConflictDetector.prototype.guessClassNameFromMixInCall = function (content, functionStart, paramName) {
        const functionNameMatch = content.substring(functionStart, functionStart + 200)
            .match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);

        if (!functionNameMatch) return null;

        const functionName = functionNameMatch[1];
        const searchArea = content.substring(functionStart, Math.min(content.length, functionStart + 50000));
        const callPattern = new RegExp(
            functionName + '\\s*\\(\\s*(' + CLASS_PATTERN_STRING + ')\\.prototype\\s*\\)',
            'g'
        );

        const callMatch = callPattern.exec(searchArea);
        if (callMatch) return callMatch[1];

        const nameMatch = functionName.match(/^([A-Z][a-zA-Z0-9_]*?)_/);
        if (nameMatch && CORE_CLASSES.indexOf(nameMatch[1]) !== -1) {
            return nameMatch[1];
        }

        return null;
    };

    ConflictDetector.prototype.extractFunctionBody = function (content, startIndex) {
        let i = startIndex;
        while (i < content.length && content[i] !== '{') i++;
        if (i >= content.length) return null;
        return this.extractClassBody(content, i + 1);
    };

    ConflictDetector.prototype.extractMixInMethods = function (fileName, className, paramName, functionBody) {
        const methodPattern = new RegExp(paramName + '\\.([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*=\\s*function', 'g');
        let match;
        let methodCount = 0;

        while ((match = methodPattern.exec(functionBody)) !== null) {
            const fullMethodName = className + '.prototype.' + match[1];
            methodCount++;
            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: 'MixIn',
                isOverride: true
            });
        }

        debugLog(className, 'のMixInから', methodCount, '個のメソッドを検出');
    };

    ConflictDetector.prototype.extractClassBody = function (content, startIndex) {
        let depth = 1;
        let i = startIndex;

        while (i < content.length && depth > 0) {
            const char = content[i];

            if (char === '"' || char === "'" || char === '`') {
                i = this.skipString(content, i, char);
                continue;
            }

            if (char === '/' && i + 1 < content.length) {
                if (content[i + 1] === '/') {
                    i = this.skipLineComment(content, i);
                    continue;
                } else if (content[i + 1] === '*') {
                    i = this.skipBlockComment(content, i);
                    continue;
                }
            }

            if (char === '{') {
                depth++;
            } else if (char === '}') {
                depth--;
                if (depth === 0) {
                    return content.substring(startIndex, i);
                }
            }

            i++;
        }

        return null;
    };

    ConflictDetector.prototype.skipString = function (content, startIndex, quote) {
        let i = startIndex + 1;
        while (i < content.length) {
            if (content[i] === '\\') {
                i += 2;
                continue;
            }
            if (content[i] === quote) return i + 1;
            i++;
        }
        return i;
    };

    ConflictDetector.prototype.skipLineComment = function (content, startIndex) {
        let i = startIndex + 2;
        while (i < content.length && content[i] !== '\n') i++;
        return i;
    };

    ConflictDetector.prototype.skipBlockComment = function (content, startIndex) {
        let i = startIndex + 2;
        while (i < content.length - 1) {
            if (content[i] === '*' && content[i + 1] === '/') return i + 2;
            i++;
        }
        return i;
    };

    ConflictDetector.prototype.extractMethodsFromClassBody = function (fileName, className, classBody) {
        const methodPattern = /^\s*(?!constructor\s*\(|get\s+|set\s+|static\s+|if\s*\(|else|while\s*\(|for\s*\(|switch\s*\(|return\s|super\s*\(|this\s*\.)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/gm;
        let match;
        let methodCount = 0;

        const reservedWords = ['if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'new', 'delete', 'void', 'super'];

        while ((match = methodPattern.exec(classBody)) !== null) {
            const methodName = match[1];
            if (reservedWords.indexOf(methodName) !== -1) continue;

            const fullMethodName = className + '.prototype.' + methodName;
            methodCount++;

            this.recordConflict({
                methodName: fullMethodName,
                pluginName: fileName,
                overrideType: 'class構文',
                isOverride: true
            });
        }

        debugLog(className, 'から', methodCount, '個のメソッドを検出');
    };

    ConflictDetector.prototype.recordConflict = function (data) {
        if (!this._conflictMap[data.methodName]) {
            this._conflictMap[data.methodName] = [];
        }
        this._conflictMap[data.methodName].push(data);
    };

    //-----------------------------------------------------------------------------
    // CSV Generator
    //-----------------------------------------------------------------------------

    function escapeCSVField(field) {
        return '"' + String(field).replace(/"/g, '""') + '"';
    }

    ConflictDetector.prototype.generateCSVReport = function () {
        return {
            pluginList: this.generatePluginListCSV(),
            details: this.generateDetailsCSV(),
            summary: this.generateSummaryCSV()
        };
    };

    ConflictDetector.prototype.generatePluginListCSV = function () {
        let csv = config.headerList.map(escapeCSVField).join(',') + '\n';
        const plugins = $plugins.filter(p => p.status);

        for (let i = 0; i < plugins.length; i++) {
            csv += escapeCSVField(i + 1) + ',' + escapeCSVField(plugins[i].name + '.js') + '\n';
        }
        return csv;
    };

    ConflictDetector.prototype.generateDetailsCSV = function () {
        let csv = config.headerDetails.map(escapeCSVField).join(',') + '\n';

        for (let i = 0; i < this._conflicts.length; i++) {
            const conflict = this._conflicts[i];
            const recordedPlugins = {};

            for (let j = 0; j < conflict.plugins.length; j++) {
                const plugin = conflict.plugins[j];

                if (!recordedPlugins[plugin.pluginName]) {
                    csv += escapeCSVField(conflict.methodName) + ',';
                    csv += escapeCSVField(plugin.pluginName) + '\n';
                    recordedPlugins[plugin.pluginName] = true;
                }
            }
        }

        return csv;
    };

    ConflictDetector.prototype.generateSummaryCSV = function () {
        let csv = config.headerSummary.map(escapeCSVField).join(',') + '\n';

        for (let i = 0; i < this._conflicts.length; i++) {
            const conflict = this._conflicts[i];
            const uniquePluginNames = conflict.uniquePlugins.join(config.pluginSeparator);
            csv += escapeCSVField(conflict.methodName) + ',';
            csv += escapeCSVField(conflict.pluginCount) + ',';
            csv += escapeCSVField(uniquePluginNames) + '\n';
        }

        return csv;
    };

    //-----------------------------------------------------------------------------
    // File I/O
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

            fs.writeFileSync(fullPath, '\uFEFF' + content, 'utf8');
            debugLog('ファイル書き込み成功:', filename);
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
            error: 'ブラウザ版では直接ファイル出力できません。'
        });
    };

    //-----------------------------------------------------------------------------
    // Dialog
    //-----------------------------------------------------------------------------

    function showReportDialog(reportData) {
        let message = '';

        if (reportData.success) {
            message += 'レポート出力完了\n\n';
            message += '出力先: ' + config.outputPath + '\n';
            message += '合計: ' + (reportData.conflictCount || 0) + '件のメソッドを検出\n\n';
            message += '詳しい使い方はプラグインのヘルプを参照してください。';
        } else {
            message += 'レポート出力失敗\n\n';
            message += 'エラー: ' + (reportData.error || '不明なエラー');
        }

        alert(message);
    }

    function logReportToConsole(reportData) {
        if (reportData.success) {
            console.log('[' + pluginName + '] レポート出力完了:', reportData.path);
            if (reportData.conflictCount > 0) {
                console.log('高リスク:', reportData.counts.high, '件 / 低リスク:', reportData.counts.low, '件');
            }
        } else {
            console.error('[' + pluginName + '] エラー:', reportData.error);
        }
    }

    //-----------------------------------------------------------------------------
    // Hooks
    //-----------------------------------------------------------------------------

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);

        if (config.outputTiming === OutputTiming.START) {
            setTimeout(function () {
                executeConflictDetection();
            }, 1000);
        }
    };

    if (config.outputTiming === OutputTiming.F8) {
        const _Input_onKeyDown = Input._onKeyDown;
        Input._onKeyDown = function (event) {
            _Input_onKeyDown.call(this, event);
            if (event.keyCode === 119) {
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
        if (!config.outputEnabled) {
            debugLog('出力が無効化されています');
            return;
        }

        if (reportGenerated) {
            debugLog('レポートは既に生成されています');
            return;
        }

        if (!FileWriter.isNodeJS()) {
            showReportDialog({
                success: false,
                error: '静的解析にはNode.js (PCバージョン) 環境が必要です。'
            });
            return;
        }

        conflictDetector = new ConflictDetector();
        const conflicts = conflictDetector.analyze();

        debugLog('検出されたメソッド数:', conflicts.length);

        const csvReport = conflictDetector.generateCSVReport();
        const counts = conflictDetector.getConflictCounts();

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
                    error: (results.pluginList && results.pluginList.error) ||
                        (results.details && results.details.error) ||
                        (results.summary && results.summary.error),
                    counts: counts,
                    conflictCount: conflicts.length
                };

                reportGenerated = true;

                if (config.showCompletionDialog) {
                    showReportDialog(reportData);
                } else {
                    logReportToConsole(reportData);
                }
            }
        }

        FileWriter.writeCSV('01_plugin_list.csv', csvReport.pluginList, function (result) {
            results.pluginList = result;
            checkCompletion();
        });

        FileWriter.writeCSV('02_method_details.csv', csvReport.details, function (result) {
            results.details = result;
            checkCompletion();
        });

        FileWriter.writeCSV('03_method_summary.csv', csvReport.summary, function (result) {
            results.summary = result;
            checkCompletion();
        });
    }

})();