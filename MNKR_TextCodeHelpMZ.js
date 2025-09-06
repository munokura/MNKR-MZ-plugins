/*
 * --------------------------------------------------
 * MNKR_TextCodeHelpMZ.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TextCodeHelpMZ.js
@plugindesc Displays help to make it easier to copy control character codes when entering text.
@author munokura
@license MIT License

@help
The help display for control characters that can be used in "Display Text" is
very difficult to read.
Also, control characters added in RPG Maker MZ have not been added to the
help.
(As of v1.0.2)

Right-clicking on the text editing screen will display "Plugin Help."
Copying control characters from this plugin's help will reduce typos.

Control Characters Added in MZ

\PX[n] Shifts the character position of the line horizontally by n pixels.
\PY[n] Shifts the character position of the line vertically by n pixels.
\FS[n] Sets the font size to n.

Continuation Control Characters from MV

\V[n] Replaced with the value of variable n.
\N[n] Replaced with the name of actor n.
\P[n] Replaced with the name of party member n.
\G Replaced with the currency unit.
\C[n] Displays the following text in color n. *See the color number chart at
the bottom.
\I[n] Replaces with icon number n.
\{ Increases text size by one level.
\} Decrease text size by one level.
\$ Opens the money window.
\\ Replaces with a backslash.
\. Waits 1/4 second.
\| Waits 1 second.
\! Waits for button input.
\> Instantly displays all characters on the same line.
\< Cancels the instant display effect.
\^ Does not wait for input after displaying text.

No plugin commands or settings.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on usage (commercial, R18, etc.).
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_TextCodeHelpMZ.js
@plugindesc 文章の入力時に制御文字のコードをコピーしやすくヘルプを表示します。
@author munokura

@help
「文章の表示」に使用できる制御文字のヘルプ表示は非常に見づらいです。
また、RPGツクールMZで追加された制御文字はヘルプに追加されていません。
（v1.0.2現在）

文章の編集画面で右クリックすると「プラグインヘルプ」が出ます。
このプラグインのヘルプから制御文字をコピーすれば、打ち間違いも減ります。

MZで追加された制御文字

\PX[n]    行の文字位置をnピクセル分、横にずらす。
\PY[n]    行の文字位置をnピクセル分、縦にずらす。
\FS[n]    フォントサイズをnサイズにする。


MVから継続の制御文字

\V[n]    変数 n 番の値に置き換えられます。
\N[n]    アクター n 番の名前に置き換えられます。
\P[n]    パーティーメンバー n 番の名前に置き換えられます。
\G       通貨単位に置き換えられます。
\C[n]    以降の文字色を n 番の色で表示します。※最下部に色番号表あり
\I[n]    アイコン n 番に置き換えられます。
\{       文字サイズを 1 段階大きくします。
\}       文字サイズを 1 段階小さくする。
\$       所持金のウィンドウを開きます。
\\       バックスラッシュに置き換えられます
\.       1/4 秒待ちます。
\|       1 秒待ちます。
\!       ボタンの入力を待ちます。
\>       同じ行にある文字を一瞬で表示します。
\<       文字を一瞬で表示する効果を取り消します。
\^       文章表示後の入力待ちをしません。

プラグインコマンドや設定はありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/