/*
 * --------------------------------------------------
 * MNKR_SkillChoiceSceneMZ.js
 *   Ver.0.0.4
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SkillChoiceSceneMZ.js
@plugindesc Add a plugin command to display the skill selection scene.
@author munokura
@license MIT License

@help
Adds a plugin command to display a skill selection scene.

The skill selection scene opens a window listing the skills specified by the
actor ID,
and assigns the ID of the selected skill to the specified variable.
If canceled, the specified variable will be set to -1.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author,
and there are no restrictions on its use (commercial, R18+, etc.).

@param windowX
@text Window X coordinate
@desc Window X coordinate of the skill selection scene
@type number
@default 0

@param windowY
@text Window Y coordinate
@desc Window Y coordinate of the skill selection scene
@type number
@default 0

@param windowWidth
@text Window Width
@desc Window width of skill selection scene. If 0, it will be the width of the UI area.
@type number
@default 0

@param windowHeight
@text Window Row Count
@desc The number of rows in the skill selection scene window. If 0, it will be set to the height of the UI area.
@type number
@default 0

@param helpWindow
@text Help window display
@desc Displays the skill's help window.
@type boolean
@on display
@off hidden
@default true

@command skillChoiceScene
@text Show skill selection scene
@desc Displays the skill selection scene.
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
@arg variableIdSkill
@text Skill ID substitution variable
@desc Assign the skill ID to a variable.
@type variable
@default 0
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SkillChoiceSceneMZ.js
@plugindesc スキル選択シーンを表示するプラグインコマンドを追加します。
@author munokura

@help
スキル選択シーンを表示するプラグインコマンドを追加します。

スキル選択シーンはアクターIDで指定したスキルの一覧ウィンドウを開き、
選択したスキルのIDを指定変数に代入します。
キャンセルした場合、指定変数に-1を代入します。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param windowX
@text ウィンドウX座標
@type number
@default 0
@desc スキル選択シーンのウィンドウX座標

@param windowY
@text ウィンドウY座標
@type number
@default 0
@desc スキル選択シーンのウィンドウY座標

@param windowWidth
@text ウィンドウ幅
@type number
@default 0
@desc スキル選択シーンのウィンドウ幅。0の場合、UIエリアの幅にします。

@param windowHeight
@text ウィンドウ行数
@type number
@default 0
@desc スキル選択シーンのウィンドウ行数。0の場合、UIエリアの高さにします。

@param helpWindow
@text ヘルプウィンドウ表示
@desc スキルのヘルプウィンドウを表示します。
@type boolean
@on 表示
@off 非表示
@default true

@command skillChoiceScene
@text スキル選択シーンを表示
@desc スキル選択シーンを表示します。

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

@arg variableIdSkill
@text スキルID代入変数
@desc スキルIDを変数に代入します。
@type variable
@default 0
*/

(() => {
	"use strict";

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);

	const param = {};
	param.windowX = Number(parameters['windowX'] || 0);
	param.windowY = Number(parameters['windowY'] || 0);
	param.windowWidth = Number(parameters['windowWidth'] || 0);
	param.windowHeight = Number(parameters['windowHeight'] || 0);
	param.helpWindow = parameters['helpWindow'] === "true";

	const MNKR_SkillChoice = {
		actorId: 0,
		variableId: 0,
		selectSkillId: 0
	};

	PluginManager.registerCommand(pluginName, "skillChoiceScene", function (args) {
		const constActorId = Number(args.constActorId);
		const variableIdActor = Number(args.variableIdActor);
		MNKR_SkillChoice.actorId = variableIdActor > 0 ? $gameVariables.value(variableIdActor) : constActorId;
		MNKR_SkillChoice.variableId = Number(args.variableIdSkill);
		if (MNKR_SkillChoice.actorId > 0 && MNKR_SkillChoice.variableId > 0) {
			SceneManager.push(MNKR_Scene_SkillChoice);
		}
	});

	//-----------------------------------------------------------------------------
	// MNKR_Scene_SkillChoice

	function MNKR_Scene_SkillChoice() {
		this.initialize.apply(this, arguments);
	}

	MNKR_Scene_SkillChoice.prototype = Object.create(Scene_MenuBase.prototype);
	MNKR_Scene_SkillChoice.prototype.constructor = MNKR_Scene_SkillChoice;

	MNKR_Scene_SkillChoice.prototype.create = function () {
		Scene_MenuBase.prototype.create.call(this);
		if (param.helpWindow) {
			this.createHelpWindow();
		}
		this.createSkillChoiceWindow();
	};

	MNKR_Scene_SkillChoice.prototype.createSkillChoiceWindow = function () {
		const rect = this.skillChoiceWindowRect();
		this._skillChoiceWindow = new MNKR_Window_SkillChoice(rect);
		if (param.helpWindow) {
			this._skillChoiceWindow.setHelpWindow(this._helpWindow);
		}
		this._skillChoiceWindow.setHandler('ok', this.onItemOk.bind(this));
		this._skillChoiceWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this.addWindow(this._skillChoiceWindow);
	};

	MNKR_Scene_SkillChoice.prototype.skillChoiceWindowRect = function () {
		const ww = param.windowWidth === 0 ? Graphics.boxWidth : param.windowWidth;
		const wh = param.windowHeight === 0 ? this.mainAreaHeight() : this.calcWindowHeight(param.windowHeight, true);
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};

	MNKR_Scene_SkillChoice.prototype.onItemOk = function () {
		MNKR_SkillChoice.selectSkillId = this._skillChoiceWindow.item().id;
		$gameVariables.setValue(MNKR_SkillChoice.variableId, MNKR_SkillChoice.selectSkillId);
		this.popScene();
	};

	MNKR_Scene_SkillChoice.prototype.onItemCancel = function () {
		$gameVariables.setValue(MNKR_SkillChoice.variableId, -1);
		this.popScene();
	};

	//-----------------------------------------------------------------------------
	// MNKR_Window_SkillChoice

	function MNKR_Window_SkillChoice() {
		this.initialize(...arguments);
	}

	MNKR_Window_SkillChoice.prototype = Object.create(Window_SkillList.prototype);
	MNKR_Window_SkillChoice.prototype.constructor = MNKR_Window_SkillChoice;

	MNKR_Window_SkillChoice.prototype.initialize = function (rect) {
		Window_SkillList.prototype.initialize.call(this, rect);
		this._actor = $gameActors.actor(MNKR_SkillChoice.actorId);
		this._data = this._actor.skills();
		this.refresh();
		this.select(0);
		this.activate();
	};

	MNKR_Window_SkillChoice.prototype.refresh = function () {
		Window_Selectable.prototype.refresh.call(this);
	};

	MNKR_Window_SkillChoice.prototype.drawItem = function (index) {
		const skill = this._data[index];
		if (skill) {
			const costWidth = this.costWidth();
			const rect = this.itemLineRect(index);
			this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
			this.changePaintOpacity(1);
		}
	};

	MNKR_Window_SkillChoice.prototype.isEnabled = function () {
		return true;
	};

})();