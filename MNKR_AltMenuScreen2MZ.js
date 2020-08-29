//=============================================================================
// Plugin for RPG Maker MZ
// AltMenuScreen2MZ.js
//=============================================================================
// Note: This Plugin is MZ version of AltMenuScreen3.js the KADOKAWA MV Plugin.
// [History of AltMenuScreen3]
// 2015.Nov.23 1.0.0 First Release
// 2018.Sep.19 1.0.1 add function to display current mapname.
//   Following bugs are fixed by Triacontan:
//   - The reserved actors, it doesn't display standing picture at first.
//    (リザーブメンバーの立ち絵が初回表示時に正しく表示されない問題の修正)
//   - At it's scrollable, arrow sprite indicates wrong direction.
//   （スクロール可能であることを示す矢印スプライトの向きがおかしい問題の修正）
// [History]
// 2020.Feb.17 0.0.1 First Release on closed community

/* 
 * MNKR_AltMenuScreen2MZ.js
 * 2020/8/29 1.0.0 change in Munokura
 * 2020/8/29 1.0.1 Bug fix
 */

/*:
 * @target MZ
 * @plugindesc Yet another menu screen layout
 * @author munokura (based on Sasuke KANNAZUKI)
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltMenuScreen2MZ.js
 *
 * @param allowWindowDisp
 * @text Display Window At Default
 * @desc Whether to display windows when BG is not set
 * @type boolean
 * @on Yes
 * @off No. Transparent
 * @default true
 *
 * @param maxColsMenu
 * @text Actor Columns At Main Menu
 * @desc The number of actors display on main menu. 0 is automatically adjusted according to the number of party actors.
 * @type number
 * @min 0
 * @default 4
 * 
 * @param commandRows
 * @text Menu Command Window's Row
 * @desc number of visible rows at command window
 * @type number
 * @min 1
 * @default 2
 *
 * @param commandCols
 * @text Menu Command Window's Colomn
 * @desc number of columns at command window
 * @type number
 * @min 1
 * @default 4
 *
 * @param isDisplayStatus
 * @text Display Status?
 * @desc whether to display each actor's status on main menu
 * @type boolean
 * @default true
 *
 * @param display map name
 * @text Display Map Name?
 * @desc whether to display map name on main menu
 * @type boolean
 * @default true
 *
 * @param location string
 * @parent display map name
 * @text Location String
 * @desc prefix of map name. It draws by system color.
 * @type string
 * @default Location:
 *
 * @param bgBitmapMenu
 * @text BG Image of Main Menu
 * @desc background bitmap at main menu scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param doesNotSetItemScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Item Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapItem
 * @parent doesNotSetItemScene
 * @text BG Image of Item Menu
 * @desc background bitmap file at item scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param doesNotSetSkillScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Skill Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapSkill
 * @parent doesNotSetSkillScene
 * @text BG Image of Skill Menu
 * @desc background bitmap file at skill scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetEquipScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Equip Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapEquip
 * @text BG Image of Equip Menu
 * @parent doesNotSetEquipScene
 * @desc background bitmap file at equip scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetStatusScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Status Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapStatus
 * @parent doesNotSetStatusScene
 * @text BG Image of Status Menu
 * @desc background bitmap file at status scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetOptionScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Option Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapOptions
 * @parent doesNotSetOptionScene
 * @text BG Image of Option Menu
 * @desc background bitmap file at option scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetSaveScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Save Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapFile
 * @parent doesNotSetSaveScene
 * @text BG Image of Save Menu
 * @desc background bitmap file at save/load scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetEndScene
 * @parent bgBitmapMenu
 * @text Set Same BG on Game End Scene?
 * @desc Whether to Set Same Image as Main Menu
 * @type boolean
 * @on Yes
 * @off No. Set Original BG
 * @default true
 *
 * @param bgBitmapGameEnd
 * @parent doesNotSetEndScene
 * @text BG Image of End Menu
 * @desc background bitmap file at gameEnd scene.
 * put at img/pictures.
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @noteParam stand_picture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actor
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 * 
 * This plugin changes the menu layout.
 *
 * [Summary]
 *  The differences of AltMenuscreen.js are follows:
 *  - It can set the standing graphic at each actor.
 *   - Describe actor's note following style:
 *    <stand_picture:filename>
 *   - If you don't set the picture, it displays actor's face grapic instead.
 *  - It can set the background image for each scene on menu.
 *   - Put background image file at img/pictures
 *   - If you don't set the picture, the scene' background become
 *     either transparent or display default window.
 *     (You can select at option)
 * - You can change the number of visible actors by option.
 * - You can select whether to display parameters or not.
 *  - When you display the parameter, you can select to display TP or not.
 * - You can display the current map name (option).
 *
 * Actor's Note:
 * <stand_picture:filename> set actor's standing picture at menu.
 *   put file at img/pictures.
 *
 * preferred size of actor's picture:
 * width: 174px(maxColsMenu=4), 240px(maxColsMenu=3)
 * height: 408px(commandRows=2), 444px(commandRows=1)
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 * 
 * Changes in Munokura
 * The display width of names etc. is automatically adjusted according to the number of people that can be displayed.
 * Added a function to automatically adjust the number of rows when the number of parties changes.
 */

/*:ja
 * @target MZ
 * @plugindesc レイアウトの異なるメニュー画面
 * @author ムノクラ (原作:神無月サスケ)
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_AltMenuScreen2MZ.js
 *
 * @param allowWindowDisp
 * @text 背景未設定の時ウィンドウ表示？
 * @desc 
 * @type boolean
 * @on する
 * @off しない。背景透明に
 * @default true
 *
 * @param maxColsMenu
 * @text アクター表示数
 * @desc メインメニュー画面のアクター表示ウィンドウの1画面の最大数。0にすると、パーティアクター人数で自動調整
 * @type number
 * @min 0
 * @default 4
 * 
 * @param commandRows
 * @text コマンドウィンドウ行数
 * @desc メインメニューのコマンドウィンドウ行数(既定値:2)
 * @type number
 * @min 1
 * @default 2
 *
 * @param commandCols
 * @text コマンドウィンドウ列数
 * @desc コマンドウィンドウ1行に表示する要素数(既定値:4)
 * @type number
 * @min 1
 * @default 4
 *
 * @param isDisplayStatus
 * @text ステータス表示？
 * @desc メインメニューでアクターのステータスを表示する？
 * @on する
 * @off しない
 * @type boolean
 * @default true
 *
 * @param display map name
 * @text マップ名表示？
 * @desc メインメニュー画面左下にマップ名を表示する？
 * @on する
 * @off しない
 * @type boolean
 * @default true
 *
 * @param location string
 * @parent display map name
 * @text 「現在地：」を意味するテキスト
 * @desc マップ名表示の際にシステムカラーで表示される文字列
 * @type string
 * @default 現在地:
 *
 * @param bgBitmapMenu
 * @text メインメニュー背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param doesNotSetItemScene
 * @parent bgBitmapMenu
 * @text アイテム画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapItem
 * @parent doesNotSetItemScene
 * @text アイテムメニュー背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param doesNotSetSkillScene
 * @parent bgBitmapMenu
 * @text スキル画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapSkill
 * @parent doesNotSetSkillScene
 * @text スキル画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetEquipScene
 * @parent bgBitmapMenu
 * @text 装備画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapEquip
 * @parent doesNotSetEquipScene
 * @text 装備画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetStatusScene
 * @parent bgBitmapMenu
 * @text ステータス画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapStatus
 * @parent doesNotSetStatusScene
 * @text ステータス画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetOptionScene
 * @parent bgBitmapMenu
 * @text オプション画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapOptions
 * @parent doesNotSetOptionScene
 * @text オプション画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetSaveScene
 * @parent bgBitmapMenu
 * @text セーブ画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapFile
 * @parent doesNotSetSaveScene
 * @text セーブ画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param doesNotSetEndScene
 * @parent bgBitmapMenu
 * @text 終了画面は同じ背景画？
 * @desc メインメニューと同じ背景画？
 * @type boolean
 * @on 同じ背景画
 * @off 別に設定
 * @default true
 *
 * @param bgBitmapGameEnd
 * @parent doesNotSetEndScene
 * @text 終了画面背景画
 * @desc 背景用の一枚絵のファイル名。
 * img/pictures に置いて下さい
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @noteParam stand_picture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actor
 * 
 * @help このプラグインにプラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインは、メニューのレイアウトを変更します。
 *
 * ■概要
 * AltMenuScreen.js との違いは、以下の通りです。
 * ・各アクターに立ち絵を表示可能
 *   アクターのメモ欄に次のような書式で書いてください。
 *   <stand_picture:ファイル名>
 *   ファイル名が、そのアクターの立ち絵になります。
 *   ファイルは img/pictures に置いてください。
 *   立ち絵を表示しない場合は、アクターの顔グラフィックが表示されます。
 * ・各シーン一括で、または特定のシーンにのみ、背景画を表示できます。
 *   背景画を使わないシーンでは、ウィンドウを表示するか、透明にするかを
 *   オプションで選択可能です。
 * ・１画面に表示可能な人数を設定できます。
 *   デフォルトでは４人ですが、３人にしたり、ふたりにしたり、
 *   画面サイズを変更している場合、５人以上も有効です。
 * ・オプションでマップ上の現在地も表示可能です。
 *
 * 望ましいアクター立ち絵のサイズ：
 * 幅：3列:240px, 4列：174px
 * 高さ： コマンドウィンドウ 1行:444px 2行:408px
 *
 * ■ライセンス表記
 * このプラグインは、RPGツクールMV用準公式プラグインAltMenuScreen3.jsの
 * MZ版です(2ではないことに注意)。
 *
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 * 
 * ■ムノクラの変更点
 * 表示可能な人数に合わせて、名前等の表示の幅を自動調整します。
 * パーティ人数の変化で列数を自動調整する機能を追加。
 */

(() => {
    const pluginName = 'MNKR_AltMenuScreen2MZ'
    //
    // process parameters
    //
    const parameters = PluginManager.parameters(pluginName)
    const allowWindowDisp = eval(parameters['allowWindowDisp'] || 'true')

    const maxColsMenuWnd = Number(parameters['maxColsMenu'] || 4)
    const rowsCommandWnd = Number(parameters['commandRows'] || 2)
    const colsCommandWnd = Number(parameters['commandCols'] || 4)

    const isDisplayStatus = eval(parameters['isDisplayStatus'] || 'true')
    const isDisplayMapName = eval(parameters['display map name'] || 'true')
    const locationString = parameters['location string'] || 'Location:'

    const bgBitmapMenu = parameters['bgBitmapMenu'] || ''


    let bgBitmap = {}
    bgBitmap['Scene_Item'] = parameters['bgBitmapItem'] || ''
    bgBitmap['Scene_Skill'] = parameters['bgBitmapSkill'] || ''
    bgBitmap['Scene_Equip'] = parameters['bgBitmapEquip'] || ''
    bgBitmap['Scene_Status'] = parameters['bgBitmapStatus'] || ''
    bgBitmap['Scene_Options'] = parameters['bgBitmapOptions'] || ''
    bgBitmap['Scene_Save'] = parameters['bgBitmapFile'] || ''
    bgBitmap['Scene_Load'] = bgBitmap['Scene_Save']
    bgBitmap['Scene_GameEnd'] = parameters['bgBitmapGameEnd'] || ''

    let setBg = {}
    setBg['Scene_Item'] = !eval(parameters['doesNotSetItemScene'] || 'true')
    setBg['Scene_Skill'] = !eval(parameters['doesNotSetSkillScene'] || 'true')
    setBg['Scene_Equip'] = !eval(parameters['doesNotSetEquipScene'] || 'true')
    setBg['Scene_Status'] = !eval(parameters['doesNotSetStatusScene'] || 'true')
    setBg['Scene_Options'] = !eval(parameters['doesNotSetOptionScene'] || 'true')
    setBg['Scene_Save'] = !eval(parameters['doesNotSetSaveScene'] || 'true')
    setBg['Scene_Load'] = setBg['Scene_Save']
    setBg['Scene_GameEnd'] = !eval(parameters['doesNotSetEndScene'] || 'true')

    //
    // set window positions (based on AltMenuScreen.js MZ ver.)
    //
    Scene_MenuBase.prototype.commandWindowHeight = function () {
        return this.calcWindowHeight(rowsCommandWnd, true)
    }

    Scene_MenuBase.prototype.goldWindowHeight = function () {
        return this.calcWindowHeight(1, true)
    }

    Scene_Menu.prototype.commandWindowRect = function () {
        const ww = Graphics.boxWidth
        const wh = this.commandWindowHeight()
        const wx = 0
        const wy = this.mainAreaTop()
        return new Rectangle(wx, wy, ww, wh)
    }

    Scene_Menu.prototype.statusWindowRect = function () {
        const h1 = this.commandWindowHeight()
        const h2 = this.goldWindowHeight()
        const ww = Graphics.boxWidth
        const wh = this.mainAreaHeight() - h1 - h2
        const wx = 0
        const wy = this.mainAreaTop() + this.commandWindowHeight()
        return new Rectangle(wx, wy, ww, wh)
    }

    Scene_ItemBase.prototype.actorWindowRect = function () {
        const rect = Scene_Menu.prototype.statusWindowRect()
        rect.y = this.mainAreaBottom() - rect.height
        return rect
    }

    Window_MenuCommand.prototype.maxCols = function () {
        return colsCommandWnd
    }

    Window_MenuCommand.prototype.numVisibleRows = function () {
        return rowsCommandWnd
    }

    Window_MenuStatus.prototype.maxCols = function () {
        return (maxColsMenuWnd === 0) ? $gameParty.members().length : maxColsMenuWnd
    }

    Sprite_Gauge.prototype.bitmapWidth = function () {
        return (maxColsMenuWnd === 0) ? 148 * 4 / $gameParty.members().length : 148 * 4 / maxColsMenuWnd
    }

    Sprite_Name.prototype.bitmapWidth = function () {
        return (maxColsMenuWnd === 0) ? 168 * 4 / $gameParty.members().length : 168 * 4 / maxColsMenuWnd
    }

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1
    }

    //
    // process windows' opacity and background bitmap
    //
    const bgBitmapName = () => {
        const className = SceneManager._scene.constructor.name
        const doSet = setBg[className]
        return doSet ? bgBitmap[className] : bgBitmapMenu
    }

    const isWindowVisible = () => allowWindowDisp && !bgBitmapName()

    const _Scene_MenuBase_create = Scene_MenuBase.prototype.create
    Scene_MenuBase.prototype.create = function () {
        this._allWindows = []
        _Scene_MenuBase_create.call(this)
    }

    const _Scene_MenuBase_start = Scene_MenuBase.prototype.start
    Scene_MenuBase.prototype.start = function () {
        this._setWindowsOpacity()
        _Scene_MenuBase_start.call(this)
    }

    const _Scene_MenuBase_addWindow = Scene_MenuBase.prototype.addWindow
    Scene_MenuBase.prototype.addWindow = function (window) {
        _Scene_MenuBase_addWindow.call(this, window)
        this._allWindows.push(window)
    }

    Scene_MenuBase.prototype._setWindowsOpacity = function () {
        if (!isWindowVisible()) {
            for (const window of this._allWindows) {
                window.opacity = 0
            }
        }
    }

    const _Scene_MenuBase_createBackground =
        Scene_MenuBase.prototype.createBackground
    Scene_MenuBase.prototype.createBackground = function () {
        const bgName = bgBitmapName()
        if (bgName) {
            this._backgroundSprite = new Sprite()
            this._backgroundSprite.bitmap = ImageManager.loadPicture(bgName)
            this.addChild(this._backgroundSprite)
        } else {
            _Scene_MenuBase_createBackground.call(this)
        }
    }

    //
    // draw image and parameters
    //
    var _Window_MenuStatus_drawItem = Window_MenuStatus.prototype.drawItem
    Window_MenuStatus.prototype.drawItem = function (index) {
        const actor = $gameParty.members()[index]
        const bitmapName = $dataActors[actor.actorId()].meta.stand_picture
        const bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null
        if (bitmap && !bitmap.isReady()) {
            bitmap.addLoadListener(_Window_MenuStatus_drawItem.bind(this, index))
        } else {
            _Window_MenuStatus_drawItem.call(this, index)
        }
    }

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        const actor = this.actor(index)
        if (!actor) {
            return
        }
        const rect = this.itemRectWithPadding(index)
        // load stand_picture
        const bitmapName = $dataActors[actor.actorId()].meta.stand_picture
        const bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null
        const w = Math.min(rect.width, (bitmapName ? bitmap.width : 144))
        const h = Math.min(rect.height, (bitmapName ? bitmap.height : 144))
        const lineHeight = this.lineHeight()
        this.changePaintOpacity(actor.isBattleMember())
        if (bitmap) {
            const sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0
            const sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0
            const dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2
            const dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2
            this.contents.blt(bitmap, sx, sy, w, h, dx, dy)
        } else {
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2, w, h)
        }
        this.changePaintOpacity(true)
    }

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        if (!isDisplayStatus) {
            return
        }
        const actor = this.actor(index)
        const rect = this.itemRectWithPadding(index)
        const x = rect.x
        const y = rect.y
        const width = rect.width
        const bottom = y + rect.height
        const lineHeight = this.lineHeight()
        this.drawActorName(actor, x, y + lineHeight * 0, width)
        this.drawActorClass(actor, x, y + lineHeight * 1, width)
        this.drawActorLevel(actor, x, bottom - lineHeight * 3, width)
        this.placeBasicGauges(actor, x, bottom - lineHeight * 2, width)
        this.drawActorIcons(actor, x, bottom - lineHeight * 4, width)
    }

    Window_StatusBase.prototype.drawActorLevel = function (actor, x, y, width) {
        width = width || 168
        this.changeTextColor(this.systemColor())
        this.drawText(TextManager.levelA, x, y, 48)
        this.resetTextColor()
        this.drawText(actor.level, x, y, width, 'right')
    }

    //
    // display current map name
    //
    const mapName = () => {
        const name = $gameMap.displayName()
        return name ? name : $dataMapInfos[$gameMap.mapId()].name
    }

    const _Scene_Menu_create = Scene_Menu.prototype.create
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this)
        this.createMapNameWindow()
    }

    Scene_Menu.prototype.createMapNameWindow = function () {
        if (isDisplayMapName) {
            const rect = this.mapNameAlt3WindowRect()
            this._mapNameWindow = new Window_MapNameAlt3(rect)
            this.addWindow(this._mapNameWindow)
        }
    }

    const _Scene_Menu_terminate = Scene_Menu.prototype.terminate
    Scene_Menu.prototype.terminate = function () {
        _Scene_Menu_terminate.call(this)
        if (isDisplayMapName) {
            this.removeChild(this._mapNameWindow)
        }
    }

    Scene_Menu.prototype.mapNameAlt3WindowRect = function () {
        const ww = Graphics.boxWidth - this._goldWindow.width
        const wh = this.calcWindowHeight(1, true)
        const wx = 0
        const wy = this.mainAreaBottom() - wh
        return new Rectangle(wx, wy, ww, wh)
    }

    function Window_MapNameAlt3() {
        this.initialize(...arguments)
    }

    Window_MapNameAlt3.prototype = Object.create(Window_MapName.prototype)
    Window_MapNameAlt3.prototype.constructor = Window_MapNameAlt3

    Window_MapNameAlt3.prototype.initialize = function (rect) {
        // not inherit super class, but Window_Base instead.
        Window_Base.prototype.initialize.call(this, rect)
        this.refresh()
    }

    Window_MapNameAlt3.prototype.update = function () {
        // do nothing
    }

    Window_MapNameAlt3.prototype.refresh = function () {
        // not inherit super class
        this.contents.clear()
        if (mapName()) {
            this.changeTextColor(ColorManager.systemColor())
            const textWidth = this.textWidth(locationString) + this.itemPadding()
            const row = 4
            const col = 4
            this.drawText(locationString, row, col, this.width, 'left')
            this.resetTextColor()
            const orgX = row + textWidth
            this.drawText(mapName(), orgX, col, this.width, 'left')
        }
    }

})()