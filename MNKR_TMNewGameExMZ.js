/*
 * --------------------------------------------------
 * MNKR_TMNewGameExMZ.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMNewGameExMZ.js
@plugindesc Add a command to start the game on a different map to the title command.
@author munokura
@license MIT License

@help
How to Use:

Add as many commands as necessary (ex1 through ex5) to the plugin parameter
titleCommands (separated by a space).
You can also remove existing commands by deleting continue or options.

Next, set the command name and parameters you want to add.
For ex1, you'll need to set command1 and params1.
Enter the following four elements in params1, separated by a space:
Map number
X coordinate
Y coordinate
Player direction

The player direction is Down = 2
Left = 4
Right = 6
Up = 8.

There are no plugin commands.

# Using with Plugins with Similar Functions

When using with a plugin that adds title commands, add the symbol of the
command added by the other plugin to titleCommands.

(The symbol is the value of the second argument to addCommand.)

In this case, install MNKR_TMNewGameExMZ.js below the other plugins.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been adapted for
use with MZ.
Please contact the original author for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author, and there are no restrictions on its use (commercial, R18+, etc.).

@param titleCommands
@text Title command order
@desc Title command order
@type string
@default newGame continue options ex1

@param command1
@text Additional command 1 item name
@desc Additional command 1 item name
@type string
@default 別マップから

@param params1
@text Additional command 1 parameters
@desc Enter elements separated by spaces.
@type string
@default 1 4 5 6

@param command2
@text Additional command 2 item name
@desc Additional command 2 item name
@type string

@param params2
@text Additional command 2 parameters
@desc Enter elements separated by spaces.
@type string

@param command3
@text Additional command 3 item name
@desc Additional command 3 item name
@type string

@param params3
@text Additional command 3 parameters
@desc Enter elements separated by spaces.
@type string

@param command4
@text Additional command 4 item name
@desc Enter elements separated by spaces.
@type string

@param params4
@text Additional command 4 parameters
@desc Enter elements separated by spaces.
@type string

@param command5
@text Additional command 5 item name
@desc Additional command 5 item name
@type string

@param params5
@text Additional command 5 parameters
@desc Enter elements separated by spaces.
@type string
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMNewGameExMZ.js
@plugindesc タイトルコマンドに別マップからゲームを始めるコマンドを追加します。
@author tomoaky (改変:munokura)

@help
使い方:

  プラグインパラメータ titleCommands に ex1 ～ ex5 までを
  必要な分だけ追加してください。(半角スペースで区切る)
  continue や options を削除すれば、既存のコマンドを
  除外することもできます。

  次に、追加したいコマンド名とパラメータを設定してください、
  ex1 なら command1 と params1 の設定が必要になります。
  params1 に以下4要素を半角スペースで区切って入力します。
    マップ番号 X座標 Y座標 プレイヤーの向き

  プレイヤーの向きは 下=2 左=4 右=6 上=8 となっています。


  プラグインコマンドはありません。


# 類似機能をもつプラグインとの併用

  タイトルコマンドを追加するプラグインと併用する場合、titleCommands に
  他プラグインで追加されるコマンドのsymbol(シンボル)を追加してください。
  (symbol は addCommand の 2 番目の引数の値です)

  その際、MNKR_TMNewGameExMZ.js は他プラグインよりも下に導入してください。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param titleCommands
@text タイトルコマンドの並び順
@type string
@desc タイトルコマンドの並び順
初期値: newGame continue options ex1
@default newGame continue options ex1

@param command1
@text 追加コマンド 1 の項目名
@type string
@desc 追加コマンド 1 の項目名
初期値: 別マップから
@default 別マップから

@param params1
@text 追加コマンド 1 のパラメータ
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default 1 4 5 6

@param command2
@text 追加コマンド 2 の項目名
@type string
@desc 追加コマンド 2 の項目名
初期値:
@default

@param params2
@text 追加コマンド 2 のパラメータ
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default

@param command3
@text 追加コマンド 3 の項目名
@type string
@desc 追加コマンド 3 の項目名
初期値:
@default

@param params3
@text 追加コマンド 3 のパラメータ
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default

@param command4
@text 追加コマンド 4 の項目名
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default

@param params4
@text 追加コマンド 4 のパラメータ
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default

@param command5
@text 追加コマンド 5 の項目名
@type string
@desc 追加コマンド 5 の項目名
初期値:
@default

@param params5
@text 追加コマンド 5 のパラメータ
@type string
@desc 要素を半角スペース区切りで入力。
マップID X座標 Y座標 プレイヤーの向き
@default
*/

//=============================================================================
// TMPlugin - 別マップでニューゲーム
// バージョン: 2.0.0
// 最終更新日: 2017/10/04
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================



var Imported = Imported || {};
Imported.TMNewGameEx = true;

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const titleCommands = parameters['titleCommands'].split(' ');
    const commands = {};
    const transferParams = {};

    for (let i = 1; i < 6; i++) {
        commands['ex' + i] = parameters['command' + i];
        transferParams['ex' + i] = parameters['params' + i].split(' ').map(Number);
    }

    //-----------------------------------------------------------------------------
    // Window_TitleCommand
    //

    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function () {
        _Window_TitleCommand_makeCommandList.call(this);
        let listEx = [];
        for (let i = 0; i < titleCommands.length; i++) {
            for (let j = 0; j < this._list.length; j++) {
                if (titleCommands[i] === this._list[j].symbol) {
                    listEx.push({
                        name: this._list[j].name,
                        symbol: this._list[j].symbol,
                        enabled: this._list[j].enabled,
                        ext: this._list[j].ext
                    });
                }
            }
            if (commands[titleCommands[i]]) {
                listEx.push({
                    name: commands[titleCommands[i]],
                    symbol: titleCommands[i],
                    enabled: true,
                    ext: null
                });
            }
        }
        this._list = listEx;
    };

    //-----------------------------------------------------------------------------
    // Scene_Title
    //

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function () {
        _Scene_Title_createCommandWindow.call(this);
        for (let i = 1; i < 6; i++) {
            let symbol = 'ex' + i;
            this._commandWindow.setHandler(symbol, this.commandNewGameEx.bind(this, symbol));
        }
    };

    Scene_Title.prototype.commandNewGameEx = function (symbol) {
        DataManager.setupNewGame();
        $gamePlayer.reserveTransfer.apply($gamePlayer, transferParams[symbol]);
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

})();