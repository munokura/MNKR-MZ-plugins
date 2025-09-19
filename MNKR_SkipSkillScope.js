/*
 * --------------------------------------------------
 * MNKR_SkipSkillScope.js
 *   Ver.0.1.0
 * Copyright (c) 2024 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SkipSkillScope.js
@plugindesc Skip target selection when using skills (range is user) on the map.
@author munokura
@license MIT License

@help
Skips target selection when using a skill (with a user range) on the map.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_SkipSkillScope.js
@plugindesc マップ上でスキル(範囲が利用者)使用時に、対象選択をスキップします。
@author munokura

@help
マップ上でスキル(範囲が利用者)使用時に、対象選択をスキップします。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
	"use strict";

	//-----------------------------------------------------------------------------
	// Scene_ItemBase

	const _Scene_ItemBase_itemTargetActors = Scene_ItemBase.prototype.itemTargetActors;
	Scene_ItemBase.prototype.itemTargetActors = function () {
		const action = new Game_Action(this.user());
		action.setItemObject(this.item());
		if (action.isSkill() && action.isForUser()) {
			return [this.actor()];
		} else {
			return _Scene_ItemBase_itemTargetActors.call(this);
		}
	};

	const _Scene_ItemBase_determineItem = Scene_ItemBase.prototype.determineItem;
	Scene_ItemBase.prototype.determineItem = function () {
		const action = new Game_Action(this.user());
		const item = this.item();
		action.setItemObject(item);
		if (action.isSkill() && action.isForUser()) {
			this.onActorOk();
			this._itemWindow.refresh();
			this._itemWindow.activate();
		} else {
			_Scene_ItemBase_determineItem.call(this);
		}
	};

})();
