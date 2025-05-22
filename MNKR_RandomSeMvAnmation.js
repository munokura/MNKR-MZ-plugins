/*
 * --------------------------------------------------
 * MNKR_RandomSeMvAnmation.js
 * Ver.0.0.1
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomSeMvAnmation.js
 * @plugindesc MV互換データのアニメーションのSEをランダムにします。
 * @author munokura
 *
 * @help
 * プラグインパラメーターで対象となるアニメーションと候補SEを登録してください。
 * アニメーション再生時に、SEが候補からランダムに再生されます。
 * 戦闘中でもマップ上でも反映されます。
 * 
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 * MITライセンスです。
 * 　https://licenses.opensource.jp/MIT/MIT.html
 * 　作者に無断で改変、再配布が可能で、
 * 　利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param animeLists
 * @text ランダムSE対象リスト
 * @desc ランダムSE対象リストを入力。
 * @type struct<animeList>[]
 */

/*~struct~animeList:
 * @param animeId
 * @text MVアニメーションID
 * @type animation
 * @default 0
 * @desc 対象となるMVアニメーションを選択。
 *
 * @param seList
 * @text SE設定リスト
 * @default []
 * @type struct<SeData>[]
 * @desc ランダム再生されるSEと、音量・ピッチ・パンを設定します。
 */

/*~struct~SeData:
 * @param name
 * @text ファイル名
 * @type file
 * @dir audio/se
 * @desc SEのファイル名を拡張子なしで入力します。
 *
 * @param volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc SEの音量です。(0-100)
 *
 * @param pitch
 * @text ピッチ
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc SEのピッチです。(50-150)
 *
 * @param pan
 * @text パン
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc SEのパンです。(-100:左 -0:中央 -100:右)
 */


(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);

    const settings = {
        animeLists: JSON.parse(pluginParameters.animeLists || '[]').map((e) => {
            return ((parameter) => {
                const parsed = JSON.parse(parameter);
                return {
                    animeId: Number(parsed.animeId || 0),
                    seList: JSON.parse(parsed.seList || '[]').map((seJson) => {
                        const seParsed = JSON.parse(seJson);
                        return {
                            name: String(seParsed.name || ''),
                            volume: Number(seParsed.volume || 90),
                            pitch: Number(seParsed.pitch || 100),
                            pan: Number(seParsed.pan || 0),
                        };
                    }),
                };
            })(e || '{}');
        }),
    };

    const _Sprite_AnimationMV_processTimingData = Sprite_AnimationMV.prototype.processTimingData;
    Sprite_AnimationMV.prototype.processTimingData = function (timing) {
        const currentAnimationId = this._animation.id;
        const matchedAnimeSetting = settings.animeLists.find(animeSetting => {
            return animeSetting.animeId === currentAnimationId;
        });

        if (!matchedAnimeSetting) {
            _Sprite_AnimationMV_processTimingData.call(this, timing);
        } else {
            if (timing.se) {
                if (matchedAnimeSetting.seList && matchedAnimeSetting.seList.length > 0) {
                    const randomIndex = Math.floor(Math.random() * matchedAnimeSetting.seList.length);
                    const randomSeData = matchedAnimeSetting.seList[randomIndex];
                    const randomSe = {
                        name: randomSeData.name,
                        volume: randomSeData.volume,
                        pitch: randomSeData.pitch,
                        pan: randomSeData.pan,
                    };
                    AudioManager.playSe(randomSe);
                }
            }
        }
    };

})();