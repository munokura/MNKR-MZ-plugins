//=============================================================================
// SoR_EnemySymbolEncounter_MZ.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.07 (2020/09/11)
//=============================================================================
/*:
 * @plugindesc v1.07m2 ＜シンボルエンカウント総合＞
 * @author 蒼竜  @soryu_rpmaker (改変:ムノクラ)
 * @help  シンボルエンカウント方式のゲームデザインを実現するために
 *   必要な一通りの仕組みを実装します。主に、
 * - 接敵時の状態に応じた先制攻撃、不意打ちの判定
 * - 敵シンボルの経路探索および追跡
 * - 戦闘後の処理(プレイヤーの無敵時間,敵シンボルの復帰)
 * に関して、一般のコンシューマゲームのような挙動を、
 * 単独のプラグインとして、自然な形で導入します。
 *
 * 敵シンボルとしたいイベントを作成し、
 * <EnemySymbol>
 * とメモに記述すると、このプラグインの効能を受けます。
 * シンボル毎の細かな挙動指定は、イベントコマンドの「注釈」を用いて行います。
 *
 * 上のタグを記述するだけですぐに最低限の動作が可能ですが、より各製作者の
 * ゲームデザインに沿った挙動をさせるには様々なカスタマイズ(設定)が
 * 必要だと想定されます。
 *
 * -----------------------------------------------------------
 * バージョン情報
 * -----------------------------------------------------------
 * v1.07m2 (2020/09/13)
 *      日本語プラグインパラメーター関連の調整
 *      フォロワー判定が無効時にフォロワーをすり抜ける仕様変更
 * v1.07 (2020/09/11)
 *      透明化に関するデフォルト仕様との競合緩和策の導入
 * v1.06 (2020/09/04)
 *      プレイヤー検出アルゴリズムの調整
 *      (異なる2つの通行領域をまたぐ場合のケースに正しく対応)
 * v1.05 (2020/08/26)
 *      MZ依存不具合/無条件起動ページのないイベントが動作しない不具合を修正
 * v1.04 (2020/08/25)
 *      追跡挙動変更/シンボルエンカウント発生後のプレイヤーの無敵時間の
 *      描画方式を追加
 * v1.03 (2020/08/22)
 *      MenuSubCommand.jsのマップメニューとの共存オプションを追加
 * v1.02 (2020/08/20)
 *      MZバージョン初版
 *
 * @param IsFollowerAttacked
 * @text フォロワー判定
 * @desc 隊列歩行使用時、有効:フォロワーにもエンカウント(と向き)判定 / 無効:フォロワーをすり抜けます (デフォルト:false)
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 *
 * @param InvincibleTime_AfterBattle
 * @text 戦闘後の無敵時間
 * @desc 戦闘後の無敵(発見されない、接触しない)時間 (デフォルト:300)
 * @default 300
 * @type number
 * @decimals 0
 *
 * @param EnemySearchRange_scale
 * @text 敵の探索量倍率
 * @desc 敵シンボル移動経路探索量倍率 (デフォルト:2.0)
 * @default 2.0
 * @type number
 * @decimals 1
 *
 * @param SymbolKeepOut_RegionID
 * @text 敵シンボル通行不可リージョンID
 * @desc 敵シンボル通行不可リージョンID, -1で無効 (デフォルト:-1)
 * @default -1
 * @type number
 * @decimals 0
 * @min -1
 *
 * @param BalloonID_PlayerDetected
 * @text プレイヤー発見時フキダシ
 * @desc プレイヤーを発見した時にシンボル頭上に表示するふきだしアイコン, -1で無効 (デフォルト:1)
 * @default 1
 * @type select
 * @option 表示しない
 * @value -1
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 *
 * @param SE_PlayerDetected
 * @text プレイヤー発見時SE
 * @desc プレイヤーを発見した時に再生される効果音, 無指定で再生しない (デフォルト:Shot2)
 * @default Shot2
 * @dir audio/se/
 * @type file
 *
 * @param BalloonID_PlayerFled
 * @text プレイヤーを見失った時のフキダシ
 * @desc プレイヤーを見失った時にシンボル頭上に表示するふきだしアイコン, -1で無効 (デフォルト:6)
 * @default 6
 * @type select
 * @option 表示しない
 * @value -1
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 *
 * @param SE_PlayerFled
 * @text プレイヤー逃走時SE
 * @desc プレイヤーを見失った時に再生される効果音, 無指定で再生しない (デフォルト:Down1)
 * @default Down1
 * @dir audio/se/
 * @type file
 *
 * @param BattleBGM_surprised
 * @text 不意打ち状態の戦闘BGM
 * @desc 不意打ち状態で戦闘突入時の戦闘BGM, 無指定で変更なし (デフォルト:なし)
 * @default
 * @dir audio/bgm/
 * @type file
 *
 * @param Use_MenuSubCommandMap
 * @text メニューサブコマンドマップを使用
 * @desc トリアコンタン氏のMenuSubCommand.jsでマップを用いたメニューを作成する場合、trueにしてください。 (デフォルト:false)
 * @default false
 * @type boolean
 * @on 使用する
 * @off 使用しない
 *
 * @param InvincibleStyle_Flash
 * @text プレイヤー無敵時間の点滅
 * @desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(点滅)(デフォルト:true)
 * @default true
 * @type boolean
 * @on 点滅する
 * @off 点滅しない
 *
 * @param InvincibleStyle_Opaque
 * @text プレイヤー無敵時間の透明
 * @desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(透明)(デフォルト:false)
 * @default false
 * @type boolean
 * @on 透明にする
 * @off 透明にしない
 *
 * @param InvincibleStyle_Blend
 * @text プレイヤー無敵時間の合成
 * @desc シンボルエンカウント発生後のプレイヤー無敵時間における表示方法(合成方法変更)(デフォルト:0)
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 *
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/SoR_EnemySymbolEncounter_MZ.js
 */

var Imported = Imported || {};
Imported.SoR_EnemySymbolEncounter_MZ = true;

(function () {

	const Param = PluginManager.parameters('SoR_EnemySymbolEncounter_MZ');

	const IsFollowerAttacked = Boolean(Param['IsFollowerAttacked'] === 'true') || false;
	const InvinsibleDuration_AB = Number(Param['InvincibleTime_AfterBattle']) || 300;
	const SearchRange_scale = Number(Param['EnemySearchRange_scale']) || 2.0;
	const SymbolKeepOut_RegionID = Number(Param['SymbolKeepOut_RegionID']) || -1;

	const BalloonID_PlayerDetected = Number(Param['BalloonID_PlayerDetected']) || 1;
	const SoundDetected = String(Param['SE_PlayerDetected']) || '';
	const BalloonID_PlayerFled = Number(Param['BalloonID_PlayerFled']) || 6;
	const SoundFled = String(Param['SE_PlayerFled']) || '';
	const BGMsurprised = String(Param['BattleBGM_surprised']) || '';

	const SE_PlayerDetected = { name: SoundDetected, pan: 0, pitch: 100, volume: 90 };
	const SE_PlayerFled = { name: SoundFled, pan: 0, pitch: 100, volume: 90 };
	const BattleBGM_surprised = { name: BGMsurprised, volume: 100, pitch: 100, pan: 0 };

	const IsMenuSubCommandMap = Boolean(Param['Use_MenuSubCommandMap'] === 'true') || false;

	const InvincibleStyle_Flash = Boolean(Param['InvincibleStyle_Flash'] === 'true') || false;
	const InvincibleStyle_Opaque = Boolean(Param['InvincibleStyle_Opaque'] === 'true') || false;
	const InvincibleStyle_Blend = Number(Param['InvincibleStyle_Blend']) || 0;


	//////////////////////////////////////////////////////////////////////////
	//
	// Encount Manager
	//
	//////////////////////////////////////////////////////////////////////////


	const SoR_ESE_BM_onEncounter = BattleManager.onEncounter;
	BattleManager.onEncounter = function () {
		SoR_ESE_BM_onEncounter.call(this);
		this._preemptive = $gameTemp.encflag == 2 ? true : false;
		this._surprise = $gameTemp.encflag == 1 ? true : false;
	}

	Game_Event.prototype.lock = function () {
		if (this._locked) return;

		this._prelockDirection = this.direction();
		$gameTemp.isEncountedonMap = this.event().meta.EnemySymbol;
		if ($gameTemp.isEncountedonMap) this.EncountDir();
		else if ($gameTemp.collisionFollower == null) this.turnTowardPlayer();// hit by party leader
		this._locked = true;
	}

	Game_Event.prototype.EncountDir = function () {
		let player = $gamePlayer;
		if ($gameTemp.collisionFollower != null) player = $gameTemp.collisionFollower

		const p = { x: player.x, y: player.y, dir: player._direction };
		const e = { x: this.x, y: this.y, dir: this._direction };
		$gameTemp.encflag = 0;
		if (p.dir == e.dir) {
			AlignSymbolWithDirection(p, e);
			if (e.x > p.x) $gameTemp.encflag = 2;
			else $gameTemp.encflag = 1;
		}
	}

	function AlignSymbolWithDirection(p, e) {
		e.x -= p.x;
		e.y -= p.y;
		p.x -= p.x;
		p.y -= p.y;
		while (p.dir != 6) {
			//Cyclic subgroup generated by 2 \in Group(Z_{10}-{0},*)
			p.dir = (p.dir * 2) % 10;
			e.dir = (e.dir * 2) % 10;
			//rot90
			const tmp = -e.y;
			e.y = e.x;
			e.x = tmp;
		}
	}


	const SoR_ESE_SB_terminate = Scene_Battle.prototype.terminate;
	Scene_Battle.prototype.terminate = function () {
		SoR_ESE_SB_terminate.call(this);


		if ($gameTemp.isEncountedonMap) {
			$gamePlayer.SetupInvinsibleEffectsAfterSE();
			$gameTemp.isEncountedonMap = false;
			if ($gameTemp.encflag == 1 && BGMsurprised != '') {//surprised bgm
				$gameSystem.setBattleBgm($gameTemp.defaultBattleBGM);
			}
		}
		$gameTemp.encflag = 0;
		$gameTemp.collisionFollower = null;
	}



	const SoR_ESE_SM_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function () {
		SoR_ESE_SM_update.call(this);

		this.updateCharacterForSymbolEnc();
	}



	Spriteset_Map.prototype.updateCharacterForSymbolEnc = function () {

		// Coexistence with MenuSubCommand
		if (IsEnableInvincible()) {
			//invinsible time after battles
			if ($gameTemp.invincibleAfterEnc >= 0) $gamePlayer.UpdateInvinsibleEffectsAfterSE();
			else if ($gameTemp.invincibleAfterEnc != -1) $gamePlayer.FinishInvinsibleEffectsAfterSE();

		}

	}


	const SoR_ESE_GE_start = Game_Event.prototype.start;
	Game_Event.prototype.start = function () {
		if (this.event().meta.EnemySymbol) {

			if (VehicleCheck(0) == false) return;// boat vs enemy on the ground ???
			if ($gameTemp.invincibleAfterEnc != -1) return;
			else { //For after event(battle)
				if (this.Isreturn_afterwait) {
					this.IsDetectPlayer = false;
					this.IsChasePlayer = false;
					this.IsFleePlayer = true;
					this.waitAC_count = this.wait_afterchase;
					this.IsStayAfterFlee = true;
				}
				else this.checkAllchaseFlags();
				this.setMoveSpeed(this.default_speed);
			}

		}

		SoR_ESE_GE_start.call(this);
	}

	function VehicleCheck(v) {
		if (v == 0) {
			if ($gamePlayer.isInVehicle()) return false;
			else return true;
		}
		return true;
	}


	const SoR_ESE_GP_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function () {
		// Coexistence with MenuSubCommand
		if (IsEnableInvincible()) {
			if (!this.IsJustMovedFromOrigMap()) {
				if ($gameTemp.invincibleAfterEnc && $gameTemp.invincibleAfterEnc >= 0) $gamePlayer.FinishInvinsibleEffectsAfterSE(false);
			}
		}
		SoR_ESE_GP_performTransfer.apply(this, arguments);
	};




	const SoR_ESE_GI_command301 = Game_Interpreter.prototype.command301;
	Game_Interpreter.prototype.command301 = function (params) {

		if ($gameTemp.isEncountedonMap == true && !$gameParty.inBattle()) {
			let troopId;
			if (params[0] === 0) troopId = params[1]; // Direct designation
			else if (params[0] === 1) troopId = $gameVariables.value(params[1]); // Designation with a variable
			else troopId = $gamePlayer.makeEncounterTroopId(); // Same as Random Encounters

			if ($dataTroops[troopId]) {
				BattleManager.setup(troopId, params[2], params[3]);
				BattleManager.onEncounter();
				if ($gameTemp.encflag == 1 && BGMsurprised != '') {//surprised bgm
					$gameTemp.defaultBattleBGM = $gameSystem._battleBgm;
					$gameSystem.setBattleBgm(BattleBGM_surprised);
				}

				BattleManager.setEventCallback(function (n) {
					this._branch[this._indent] = n;
				}.bind(this));
				$gamePlayer.makeEncounterCount();
				SceneManager.push(Scene_Battle);
			}

			return true;
		}

		return SoR_ESE_GI_command301.call(this, ...arguments); //return for the interpreter
	};






	//////////////////////////////////////////////////////////////////////////
	//
	// Process Invinsible Effect for player Afeter Symbol Encounter
	//
	//////////////////////////////////////////////////////////////////////////

	Game_Player.prototype.SetupInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc = InvinsibleDuration_AB;


		//console.log(InvincibleStyle_Flash + " " + InvincibleStyle_Opaque + " " + InvincibleStyle_Blend);
		if (InvincibleStyle_Opaque) $gamePlayer.setOpacity(127);
		if (InvincibleStyle_Blend != 0) $gamePlayer.setBlendMode(InvincibleStyle_Blend);
		$gameTemp._flash_count = 0;

	}
	Game_Player.prototype.UpdateInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc--;

		if (InvincibleStyle_Flash) {
			let flash;
			if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.5) flash = 12;
			else if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.25) flash = 9;
			else if ($gameTemp.invincibleAfterEnc >= InvinsibleDuration_AB * 0.1) flash = 7;
			else flash = 5;

			$gameTemp._flash_count = ($gameTemp._flash_count + 1) % flash;
			if ($gameTemp._flash_count <= 1) $gamePlayer.SetInvinsibleAfterSymbolEnc(true);
			else $gamePlayer.SetInvinsibleAfterSymbolEnc(false);

			if ($gameTemp.invincibleAfterEnc == 0) $gamePlayer.FinishInvinsibleEffectsAfterSE(false);
		}
		if (InvincibleStyle_Opaque && $gameTemp.invincibleAfterEnc == 0) $gamePlayer.FinishInvinsibleEffectsAfterSE(false);

	}
	Game_Player.prototype.FinishInvinsibleEffectsAfterSE = function () {
		$gameTemp.invincibleAfterEnc = -1;
		$gameTemp._flash_count = 0;
		$gamePlayer.SetInvinsibleAfterSymbolEnc(false);
	}


	Game_Player.prototype.SetInvinsibleAfterSymbolEnc = function (val) {
		if (InvincibleStyle_Opaque) $gamePlayer.setOpacity(255);
		if (InvincibleStyle_Blend != 0) $gamePlayer.setBlendMode(0);
		if (InvincibleStyle_Flash) {
			const v = val === true ? (InvincibleStyle_Opaque === true ? 127 : 0) : 255;
			$gamePlayer.setOpacity(v);
		}
	}


	//////////////////////////////////////////////////////////////////////////
	//
	// Player Observer on Map Scene (by enemy events)
	//
	//////////////////////////////////////////////////////////////////////////

	const SoR_ESE_GE_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function () {
		SoR_ESE_GE_setupPage.call(this);
		this.InitEnemySymbolBehavior();
	};

	Game_Event.prototype.InitEnemySymbolBehavior = function () {
		this.Is_symbolIgnore = false;
		this.trails = [];
		this.trails_n = 0;
		this.see_distance = 5;
		this.see_angle = 30 * Math.PI / 180 + 0.00001;
		this.serach_state = null;
		this.default_speed = this._moveSpeed;
		this.chase_speed = 4;
		this.chase_duration = 40;
		this.waitAC_count = 180;
		this.bushrate = 0.2;
		this.IsDetectBallon = false;
		this.IsDetectPlayer = false;
		this.IsChasePlayer = false;
		this.IsFleePlayer = false;
		this.Isreturn_afterwait = false;
		this.IsReturnOriginalPos = false;
		this.detectedAlertDuration = 10;
		this.detectedAlert_count = 0;
		this.wait_afterchase = 150;
		this.updateRoute_interval = 5;
		this.Ischase_onVehicle = false;
		this.call_CommonEventID = 0;

		this.default_x = this.x;
		this.default_y = this.y;


		if (this.event().meta.EnemySymbol) {
			var p_idx = this.findProperPageIndex();
			if (p_idx >= 0) {//do not process for invalid page (no unconditional pages)
				for (var i = 0; i < this.event().pages[p_idx].list.length; i++) {
					if (this.event().pages[p_idx].list[i].code == 108 || this.event().pages[p_idx].list[i].code == 408) {
						var com = this.event().pages[p_idx].list[i].parameters;
						this.SetSymbolTags(com[0]);
					}
				}
			}
		}
	}


	Game_Event.prototype.SetSymbolTags = function (com) {
		if (com.match(/(?:distance):[ ]*(.*)/i)) this.see_distance = parseInt(RegExp.$1);
		else if (com.match(/(?:angle):[ ]*(.*)/i)) this.see_angle = parseInt(RegExp.$1) * Math.PI / 180 + 0.00001;
		else if (com.match(/(?:speed):[ ]*(.*)/i)) this.chase_speed = parseInt(RegExp.$1);
		else if (com.match(/(?:duration):[ ]*(.*)/i)) this.chase_duration = parseInt(RegExp.$1);
		else if (com.match(/(?:wait):[ ]*(.*)/i)) this.wait_afterchase = parseInt(RegExp.$1);
		else if (com.match(/(?:return)[ ]*/i)) this.Isreturn_afterwait = true;
		else if (com.match(/(?:ignore)/i)) this.Is_symbolIgnore = true;
		else if (com.match(/(?:bush_rate):[ ]*(.*)/i)) this.bushrate = parseFloat(RegExp.$1);
		else if (com.match(/(?:alert_time):[ ]*(.*)/i)) this.detectedAlertDuration = parseInt(RegExp.$1);
		else if (com.match(/(?:route_search):[ ]*(.*)/i)) this.updateRoute_interval = parseInt(RegExp.$1);
		else if (com.match(/(?:chase_vehicle)[ ]*/i)) this.Ischase_onVehicle = true;
		else if (com.match(/(?:common_event):[ ]*(.*)/i)) this.call_CommonEventID = parseInt(RegExp.$1);
	}


	const SoR_ESE_GE_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
	Game_Event.prototype.updateSelfMovement = function () {


		if (this.event().meta.EnemySymbol && !this.Is_symbolIgnore && this.serach_state != null) {
			if (this._erased || this.findProperPageIndex() == -1) return;
			if ($gameMap.isEventTriggered()) return;
			const state_bin = this.checkAllchaseFlags();

			const state = this.serach_state;
			if (this.IsChasePlayer) this.PlayerChaser(state);
			else if (this.IsFleePlayer) this.FleePlayer();
			else if (this.IsReturnOriginalPos) this.ReturnOrigPoint(state.dist);

			if (state_bin != 0b00000) return;

		}

		SoR_ESE_GE_updateSelfMovement.call(this);
	}


	const SoR_ESE_GE_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function () {
		SoR_ESE_GE_update.call(this);

		if (this._erased || this.findProperPageIndex() == -1) return;

		if (this.Is_symbolIgnore || this.isVehicleChase()) {
			this.clearAllchaseFlags();
			return;
		}
		if (this.event().meta.EnemySymbol) {
			if ($gameTemp.invincibleAfterEnc > -1) {
				if (this.IsChasePlayer) {
					this.IsChasePlayer = false;
					this.IsFleePlayer = true;
				}
				this.IsDetectPlayer = false;
			}
			else if ($gameTemp.invincibleAfterEnc == -1) {
				const state = this.serachPlayer();
				this.serach_state = state;
				if (state.flag) this.IsDetectPlayer = true;
				if (this.IsDetectPlayer && !this.IsChasePlayer && !this.IsFleePlayer) this.DetectedPlayer();
			}
		}
	}

	Game_Event.prototype.isVehicleChase = function () {
		let flag = $gamePlayer.isInVehicle();
		if (this.Ischase_onVehicle) flag = false;
		return flag;
	}


	Game_Event.prototype.checkAllchaseFlags = function () {
		let ret = 0b00000;

		if (this.IsDetectPlayer) ret += 0b000001;
		if (this.IsDetectBallon) ret += 0b000010;
		if (this.IsChasePlayer) ret += 0b000100;
		if (this.IsFleePlayer) ret += 0b001000;
		if (this.IsStayAfterFlee) ret += 0b010000;
		if (this.IsReturnOriginalPos) ret += 0b100000;
		return ret;
	}

	Game_Event.prototype.clearAllchaseFlags = function () {
		this.IsDetectPlayer = false;
		this.IsDetectBallon = false;
		this.IsChasePlayer = false;
		this.IsFleePlayer = false;
		this.IsStayAfterFlee = false;
		this.IsReturnOriginalPos = false;

		this.setMoveSpeed(this.default_speed);
	}


	const SoR_ESE_GP_startMapEvent = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {

		//avoid encounter with symbol on the ground while in the sky 
		$gameMap.eventsXy(x, y).forEach(function (e) {
			if (e.event().meta.EnemySymbol && $gamePlayer.isInAirship()) return;
		});

		SoR_ESE_GP_startMapEvent.call(this, x, y, triggers, normal);
	};

	Game_Event.prototype.serachPlayer = function () {
		var flag = false;
		var p = { x: $gamePlayer.x, y: $gamePlayer.y, dir: $gamePlayer._direction };
		var e = { x: this.x, y: this.y, dir: this._direction };

		var bush_rate = $gameMap.isBush(p.x, p.y) == true ? this.bushrate : 1;
		var dist = calcDist(e, p);
		if (dist <= Math.ceil(this.see_distance * bush_rate)) {
			var ang = calcAngle(e, p);
			if (ang >= -this.see_angle && ang <= this.see_angle) {
				if (e.x - p.x != 0) flag = Bresenham(e, p);
				else flag = Bresenham90(e, p);
			}
		}

		return { dist: dist, flag: flag };
	}


	function Bresenham(a1, a2) {
		var flag = true;
		var dy = Math.abs(a2.y - a1.y);
		var dx = Math.abs(a2.x - a1.x);
		var err = dx - dy;
		var inc_x = a2.x > a1.x ? 1 : -1;
		var inc_y = a2.y > a1.y ? 1 : -1;

		var cx = a1.x;
		var cy = a1.y;

		const dir_x = dx > 0 ? 6 : 4;
		const dir_y = dy > 0 ? 2 : 8;

		while (1) {
			if (!$gameMap.isPassable(cx, cy, dir_x) || !$gameMap.isPassable(cx, cy, dir_y) || $gameMap.regionId(cx, cy) == SymbolKeepOut_RegionID) {
				flag = false;
				break;
			}
			if (cx == a2.x && cy == a2.y) break;

			if (!(cx == a1.x && cy == a1.y) && !(cx == a2.x && cy == a2.y) && !isUnPassableEvent(cx, cy)) {
				flag = false;
				break;
			}

			err *= 2;
			if (err > -dy) {
				err -= dy;
				cx += inc_x;
			}
			if (err < dx) {
				err += dx;
				cy += inc_y;
			}
		}

		return flag;
	}

	function Bresenham90(a1, a2) {
		var flag = true;
		var incre = a2.y > a1.y ? 1 : -1;
		var cx = a1.x;
		for (var cy = a1.y; ; cy += incre) {
			if (!$gameMap.isPassable(cx, cy, a1.dir) || $gameMap.regionId(cx, cy) == SymbolKeepOut_RegionID) {
				flag = false;
				break;
			}
			if (!(cx == a1.x && cy == a1.y) && !(cx == a2.x && cy == a2.y) && !isUnPassableEvent(cx, cy)) {
				flag = false;
				break;
			}
			if (cy == a2.y) break;

		}
		return flag;
	}


	function isUnPassableEvent(x, y) {
		var flag = true;
		$gameMap.eventsXy(x, y).forEach(function (event) {
			if (event.isNormalPriority() === true) {
				flag = false;
			}
		});

		return flag;
	}


	Game_Event.prototype.DetectedPlayer = function () {
		if (!this.IsDetectBallon) {
			if (!this.IsReturnOriginalPos) {
				this.default_x = this.x;
				this.default_y = this.y;
			}

			this.detectedAlert_count = this.detectedAlertDuration;
			this.IsDetectBallon = true;
			this.IsStayAfterFlee = false;
			this.IsReturnOriginalPos = false;

			//balloon
			if (BalloonID_PlayerDetected != -1) $gameTemp.requestBalloon(this, BalloonID_PlayerDetected);
			if (SoundDetected != '') AudioManager.playSe(SE_PlayerDetected);
			//common ev
			if (this.call_CommonEventID != 0) $gameTemp.reserveCommonEvent(this.call_CommonEventID);
		}

		this.detectedAlert_count--;

		if (this.detectedAlert_count < 0) {
			this.IsDetectBallon = false;
			this.InitPlayerChase();
		}
	}


	Game_Event.prototype.InitPlayerChase = function () {
		this.setMoveSpeed(this.chase_speed);
		this.IsChasePlayer = true;
		this.chase_time = this.chase_duration;
		this.trails = [];
	}


	Game_Event.prototype.PlayerChaser = function (state) {
		var d = state.dist
		var isChaseFeasible = true;
		if (this.chase_time >= 0) {
			//make route
			if ((this.trails.length == 0 || this.trails_n >= this.updateRoute_interval)) {
				this.trails = this.AstarDir($gamePlayer.x, $gamePlayer.y, this.see_distance * ($gameMap.isBush($gamePlayer.x, $gamePlayer.y) == true ? this.bushrate : 1));///d
				this.trails_n = 0;
			}
			if (this.trails.length >= 1) {// trail the player
				var direction = this.MakeDir(this.trails[0]);
				this.trails_n++;
				this.trails.shift();
				if (direction > 0) this.moveStraight(direction);
			}
			else isChaseFeasible = false; // player missing
			this.chase_time--;
		}

		if (this.chase_time < 0 && isChaseFeasible && d <= this.see_distance / 3) this.chase_time = 10;
		if (this.chase_time < 0 || !isChaseFeasible) {
			this.IsDetectPlayer = false;
			this.IsChasePlayer = false;
			this.IsFleePlayer = true;
		}
	}


	Game_Event.prototype.FleePlayer = function () {
		if (!this.IsStayAfterFlee) {
			this.waitAC_count = this.wait_afterchase;
			this.IsStayAfterFlee = true;

			//balloon
			if (BalloonID_PlayerFled != -1) $gameTemp.requestBalloon(this, BalloonID_PlayerFled);
			if (SoundFled != '') AudioManager.playSe(SE_PlayerFled);
			this.setMoveSpeed(this.default_speed);
		}

		this.waitAC_count--;

		if (this.waitAC_count < 0) {
			this.IsStayAfterFlee = false;
			this.IsFleePlayer = false;
			if (this.Isreturn_afterwait) {
				this.IsReturnOriginalPos = true;
				this.trails = [];
				this.trails_n = 0;
			}
		}
	}






	Game_Event.prototype.ReturnOrigPoint = function (d) {
		if ((this.trails.length == 0 || this.trails_n >= this.updateRoute_interval)) {
			this.trails = this.AstarDir(this.default_x, this.default_y, 99);
			this.trails_n = 0;
		}

		if (this.trails.length >= 1) {
			var direction = this.MakeDir(this.trails[0]);
			this.trails_n++;
			this.trails.shift();
			if (direction > 0) this.moveStraight(direction);
		}
		if (this.x == this.default_x && this.y == this.default_y) this.IsReturnOriginalPos = false;
	}


	function calcDist(e, p) {
		return Math.sqrt((e.x - p.x) * (e.x - p.x) + (e.y - p.y) * (e.y - p.y));
	}

	function calcAngle(e, p) {
		var va = { x: p.x - e.x, y: p.y - e.y };

		var x = 2, n_op = 0;
		//Cyclic subgroup generated by 2 \in Group(Z_{10}-{0},*)
		while (x != e.dir) {
			x = (x * 2) % 10;
			n_op++;
		}
		var vec = { z: 0, c: 1 };
		//(C,*) isomorphism to sub of Z[i] ~ rotate90
		for (var i = 0; i < n_op; i++) {
			var tmp = -vec.c;
			vec.c = vec.z;
			vec.z = tmp;
		}

		var theta = Math.acos((vec.z * va.x + vec.c * va.y) / Math.sqrt(va.x * va.x + va.y * va.y));
		if (vec.z * va.y - vec.c * va.x < 0) return -theta;
		else return theta;// -pi < theta < pi
	}







	Game_Character.prototype.AstarDir = function (goalX, goalY, dist) {
		var searchLimit = Math.floor(dist * SearchRange_scale);
		var mapWidth = $gameMap.width();
		var nodeList = [];
		var openList = [];
		var closedList = [];
		var start = {};
		var best = start;

		if (this.x === goalX && this.y === goalY) return [];

		start.parent = null;
		start.x = this.x;
		start.y = this.y;
		start.g = 0;
		start.f = dist;
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);

		while (nodeList.length > 0) {
			var bestIndex = 0;
			for (var i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) {
					bestIndex = i;
				}
			}

			var current = nodeList[bestIndex];
			var x1 = current.x;
			var y1 = current.y;
			var pos1 = y1 * mapWidth + x1;
			var g1 = current.g;

			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.push(pos1);

			if (current.x === goalX && current.y === goalY) {
				best = current;
				break;
			}
			if (g1 >= searchLimit) continue;


			for (var j = 0; j < 4; j++) {
				var direction = 2 + j * 2;
				var x2 = $gameMap.roundXWithDirection(x1, direction);
				var y2 = $gameMap.roundYWithDirection(y1, direction);
				var pos2 = y2 * mapWidth + x2;

				if (closedList.contains(pos2)) continue;
				if (!this.IsEnablePassAdjcentCells(x1, y1, x2, y2, direction)) continue;

				var g2 = g1 + 1;
				var index2 = openList.indexOf(pos2);

				if (index2 < 0 || g2 < nodeList[index2].g) {
					var neighbor;
					if (index2 >= 0) neighbor = nodeList[index2];
					else {
						neighbor = {};
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) best = neighbor;
				}
			}

		}

		var trails = [];
		var goal = { x: goalX, y: goalY };
		if (calcDist(best, goal) == 0) {
			for (node = best; node.parent; node = node.parent) {
				trails.unshift(node);
				if (node.parent === start) break;
			}
		}

		return trails;
	}


	//extention of canPass
	Game_CharacterBase.prototype.IsEnablePassAdjcentCells = function (x, y, x2, y2, d) {
		if (!$gameMap.isValid(x2, y2)) return false;
		//keep out by plugin parameter
		if ($gameMap.regionId(x, y) == SymbolKeepOut_RegionID) return false;
		if ($gameMap.regionId(x2, y2) == SymbolKeepOut_RegionID) return false;
		if (this.isThrough()) return true;
		if (!this.isMapPassable(x, y, d)) return false;
		if (this.isCollidedWithEventObjects(x2, y2)) return false; // except for the player

		return true;
	}

	Game_Event.prototype.isCollidedWithEventObjects = function (x, y) {
		return Game_Character.prototype.isCollidedWithCharacters.call(this, x, y);
	};

	Game_Character.prototype.MakeDir = function (node) {
		var deltaX1 = $gameMap.deltaX(node.x, this.x);
		var deltaY1 = $gameMap.deltaY(node.y, this.y);
		if (deltaY1 == 1) return 2;
		else if (deltaX1 == -1) return 4;
		else if (deltaX1 == 1) return 6;
		else if (deltaY1 == -1) return 8;
		else return 0;
	}


	Game_Map.prototype.isEventTriggered = function () {
		return this._interpreter.isRunning();
	}


	const SoR_ESE_GP_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
	Game_Player.prototype.updateVehicleGetOn = function () {

		//force quit invincinble for enemy symbol
		if ($gameTemp.invincibleAfterEnc && $gameTemp.invincibleAfterEnc != -1) $gamePlayer.FinishInvinsibleEffectsAfterSE();

		SoR_ESE_GP_updateVehicleGetOn.call(this);
	}



	////////////////////////////////////////////////////
	//
	// Option for follower attack by enemy symbols
	//
	////////////////////////////////////////////////////
	if (IsFollowerAttacked) {

		const SoR_ESE_GE_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
		Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
			if (this.event().meta.EnemySymbol) {
				if (!$gameMap.isEventRunning()) {

					var flw = $gamePlayer._followers.visibleFollowers();
					var isF_collided = false;
					for (var i = 0; i < flw.length; i++) {
						isF_collided = flw[i].pos(x, y);
						if (isF_collided == true) {
							$gameTemp.collisionFollower = flw[i];
							break;
						}
					}

					if (this._trigger === 2 && isF_collided) {
						if (!this.isJumping() && this.isNormalPriority()) {
							this.start();
						}
					}
				}
			}

			SoR_ESE_GE_checkEventTriggerTouch.call(this, x, y);
		}
	} else {

		// フォロワーをすり抜けるか追加 by munokura
		Game_Event.prototype.isCollidedWithPlayerCharacters = function (x, y) {
			return this.isNormalPriority() && !$gamePlayer.isThrough() && $gamePlayer.pos(x, y);
		}

	}


	///////////////////////////////////////////////////////
	//
	// Treatment for MenuSubCommand.js
	//
	///////////////////////////////////////////////////////

	function IsEnableInvincible() {
		if (IsMenuSubCommandMap && $gamePlayer.isInSubCommandMap()) return false;
		else return true;
	}

	Game_Player.prototype.IsJustMovedFromOrigMap = function () {
		if (IsMenuSubCommandMap && this.isTransferringToOriginalMap()) return true;
		else false;
	}


	//TODO 
	//Find an isomorphic function {2,4,8,6} to {i,-1,-i,1}

})();
