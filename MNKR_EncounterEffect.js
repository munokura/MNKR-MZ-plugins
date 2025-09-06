/*
 * --------------------------------------------------
 * MNKR_EncounterEffect.js
 *   Ver.1.1.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EncounterEffect.js
@plugindesc You can adjust the encounter effects.
@author example
@license MIT License

@help
You can adjust the encounter effects.
Set this in the plugin parameters.

If you are using other encounter-related plugins,
place this plugin at the top of the plugin management list.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author,
and there are no restrictions on its use (commercial, 18+, etc.).

@param zoomProcess
@text Zoom processing?
@desc Zoom effect before battle when encountering
@type boolean
@on Zoom
@off Do not zoom
@default false

@param flashProcess
@text Flash processing?
@desc Flash effect before battle when encountering
@type boolean
@on Flash
@off Do not flash
@default false

@param fadeOut
@text Fade out?
@desc Fade-out effect before battle when encountering an enemy
@type boolean
@on Fade out
@off No fade out
@default false
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_EncounterEffect.js
@plugindesc エンカウント時の演出を調整できます。
@author munokura

@help
エンカウント時の演出を調整できます。
プラグインパラメーターで設定してください。

エンカウントに関係する他のプラグインを併用する場合、
このプラグインをプラグイン管理リストで上位に配置してください。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param zoomProcess
@text ズーム処理？
@type boolean
@on ズームする
@off ズームしない
@desc エンカウント時に戦闘前のズーム演出
ツクールデフォルト：する
@default false

@param flashProcess
@text フラッシュ処理？
@type boolean
@on フラッシュする
@off フラッシュしない
@desc エンカウント時に戦闘前のフラッシュ演出
ツクールデフォルト：する
@default false

@param fadeOut
@text フェードアウト？
@type boolean
@on フェードアウトする
@off フェードアウトしない
@desc エンカウント時に戦闘前のフェードアウト演出
ツクールデフォルト：する
@default false
*/

(() => {
    'use strict'

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_zoomProcess = parameters['zoomProcess'] === 'true';
    const PRM_flashProcess = parameters['flashProcess'] === 'true';
    const PRM_fadeOut = parameters['fadeOut'] === 'true';

    Scene_Map.prototype.updateEncounterEffect = function () {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const p = n / speed;
            const q = ((p - 1) * 20 * p + 5) * p + 1;
            const zoomX = $gamePlayer.screenX();
            const zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                if (PRM_flashProcess) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            if (PRM_zoomProcess) {
                $gameScreen.setZoom(zoomX, zoomY, q);
            }
            if (n === Math.floor(speed / 6)) {
                if (PRM_flashProcess) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                if (PRM_fadeOut) {
                    this.startFadeOut(this.fadeSpeed());
                }
            }
        }
    };

})();