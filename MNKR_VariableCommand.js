/*
 * --------------------------------------------------
 * MNKR_VariableCommand.js
 *   Ver.2.1.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
@plugindesc Adds a plug-in command that enables combinations of variables that cannot be selected with event commands.
@author munokura
@license MIT License

@help
Enables the use of combinations that cannot be selected using variables in
event commands.
Adds plugin commands.

Party
- Add/Delete Items
- Add/Delete Weapons
- Add/Delete Armor
- Swap Members

Actor
- Change State
- Add/Delete Skills
- Change Equipment
- Change Name
- Change Job
- Change Nickname
- Change Profile

Character
- Display Animation
- Display Speech Bubble Icon

Scene Control
- Process Name Input

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).

@command changeItem
@text Increase or decrease of items
@desc Change the number of item IDs in the variable's value.
@arg selectAction
@text Increase items
@desc Decide whether to "increase or decrease" the item.
@type boolean
@on increase
@off reduce
@default true
@arg variableIdItem
@text Item specification variable
@desc Executes the variable's value as the item ID.
@type variable
@default 0
@arg constQuantity
@text constant
@desc Specify the number.
@type number
@default 0
@arg variableIdQuantity
@text Numerical variables
@desc Executes the value of the variable as a number, ignoring constants.
@type variable
@default 0

@command changeWeapon
@text Weapon additions and deletions
@desc Change the number of weapon IDs in the variable's value.
@arg selectAction
@text Increase your arsenal
@desc Decide whether to "increase or decrease" weapons.
@type boolean
@on increase
@off reduce
@default true
@arg includeEquip
@text Includes equipment
@desc Decide whether to include equipped weapons.
@type boolean
@on include
@off Do not include
@default false
@arg variableIdWeapon
@text Weapon Designation Variable
@desc Executes the weapon ID using the variable's value. If this is specified, the weapon specification will be ignored.
@type variable
@default 0
@arg constQuantity
@text constant
@desc Specify the number.
@type number
@default 0
@arg variableIdQuantity
@text Numerical variables
@desc Executes the value of the variable as a number, ignoring constants.
@type variable
@default 0

@command changeArmor
@text Increase or decrease armor
@desc Change the number of armor IDs in the variable value.
@arg selectAction
@text Increase armor
@desc Decide whether to "increase or decrease" your armor.
@type boolean
@on increase
@off reduce
@default true
@arg includeEquip
@text Includes equipment
@desc Decide whether to include equipped armor.
@type boolean
@on include
@off Do not include
@default false
@arg variableIdArmor
@text Armor specification variables
@desc The value of the variable is executed as the armor ID. If this is specified, the armor specification will be ignored.
@type variable
@default 0
@arg constQuantity
@text constant
@desc Specify the number.
@type number
@default 0
@arg variableIdQuantity
@text Numerical variables
@desc Executes the value of the variable as a number, ignoring constants.
@type variable
@default 0

@command changeMember
@text Member replacement
@desc The actor ID of the variable's value is "added" or "removed" from the member.
@arg selectMethod
@text Add members
@desc Decide whether to add or remove members.
@type boolean
@on Add
@off remove
@default true
@arg variableIdActor
@text Actor ID variable
@desc Executes the variable's value as the actor ID.
@type variable
@default 0
@arg initializeActor
@text Actor Initialization
@desc Initialize the actor.
@type boolean
@on Initialize
@off Do not initialize
@default false

@command changeState
@text State increase/decrease
@desc "Add/Remove" states.
@arg selectAction
@text Add State
@desc Decide whether to "add" or "delete" the state.
@type boolean
@on Addition
@off Cancellation
@default true
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg variableIdState
@text State ID specification variable
@desc Executes the value of the variable as the state ID. If this is specified, the state ID constant will be ignored.
@type variable
@default 0

@command changeSkill
@text Skill Increase/Decrease
@desc Learn and forget skills.
@arg selectAction
@text Learn skills
@desc Decide whether to "learn" or "forget" the skill.
@type boolean
@on learn by heart
@off forget
@default true
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor-specific variables
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constSkillId
@text Skill ID Constants
@desc Specify the skill.
@type class
@default 0
@arg variableIdSkill
@text Skill ID specification variable
@desc Executes the value of the variable as the skill ID. If specified, the skill ID constant will be ignored.
@type variable
@default 0

@command changeEquip
@text Equipment changes
@desc Change equipment. The target equipment must be in your item list.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constWeaponId
@text Weapon ID Constants
@desc Specify the weapon.
@type weapon
@default 0
@arg variableIdWeapon
@text Weapon ID specification variable
@desc Executes the value of the variable as the weapon ID. If specified, the weapon ID constant will be ignored.
@type variable
@default 0
@arg constArmorId
@text Armor ID Constants
@desc Specifies the armor. If this is specified, the weapon ID will be ignored.
@type armor
@default 0
@arg variableIdArmor
@text Armor ID specification variable
@desc Executes the variable value as the armor ID. If this is specified, the armor ID constant and weapon ID will be ignored.
@type variable
@default 0
@arg constEquipTypeId
@text Equipment Type ID Constant
@desc Specifies the equipment type. If 0, it will be automatically acquired from the specified weapon/armor.
@type number
@default 0
@arg variableIdEquipType
@text Equipment type ID specification variable
@desc Uses the value of the variable as the equipment type ID. If this is specified, the equipment type ID constant will be ignored.
@type variable
@default 0

@command changeName
@text Name change
@desc Change the name of the actor.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constNameId
@text Name fixed string
@desc Specify a name.
@arg variableIdName
@text Named Variables
@desc Executes the variable value as the name. If you specify this, the name constant string will be ignored.
@type variable
@default 0

@command changeClass
@text Changing occupations
@desc Change the actor ID's occupation in the variable's value.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constClassId
@text Occupation ID constant
@desc Specify your occupation.
@type class
@default 0
@arg variableIdClass
@text Occupation ID specification variable
@desc Executes the job ID using the value of the variable. If this is specified, the job ID constant will be ignored.
@type variable
@default 0
@arg holdLevel
@text Maintain Level
@desc Hold the level.
@type boolean
@on Hold
@off Do not retain
@default false

@command changeNickname
@text Nickname change
@desc Change the actor's nickname.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constNicknameId
@text Nickname fixed string
@desc Specify two names.
@arg variableIdNickname
@text Epithetized variables
@desc Executes the command with the variable value as the nickname. If you specify this, the fixed nickname string will be ignored.
@type variable
@default 0

@command changeProfile
@text Changing your profile
@desc Change the actor's profile.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg constProfileId
@text Profile fixed string
@desc Specify the profile.
@arg variableIdProfile
@text Profile-specific variables
@desc Executes the value of the variable as the profile. If specified, the profile constant string will be ignored.
@type variable
@default 0

@command requestAnimation
@text View animation
@desc View the animation.
@arg constEventId
@text Event ID Constants
@desc A value of -1 is the player, 0 is the running event, and 1 or greater is the event ID.
@type number
@default 0
@min -1
@arg variableIdEvent
@text Event ID Variable
@desc The value of the variable is the event ID. If this is specified, the event ID constant is ignored.
@type variable
@default 0
@arg constAnimationId
@text Animation ID Constants
@desc Run as animation ID.
@type number
@default 0
@arg variableIdAnimation
@text Animation ID variable
@desc Sets the variable's value as the animation ID. If this is specified, the animation ID constant will be ignored.
@type variable
@default 0
@arg wait
@text Wait until completion
@desc Wait until completion.
@type boolean
@on Wait
@off No wait
@default false

@command requestBalloon
@text Displaying the speech bubble icon
@desc Displays a balloon icon. Can also be used to display balloons numbered 16 and above, which cannot be specified with event commands.
@arg constEventId
@text Event ID Constants
@desc A value of -1 is the player, 0 is the running event, and 1 or greater is the event ID.
@type number
@default 0
@min -1
@arg variableIdEvent
@text Event ID Variable
@desc The value of the variable is the event ID. If this is specified, the event ID constant is ignored.
@type variable
@default 0
@arg constBalloonId
@text Speech bubble ID constant
@desc Run as balloon icon ID.
@type number
@default 0
@arg variableIdBalloon
@text Speech bubble ID variable
@desc The value of the variable is the balloon icon ID. If you specify this, the balloon ID constant will be ignored.
@type variable
@default 0
@arg wait
@text Wait until completion
@desc Wait until completion.
@type boolean
@on Wait
@off No wait
@default false

@command changeNameScene
@text Processing name input
@desc The name input scene is displayed.
@arg constActorId
@text Actor ID Constants
@desc Specify the actor.
@type actor
@default 0
@arg variableIdActor
@text Actor ID specification variable
@desc Executes the variable's value as the actor ID. If specified, the actor ID constant will be ignored.
@type variable
@default 0
@arg maxLength
@text Maximum character constant
@desc Specify the maximum number of characters.
@type number
@arg variableIdmaxLength
@text Maximum character constant variable
@desc Executes the variable's value as the maximum number of characters. If this is specified, the maximum character constant is ignored.
@type variable
@default 0
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_VariableCommand.js
@plugindesc イベントコマンドで変数が選べない組み合わせを使用可能にするプラグインコマンドを追加します。
@author munokura

@help
イベントコマンドで変数が選べない組み合わせを使用可能にする
プラグインコマンドを追加します。

パーティ
  - アイテムの増減
  - 武器の増減
  - 防具の増減
  - メンバーの入れ替え

アクター
  - ステートの変更
  - スキルの増減
  - 装備の変更
  - 名前の変更
  - 職業の変更
  - 二つ名の変更
  - プロフィールの変更

キャラクター
  - アニメーションの表示
  - フキダシアイコンの表示

シーン制御
  - 名前入力の処理



# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@command changeItem
@text アイテムの増減
@desc 変数の値のアイテムIDの数を変更します。

@arg selectAction
@text アイテムを増やす
@desc アイテムを「増やす・減らす」か決めます。
@type boolean
@on 増やす
@off 減らす
@default true

@arg variableIdItem
@text アイテム指定変数
@desc 変数の値をアイテムIDとして実行します。
@type variable
@default 0

@arg constQuantity
@text 定数
@desc 数を指定します。
@type number
@default 0

@arg variableIdQuantity
@text 数指定変数
@desc 変数の値を数として実行します。これを指定すると定数は無視されます。
@type variable
@default 0


@command changeWeapon
@text 武器の増減
@desc 変数の値の武器IDの数を変更します。

@arg selectAction
@text 武器を増やす
@desc 武器を「増やす・減らす」か決めます。
@type boolean
@on 増やす
@off 減らす
@default true

@arg includeEquip
@text 装備を含む
@desc 装備中の武器を含めるかを決めます。
@type boolean
@on 含める
@off 含めない
@default false

@arg variableIdWeapon
@text 武器指定変数
@desc 変数の値を武器IDとして実行します。これを指定すると武器指定は無視されます。
@type variable
@default 0

@arg constQuantity
@text 定数
@desc 数を指定します。
@type number
@default 0

@arg variableIdQuantity
@text 数指定変数
@desc 変数の値を数として実行します。これを指定すると定数は無視されます。
@type variable
@default 0


@command changeArmor
@text 防具の増減
@desc 変数の値の防具IDの数を変更します。

@arg selectAction
@text 防具を増やす
@desc 防具を「増やす・減らす」か決めます。
@type boolean
@on 増やす
@off 減らす
@default true

@arg includeEquip
@text 装備を含む
@desc 装備中の防具を含めるかを決めます。
@type boolean
@on 含める
@off 含めない
@default false

@arg variableIdArmor
@text 防具指定変数
@desc 変数の値を防具IDとして実行します。これを指定すると防具指定は無視されます。
@type variable
@default 0

@arg constQuantity
@text 定数
@desc 数を指定します。
@type number
@default 0

@arg variableIdQuantity
@text 数指定変数
@desc 変数の値を数として実行します。これを指定すると定数は無視されます。
@type variable
@default 0


@command changeMember
@text メンバーの入れ替え
@desc 変数の値のアクターIDをメンバーに「加え・外し」ます。

@arg selectMethod
@text メンバーを加える
@desc メンバーを「加える・外す」かを決めます。
@type boolean
@on 加える
@off 外す
@default true

@arg variableIdActor
@text アクターID指定する変数
@desc 変数の値をアクターIDとして実行します。
@type variable
@default 0

@arg initializeActor
@text アクター初期化
@desc アクターを初期化します。
@type boolean
@on 初期化する
@off 初期化しない
@default false


@command changeState
@text ステートの増減
@desc ステートを「付加・解除」します。

@arg selectAction
@text ステートを付加
@desc ステートを「付加・解除」するか決めてください。
@type boolean
@on 付加
@off 解除
@default true

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg variableIdState
@text ステートID指定変数
@desc 変数の値をステートIDとして実行します。これを指定するとステートID定数は無視されます。
@type variable
@default 0


@command changeSkill
@text スキルの増減
@desc スキルを「覚える・忘れる」します。

@arg selectAction
@text スキルを覚える
@desc スキルを「覚える・忘れる」か決めてください。
@type boolean
@on 覚える
@off 忘れる
@default true

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクター指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constSkillId
@text スキルID定数
@desc スキルを指定します。
@type class
@default 0

@arg variableIdSkill
@text スキルID指定変数
@desc 変数の値をスキルIDとして実行します。これを指定するとスキルID定数は無視されます。
@type variable
@default 0


@command changeEquip
@text 装備の変更
@desc 装備を変更します。対象の装備がアイテム欄に必要です。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constWeaponId
@text 武器ID定数
@desc 武器を指定します。
@type weapon
@default 0

@arg variableIdWeapon
@text 武器ID指定変数
@desc 変数の値を武器IDとして実行します。これを指定すると武器ID定数は無視されます。
@type variable
@default 0

@arg constArmorId
@text 防具ID定数
@desc 防具を指定します。これを指定すると武器IDは無視されます。
@type armor
@default 0

@arg variableIdArmor
@text 防具ID指定変数
@desc 変数の値を防具IDとして実行します。これを指定すると防具ID定数・武器IDは無視されます。
@type variable
@default 0

@arg constEquipTypeId
@text 装備タイプID定数
@desc 装備タイプを指定します。0の場合、指定された武器・防具から自動取得します。
@type number
@default 0

@arg variableIdEquipType
@text 装備タイプID指定変数
@desc 変数の値を装備タイプIDとして実行します。これを指定すると装備タイプID定数は無視されます。
@type variable
@default 0


@command changeName
@text 名前の変更
@desc アクターの名前の変更します。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constNameId
@text 名前固定文字列
@desc 名前を指定します。
@default

@arg variableIdName
@text 名前指定変数
@desc 変数の値を名前として実行します。これを指定すると名前固定文字列は無視されます。
@type variable
@default 0


@command changeClass
@text 職業の変更
@desc 変数の値のアクターIDの職業を変更します。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constClassId
@text 職業ID定数
@desc 職業を指定します。
@type class
@default 0

@arg variableIdClass
@text 職業ID指定変数
@desc 変数の値を職業IDとして実行します。これを指定すると職業ID定数は無視されます。
@type variable
@default 0

@arg holdLevel
@text レベルを保持
@desc レベルを保持します。
@type boolean
@on 保持する
@off 保持しない
@default false


@command changeNickname
@text 二つ名の変更
@desc アクターの二つ名を変更します。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constNicknameId
@text 二つ名固定文字列
@desc 二つ名を指定します。
@default

@arg variableIdNickname
@text 二つ名指定変数
@desc 変数の値を二つ名として実行します。これを指定すると二つ名固定文字列は無視されます。
@type variable
@default 0


@command changeProfile
@text プロフィールの変更
@desc アクターのプロフィールを変更します。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg constProfileId
@text プロフィール固定文字列
@desc プロフィールを指定します。
@default

@arg variableIdProfile
@text プロフィール指定変数
@desc 変数の値をプロフィールとして実行します。これを指定するとプロフィール固定文字列は無視されます。
@type variable
@default 0


@command requestAnimation
@text アニメーションの表示
@desc アニメーションを表示します。

@arg constEventId
@text イベントID定数
@desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
@type number
@min -1
@default 0

@arg variableIdEvent
@text イベントID変数
@desc 変数の値をイベントIDとします。これを指定するとイベントID定数は無視されます。
@type variable
@default 0

@arg constAnimationId
@text アニメーショID定数
@desc アニメーショIDとして実行します。
@type number
@default 0

@arg variableIdAnimation
@text アニメーショID変数
@desc 変数の値をアニメーショIDとします。これを指定するとアニメーショID定数は無視されます。
@type variable
@default 0

@arg wait
@text 完了までウェイト
@desc 完了までウェイトします。
@type boolean
@on ウェイトする
@off ウェイトしない
@default false


@command requestBalloon
@text フキダシアイコンの表示
@desc フキダシアイコンを表示します。イベントコマンドで指定できない16番以降のフキダシ表示にも使用できます。

@arg constEventId
@text イベントID定数
@desc 値が-1でプレイヤー、0で実行しているイベント、1以上はイベントIDになります。
@type number
@min -1
@default 0

@arg variableIdEvent
@text イベントID変数
@desc 変数の値をイベントIDとします。これを指定するとイベントID定数は無視されます。
@type variable
@default 0

@arg constBalloonId
@text フキダシID定数
@desc フキダシアイコンIDとして実行します。
@type number
@default 0

@arg variableIdBalloon
@text フキダシID変数
@desc 変数の値をフキダシアイコンIDとします。これを指定するとフキダシID定数は無視されます。
@type variable
@default 0

@arg wait
@text 完了までウェイト
@desc 完了までウェイトします。
@type boolean
@on ウェイトする
@off ウェイトしない
@default false


@command changeNameScene
@text 名前入力の処理
@desc 名前入力シーンを表示します。

@arg constActorId
@text アクターID定数
@desc アクターを指定します。
@type actor
@default 0

@arg variableIdActor
@text アクターID指定変数
@desc 変数の値をアクターIDとして実行します。これを指定するとアクターID定数は無視されます。
@type variable
@default 0

@arg maxLength
@text 最大文字定数
@desc 最大文字数を指定します。
@type number

@arg variableIdmaxLength
@text 最大文字定数指定変数
@desc 変数の値を最大文字数として実行します。これを指定すると最大文字定数は無視されます。
@type variable
@default 0
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    PluginManager.registerCommand(pluginName, "changeItem", function (args) {
        const selectAction = args.selectAction === "true";
        const changeItemId = Number($gameVariables.value(args.variableIdItem));
        const changeQuantity = Number(args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity);
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
        const changeWeaponId = Number($gameVariables.value(args.variableIdWeapon));
        const changeQuantity = Number(args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity);
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
        const changeArmorId = Number($gameVariables.value(args.variableIdArmor));
        const changeQuantity = Number(args.variableIdQuantity > 0 ? $gameVariables.value(args.variableIdQuantity) : args.constQuantity);
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
        const selectActorId = Number($gameVariables.value(args.variableIdActor));
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
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const variableIdState = Number($gameVariables.value(args.variableIdState));
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
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const variableIdSkill = Number(args.variableIdSkill > 0 ? $gameVariables.value(args.variableIdSkill) : args.constSkillId);
        if (changeActorId > 0) {
            if (selectAction) {
                $gameActors.actor(changeActorId).learnSkill(variableIdSkill);
            } else {
                $gameActors.actor(changeActorId).forgetSkill(variableIdSkill);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeEquip", function (args) {
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const changeWeaponId = Number(args.variableIdWeapon > 0 ? $gameVariables.value(args.variableIdWeapon) : args.constWeaponId);
        const changeArmorId = Number(args.variableIdArmor > 0 ? $gameVariables.value(args.variableIdArmor) : args.constArmorId);
        const changeEquipId = Number(changeArmorId > 0 ? changeArmorId : changeWeaponId);
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
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const changeName = Number(args.variableIdName > 0 ? $gameVariables.value(args.variableIdName) : args.constNameId);
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setName(changeName);
        }
    });

    PluginManager.registerCommand(pluginName, "changeClass", function (args) {
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const changeClassId = Number(args.variableIdClass > 0 ? $gameVariables.value(args.variableIdClass) : args.constClassId);
        const holdLevel = args.holdLevel === "true";
        if (changeActorId > 0 && changeClassId > 0) {
            $gameActors.actor(changeActorId).changeClass(changeClassId, holdLevel);
        }
    });

    PluginManager.registerCommand(pluginName, "changeNickname", function (args) {
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const changeNickname = Number(args.variableIdNickname > 0 ? $gameVariables.value(args.variableIdNickname) : args.constNicknameId);
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setNickname(changeNickname);
        }
    });

    PluginManager.registerCommand(pluginName, "changeProfile", function (args) {
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const changeProfile = Number(args.variableIdProfile > 0 ? $gameVariables.value(args.variableIdProfile) : args.constProfileId);
        if (changeActorId > 0) {
            $gameActors.actor(changeActorId).setProfile(changeProfile);
        }
    });

    PluginManager.registerCommand(pluginName, "requestAnimation", function (args) {
        const eventId = Number(args.variableIdEvent > 0 ? $gameVariables.value(args.variableIdEvent) : args.constEventId);
        const animationId = Number(args.variableIdAnimation > 0 ? $gameVariables.value(args.variableIdAnimation) : args.variableIdAnimation);
        const wait = args.wait === "true";
        $gameTemp.requestAnimation([this.character(eventId)], animationId);
        if (wait) {
            this.setWaitMode("Animation");
        }
    });

    PluginManager.registerCommand(pluginName, "requestBalloon", function (args) {
        const eventId = Number(args.variableIdEvent > 0 ? $gameVariables.value(args.variableIdEvent) : args.constEventId);
        const balloonId = Number(args.variableIdBalloon > 0 ? $gameVariables.value(args.variableIdBalloon) : args.variableIdBalloon);
        const wait = args.wait === "true";
        $gameTemp.requestBalloon(this.character(eventId), balloonId);
        if (wait) {
            this.setWaitMode("balloon");
        }
    });

    PluginManager.registerCommand(pluginName, "changeNameScene", function (args) {
        const changeActorId = Number(args.variableIdActor > 0 ? $gameVariables.value(args.variableIdActor) : args.constActorId);
        const maxLength = Number(args.variableIdmaxLength > 0 ? $gameVariables.value(args.variableIdmaxLength) : args.maxLength);
        if (changeActorId > 0 && maxLength > 0) {
            SceneManager.push(Scene_Name);
            SceneManager.prepareNextScene(changeActorId, maxLength);
        }
    });

})();