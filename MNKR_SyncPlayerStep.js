/*
 * --------------------------------------------------
 * MNKR_SyncPlayerStep.js
 *   Ver.0.0.2
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SyncPlayerStep.js
@plugindesc Synchronizes the stepping animation of the player and follower.
@author munokura
@license MIT License

@help
# Features
By default,

Event Command
◆ Set Movement Route: Player (Wait)
: ◇ Walking Animation ON

When you have the player step, the follower's stepping will not synchronize.

This plugin synchronizes the follower's animation when walking in formation.

# Usage
## Event Command (Start Stepping)
◆ Set Movement Route: Player (Wait)
: ◇ Stepping Animation ON
Turn stepping on with this command.

## Event Command (Stop Stepping)
◆ Set Movement Route: Player (Wait)
: ◇ Stepping Animation OFF
Turn stepping off with this command.

There are no plugin commands.

# Terms of Use
MIT License.
https://licenses.opensource.jp/MIT/MIT.html
Modifications and redistribution are permitted without the author's
permission, and there are no restrictions on use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SyncPlayerStep.js
@plugindesc プレイヤーとフォロワーの足踏みアニメを同期します。
@author munokura

@help
# 機能
デフォルトでは、

イベントコマンド
◆移動ルートの設定：プレイヤー (ウェイト)
：　　　　　　　　：◇歩行アニメON

で、プレイヤーに足踏みをさせても、フォロワーの足並みが同期しません。


このプラグインは、隊列歩行時にフォロワーのアニメを同期させます。

# 使用方法
## イベントコマンド（足踏み開始）
◆移動ルートの設定：プレイヤー (ウェイト)
：　　　　　　　　：◇足踏みアニメON
で足踏みをONにしてください。

## イベントコマンド（足踏み停止）
◆移動ルートの設定：プレイヤー (ウェイト)
：　　　　　　　　：◇足踏みアニメOFF
で足踏みをOFFにしてください。

プラグインコマンドはありません。


# 利用規約
MITライセンスです。
https://licenses.opensource.jp/MIT/MIT.html
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    const _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function () {
        _Game_Follower_update.call(this);
        if (!$gamePlayer.isMoving()) {
            this._pattern = $gamePlayer._pattern;
            this._animeCount = $gamePlayer._animeCount;
        }
    };

})();