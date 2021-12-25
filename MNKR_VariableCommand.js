/*
 * --------------------------------------------------
 * MNKR_VariableCommand.js
 *   Ver.2.1.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
 * @plugindesc イベントコマンドで変数が選べない組み合わせを使用可能にするプラグインコマンドを追加します。
 * @author munokura
 * 
 * @help
 * イベントコマンドで変数が選べない組み合わせを使用可能にする
 * プラグインコマンドを追加します。
 * 
 * パーティ
 *   - アイテムの増減
 *   - 武器の増減
 *   - 防具の増減
 *   - メンバーの入れ替え
 * 
 * アクター
 *   - ステートの変更
 *   - スキルの増減
 *   - 装備の変更
 *   - 名前の変更
 *   - 職業の変更
 *   - 二つ名の変更
 *   - プロフィールの変更
 * 
 * キャラクター
 *   - アニメーションの表示
 *   - フキダシアイコンの表示
 * 
 * シーン制御
 *   - 名前入力の処理
 *
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @command changeItem
 * @text アイテムの増減
 * @desc 変数の値のアイテムIDの数を変更します。
 * 
 * @arg selectAction
 * @text アイテムを増やす
 * @desc アイテムを「増やす・減らす」か決めます。
 * @type boolean
 * @on 増やす
 * @off 減らす
 * @default true
 *
 * @arg variableIdItem
 * @text アイテム指定変数
 * @desc 変数の値をアイテムIDとして実行します。
 * @type variable
 * @default 0
 *
 * @arg constQuantity
 * @text 定数
 * @desc 数を指定します。
 * @type number
 * @default 0
 * 
 * @arg variableIdQuantity
 * @text 数指定変数
 * @desc 変数の値を数として実行します。これを指定すると定数は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeWeapon
 * @text 武器の増減
 * @desc 変数の値の武器IDの数を変更します。
 * 
 * @arg selectAction
 * @text 武器を増やす
 * @desc 武器を「増やす・減らす」か決めます。
 * @type boolean
 * @on 増やす
 * @off 減らす
 * @default true
 * 
 * @arg includeEquip
 * @text 装備を含む
 * @desc 装備中の武器を含めるかを決めます。
 * @type boolean
 * @on 含める
 * @off 含めない
 * @default false
 *
 * @arg variableIdWeapon
 * @text 武器指定変数
 * @desc 変数の値を武器IDとして実行します。これを指定すると武器指定は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constQuantity
 * @text 定数
 * @desc 数を指定します。
 * @type number
 * @default 0
 * 
 * @arg variableIdQuantity
 * @text 数指定変数
 * @desc 変数の値を数として実行します。これを指定すると定数は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeArmor
 * @text 防具の増減
 * @desc 変数の値の防具IDの数を変更します。
 * 
 * @arg selectAction
 * @text 防具を増やす
 * @desc 防具を「増やす・減らす」か決めます。
 * @type boolean
 * @on 増やす
 * @off 減らす
 * @default true
 * 
 * @arg includeEquip
 * @text 装備を含む
 * @desc 装備中の防具を含めるかを決めます。
 * @type boolean
 * @on 含める
 * @off 含めない
 * @default false
 *
 * @arg variableIdArmor
 * @text 防具指定変数
 * @desc 変数の値を防具IDとして実行します。これを指定すると防具指定は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constQuantity
 * @text 定数
 * @desc 数を指定します。
 * @type number
 * @default 0
 * 
 * @arg variableIdQuantity
 * @text 数指定変数
 * @desc 変数の値を数として実行します。これを指定すると定数は無視されます。
 * @type variable
 * @default 0
 *
 * 
 * @command changeMember
 * @text メンバーの入れ替え
 * @desc 変数の値のアクターIDをメンバーに「加え・外し」ます。
 * 
 * @arg selectMethod
 * @text メンバーを加える
 * @desc メンバーを「加える・外す」かを決めます。
 * @type boolean
 * @on 加える
 * @off 外す
 * @default true
 *
 * @arg variableIdActor
 * @text アクターID指定する変数
 * @desc 変数の値をアクターIDとして実行します。
 * @type variable
 * @default 0
 * 
 * @arg initializeActor
 * @text アクター初期化
 * @desc アクターを初期化します。
 * @type boolean
 * @on 初期化する
 * @off 初期化しない
 * @default false
 * 
 * 
 * @command changeState
 * @text ステートの増減
 * @desc ステートを「付加・解除」します。
 *
 * @arg selectAction
 * @text ステートを付加
 * @desc ステートを「付加・解除」するか決めてください。
 * @type boolean
 * @on 付加
 * @off 解除
 * @default true
 * 
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg variableIdState
 * @text ステートID指定変数
 * @desc 変数の値をステートIDとして実行します。これを指定するとステートID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeSkill
 * @text スキルの増減
 * @desc スキルを「覚える・忘れる」します。
 *
 * @arg selectAction
 * @text スキルを覚える
 * @desc スキルを「覚える・忘れる」か決めてください。
 * @type boolean
 * @on 覚える
 * @off 忘れる
 * @default true
 * 
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクター指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constSkillId
 * @text スキルID定数
 * @desc スキルを指定します。
 * @type class
 * @default 0
 * 
 * @arg variableIdSkill
 * @text スキルID指定変数
 * @desc 変数の値をスキルIDとして実行します。これを指定するとスキルID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeEquip
 * @text 装備の変更
 * @desc 装備を変更します。対象の装備がアイテム欄に必要です。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constWeaponId
 * @text 武器ID定数
 * @desc 武器を指定します。
 * @type weapon
 * @default 0
 *
 * @arg variableIdWeapon
 * @text 武器ID指定変数
 * @desc 変数の値を武器IDとして実行します。これを指定すると武器ID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constArmorId
 * @text 防具ID定数
 * @desc 防具を指定します。これを指定すると武器IDは無視されます。
 * @type armor
 * @default 0
 *
 * @arg variableIdArmor
 * @text 防具ID指定変数
 * @desc 変数の値を防具IDとして実行します。これを指定すると防具ID定数・武器IDは無視されます。
 * @type variable
 * @default 0
 *
 * @arg constEquipTypeId
 * @text 装備タイプID定数
 * @desc 装備タイプを指定します。0の場合、指定された武器・防具から自動取得します。
 * @type number
 * @default 0
 *
 * @arg variableIdEquipType
 * @text 装備タイプID指定変数
 * @desc 変数の値を装備タイプIDとして実行します。これを指定すると装備タイプID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeName
 * @text 名前の変更
 * @desc アクターの名前の変更します。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constNameId
 * @text 名前固定文字列
 * @desc 名前を指定します。
 * @default
 * 
 * @arg variableIdName
 * @text 名前指定変数
 * @desc 変数の値を名前として実行します。これを指定すると名前固定文字列は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeClass
 * @text 職業の変更
 * @desc 変数の値のアクターIDの職業を変更します。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constClassId
 * @text 職業ID定数
 * @desc 職業を指定します。
 * @type class
 * @default 0
 * 
 * @arg variableIdClass
 * @text 職業ID指定変数
 * @desc 変数の値を職業IDとして実行します。これを指定すると職業ID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg holdLevel
 * @text レベルを保持
 * @desc レベルを保持します。
 * @type boolean
 * @on 保持する
 * @off 保持しない
 * @default false
 * 
 * 
 * @command changeNickname
 * @text 二つ名の変更
 * @desc アクターの二つ名を変更します。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constNicknameId
 * @text 二つ名固定文字列
 * @desc 二つ名を指定します。
 * @default
 * 
 * @arg variableIdNickname
 * @text 二つ名指定変数
 * @desc 変数の値を二つ名として実行します。これを指定すると二つ名固定文字列は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command changeProfile
 * @text プロフィールの変更
 * @desc アクターのプロフィールを変更します。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg constProfileId
 * @text プロフィール固定文字列
 * @desc プロフィールを指定します。
 * @default
 * 
 * @arg variableIdProfile
 * @text プロフィール指定変数
 * @desc 変数の値をプロフィールとして実行します。これを指定するとプロフィール固定文字列は無視されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command requestAnimation
 * @text アニメーションの表示
 * @desc アニメーションを表示します。
 *
 * @arg constEventId
 * @text イベントID定数
 * @desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
 * @type number
 * @min -1
 * @default 0
 *
 * @arg variableIdEvent
 * @text イベントID変数
 * @desc 変数の値をイベントIDとします。これを指定するとイベントID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg constAnimationId
 * @text アニメーショID定数
 * @desc アニメーショIDとして実行します。
 * @type number
 * @default 0
 * 
 * @arg variableIdAnimation
 * @text アニメーショID変数
 * @desc 変数の値をアニメーショIDとします。これを指定するとアニメーショID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg wait
 * @text 完了までウェイト
 * @desc 完了までウェイトします。
 * @type boolean
 * @on ウェイトする
 * @off ウェイトしない
 * @default false
 * 
 * 
 * @command requestBalloon
 * @text フキダシアイコンの表示
 * @desc フキダシアイコンを表示します。イベントコマンドで指定できない16番以降のフキダシ表示にも使用できます。
 *
 * @arg constEventId
 * @text イベントID定数
 * @desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
 * @type number
 * @min -1
 * @default 0
 *
 * @arg variableIdEvent
 * @text イベントID変数
 * @desc 変数の値をイベントIDとします。これを指定するとイベントID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg constBalloonId
 * @text フキダシID定数
 * @desc フキダシアイコンIDとして実行します。
 * @type number
 * @default 0
 * 
 * @arg variableIdBalloon
 * @text フキダシID変数
 * @desc 変数の値をフキダシアイコンIDとします。これを指定するとフキダシID定数は無視されます。
 * @type variable
 * @default 0
 * 
 * @arg wait
 * @text 完了までウェイト
 * @desc 完了までウェイトします。
 * @type boolean
 * @on ウェイトする
 * @off ウェイトしない
 * @default false
 * 
 * 
 * @command changeNameScene
 * @text 名前入力の処理
 * @desc 名前入力シーンを表示します。
 *
 * @arg constActorId
 * @text アクターID定数
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 *
 * @arg variableIdActor
 * @text アクターID指定変数
 * @desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
 * @type variable
 * @default 0
 *
 * @arg maxLength
 * @text 最大文字定数
 * @desc 最大文字数を指定します。
 * @type number
 *
 * @arg variableIdmaxLength
 * @text 最大文字定数指定変数
 * @desc 変数の値を最大文字数として実行します。これを指定すると最大文字定数は無視されます。
 * @type variable
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    PluginManager.registerCommand(pluginName, "changeItem", function (args) {
        const selectAction = args.selectAction === "true";
        const changeItemId = $gameVariables.value(args.variableIdItem);
        const changeQuantity = args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity;
        if (changeItemId > 0) {
            if (selectAction) {
                $gameParty.gainItem($dataItems[changeItemId], changeQuantity);
            } else {
                $gameParty.loseItem($dataItems[changeItemId], changeQuantity);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeWeapon", function (args) {
        const selectAction = args.selectAction === "true";
        const includeEquip = args.includeEquip === "true";
        const changeWeaponId = $gameVariables.value(args.variableIdWeapon);
        const changeQuantity = args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity;
        if (changeWeaponId > 0) {
            if (selectAction) {
                $gameParty.gainItem($dataWeapons[changeWeaponId], changeQuantity, includeEquip);
            } else {
                $gameParty.loseItem($dataWeapons[changeWeaponId], changeQuantity, includeEquip);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeArmor", function (args) {
        const selectAction = args.selectAction === "true";
        const includeEquip = args.includeEquip === "true";
        const changeArmorId = $gameVariables.value(args.variableIdArmor);
        const changeQuantity = args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity;
        if (changeArmorId > 0) {
            if (selectAction) {
                $gameParty.gainItem($dataArmors[changeArmorId], changeQuantity, includeEquip);
            } else {
                $gameParty.loseItem($dataArmors[changeArmorId], changeQuantity, includeEquip);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeMember", function (args) {
        const selectMethod = args.selectMethod === "true";
        const selectActorId = $gameVariables.value(args.variableIdActor);
        const initializeActor = args.initializeActor === "true";
        if (selectActorId > 0) {
            if (initializeActor) {
                $gameActors.actor(selectActorId).setup(selectActorId);
            }
            if (selectMethod) {
                $gameParty.addActor(selectActorId);
            } else {
                $gameParty.removeActor(selectActorId);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeState", function (args) {
        const selectAction = args.selectAction === "true";
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const variableIdState = $gameVariables.value(args.variableIdState);
        if (changeActorId > 0) {
            if (selectAction) {
                $gameActors.actor(changeActorId).addState(variableIdState);
            } else {
                $gameActors.actor(changeActorId).removeState(variableIdState);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeSkill", function (args) {
        const selectAction = args.selectAction === "true";
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const variableIdSkill = args.variableIdSkill > 0 ? $gameVariables.value(args.variableIdSkill) : args.constSkillId;
        if (changeActorId > 0) {
            if (selectAction) {
                $gameActors.actor(changeActorId).learnSkill(variableIdSkill);
            } else {
                $gameActors.actor(changeActorId).forgetSkill(variableIdSkill);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeEquip", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const changeWeaponId = args.variableIdWeapon > 0 ? $gameVariables.value(args.variableIdWeapon) : args.constWeaponId;
        const changeArmorId = args.variableIdArmor > 0 ? $gameVariables.value(args.variableIdArmor) : args.constArmorId;
        const changeEquipId = changeArmorId > 0 ? changeArmorId : changeWeaponId;
        const equipType = changeArmorId > 0 ? "Armor" : "Weapon";
        const autoGetTypeId = args.constEquipTypeId === '0';
        let changeEquipTypeId = 0;
        if (autoGetTypeId) {
            if (equipType === "Armor") {
                changeEquipTypeId = $dataArmors[changeArmorId].etypeId;
            } else {
                changeEquipTypeId = $dataWeapons[changeWeaponId].etypeId;
            }
        } else {
            changeEquipTypeId = args.variableIdEquipType > 0 ? args.variableIdEquipType : args.constEquipTypeId;
        }
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).changeEquipById(changeEquipTypeId, changeEquipId);
        }
    });

    PluginManager.registerCommand(pluginName, "changeName", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const changeName = args.variableIdName > 0 ? $gameVariables.value(args.variableIdName) : args.constNameId;
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setName(changeName);
        }
    });

    PluginManager.registerCommand(pluginName, "changeClass", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const changeClassId = args.variableIdClass > 0 ? $gameVariables.value(args.variableIdClass) : args.constClassId;
        const holdLevel = args.holdLevel === "true";
        if (changeActorId > 0 && changeClassId > 0) {
            $gameActors.actor(changeActorId).changeClass(changeClassId, holdLevel);
        }
    });

    PluginManager.registerCommand(pluginName, "changeNickname", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const changeNickname = args.variableIdNickname > 0 ? $gameVariables.value(args.variableIdNickname) : args.constNicknameId;
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setNickname(changeNickname);
        }
    });

    PluginManager.registerCommand(pluginName, "changeProfile", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const changeProfile = args.variableIdProfile > 0 ? $gameVariables.value(args.variableIdProfile) : args.constProfileId;
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setProfile(changeProfile);
        }
    });

    PluginManager.registerCommand(pluginName, "requestAnimation", function (args) {
        const eventId = args.variableIdEvent > 0 ? $gameVariables.value(args.variableIdEvent) : args.constEventId;
        const animationId = args.variableIdAnimation > 0 ? $gameVariables.value(args.variableIdAnimation) : args.variableIdAnimation;
        const wait = args.wait === "true";
        $gameTemp.requestAnimation([this.character(eventId)], animationId);
        if (wait) {
            this.setWaitMode("Animation");
        }
    });

    PluginManager.registerCommand(pluginName, "requestBalloon", function (args) {
        const eventId = args.variableIdEvent > 0 ? $gameVariables.value(args.variableIdEvent) : args.constEventId;
        const balloonId = args.variableIdBalloon > 0 ? $gameVariables.value(args.variableIdBalloon) : args.variableIdBalloon;
        const wait = args.wait === "true";
        $gameTemp.requestBalloon(this.character(eventId), balloonId);
        if (wait) {
            this.setWaitMode("balloon");
        }
    });

    PluginManager.registerCommand(pluginName, "changeNameScene", function (args) {
        const changeActorId = args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId;
        const maxLength = args.variableIdmaxLength > 0 ? $gameVariables.value(args.variableIdmaxLength) : args.maxLength;
        if (changeActorId > 0 && maxLength > 0) {
            SceneManager.push(Scene_Name);
            SceneManager.prepareNextScene(changeActorId, maxLength);
        }
    });

})();
