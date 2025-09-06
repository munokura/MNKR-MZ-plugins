/*
 * --------------------------------------------------
 * MNKR_LearnRandomSkill.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LearnRandomSkill.js
@plugindesc We will change the system so that only one skill will be randomly acquired from those with the same skill level as the job.
@author munokura
@license MIT License

@help
You can set the "skills to learn" for each job depending on its level.
When this plugin is installed, if multiple skills are specified at the same
level,
it will randomly learn only one skill.

There are no plugin commands.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author,
and there are no restrictions on its use (commercial, 18+ use, etc.).
*/

/*:ja
@target MZ MV
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_LearnRandomSkill.js
@plugindesc 職業で習得するスキルの設定レベルが同じものから1つだけランダム習得するシステムに変更します。
@author munokura

@help
職業にはレベルに応じて「習得するスキル」を設定できます。
このプラグインを導入すると、習得スキルを同レベルに複数のスキルを指定した場合、
1つだけランダム習得するシステムに変更します。


プラグインコマンドはありません。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    Game_Actor.prototype.levelUp = function () {
        this._level++;
        let learnSkillArgs = [];
        for (const learning of this.currentClass().learnings) {
            if (learning.level === this._level) {
                learnSkillArgs.push(learning.skillId);
            }
        }
        if (learnSkillArgs.length > 0) {
            const learnRandomSkill = learnSkillArgs[Math.floor(Math.random() * learnSkillArgs.length)];
            this.learnSkill(learnRandomSkill);
        }
    };

})();