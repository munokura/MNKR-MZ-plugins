/*
 * --------------------------------------------------
 * MNKR_MKR_EventGaugeMZ.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MKR_EventGaugeMZ.js
@plugindesc Event gauge display
@author munokura
@license MIT License

@help
  Displays a gauge at the base of the specified event. (The display position
is adjustable.) The gauge's maximum value/remaining value is set by the value
(variables can be used) specified in the Event_Memo field when the event is
created (moving across the map). (If a variable is used for the gauge's
maximum value/remaining value,) the gauge's maximum value/remaining value
corresponds to the variable's value, and the variable value and the gauge's
remaining value are synchronized. (However, the gauge's remaining value will
never exceed the maximum value or fall below 0.) The gauge is hidden by making
the event transparent, and reappears when transparency is turned off. For
events (pages) without an event image, the gauge is not displayed. For events
using tileset images, you can set the gauge to display or not using plugin
parameters. (The top-left corner of tileset B is treated as an empty square,
and the gauge is not displayed.) However, if you hide the gauge using the
plugin/script command described below, you must also display the gauge using
the plugin/script command, regardless of whether transparency or an image is
set. When the event command [Temporarily Clear Event] is executed, the gauge
associated with that event will also be cleared. [Examples for copying and
pasting, memo field settings and commands] *The meaning of each item is
explained below. The content is on one line, so please copy and use the
example part of the line you need. Event_Memo field: <Egauge:vr10>
<Egauge:mvr11> <Egauge:vr10 mvr11> <Egauge:15> <Egauge:3 Wh20 Ht6>
<Egauge:vr12 Wh100 Ht10 Fx3 Vs0> <Egauge:5 Ys-50> <Egauge:vr5 Xs10 Ys10 Fx1
Fc3 Sc11 Bc7> <Egauge:50 op80>Plugin command (affects the gauges of the
executed event): Show gauge Hide gauge Increase/decrease remaining gauge A
specified amount of remaining gauge A specified maximum value of gauge Gauge X
coordinate offset Gauge Y coordinate offset Gauge background setting Specify
gauge display color 1 Specify gauge display color 2 Specify gauge opacity
Script command (affects the gauges of the event with the specified ID):
$gameMap.showGaugeWindow(1); $gameMap.hideGaugeWindow(1);
$gameMap.isHideGaugeWindow(1); $gameMap.addGaugeValue(1, 3);
$gameMap.addGaugeValue(this._eventId, 3); $gameMap.setGaugeValue(1, 5);
$gameMap.setGaugeValue(this._eventId, 5); $gameMap.setGaugeMaxValue(1, 5);
$gameMap.setGaugeOffsetX(1, 20); $gameMap.setGaugeOffsetY(1, 40);
$gameMap.setGaugeBackColor(1, 16); $gameMap.setGaugeColor1(1, 17);
$gameMap.setGaugeColor2(1, 17); $gameMap.addGaugeValue(1,
$gameVariables.value(10)); $gameMap.addGaugeValue(this._eventId,
$gameVariables.value(10)); $gameMap.setGaugeValue(1,
$gameVariables.value(15)); $gameMap.setGaugeMaxValue(1,
$gameVariables.value(20)); $gameMap.setOpacity(1, 255);About gauge colors:
This plugin requires that the gauge color number be specified in the plugin
parameters or memo field. (This can be changed later using script/plugin
commands.) The color numbers correspond to the colorful square frames in the
lower right corner of system/Window.png. The top left square frame (the white
square by default) is number 0, and numbers are counted to the right. The
bottom right is 31. The default color numbers 20 and 21 specified in the
plugin parameters Gauge_Color_1 and Gauge_Color_2 are the same colors as the
HP gauge displayed in menus, etc. (By default, a square frame is painted
reddish-yellow.) Similarly, the default color number 19 specified in the
plugin parameter Gauge_Back_Color is the same as the background color of the
gauge displayed in menus, etc. (By default, a square frame is painted navy
blue.) Event_Memo_Basic Settings: <Egauge:vr[Variable Number]> ・Displays a
gauge in the event. A variable is used for the remaining amount of the gauge.
Specify the variable number in the [Variable Number] part. ・Enter a value
greater than 0 for the variable used for the remaining amount of the gauge.
・If no maximum value for the gauge is specified, the value of the variable at
the time the event is generated will be used as the maximum value. (After
setting, the variable value will function as the remaining amount of the
gauge.) <Egauge:mvr[Variable Number]> ・Displays a gauge in the event. A
variable is used for the maximum value of the gauge. Specify the variable
number in the [Variable Number] part. ・Enter a value greater than 0 for the
variable used for the maximum value of the gauge. ・If no remaining amount of
the gauge is specified, the value of the variable at the time the event is
generated will be used as the remaining amount. (After setting, the variable
value will function as the gauge's maximum value) <Egauge:vr[variable number
1] mvr[variable number 2]> - Displays a gauge in an event. The gauge's
remaining amount/maximum value uses a variable. Specify the variable number in
the [variable number 1], [variable number 2] parts. - [Variable number 1] is
the variable used for the gauge remaining amount, and [Variable number 2] is
the variable used for the gauge's maximum value. - Enter a value greater than
0 for the variable used for the gauge remaining amount/maximum value. - If the
value of the variable set for the gauge remaining amount is greater than the
value of the variable set for the gauge's maximum value, the gauge's maximum
value will automatically be set as the remaining amount. <Egauge:[number]> -
Displays a gauge in an event. [number] becomes the gauge's maximum/remaining
amount. You can also set the gauge remaining amount and maximum value using
the commands described below. Use this if you do not want to use variables. -
Enter a value greater than 0 for the [number] used for the gauge's maximum
value. * Two patterns are provided for specifying the gauge value: using
variables and numbers. However, if both are specified, the variable setting
takes precedence. It is possible to change the value specification method for
each event, so please use either one or the other when setting up. Memo
field_options (separate each option with a space): Wh[number] - Specify the
length of the gauge using a number. Ht[number] - Specify the height of the
gauge using a number. Xs[number] - Shifts the X coordinate of the gauge by
[number]. (Positive value moves to the right, negative value moves to the
left) Ys[number] - Shifts the Y coordinate of the gauge by [number]. (Positive
value moves down, negative value moves up) Vs[number from 0 to 1] - Specifies
the initial display state of the gauge. 0: The gauge is hidden when the event
is created. 1: The gauge is displayed when the event is created. Fx[number
from 1 to 3] - Fixed the gauge to the bottom of the screen. (The default
setting is a 20px margin between the bottom of the gauge and the screen.) -
The gauge's X coordinate varies depending on [a number from 1 to 3]. 1: The
gauge is positioned so that there is a 20px margin on the left side of the
screen and on the left side of the gauge. 2: The gauge is displayed in the
center of the screen, taking into account its length. 3: The gauge is
positioned so that there is a 20px margin on the right side of the screen and
on the right side of the gauge. The margin value varies depending on the gauge
offset. Fc[number] - Specifies gauge color 1 using a number. (This takes
precedence over the Gauge_Color_1 plugin parameter setting.) Sc[number] -
Specifies gauge color 2 using a number. - If you do not need a gauge gradient,
specify the same number as Gauge Color 1. (This takes precedence over the
Gauge_Color_2 plugin parameter setting.) Bc[number] - Specifies the gauge
background color using a number. (This takes precedence over the
Gauge_Back_Color plugin parameter setting.) Op[number] - Specifies the gauge
opacity using a number. (This takes precedence over the Gauge_Opacity setting
in the plugin parameters.) Examples of settings in the Event_Memo field:
<Egauge:vr10> - Displays a gauge in the event. The value of variable 10 is
reflected for both the maximum value and remaining amount of the gauge. (The
remaining amount of the gauge changes depending on fluctuations in the
variables.) <Egauge:mvr11> - Displays a gauge in the event. The value of
variable 11 is reflected for both the maximum value and remaining amount of
the gauge. (The maximum value of the gauge changes depending on fluctuations
in the variables.) <Egauge:vr10 mvr11> - Displays a gauge in the event. The
maximum value of the gauge is reflected by the value of variable 11, and the
remaining amount is reflected by the value of variable 10. (The maximum value
of the gauge changes depending on fluctuations in variable 11, and the
remaining amount changes depending on fluctuations in variable 10.)
<Egauge:15> - Displays a gauge in the event. The gauge display is set to a
maximum value of 15 and a remaining amount of 15. <Egauge:3 Wh20 Ht6> -
Displays a gauge in the event. The gauge display is set to a maximum value of
3 and a remaining amount of 3. - The gauge length is 20px and the height is
6px. <Egauge:vr20 Xs30 Ys-40> - Displays a gauge in an event. The value of
variable 20 is reflected in the gauge display for both maximum value and
remaining amount. (The remaining amount of the gauge will change when the
variable changes.) - The gauge's X coordinate is displayed as +30px by
default, and its Y coordinate is displayed as -40px by default. <Egauge:200
Wh300 Ht10 Xs-10 Ys-10 Fx1> - The gauge is displayed fixedly at the bottom,
left side of the screen. The gauge display is set to a maximum value of 200
and a remaining amount of 200. - The gauge length is displayed as 300px, the
height is 10px, the X coordinate is displayed as -10px by default, and the Y
coordinate is displayed as -10px by default. <Egauge:vr5 Xs10 Ys10 Fx1 Fc3
Sc11 Bc7> - Displays a gauge fixed at the bottom right of the screen. The
gauge's maximum value and remaining amount are reflected by variable 5. (The
remaining amount of the gauge changes when the variable fluctuates.) - The
gauge length and height are default, with the X coordinate set to default
+10px and the Y coordinate set to default +10px. - The gauge's color 1 is
drawn using color 3, color 2 using color 11, and the gauge background using
color 7. Script Command: *When using this command, replace [] with the actual
value or script. $gameMap.showGaugeWindow([Event ID]); - Sets the gauge for
the specified [Event ID] to visible. - By setting [Event ID] to this._eventId,
the event that executed the command will be targeted. - If the event is
transparent and the event image is not set, the gauge will not be displayed
even when the command is executed. - If the gauge is hidden, you can use this
command to set it to visible.・If gauge display is not set in the event_memo
field, nothing will change. $gameMap.hideGaugeWindow([event ID]); ・Hides the
gauge for the specified [event ID]. ・By setting [event ID] to this._eventId,
the event that executed the command will be targeted. ・If the event is not
transparent and an event image is set, the gauge will be hidden by executing
the command. ・If gauge display is not set in the event_memo field, nothing
will change. $gameMap.isHideGaugeWindow([event ID]); ・Returns true if the
gauge for the specified [event ID] is hidden, false if it is displayed. ・By
setting [event ID] to this._eventId, the event that executed the command will
be targeted. ・If gauge display is not set in the event_memo field, false will
be returned. $gameMap.addGaugeValue([event ID], [number]);
・Increases/decreases the remaining gauge value for the specified [event ID] by
the specified [number]. (If [Number] is a negative value, it will
decrease.)・By setting [Event ID] to this._eventId, the event that executed the
command will be the target.・By using the script $gameVariables.value(n)
instead of [Number], you can increase/decrease the value of variable n.・If the
gauge remaining amount is determined by a variable, this command will change
the variable's value.・The gauge remaining amount will never exceed the maximum
value, nor will it fall below 0.・If gauge display is not set in the event_memo
field, no change will occur. $gameMap.setGaugeValue([Event ID],
[Number]);・Sets the gauge remaining amount of the specified [Event ID] to the
specified [Number]. ([Number] must be a value greater than or equal to 0.
Also, the gauge remaining amount will never exceed the maximum value.)・By
setting [Event ID] to this._eventId, the event that executed the command will
be the target.・By using the script $gameVariables.value(n) instead of
[Number], you can set the gauge remaining amount to the value of variable
n.・If the gauge remaining amount is determined by a variable, this command
will change the variable's value. ・If gauge display is not set in the
event_memo field, nothing will change. $gameMap.setGaugeMaxValue([Event ID],
[Number]); ・Sets the maximum gauge value for the specified [Event ID] to the
specified [Number]. ([Number] must be a value greater than 0.) ・By setting
[Event ID] to this._eventId, the event that executed the command will be
targeted. ・By using the script $gameVariables.value(n) instead of [Number],
you can set the value of variable n to the maximum gauge value. ・If the
maximum gauge value is lower than the gauge remaining amount, this command
will make the gauge remaining amount the same as the maximum gauge value. ・If
the gauge maximum value/remaining amount is determined by a variable, this
command will change the variable's value. ・If gauge display is not set in the
event_memo field, nothing will change. $gameMap.getGaugeValue([Event ID]);
・Returns the remaining gauge value for the specified [Event ID]. ・By setting
[Event ID] to this._eventId, the event that executed the command will be
targeted.・If the gauge remaining amount is determined by a variable, the
returned value is the same as the variable value. ・If gauge display is not set
in the event_memo field, it returns -1. $gameMap.getGaugeMaxValue([Event ID]);
・Returns the maximum gauge value for the specified [Event ID]. ・If [Event ID]
is set to 0, it will target the event that executed the command. ・If gauge
display is not set in the event_memo field, it will return -1.
$gameMap.setGaugeOffsetX([Event ID], [Number]); ・Sets the gauge X coordinate
offset for the specified [Event ID] to the specified [Number]. ・Gauges with an
offset specified will be displayed shifted horizontally from their original
drawing position by the specified [Number]. ・By setting [Event ID] to
this._eventId, it will target the event that executed the command. ・By using
the script $gameVariables.value(n) instead of [Number], you can set the value
of variable n to the gauge offset. $gameMap.setGaugeOffsetY([Event ID],
[Number]); - Sets the gauge Y coordinate offset for the specified [Event ID]
to the specified [Number]. ・Gauges with an offset specified will be displayed
vertically offset from their original drawing position by the specified
[number]. ・By setting [Event ID] to this._eventId, the event that executed the
command will be targeted. ・By using the script $gameVariables.value(n) instead
of [number], you can set the value of variable n to the gauge offset.
$gameMap.setGaugeBackColor([Event ID], [number]); ・Sets the gauge background
color number of the specified [Event ID] to the specified [number]. ・By
setting [Event ID] to this._eventId, the event that executed the command will
be targeted. ・By using the script $gameVariables.value(n) instead of [number],
you can set the value of variable n to the gauge background color number.
$gameMap.setGaugeColor1([Event ID], [number]); ・Sets the gauge display color
number of the specified [Event ID] to the specified [number]. ・By setting
[Event ID] to this._eventId, the event that executed the command will be
targeted.・By using the script $gameVariables.value(n) instead of [number], you
can set the value of variable n to the gauge display color number.
$gameMap.setGaugeColor2([Event ID], [Number]); ・Sets the gauge display color
number of the specified [Event ID] to the specified [Number]. ・If you don't
need a gauge gradient, specify the same number as Gauge Color 1. ・By setting
[Event ID] to this._eventId, the event that executed the command will be the
target. ・By using the script $gameVariables.value(n) instead of [number], you
can set the value of variable n to the gauge display color number.
$gameMap.setGaugeOpacity([Event ID], [Number]); ・Sets the gauge opacity of the
specified [Event ID] to the specified [Number]. ([Number] must be a value
between 0 and 255.) ・By setting [Event ID] to this._eventId, the event that
executed the command will be the target.・By using the script
$gameVariables.value(n) instead of [number], you can set the value of variable
n to the gauge opacity. Note: ・The settings in the memo field and plugin
commands for this plugin are not case-sensitive. ・Plugin parameter
descriptions marked [Default value] can be set individually in the event memo
field. Please note that if set, the memo field setting will take precedence
over the [Default value]. # Contact Information This is a plugin originally
created for RPG Maker MV ported for MZ. Please contact the modifier for any
inquiries. # Terms of Use MIT License.
http://opensource.org/licenses/mit-license.php Modifications and
redistribution are permitted without permission from the author, and there are
no restrictions on usage (commercial, 18+ use, etc.).

@param Gauge_Width
@text Gauge Width
@desc [Initial value] Specify the gauge length as a number. (Default: 40)
@default 40

@param Gauge_Height
@text Gauge Height
@desc [Initial value] Specify the height of the gauge as a number. (Default: 10)
@default 10

@param Gauge_Offset_X
@text Gauge Offset X
@desc [Initial value] Specify whether to shift the gauge X coordinate. (Positive value moves it to the right, negative value moves it to the left) (Default: 0)
@default 0

@param Gauge_Offset_Y
@text Gauge offset Y
@desc [Initial value] Specify whether to shift the Y-coordinate of the gauge. (Positive value moves it down, negative value moves it up) (Default: 0)
@default 0

@param Gauge_Visible
@text Gauge visibility
@desc [Initial value] Specify true if you want the gauge to be displayed from the beginning, or false if you want it to be displayed later. (Default: true)
@type boolean
@on Initial display
@off Do not display initially
@default true

@param Gauge_Color_1
@text Gauge Color 1
@desc [Initial value] Specifies the gauge display color number. (See system/Window.png for the actual color) (Default: 20)
@default 20

@param Gauge_Color_2
@text Gauge Color 2
@desc [Initial Value] Specify the gauge display color number. (This item is for gradation) (Default: 21)
@default 21

@param Gauge_Back_Color
@text Gauge Background Color
@desc Specify the display color number of the gauge background. (The entire gauge is painted in the background color, and the remaining amount is painted in the gauge display color.) (Default: 19)
@default 19

@param Gauge_Opacity
@text Gauge Opacity
@desc [Initial Value] Specify the opacity of the gauge (0 to 255). (0 makes the gauge transparent) (Default: 255)
@default 255

@param Gauge_In_Picture
@text Gauge picture
@desc Displays the gauge above the picture with the specified number. (If 0, the gauge will be displayed below all pictures.) (Default: 0)
@default 0

@param Tile_Gauge_Enable
@text Enable Tile Gauge
@desc Select whether to display a gauge for the tile set image event. (Default: Do not display)
@type boolean
@on Display
@off Do not display
@default false

@command show
@text Show Gauge
@desc Set the gauge for the executed event to be displayed.

@command hide
@text Hide Gauge
@desc Hides the gauge for the executed event.

@command add
@text Increase/Decrease remaining gauge
@desc Increases/decreases the remaining gauge for the executed event.
@arg value
@text Amount of change
@desc The amount of change in the remaining gauge. (If the [number] is a negative value, it will decrease.)
@default 0

@command set
@text Gauge remaining amount to specified value
@desc Sets the gauge remaining capacity to the specified value.
@arg value
@text Specified value
@desc The specified value for the remaining gauge amount. ([Number] must be a value greater than or equal to 0. The remaining amount will never exceed the maximum value of the gauge.)
@default 0

@command maxset
@text Set the gauge maximum value to the specified value.
@desc Sets the gauge maximum to the specified value.
@arg value
@text Specified value
@desc The maximum value of the gauge (please specify a value greater than 0).
@default 1

@command setx
@text Gauge X coordinate offset
@desc Sets the gauge X coordinate offset.
@arg value
@text Offset amount
@desc The image will be shifted horizontally from the default position (positive: right / negative: left).
@default 0

@command sety
@text Gauge Y coordinate offset
@desc Sets the gauge Y coordinate offset.
@arg value
@text Offset amount
@desc It is displayed vertically shifted from the default drawing position (positive: below / negative: above).
@default 0

@command backcolor
@text Gauge background settings
@desc Sets the gauge background.
@arg value
@text Background Color Number
@desc Specifies the background color number.
@default 0

@command color1
@text Specify gauge display color 1
@desc Specifies gauge display color 1.
@arg value
@text Gauge display color 1 number
@desc Specify the gauge display color 1 number.
@default 0

@command color2
@text Specify gauge display color 2
@desc Specifies gauge display color 2.
@arg value
@text Gauge display color 2 number
@desc Specify gauge display color 2 number.
@default 0

@command opacity
@text Specify the gauge opacity
@desc Specifies the gauge opacity.
@arg value
@text Gauge Opacity
@desc Specify opacity (value between 0-255).
@default 0
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MKR_EventGaugeMZ.js

@plugindesc イベントゲージ表示
@author マンカインド (改変:munokura)

@help
指定したイベントの足元にゲージを表示します。(表示位置は調節が可能)
ゲージの最大値/残量はイベント生成(マップ移動)時に
イベント_メモ欄で指定した値(変数も使用可能)で設定されます。

(ゲージ最大値/残量に変数を使用した場合、)
ゲージ最大値/残量は変数の値に対応し、変数の値とゲージ残量が同期します。
(ただし、ゲージ残量は最大値より上になることは無く、
 0より小さくなることもありません)

ゲージはイベントの透明化によって非表示になり、
透明化を解除すると再表示されます。

イベント画像が設定されていないイベント(ページ)の場合、
ゲージは表示されません。
タイルセット画像を使ったイベントの場合、
プラグインパラメータでゲージを表示させるか設定することが可能です。
(タイルセットBの一番左上は[何もない]マス扱いとなりゲージが表示されません)

ただし、後述するプラグイン/スクリプトコマンドで
ゲージを非表示設定にした場合は透明化や画像設定の有無に関わらず、
プラグイン/スクリプトコマンドでゲージを表示設定にする必要があります。

イベントコマンド[イベントの一時消去]が実行されると、そのイベントに紐づく
ゲージも一緒に消去されます。


[コピペ用使用例、メモ欄設定・コマンド]
  ※各項目の意味は後述しています。
    内容は1行毎になっていますので、
    必要な行の使用例部分をコピーしてお使いください。

  イベント_メモ欄:
    <Egauge:vr10>
    <Egauge:mvr11>
    <Egauge:vr10 mvr11>
    <Egauge:15>
    <Egauge:3 Wh20 Ht6>
    <Egauge:vr12 Wh100 Ht10 Fx3 Vs0>
    <Egauge:5 Ys-50>
    <Egauge:vr5 Xs10 Ys10 Fx1 Fc3 Sc11 Bc7>
    <Egauge:50 op80>

  プラグインコマンド(実行したイベントが持つゲージに対して効果を発揮):
    ゲージを表示
    ゲージを非表示
    ゲージ残量を増加/減少
    ゲージ残量を指定値
    ゲージ最大値を指定値
    ゲージX座標オフセット
    ゲージY座標オフセット
    ゲージ背景設定
    ゲージ表示色1を指定
    ゲージ表示色2を指定
    ゲージ不透明度を指定

  スクリプトコマンド(指定したIDのイベントが持つゲージに対して効果を発揮):
    $gameMap.showGaugeWindow(1);
    $gameMap.hideGaugeWindow(1);
    $gameMap.isHideGaugeWindow(1);
    $gameMap.addGaugeValue(1, 3);
    $gameMap.addGaugeValue(this._eventId, 3);
    $gameMap.setGaugeValue(1, 5);
    $gameMap.setGaugeValue(this._eventId, 5);
    $gameMap.setGaugeMaxValue(1, 5);
    $gameMap.setGaugeOffsetX(1, 20);
    $gameMap.setGaugeOffsetY(1, 40);
    $gameMap.setGaugeBackColor(1, 16);
    $gameMap.setGaugeColor1(1, 17);
    $gameMap.setGaugeColor2(1, 17);
    $gameMap.addGaugeValue(1, $gameVariables.value(10));
    $gameMap.addGaugeValue(this._eventId, $gameVariables.value(10));
    $gameMap.setGaugeValue(1, $gameVariables.value(15));
    $gameMap.setGaugeMaxValue(1, $gameVariables.value(20));
    $gameMap.setOpacity(1, 255);


ゲージの色について:
  このプラグインでは、ゲージの色番号をプラグインパラメーターまたはメモ欄で
  指定する必要があります。
  (スクリプト/プラグインコマンドによって後からでも変更可能です)

  色番号はsystem/Window.pngの右下側にある
  色とりどりの四角い枠群に対応しています。

  四角い枠群の左上(デフォルトだと白く塗られている四角い枠)を0番として
  右に向かって数えていきます。一番右下が31です。

  プラグインパラメーター
    Gauge_Color_1
    Gauge_Color_2
  で指定されているデフォルト値である色番号20と21は、
  メニュー等で表示されるHPゲージの色と同じものです。
  (デフォルトだと赤みがかった黄色で塗られている四角い枠)

  同じく、プラグインパラメーター
    Gauge_Back_Color
  で指定されているデフォルト値である色番号19は、
  メニュー等で表示されるゲージの背景色と同じものです。
  (デフォルトだと紺色で塗られている四角い枠)


イベント_メモ欄_基本設定:
  <Egauge:vr[変数番号]>
    ・イベントにゲージを表示します。ゲージの残量は変数を使用します。
      [変数番号]の部分に変数の番号を指定。

    ・ゲージ残量に使用する変数は0より大きい値を入れてください。

    ・ゲージ最大値の指定がされていない場合、
      イベント生成時点の変数の値を最大値として設定します。
      (設定後、変数の値はゲージ残量として機能します)

  <Egauge:mvr[変数番号]>
    ・イベントにゲージを表示します。ゲージの最大値は変数を使用します。
      [変数番号]の部分に変数の番号を指定。

    ・ゲージ最大値に使用する変数は0より大きい値を入れてください。

    ・ゲージ残量の指定がされていない場合、
      イベント生成時点の変数の値を残量として設定します。
      (設定後、変数の値はゲージ最大値として機能します)

  <Egauge:vr[変数番号1] mvr[変数番号2]>
    ・イベントにゲージを表示します。ゲージの残量/最大値は変数を使用します。
      [変数番号1],[変数番号2]の部分に変数の番号を指定。

    ・[変数番号1]がゲージ残量として使われる変数、
      [変数番号2]がゲージ最大値として使われる変数になります。

    ・ゲージ残量/最大値に使用する変数は0より大きい値を入れてください。

    ・ゲージ残量に設定された変数の値が
      ゲージ最大値に設定された変数の値より大きい場合、
      自動的にゲージ最大値の値が残量として設定されます。

  <Egauge:[数字]>
    ・イベントにゲージを表示します。[数字]がゲージの最大値・残量になります。
      ゲージ残量の設定、最大値の設定は後述するコマンドでも可能です。
      変数を利用したくない場合はこちらをご使用ください。

    ・ゲージ最大値に使用する[数字]は0より大きい値を入れてください。

  ※ ゲージの値指定に変数と数字を使う2パターンを用意しましたが、
     両方指定した場合は変数設定が優先されます。

     イベント毎に値指定方法を変えることは可能ですので、
     どちらか片方を使い設定を行ってください。


メモ欄_オプション(各オプションはスペースで区切る):
  Wh[数字]
    ・ゲージの長さを数字で指定します。

  Ht[数字]
    ・ゲージの高さを数字で指定します。

  Xs[数字]
    ・ゲージX座標を[数字]分、ズラして表示します。
      (プラス値で右へ、マイナス値で左に)

  Ys[数字]
    ・ゲージY座標を[数字]分、ズラして表示します。
      (プラス値で下へ、マイナス値で上に)

  Vs[0～1の数字]
    ・ゲージの初期表示状態を指定します。
        0 : イベント生成時、ゲージは非表示設定です。
        1 : イベント生成時、ゲージは表示設定です。

  Fx[1～3の数字]
    ・ゲージを画面下側に固定表示します。
      (デフォルト設定でゲージ底辺と画面との余白が20pxになります)

    ・ゲージのX座標は[1～3の数字]によって変わり、
        1 : 画面左側とゲージ左辺の余白が20pxになるよう配置されます。
        2 : ゲージの長さを考慮して画面中央に表示されます。
        3 : 画面右側とゲージ右辺の余白が20pxになるよう配置されます。
      ゲージオフセットによって余白の数値は変化します。

  Fc[数字]
    ・ゲージカラー1を数字で指定します。
      (プラグインパラメーターのGauge_Color_1設定より優先されます)

  Sc[数字]
    ・ゲージカラー2を数字で指定します。

    ・ゲージのグラデーションが必要ない場合は
      ゲージカラー1と同じ数字を指定します。
      (プラグインパラメーターのGauge_Color_2設定より優先されます)

  Bc[数字]
    ・ゲージ背景カラーを数字で指定します。
      (プラグインパラメーターのGauge_Back_Color設定より優先されます)

  Op[数字]
    ・ゲージ不透明度を数字で指定します。
      (プラグインパラメーターのGauge_Opacity設定より優先されます)


イベント_メモ欄の設定例:
  <Egauge:vr10>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値/残量ともに変数10番の値が反映されます。
      (変数の変動によりゲージ残量が変化します)

  <Egauge:mvr11>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値/残量ともに変数11番の値が反映されます。
      (変数の変動によりゲージ最大値が変化します)

  <Egauge:vr10 mvr11>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値が変数11番、残量が変数10番の値で反映されます。
      (変数11番の変動によりゲージ最大値が、
       変数10番の変動により残量が変化します)

  <Egauge:15>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値15、残量15で設定されます。

  <Egauge:3 Wh20 Ht6>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値3、残量3で設定されます。
    ・ゲージの長さを20px、高さを6pxで表示します。

  <Egauge:vr20 Xs30 Ys-40>
    ・イベントにゲージを表示します。
      ゲージの表示は最大値/残量ともに変数20番の値が反映されます。
      (変数が変動するとゲージ残量が変化します)
    ・ゲージのX座標をデフォルト+30px、Y座標をデフォルト-40pxで表示します。

  <Egauge:200 Wh300 Ht10 Xs-10 Ys-10 Fx1>
    ・画面下、左側固定でゲージを表示します。
      ゲージの表示は最大値200、残量200で設定されます。
    ・ゲージの長さを300px、高さを10px、
      X座標をデフォルト-10px、Y座標をデフォルト-10pxで表示します。

  <Egauge:vr5 Xs10 Ys10 Fx1 Fc3 Sc11 Bc7>
    ・画面下、右側固定でゲージを表示します。
      ゲージの表示は最大値/残量ともに変数5番の値が反映されます。
      (変数が変動するとゲージ残量が変化します)
    ・ゲージの長さ、高さはデフォルト、
      X座標をデフォルト+10px、Y座標をデフォルト+10pxで表示します。
    ・ゲージのカラー1を3番、カラー2を11番、ゲージ背景を7番の色で描画します。


スクリプトコマンド:
    ※使用する際は、[]を実際の値やスクリプトに置き換えてください。
  $gameMap.showGaugeWindow([イベントID]);
    ・指定した[イベントID]のゲージを表示設定にします。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・イベントが透明、イベント画像が未設定のとき、コマンドを実行しても
      ゲージは表示されません。

    ・ゲージが非表示設定になっている場合、
      このコマンドで表示設定にすることが可能です。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、何も変化しません。

  $gameMap.hideGaugeWindow([イベントID]);
    ・指定した[イベントID]のゲージを非表示設定にします。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・イベントが透明ではない、イベント画像が設定されているとき、
      コマンドの実行によりゲージが非表示になります。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、何も変化しません。

  $gameMap.isHideGaugeWindow([イベントID]);
    ・指定した[イベントID]のゲージが非表示設定であればtrue、
      表示設定であればfalseを返します。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、falseが返ります。

  $gameMap.addGaugeValue([イベントID], [数字]);
    ・指定した[イベントID]のゲージ残量を指定した[数字]分、
      増加/減少させます。([数字]がマイナス値だと減少します)

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値を増加/減少させることができます。

    ・変数によってゲージ残量が決められている場合、このコマンドによって
      変数の値が変化します。

    ・ゲージ残量は最大値より多くなることはなく、
      0より小さくなることもありません。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、何も変化しません。

  $gameMap.setGaugeValue([イベントID], [数字]);
    ・指定した[イベントID]のゲージ残量を指定した[数字]に設定します。
      ([数字]は0以上の値を指定。
       また、ゲージ最大値より残量が多くなることはありません)

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ残量に設定することができます。

    ・変数によってゲージ残量が決められている場合、このコマンドによって
      変数の値が変化します。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、何も変化しません。

  $gameMap.setGaugeMaxValue([イベントID], [数字]);
    ・指定した[イベントID]のゲージ最大値を指定した[数字]に設定します。
      ([数字]は0より大きい値を指定してください)

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ最大値に設定することができます。

    ・ゲージ最大値がゲージ残量を下回る場合、このコマンドによって
      ゲージ残量がゲージ最大値と同じになります。

    ・変数によってゲージ最大値/残量が決められている場合、
      このコマンドによって変数の値が変化します

    ・イベント_メモ欄にゲージ表示が設定されていない場合、何も変化しません。

  $gameMap.getGaugeValue([イベントID]);
    ・指定した[イベントID]のゲージ残量を返します。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・変数によってゲージ残量が決められている場合、
      返ってくる値は変数の値と同じです。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、-1を返します。

  $gameMap.getGaugeMaxValue([イベントID]);
    ・指定した[イベントID]のゲージ最大値を返します。

    ・[イベントID]を0にすると、コマンドを実行したイベントを対象にします。

    ・イベント_メモ欄にゲージ表示が設定されていない場合、-1を返します。

  $gameMap.setGaugeOffsetX([イベントID], [数字]);
    ・指定した[イベントID]のゲージX座標オフセットを
      指定した[数字]に設定します。

    ・オフセットが指定されたゲージは指定された[数字]分、
      本来の描画位置から横方向にズレて表示されます。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージオフセットに設定することができます。

  $gameMap.setGaugeOffsetY([イベントID], [数字]);
    ・指定した[イベントID]のゲージY座標オフセットを
      指定した[数字]に設定します。

    ・オフセットが指定されたゲージは指定された[数字]分、
      本来の描画位置から縦方向にズレて表示されます。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージオフセットに設定することができます。

  $gameMap.setGaugeBackColor([イベントID], [数字]);
    ・指定した[イベントID]のゲージ背景色番号を指定した[数字]に設定します。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ背景色番号に設定することができます。

  $gameMap.setGaugeColor1([イベントID], [数字]);
    ・指定した[イベントID]のゲージ表示色番号を指定した[数字]に設定します。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ表示色番号に設定することができます。

  $gameMap.setGaugeColor2([イベントID], [数字]);
    ・指定した[イベントID]のゲージ表示色番号を指定した[数字]に設定します。

    ・ゲージのグラデーションが必要ない場合は
      ゲージカラー1と同じ数字を指定します。

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ表示色番号に設定することができます。

  $gameMap.setGaugeOpacity([イベントID], [数字]);
    ・指定した[イベントID]のゲージ不透明度を指定した[数字]に設定します。
      ([数字]は0-255の間の値を指定してください)

    ・[イベントID]をthis._eventIdにすることで、
      コマンドを実行したイベントを対象にします。

    ・[数字]の代わりにスクリプト$gameVariables.value(n)を使うことで、
      変数n番の値をゲージ不透明度に設定することができます。


補足：
  ・このプラグインに関するメモ欄の設定、プラグインコマンドは
    大文字/小文字を区別していません。

  ・プラグインパラメーターの説明に、[初期値]と書かれているものは
    イベントのメモ欄で個別に設定が可能です。
    設定した場合、[初期値]よりメモ欄の設定が
    優先されますのでご注意ください。


# 問い合わせ先
これはRPGツクールMV用に作成されたプラグインをMZ用に移植したものです。
お問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param Gauge_Width
@text ゲージ幅
@desc [初期値] ゲージの長さを数値で指定。(デフォルト:40)
@default 40

@param Gauge_Height
@text ゲージ高
@desc [初期値] ゲージの高さを数値で指定。(デフォルト:10)
@default 10

@param Gauge_Offset_X
@text ゲージオフセットX
@desc [初期値] ゲージX座標をズラして表示する場合は指定。(プラス値で右へ、マイナス値で左に)(デフォルト:0)
@default 0

@param Gauge_Offset_Y
@text ゲージオフセットY
@desc [初期値] ゲージY座標をズラして表示する場合は指定。(プラス値で下へ、マイナス値で上に)(デフォルト:0)
@default 0

@param Gauge_Visible
@text ゲージ可視
@desc [初期値] 初めからゲージを表示しておく場合はtrue、後から表示させる場合はfalseを指定。(デフォルト:true)
@type boolean
@on 初期表示する
@off 初期表示させない
@default true

@param Gauge_Color_1
@text ゲージ色1
@desc [初期値] ゲージの表示色番号を指定。(実際に表示される色はsystem/Window.pngを参照してください)(デフォルト:20)
@default 20

@param Gauge_Color_2
@text ゲージ色2
@desc [初期値] ゲージの表示色番号を指定。(この項目はグラデーション用です)(デフォルト:21)
@default 21

@param Gauge_Back_Color
@text ゲージ背景色
@desc ゲージ背景の表示色番号を指定。(ゲージ全体が背景色で塗られ、残量分がゲージ表示色で塗られます)(デフォルト:19)
@default 19

@param Gauge_Opacity
@text ゲージ不透明度
@desc [初期値] ゲージの不透明度(0～255)を指定。(0でゲージが透明になります)(デフォルト:255)
@default 255

@param Gauge_In_Picture
@text ゲージのピクチャ
@desc 指定した番号のピクチャーよりゲージを上に表示します。(0の場合、ゲージは全ピクチャーの下に表示)(デフォルト:0)
@default 0

@param Tile_Gauge_Enable
@text タイルゲージ有効化
@desc タイルセット画像のイベントにゲージを表示させるか選択します。(デフォルト:表示させない)
@type boolean
@on 表示させる
@off 表示させない
@default false


@command show
@text ゲージを表示
@desc 実行したイベントのゲージを表示設定にします。


@command hide
@text ゲージを非表示
@desc 実行したイベントのゲージを非表示設定にします。


@command add
@text ゲージ残量を増加/減少
@desc 実行したイベントのゲージ残量を増加/減少させます。

@arg value
@text 変化量
@desc ゲージ残量の変化量。([数字]がマイナス値だと減少します)
@default 0


@command set
@text ゲージ残量を指定値
@desc ゲージ残量を指定した値に設定します。

@arg value
@text 指定値
@desc ゲージ残量の指定値。([数字]は0以上の値を指定。ゲージ最大値より残量が多くなることはありません)
@default 0


@command maxset
@text ゲージ最大値を指定値
@desc ゲージ最大値を指定した値に設定します。

@arg value
@text 指定値
@desc ゲージ最大値の指定値。(0より大きい値を指定してください)
@default 1


@command setx
@text ゲージX座標オフセット
@desc ゲージX座標オフセットを設定します。

@arg value
@text オフセット量
@desc デフォルトの描画位置から横方向にズレて表示されます。(正:右 / 負:左)
@default 0


@command sety
@text ゲージY座標オフセット
@desc ゲージY座標オフセットを設定します。

@arg value
@text オフセット量
@desc デフォルトの描画位置から縦方向にズレて表示されます。(正:下 / 負:上)
@default 0


@command backcolor
@text ゲージ背景設定
@desc ゲージ背景を設定します。

@arg value
@text 背景色番号
@desc 背景色番号を指定。
@default 0


@command color1
@text ゲージ表示色1を指定
@desc ゲージ表示色1を指定します。

@arg value
@text ゲージ表示色1番号
@desc ゲージ表示色1番号を指定。
@default 0


@command color2
@text ゲージ表示色2を指定
@desc ゲージ表示色2を指定します。

@arg value
@text ゲージ表示色2番号
@desc ゲージ表示色2番号を指定。
@default 0


@command opacity
@text ゲージ不透明度を指定
@desc ゲージ不透明度を指定します。

@arg value
@text ゲージ不透明度
@desc 不透明度を指定。(0-255の間の値を指定してください)
@default 0
*/

//=============================================================================
// MKR_EventGauge.js
//=============================================================================
// Copyright (c) 2021 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.0.0 2021/05/26 ・セーブデータにゲージ情報を保存しないよう修正。
//                  ・マップ初期化時、ゲージ情報も初期化するように修正。
//
// 1.2.3 2020/04/10 ・イベントの一時消去後、
//                    メニュー開閉を行うとエラーとなる問題を修正。
//
// 1.2.2 2020/02/13 ・イベントの一時消去を行った際にエラーとなる問題を修正。
//
// 1.2.1 2018/10/22 ・ニューゲーム開始時点マップにゲージ設定された
//                    イベントがいた場合、エラーになる問題を修正。
//
// 1.2.0 2018/10/20 ・一部イベントにゲージが表示されなくなっていた問題を修正。
//
// 1.1.9 2018/09/26 ・イベント画像にタイルセットを選択時、
//                    イベントゲージを表示するかどうかを
//                    プラグインパラメータで切替可能にした。
//
// 1.1.8 2018/05/29 ・一部プラグインとの競合を修正。
//
// 1.1.7 2018/03/18 ・ゲージ不透明度をイベントごとに設定可能に。
//                  ・ゲージ量設定を残量、最大値で分離させた。
//
// 1.1.6 2017/07/16 ・余計なコードを削除
//                  ・バージョンを変更し忘れていたため修正
//
// 1.1.5 2017/07/16 古いバージョンで作成されたツクールMVプロジェクトにおいて
//                  プラグインが正常に動作しなかったため修正
//
// 1.1.4 2017/05/27 ・イベントゲージを表示するマップで
//                    セーブが出来なかった問題を修正。
//                  ・スクリプトによるコマンド記述方法を一部変更
//                  ・ゲージの色をプラグイン/スクリプトコマンドで変更可能に
//
// 1.1.3 2017/03/11 ・ゲージのoffsetX/Yをプラグイン/スクリプトコマンドで
//                    変更可能に。
//                  ・ゲージをピクチャーの上に描画可能に。
//                    (プラグインパラメーターの追加)
//
// 1.1.2 2017/03/05 ・メモ欄の記述にオプション設定を追加
//                  ・ゲージをメモリキャッシュへと登録するように
//                    (一部のメモリ解放系プラグインへの対応)
//
// 1.1.1 2017/02/17 ・ゲージ設定に変数ではなく数字を使う方式を追加。
//                  ・メモ欄の記述にオプション設定を追加
//
// 1.1.0 2017/02/14 ・プラグインコマンドの対象を実行したイベントのみに変更。
//                  ・スクリプトコマンドの[イベントID]に
//                    実行したイベント自身を表す0を指定可能に。
//                  ・プラグイン/スクリプトコマンドの一部に変数を使用可能に。
//                  ・プラグインパラメーターでゲージの不透明度を指定可能に。
//                  ・上記修正に合わせてプラグイン説明文を修正。
//
// 1.0.2 2017/02/14 メニューの開閉でゲージが非表示になることがある問題を修正。
//
// 1.0.1 2017/02/14 スクリプトによるコマンドが一部動作していなかったため修正。
//
// 1.0.0 2017/02/13 初版公開。
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================



var Imported = Imported || {};
Imported.MKR_EventGauge = true;

(function () {
    'use strict';
    var PN, Params;

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    PN = pluginName;

    var CheckParam = function (type, param, def, min, max) {
        var Parameters, regExp, value;
        Parameters = PluginManager.parameters(PN);

        if (arguments.length < 4) {
            min = -Infinity;
            max = Infinity;
        }
        if (arguments.length < 5) {
            max = Infinity;
        }
        if (param in Parameters) {
            value = String(Parameters[param]);
        } else {
            throw new Error("[CheckParam] プラグインパラメーターがありません: " + param);
        }

        value = value.replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');

        regExp = /^\x1bV\[\d+\]$/i;
        if (!regExp.test(value)) {
            switch (type) {
                case "bool":
                    if (value == "") {
                        value = (def) ? true : false;
                    } else {
                        value = value.toUpperCase() === "ON" || value.toUpperCase() === "TRUE" || value.toUpperCase() === "1";
                    }
                    break;
                case "num":
                    if (value == "") {
                        value = (isFinite(def)) ? parseInt(def, 10) : 0;
                    } else {
                        value = (isFinite(value)) ? parseInt(value, 10) : (isFinite(def)) ? parseInt(def, 10) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                default:
                    throw new Error("[CheckParam] " + param + "のタイプが不正です: " + type);
                    break;
            }
        }

        return [value, type, def, min, max, param];
    };

    var convertEscapeCharacters = function (text) {
        var windowChild;

        if (typeof text != "string") {
            return text;
        }

        if (SceneManager._scene) {
            windowChild = SceneManager._scene._windowLayer.children[0];
            text = windowChild ? windowChild.convertEscapeCharacters(text) : ConvVb(text);
        } else {
            text = ConvVb(text);
        }

        return text;
    };

    var ConvVb = function (text) {
        var num;

        if (typeof text != "string") {
            return text;
        }

        text = text.replace(/\x1bV\[(\d+)\]/i, function () {
            num = parseInt(arguments[1]);
            return $gameVariables.value(num);
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/i, function () {
            num = parseInt(arguments[1]);
            return $gameVariables.value(num);
        }.bind(this));

        return text;
    }

    var GetMeta = function (meta, name, sep) {
        var value, values, i, count;
        value = "";
        values = [];
        name = name.toLowerCase().trim();

        Object.keys(meta).forEach(function (key) {
            if (key.toLowerCase().trim() == name) {
                value = meta[key].trim();
                return false;
            }
        });

        if (sep !== undefined && sep != "" && value != "") {
            values = value.split(sep);
            count = values.length;
            values = values.map(function (elem) {
                return elem.trim();
            });

            return values;
        }

        return value;
    };

    Params = {
        "GaugeW": CheckParam("num", "Gauge_Width", 40, 0),
        "GaugeH": CheckParam("num", "Gauge_Height", 10, 0),
        "GaugeOX": CheckParam("num", "Gauge_Offset_X", 0),
        "GaugeOY": CheckParam("num", "Gauge_Offset_Y", 0),
        "GaugeVisible": CheckParam("bool", "Gauge_Visible", true),
        "GaugeColor1": CheckParam("num", "Gauge_Color_1", 20, 0, 31),
        "GaugeColor2": CheckParam("num", "Gauge_Color_2", 21, 0, 31),
        "GaugeBackColor": CheckParam("num", "Gauge_Back_Color", 19, 0, 31),
        "GaugeOpacity": CheckParam("num", "Gauge_Opacity", 255, 0, 255),
        "GaugeInPict": CheckParam("num", "Gauge_In_Picture", 0, 0),
        "TileGaugeEnable": CheckParam("bool", "Tile_Gauge_Enable", false),
    };

    //=========================================================================
    // PluginManager
    //  ・プラグイン用コマンドを定義します。
    //
    //=========================================================================
    PluginManager.registerCommand(pluginName, "show", function (args) {
        const eventId = this.eventId();
        $gameMap.showGaugeWindow(eventId);
    });

    PluginManager.registerCommand(pluginName, "hide", function (args) {
        const eventId = this.eventId();
        $gameMap.hideGaugeWindow(eventId);
    });

    PluginManager.registerCommand(pluginName, "add", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.addGaugeValue(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "set", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeValue(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "maxset", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeMaxValue(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "setx", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeOffsetX(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "sety", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeOffsetY(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "backcolor", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeBackColor(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "color1", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeColor1(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "color2", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeColor2(eventId, value);
    });

    PluginManager.registerCommand(pluginName, "opacity", function (args) {
        const eventId = this.eventId();
        const value = args.value;
        $gameMap.setGaugeOpacity(eventId, value);
    });

    //=========================================================================
    // Window_Gauge
    //  ・ゲージウィンドウを定義します。
    //
    //=========================================================================
    function Window_Gauge() {
        this.initialize.apply(this, arguments);
    }

    Window_Gauge.prototype = Object.create(Window_Base.prototype);
    Window_Gauge.prototype.constructor = Window_Gauge;

    Window_Gauge.prototype.initialize = function (num) {
        var x, y, width, height, option, bitmap, key, ver;

        this._gaugeNum = num;
        width = this.windowWidth();
        height = this.windowHeight();
        x = this.windowX();
        y = this.windowY();
        option = null;
        bitmap = null;

        Window_Base.prototype.initialize.call(this, x, y, width, height);

        if (!bitmap) {
            bitmap = new Bitmap(width - this.standardPadding() * 2, height - this.standardPadding() * 2);
        }
        this.contents = bitmap;

        // try {
        //     ver = Utils.RPGMAKER_VERSION;
        //     key = String.randomStr(12);
        //     ver = ver.replace(/\./g, "");
        //     console.log(ver);
        //     if (isFinite(ver)) {
        //         ver = parseInt(ver);
        //         if (ver >= 150) {
        //             bitmap = ImageManager._imageCache.get(key);
        //             if (!bitmap) {
        //                 bitmap = new Bitmap(width - this.standardPadding() * 2, height - this.standardPadding() * 2);
        //                 ImageManager._imageCache.add(key, bitmap);
        //             }
        //             this.contents = bitmap;
        //         } else if (ver >= 131) {
        //             bitmap = ImageManager.cache.getItem(key);
        //             if (!bitmap) {
        //                 bitmap = new Bitmap(width - this.standardPadding() * 2, height - this.standardPadding() * 2);
        //                 ImageManager.cache.setItem(key, bitmap);
        //             }
        //             this.contents = bitmap;
        //         }
        //     }
        // } catch (e) {
        //     // console.log(e);
        // }

        this.opacity = 0;

        option = $gameMap.event(num).getGaugeOption();

        if (option["Visible"] == 0) {
            this.hide();
        }
        if (option["PaintO"] >= 0) {
            this.contents.paintOpacity = option["PaintO"];
        }
    };

    Window_Gauge.prototype.windowWidth = function () {
        var option;
        option = $gameMap.event(this._gaugeNum).getGaugeOption();
        return option["Width"] + this.standardPadding() * 2;
    };

    Window_Gauge.prototype.windowHeight = function () {
        var option;
        option = $gameMap.event(this._gaugeNum).getGaugeOption();
        return option["Height"] + this.standardPadding() * 2;
    };

    Window_Gauge.prototype.windowX = function () {
        var option, value;
        value = 0;

        if (!$gameMap.event(this._gaugeNum) || $gameMap.event(this._gaugeNum)._erased) {
            return;
        }

        option = $gameMap.event(this._gaugeNum).getGaugeOption();
        switch (option["Fix"]) {
            case 1:
                break;
            case 2:
                value = Graphics.boxWidth / 2 - this.width / 2;
                break;
            case 3:
                value = Graphics.boxWidth - this.width;
                break;
            default:
                value = $gameMap.event(this._gaugeNum).screenX() - this.width / 2;
                break;
        }
        value += option["OffsetX"];

        return value;
    };

    Window_Gauge.prototype.windowY = function () {
        var option, value;
        value = 0;

        if (!$gameMap.event(this._gaugeNum) || $gameMap.event(this._gaugeNum)._erased) {
            return;
        }

        option = $gameMap.event(this._gaugeNum).getGaugeOption();
        if (option["Fix"] != null) {
            value = Graphics.boxHeight - this.height;
        } else {
            value = $gameMap.event(this._gaugeNum).screenY();
        }
        value += option["OffsetY"];

        return value;
    };

    Window_Gauge.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.updateGauge();
        this.updatePosition();
        this.updateVisibility();
    };

    Window_Gauge.prototype.updateVisibility = function () {
        var chara;
        chara = $gameMap.event(this._gaugeNum);

        if (!chara) {
            $gameMap.delGaugeInfo(this._gaugeNum);
            this.parent.removeChild(this);
            return false;
        }

        if (chara.isHideGauge() || chara.isTransparent() || !$gameMap.getGaugeInfo(this._gaugeNum)) {
            this.hide();
        } else if (chara.characterName() == "" && (chara.tileId() == 0 || !Params.TileGaugeEnable[0])) {
            this.hide();
        } else if (!chara.isHideGauge()) {
            this.show();
        }

        if (chara._erased) {
            $gameMap.delGaugeInfo(this._gaugeNum);
            this.parent.removeChild(this);
        }

    };

    Window_Gauge.prototype.updateGauge = function () {
        var color1, color2, backColor, width, height, fillW, option, opacity;
        width = this.contents.width;
        height = this.contents.height;

        if (!$gameMap.event(this._gaugeNum) || $gameMap.event(this._gaugeNum)._erased) {
            this.contents.clear();
            return;
        }

        option = $gameMap.event(this._gaugeNum).getGaugeOption();
        color1 = this.textColor(option["Color1"]);
        color2 = this.textColor(option["Color2"]);
        backColor = this.textColor(option["BackC"]);
        opacity = option["PaintO"];

        fillW = Math.floor(width * $gameMap.event(this._gaugeNum).gaugeRate());

        this.contents.clear();
        this.contents.fillRect(0, 0, width, height, backColor);
        this.contents.gradientFillRect(0, 0, fillW, height, color1, color2);
        this.contents.paintOpacity = opacity;
    };

    Window_Gauge.prototype.updatePosition = function () {
        if (!$gameMap.event(this._gaugeNum) || $gameMap.event(this._gaugeNum)._erased) {
            return;
        }

        this.x = this.windowX();
        this.y = this.windowY();
        this.z = $gameMap.event(this._gaugeNum).screenZ();
    };


    //=========================================================================
    // Spriteset_Map
    //  ・イベントにゲージウィンドウを追加する処理を定義します。
    //
    //=========================================================================
    var _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function () {
        _Spriteset_Map_createUpperLayer.call(this);

        $gameMap.events().forEach(function (event) {
            if (event && GetMeta(event.event().meta, "egauge") != "") {
                $gameMap.addGaugeInfo({ id: event.eventId(), generated: false });
            }
        }, this);
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _Spriteset_Map_update.call(this);

        this.createGaugeWindow();
    };

    Spriteset_Map.prototype.createGaugeWindow = function () {
        let i, id, push, event, gaugeWindow;
        i = 0;
        push = $gameMap.getGaugePush();

        if (!push || push.length < 1) {
            return;
        }

        while (push.length) {
            event = $gameMap.event(push.shift());
            if (!event || event._erased) {
                break;
            }
            gaugeWindow = new Window_Gauge(event.eventId());
            if (gaugeWindow != null) {
                if (Params.GaugeInPict[0] > 0) {
                    this._pictureContainer.addChildAt(gaugeWindow, Params.GaugeInPict[0] + i);
                    i++;
                } else {
                    // this.addChildAt(gaugeWindow, 100 + i);
                    this._tilemap.addChild(gaugeWindow);
                    i++
                }
                $gameMap.generatedGauge(event.eventId());
            }
        }
    };


    //=========================================================================
    // Game_Map
    //  ・ウィンドウゲージ群を保持する処理を定義します。
    //  ・プラグイン用コマンドを定義します。
    //
    //=========================================================================
    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_setup.call(this, mapId);

        this.initGauge();
    };

    Game_Map.prototype.initGauge = function () {
        this._gaugeInfos = [];
        this._gaugePush = [];
    };

    Game_Map.prototype.getGaugeInfo = function (id) {
        let info, i, cnt;
        info = null;
        i = 0;

        if (id < 1 || !this._gaugeInfos) {
            return info;
        }

        cnt = this._gaugeInfos.length;
        for (i; i < cnt; i++) {
            if (this._gaugeInfos[i].id == id) {
                info = this._gaugeInfos[i];
                break;
            }
        }

        // return this._gaugeInfos.indexOf(id);
        return info;
    };

    Game_Map.prototype.getGaugeInfos = function () {
        return this._gaugeInfos;
    };

    Game_Map.prototype.setGaugeInfos = function (gaugeInfos) {
        this._gaugeInfos = gaugeInfos;
    }

    Game_Map.prototype.generatedGauge = function (id) {
        let info, i, cnt;
        info = null;
        cnt = this._gaugeInfos.length;
        i = 0;

        if (id < 1) {
            return false;
        }

        for (i; i < cnt; i++) {
            if (this._gaugeInfos[i].id == id) {
                this._gaugeInfos[i].generated = true;
                break;
            }
        }

        return true;
    };

    Game_Map.prototype.isGeneratedGauge = function (id) {
        let info, i, cnt;
        cnt = this._gaugeInfos.length;
        i = 0;

        if (id < 1) {
            return true;
        }

        for (i; i < cnt; i++) {
            if (this._gaugeInfos[i].id == id) {
                return this._gaugeInfos[i].generated;
            }
        }

        return true;
    };

    Game_Map.prototype.addGaugeInfo = function (info) {
        if (!this._gaugeInfos) {
            this.initGauge();
        }
        this._gaugeInfos.push(info);
        this._gaugePush.push(info.id);
    };

    Game_Map.prototype.delGaugeInfo = function (id) {
        let num, i, cnt;
        cnt = this._gaugeInfos.length;
        num = -1;
        i = 0;

        if (id < 1) {
            return false;
        }

        // num = this._gaugeInfos.indexOf(id);
        for (; i < cnt; i++) {
            if (this._gaugeInfos[i].id == id) {
                num = i;
                break;
            }
        }
        if (num > -1) {
            this._gaugeInfos.splice(num, 1);
        }

        if (!this.event(id)) {
            return;
        }
        this.event(id).delMember();
    };

    Game_Map.prototype.getGaugePush = function () {
        return this._gaugePush;
    };

    Game_Map.prototype.setGaugePush = function (gaugePush) {
        this._gaugePush = gaugePush;
    };

    Game_Map.prototype.showGaugeWindow = function (eventId) {
        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).showGauge();
        }
    };

    Game_Map.prototype.hideGaugeWindow = function (eventId) {
        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).hideGauge();
        }
    };

    Game_Map.prototype.isHideGaugeWindow = function (eventId) {
        var gaugeNum, gaugeWindow, result;
        result = false;

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            result = this.event(eventId).isHideGauge();
        }

        return result;
    };

    Game_Map.prototype.addGaugeValue = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).addGaugeValue(value);
        }
    };

    Game_Map.prototype.setGaugeValue = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeValue(value);
        }
    };

    Game_Map.prototype.getGaugeValue = function (eventId) {
        var value;
        value = -1;

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            value = this.event(eventId).getGaugeValue();
        }

        return value;
    };

    Game_Map.prototype.setGaugeMaxValue = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeMaxValue(value);
        }
    };

    Game_Map.prototype.getGaugeMaxValue = function (eventId) {
        var value;
        value = -1;

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            value = this.event(eventId).getGaugeMaxValue();
        }

        return value;
    };

    Game_Map.prototype.setGaugeOffsetX = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeOffsetX(value);
        }
    };

    Game_Map.prototype.setGaugeOffsetY = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeOffsetY(value);
        }
    };

    Game_Map.prototype.setGaugeBackColor = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeBackColor(value);
        }
    };

    Game_Map.prototype.setGaugeColor1 = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeColor1(value);
        }
    };

    Game_Map.prototype.setGaugeColor2 = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            this.event(eventId).setGaugeColor2(value);
        }
    };

    Game_Map.prototype.setGaugeOpacity = function (eventId, value) {
        value = String(value).replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (/\x1bV\[\d+\]/i.test(value)) {
            value = ConvVb(value);
        }

        if (eventId == 0) {
            eventId = this._interpreter.eventId();
        }

        if (eventId > 0 && eventId < this._events.length) {
            // console.log(eventId + " set opacity:" + value);
            this.event(eventId).setGaugeOpacity(value);
        }
    };


    //=========================================================================
    // Game_Event
    //  ・イベントの追加メンバーと関連メソッドを定義します。
    //
    //=========================================================================
    var _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function (mapId, eventId) {
        _Game_Event_initialize.apply(this, arguments);

        if (GetMeta(this.event().meta, "egauge") != "") {
            this.addMembers();
        }
    };

    Game_Event.prototype.addMembers = function () {
        var vr, mvr, value, metas;

        vr = 0;
        mvr = 0;
        this._gauge = 0;
        this._gaugeMax = 0;
        this._gaugeNum = -1;
        this._gaugeVr = 0;
        this._gaugeMvr = 0;
        this._gaugeType = "num";
        this._gaugeOption = {
            "Width": Params.GaugeW[0],
            "Height": Params.GaugeH[0],
            "OffsetX": Params.GaugeOX[0],
            "OffsetY": Params.GaugeOY[0],
            "Fix": null,
            "Visible": Params.GaugeVisible[0],
            "Color1": Params.GaugeColor1[0],
            "Color2": Params.GaugeColor2[0],
            "BackC": Params.GaugeBackColor[0],
            "PaintO": Params.GaugeOpacity[0],
        };

        metas = GetMeta(this.event().meta, "egauge", " ");

        if (!metas || metas.length <= 0) {
            return false;
        }

        metas.forEach(function (meta) {
            meta = meta.trim().toLowerCase();
            if (/^vr(\d+)$/.test(meta)) {
                vr = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : 0;
                this._gaugeType = "vr";
            }
            if (/^mvr(\d+)$/.test(meta)) {
                mvr = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : 0;
                this._gaugeType = "vr";
            }
            if (/^(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : 0;
                if (value > 0 && this._gaugeType == "num") {
                    this._gauge = value;
                    this._gaugeMax = value;
                }
            }
            if (/^wh(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : 0;
                if (value > 0) {
                    this._gaugeOption["Width"] = value;
                }
            }
            if (/^ht(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : 0;
                if (value > 0) {
                    this._gaugeOption["Height"] = value;
                }
            }
            if (/^xs(-?\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : null;
                if (value != null) {
                    this._gaugeOption["OffsetX"] = value;
                }
            }
            if (/^ys(-?\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : null;
                if (value != null) {
                    this._gaugeOption["OffsetY"] = value;
                }
            }
            if (/^fx([1-3])$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : null;
                if (value != null) {
                    this._gaugeOption["Fix"] = value;
                }
            }
            if (/^vs([0-1])$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : null;
                if (value != null) {
                    this._gaugeOption["Visible"] = value;
                }
            }
            if (/^fc(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : -1;
                if (value >= 0 && value <= 31) {
                    this._gaugeOption["Color1"] = value;
                }
            }
            if (/^sc(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : -1;
                if (value >= 0 && value <= 31) {
                    this._gaugeOption["Color2"] = value;
                }
            }
            if (/^bc(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : -1;
                if (value >= 0 && value <= 31) {
                    this._gaugeOption["BackC"] = value;
                }
            }
            if (/^op(\d+)$/.test(meta)) {
                value = isFinite(RegExp.$1) ? parseInt(RegExp.$1, 10) : -1;
                if (value >= 0 && value <= 255) {
                    this._gaugeOption["PaintO"] = value;
                }
            }
        }, this);

        if (vr > 0 && mvr > 0) {
            this._gaugeVr = vr;
            this._gaugeMvr = mvr;
            // this._gauge = 0;
            // this._gaugeMax = 0;
            this._gaugeType = "vr";
            value = $gameVariables.value(mvr);
            if (isFinite(value)) {
                this._gaugeMax = parseInt(value, 10);
            }
            value = $gameVariables.value(vr);
            if (isFinite(value)) {
                this._gauge = parseInt(value, 10);
            }
        } else if (vr > 0) {
            this._gaugeVr = vr;
            this._gaugeMvr = 0;
            // this._gaugeMax = 0;
            this._gaugeType = "a_vr";
            value = $gameVariables.value(vr);
            if (isFinite(value)) {
                this._gaugeMax = parseInt(value, 10);
                this._gauge = parseInt(value, 10);
            }
        } else if (mvr > 0) {
            this._gaugeVr = 0;
            this._gaugeMvr = mvr;
            // this._gaugeMax = 0;
            this._gaugeType = "a_mvr";
            value = $gameVariables.value(mvr);
            if (isFinite(value)) {
                this._gaugeMax = parseInt(value, 10);
                this._gauge = parseInt(value, 10);
            }
        }

        $gameMap.addGaugeInfo({ id: this.eventId(), generated: false });
    };

    var _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function () {
        _Game_Event_update.call(this);

        this.checkGaugeVariable();
    };

    // ゲージ残量と最大値の関係チェック
    Game_Event.prototype.checkGaugeVariable = function () {
        let gaugeValue, gaugeMaxValue;

        if (!this.gaugeEnable()) {
            return false;
        }

        gaugeValue = this.getGaugeValue();
        gaugeMaxValue = this.getGaugeMaxValue();

        if (gaugeValue > gaugeMaxValue) {
            this.setGaugeValue(gaugeMaxValue);
        }

    };

    Game_Event.prototype.gaugeEnable = function () {
        return this._gaugeType !== undefined;
    };

    Game_Event.prototype.gaugeRate = function () {
        var value, maxValue;

        if (!this.gaugeEnable()) {
            return 0;
        }

        value = this.getGaugeValue();
        maxValue = this.getGaugeMaxValue();
        if (maxValue == 0) {
            return 0;
        }

        return value / maxValue;
    };

    Game_Event.prototype.setGaugeNum = function (index) {
        if (this.gaugeEnable()) {
            this._gaugeNum = index;
        }
    };

    Game_Event.prototype.getGaugeNum = function () {
        var value;
        value = -1;

        if (this.gaugeEnable()) {
            value = this._gaugeNum;
        }

        return value;
    };

    Game_Event.prototype.addGaugeValue = function (value) {
        var gameValue, result;
        value = isFinite(value) ? parseInt(value, 10) : 0;

        if (!this.gaugeEnable()) {
            return false;
        }

        gameValue = this.getGaugeValue();

        if (value != 0) {
            result = gameValue + value;
            gameValue = this.getGaugeMaxValue();
            if (result < 0) {
                result = 0;
            } else if (result > gameValue) {
                result = gameValue;
            }
            this.setGaugeValue(result);
        }

    };

    Game_Event.prototype.setGaugeValue = function (value) {
        var maxValue;
        value = isFinite(value) ? parseInt(value, 10) : -1;

        if (!this.gaugeEnable()) {
            return false;
        }

        maxValue = this.getGaugeMaxValue();
        if (value > maxValue) {
            value = maxValue;
        }

        if (value >= 0) {
            switch (this._gaugeType) {
                case "vr":
                case "a_vr":
                    $gameVariables.setValue(this._gaugeVr, value);
                    break;
                case "a_mvr":
                case "num":
                    this._gauge = value;
                    break;
            }
        }

    };

    Game_Event.prototype.getGaugeValue = function () {
        var value;
        value = -1;

        if (!this.gaugeEnable()) {
            return value;
        }

        switch (this._gaugeType) {
            case "vr":
            case "a_vr":
                value = $gameVariables.value(this._gaugeVr);
                break;
            case "a_mvr":
            case "num":
                value = this._gauge;
                break;
        }

        return value;
    };

    Game_Event.prototype.setGaugeMaxValue = function (value) {
        var maxValue;
        value = isFinite(value) ? parseInt(value, 10) : 0;

        if (!this.gaugeEnable()) {
            return false;
        }

        if (value <= 0) {
            return false;
        }

        maxValue = this.getGaugeMaxValue();

        switch (this._gaugeType) {
            case "vr":
                if (value < maxValue) {
                    $gameVariables.setValue(this._gaugeVr, value);
                }
                $gameVariables.setValue(this._gaugeMvr, value);
                break;
            case "a_vr":
                if (value < maxValue) {
                    $gameVariables.setValue(this._gaugeVr, value);
                }
                this._gaugeMax = value;
                break;
            case "a_mvr":
                if (value < maxValue) {
                    this._gauge = value;
                }
                $gameVariables.setValue(this._gaugeMvr, value);
                break;
            case "num":
                if (value < maxValue) {
                    this._gauge = value;
                }
                this._gaugeMax = value;
                break;
        }

    };

    Game_Event.prototype.getGaugeMaxValue = function () {
        var value;
        value = -1;

        if (!this.gaugeEnable()) {
            return value;
        }

        switch (this._gaugeType) {
            case "vr":
            case "a_mvr":
                value = $gameVariables.value(this._gaugeMvr);
                break;
            case "a_vr":
            case "num":
                value = this._gaugeMax;
                break;
        }

        return value;
    };

    Game_Event.prototype.setGaugeOffsetX = function (value) {
        value = isFinite(value) ? parseInt(value, 10) : null;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["OffsetX"] = value;
        }
    };

    Game_Event.prototype.setGaugeOffsetY = function (value) {
        value = isFinite(value) ? parseInt(value, 10) : null;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["OffsetY"] = value;
        }
    };

    Game_Event.prototype.getGaugeOption = function () {
        return this._gaugeOption;
    };

    Game_Event.prototype.hideGauge = function () {
        if (this.gaugeEnable()) {
            this._gaugeOption["Visible"] = false;
        }
    };

    Game_Event.prototype.showGauge = function () {
        if (this.gaugeEnable()) {
            this._gaugeOption["Visible"] = true;
        }
    };

    Game_Event.prototype.isHideGauge = function () {
        return this.gaugeEnable() ? !this._gaugeOption["Visible"] : false;
    };

    Game_Event.prototype.setGaugeBackColor = function (value) {
        value = isFinite(value) ? parseInt(value, 10) : null;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["BackC"] = value;
        }
    };

    Game_Event.prototype.setGaugeColor1 = function (value) {
        value = isFinite(value) ? parseInt(value, 10) : null;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["Color1"] = value;
        }
    };

    Game_Event.prototype.setGaugeColor2 = function (value) {
        value = isFinite(value) ? parseInt(value, 10) : null;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["Color2"] = value;
        }
    };

    Game_Event.prototype.setGaugeOpacity = function (value) {
        var gameValue;
        value = isFinite(value) ? parseInt(value, 10) : 0;

        if (this.gaugeEnable() && value !== null) {
            this._gaugeOption["PaintO"] = value;
        }
    };

    Game_Event.prototype.delMember = function () {
        if (this._gauge !== undefined) {
            delete this._gauge;
        }
        if (this._gaugeMax !== undefined) {
            delete this._gaugeMax;
        }
        if (this._gaugeNum !== undefined) {
            delete this._gaugeNum;
        }
        if (this._gaugeVr !== undefined) {
            delete this._gaugeVr;
        }
        if (this._gaugeMvr !== undefined) {
            delete this._gaugeMvr;
        }
        if (this._gaugeType !== undefined) {
            delete this._gaugeType;
        }
        if (this._gaugeOption !== undefined) {
            delete this._gaugeOption;
        }
    };


    //=========================================================================
    // DataManager
    //  ・セーブデータにゲージ情報を含まないようにします。
    //
    //=========================================================================
    const _DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
    DataManager.saveGameWithoutRescue = function (savefileId) {
        const gaugeInfos = ($gameMap.getGaugeInfos()) ? [...$gameMap.getGaugeInfos()] : [];
        const gaugePush = ($gameMap.getGaugePush()) ? [...$gameMap.getGaugePush()] : [];
        $gameMap.initGauge();
        const result = _DataManager_saveGameWithoutRescue.call(this, savefileId);
        if (gaugeInfos.length > 0) {
            $gameMap.setGaugeInfos(gaugeInfos);
        }
        if (gaugePush.length > 0) {
            $gameMap.setGaugePush(gaugePush);
        }
        return result;
    };


    //=========================================================================
    // String
    //  ・ランダムな文字列を生成する処理を定義します。
    //
    //=========================================================================
    String.randomStr = function (length) {
        var str, random, i;
        str = "";
        length = length || 32;

        for (i = 0; i < length; i++) {
            random = Math.random() * 16 | 0;
            str += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return str;
    };


    //=========================================================================
    // MV joint
    //=========================================================================
    function isRect(value) {
        return (typeof value) === "object";
    }

    function rectlize(x, y, w, h) {
        if (isRect(x)) {
            return x;
        }
        const newRect = new Rectangle(x, y, w, h);
        return newRect;
    }

    ////////// Window_Base //////////

    const Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, w, h) {
        const rect = rectlize(x, y, w, h);
        Window_Base_initialize.call(this, rect);
    };
    Window_Base.prototype.standardPadding = function () {
        return 18;
    };
    const Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function (x, y, w, h) {
        const rect = rectlize(x, y, w, h);
        Window_Selectable_initialize.call(this, rect);
    };

    ////////// colorList //////////

    const colorList = {
        crisisColor: ColorManager.crisisColor,
        ctGaugeColor1: ColorManager.ctGaugeColor1,
        ctGaugeColor2: ColorManager.ctGaugeColor2,
        damageColor: ColorManager.damageColor,
        deathColor: ColorManager.deathColor,
        deathColor: ColorManager.dimColor1,
        dimColor2: ColorManager.dimColor2,
        gaugeBackColor: ColorManager.gaugeBackColor,
        hpColor: ColorManager.hpColor,
        hpGaugeColor1: ColorManager.hpGaugeColor1,
        hpGaugeColor2: ColorManager.hpGaugeColor2,
        itemBackColor1: ColorManager.itemBackColor1,
        itemBackColor2: ColorManager.itemBackColor2,
        mpColor: ColorManager.mpColor,
        mpCostColor: ColorManager.mpCostColor,
        mpGaugeColor1: ColorManager.mpGaugeColor1,
        mpGaugeColor2: ColorManager.mpGaugeColor2,
        normalColor: ColorManager.normalColor,
        outlineColor: ColorManager.outlineColor,
        paramchangeTextColor: ColorManager.paramchangeTextColor,
        pendingColor: ColorManager.pendingColor,
        powerDownColor: ColorManager.powerDownColor,
        powerUpColor: ColorManager.powerUpColor,
        systemColor: ColorManager.systemColor,
        textColor: ColorManager.textColor,
        tpColor: ColorManager.tpColor,
        tpCostColor: ColorManager.tpCostColor,
        tpGaugeColor1: ColorManager.tpGaugeColor1,
        tpGaugeColor2: ColorManager.tpGaugeColor2
    };
    for (const key in colorList) {
        if (colorList.hasOwnProperty(key)) {
            const element = colorList[key];
            Window_Base.prototype[key] = function () {
                return element.apply(this, arguments);
            };

        }
    }

})();