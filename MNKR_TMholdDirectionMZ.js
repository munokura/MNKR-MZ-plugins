/*
 * --------------------------------------------------
 * MNKR_TMholdDirectionMZ.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMholdDirectionMZ.js
@plugindesc Adds the ability to change the player's orientation without moving.
@author example
@license MIT License

@help
How to Use:

Hold down the S key and press the directional keys to change the player's
orientation without moving. When using the mouse (tap), click where the player
is to rotate 90 degrees clockwise.

You can set the key used to change orientation without moving by changing the
value of turnKeyCode. Do not set keys already used for standard functions,
such as X or Z.

# Contact Information
This is a plugin originally created for RPG Maker MV that has been ported to
MZ.
Please contact the modifier for any inquiries.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, R18, etc.).

@param turnKeyCode
@text Orientation change key
@desc Keys used to change orientation on the fly
@type string
@default S
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TMholdDirectionMZ.js
@author tomoaky (改変:munokura)
@plugindesc 移動せずにプレイヤーの向きだけを変える機能を追加します。

@help
使い方:

  Sキーを押しながら方向キーを押すと、移動せずにプレイヤーの向きだけを
  変えることができます。マウス(タップ)操作の場合はプレイヤーがいる場所
  をクリックすることで、時計回りに90度回転します。

  その場で移動せずに向きを変更する機能で使用するキーは turnKeyCode の値を
  変更することで設定できます。XやZなど標準機能で既に使用しているキーは
  設定しないでください。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param turnKeyCode
@text 向き変更キー
@desc その場で向き変更に使うキー
初期値: S
@default S
@type string
*/

//=============================================================================
// TMPlugin - 移動機能拡張
// バージョン: 1.3.1
// 最終更新日: 2017/06/16
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================



(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    //-----------------------------------------------------------------------------
    // Input
    //

    Input.keyMapper[parameters['turnKeyCode'].charCodeAt()] = 'turn';

    //-----------------------------------------------------------------------------
    // Game_Player
    //

    const _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function () {
        if (!this.isMoving() && this.canMove()) {
            const direction = this.getInputDirection();
            if (Input.isPressed('turn') && direction > 0) {
                this.setDirection(direction);
                return;
            }
            if (TouchInput.isTriggered() && $gameTemp.isDestinationValid()) {
                const x = $gameTemp.destinationX();
                const y = $gameTemp.destinationY();
                if (this.pos(x, y)) {
                    this.turnRight90();
                    return;
                }
            }
        }
        _Game_Player_moveByInput.call(this);
    };

})();