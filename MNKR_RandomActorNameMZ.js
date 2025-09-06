/*
 * --------------------------------------------------
 * MNKR_RandomActorNameMZ.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorNameMZ.js
@plugindesc Randomly renames the actors.
@author munokura
@license MIT License

@help
Randomly renames actors.
Call this plugin from a plugin command.

The plugin parameters you enter will be used as selection options.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission, and there are
no restrictions on its use (commercial, R18+, etc.).

@param variableId
@text Name Storage Variables
@desc Please specify the variable to save the randomly generated name. If not specified, it will not be saved.
@type variable
@default 0

@param nameLists
@text Name List
@desc Set up the name list.
@type struct<nameList>[]
@default ["{\"listName\":\"list1\",\"actorNames\":\"[\\\"Arthur\\\",\\\"Ernest\\\",\\\"Arnold\\\",\\\"Irvin\\\",\\\"Aaron\\\",\\\"Isaac\\\",\\\"Ivan\\\",\\\"Ashton\\\",\\\"Adolf\\\",\\\"Alastair\\\",\\\"Alastair\\\",\\\"Ariel\\\",\\\"Alistair\\\",\\\"Albert\\\",\\\"Alvin\\\",\\\"Alexis\\\",\\\"Alex\\\",\\\"Angus\\\",\\\"Anthony\\\",\\\"Anton\\\",\\\"Ethan\\\",\\\"Enoch\\\",\\\"William\\\",\\\"Wesley\\\",\\\"Warren\\\",\\\"Walter\\\",\\\"Abram\\\",\\\"Abel\\\",\\\"Egbert\\\",\\\"Edwin\\\",\\\"Edgar\\\",\\\"Edward\\\",\\\"Ariel\\\",\\\"Elliot\\\",\\\"Elton\\\",\\\"Elvis\\\",\\\"Owen\\\",\\\"August\\\",\\\"Aubrey\\\",\\\"Othniel\\\",\\\"Oswald\\\",\\\"Curtis\\\",\\\"Godfrey\\\",\\\"Calvin\\\",\\\"Calvin\\\",\\\"Gilbert\\\",\\\"Clark\\\",\\\"Clyde\\\",\\\"Clarence\\\",\\\"Clifton\\\",\\\"Graham\\\",\\\"Gregory\\\",\\\"Gordon\\\",\\\"Conrad\\\",\\\"Simon\\\",\\\"Silas\\\",\\\"Samuel\\\",\\\"Sandy\\\",\\\"Jacob\\\",\\\"Jason\\\",\\\"James\\\",\\\"Gerald\\\",\\\"Simeon\\\",\\\"Jackson\\\",\\\"Jasper\\\",\\\"Jude\\\",\\\"Julian\\\",\\\"Joel\\\",\\\"George\\\",\\\"Sean\\\",\\\"Joshua\\\",\\\"Jocelyn\\\",\\\"Jonathan\\\",\\\"Scott\\\",\\\"Stanley\\\",\\\"Steve\\\",\\\"Spencer\\\",\\\"Theodore\\\",\\\"Solomon\\\",\\\"Douglas\\\",\\\"Dustin\\\",\\\"Daniel\\\",\\\"Darius\\\",\\\"Duncan\\\",\\\"Chester\\\",\\\"Charles\\\",\\\"Dean\\\",\\\"Dick\\\",\\\"David\\\",\\\"Dexter\\\",\\\"Desmond\\\",\\\"Duke\\\",\\\"Derrick\\\",\\\"Terence\\\",\\\"Dwayne\\\",\\\"Thomas\\\",\\\"Dominic\\\",\\\"Travis\\\",\\\"Tristan\\\",\\\"Nigel\\\",\\\"Nicholas\\\",\\\"Nathan\\\",\\\"Norman\\\",\\\"Bernard\\\",\\\"Herbert\\\",\\\"Harvey\\\",\\\"Herman\\\",\\\"Byron\\\",\\\"Pascal\\\",\\\"Patrick\\\",\\\"Hamilton\\\",\\\"Harrison\\\",\\\"Harold\\\",\\\"Howard\\\",\\\"Humphrey\\\",\\\"Victor\\\",\\\"Hugo\\\",\\\"Vincent\\\",\\\"Philip\\\",\\\"Brian\\\",\\\"Brandon\\\",\\\"Bruce\\\",\\\"Brendan\\\",\\\"Brent\\\",\\\"Brendon\\\",\\\"Basil\\\",\\\"Hayden\\\",\\\"Marcus\\\",\\\"Martin\\\",\\\"Michael\\\",\\\"Miles\\\",\\\"Max\\\",\\\"Manuel\\\",\\\"Malcolm\\\",\\\"Maynard\\\",\\\"Melvin\\\",\\\"Meredith\\\",\\\"Morgan\\\",\\\"Maurice\\\",\\\"Montague\\\",\\\"Ewan\\\",\\\"Ulysses\\\",\\\"Lionel\\\",\\\"Linus\\\",\\\"Russell\\\",\\\"Raphael\\\",\\\"Randall\\\",\\\"Liam\\\",\\\"Levi\\\",\\\"Richard\\\",\\\"Lucas\\\",\\\"Lucian\\\",\\\"Rupert\\\",\\\"Rufus\\\",\\\"Lucian\\\",\\\"Rupert\\\",\\\"Raymond\\\",\\\"Rex\\\",\\\"Leonard\\\",\\\"Roderick\\\",\\\"Roman\\\",\\\"Roland\\\",\\\"Lawrence\\\",\\\"Ronald\\\",\\\"Robert\\\"]\"}","{\"listName\":\"list2\",\"actorNames\":\"[\\\"Eileen\\\",\\\"Iris\\\",\\\"Avril\\\",\\\"Agnes\\\",\\\"Adeline\\\",\\\"Adelaide\\\",\\\"Anita\\\",\\\"Amanda\\\",\\\"Amelia\\\",\\\"Arabella\\\",\\\"Ariel\\\",\\\"Alicia\\\",\\\"Alexia\\\",\\\"Angela\\\",\\\"Antonia\\\",\\\"Edith\\\",\\\"Eden\\\",\\\"Isabel\\\",\\\"Yvonne\\\",\\\"Eliza\\\",\\\"Elaine\\\",\\\"Wendy\\\",\\\"Eileen\\\",\\\"Estelle\\\",\\\"Edith\\\",\\\"Enola\\\",\\\"Emilia\\\",\\\"Ariel\\\",\\\"Elizabeth\\\",\\\"Eleonora\\\",\\\"Aurelia\\\",\\\"Olivia\\\",\\\"Katrina\\\",\\\"Catherine\\\",\\\"Cameron\\\",\\\"Carol\\\",\\\"Clarice\\\",\\\"Christine\\\",\\\"Grace\\\",\\\"Glenda\\\",\\\"Gloria\\\",\\\"Cordelia\\\",\\\"Sabrina\\\",\\\"Samantha\\\",\\\"Sandra\\\",\\\"Jane\\\",\\\"Jessica\\\",\\\"Cheryl\\\",\\\"Theodora\\\",\\\"Jasmine\\\",\\\"Janet\\\",\\\"Sharon\\\",\\\"June\\\",\\\"Judy\\\",\\\"Julianne\\\",\\\"Joanna\\\",\\\"Shauna\\\",\\\"Sylvia\\\",\\\"Cynthia\\\",\\\"Susan\\\",\\\"Susanna\\\",\\\"Theodora\\\",\\\"Cecilia\\\",\\\"Selena\\\",\\\"Sophia\\\",\\\"Diana\\\",\\\"Deirdre\\\",\\\"Diana\\\",\\\"Theresa\\\",\\\"Doreen\\\",\\\"Dorothea\\\",\\\"Natalia\\\",\\\"Nadia\\\",\\\"Nicole\\\",\\\"Naomi\\\",\\\"Noreen\\\",\\\"Barbara\\\",\\\"Patricia\\\",\\\"Victoria\\\",\\\"Vivian\\\",\\\"Fiona\\\",\\\"Phyllis\\\",\\\"Felicia\\\",\\\"Frances\\\",\\\"Priscilla\\\",\\\"Brenda\\\",\\\"Flora\\\",\\\"Beatrice\\\",\\\"Hazel\\\",\\\"Vanessa\\\",\\\"Belinda\\\",\\\"Heloise\\\",\\\"Veronica\\\",\\\"Pauline\\\",\\\"Margot\\\",\\\"Marcia\\\",\\\"Marlene\\\",\\\"Matilda\\\",\\\"Madeline\\\",\\\"Madeline\\\",\\\"Mariah\\\",\\\"Marian\\\",\\\"Marilyn\\\",\\\"Malvina\\\",\\\"Michelle\\\",\\\"Miranda\\\",\\\"Miriam\\\",\\\"Mabel\\\",\\\"Melissa\\\",\\\"Melinda\\\",\\\"Meredith\\\",\\\"Melody\\\",\\\"Maureen\\\",\\\"Monique\\\",\\\"Eunice\\\",\\\"Yolanda\\\",\\\"Ramona\\\",\\\"Leonora\\\",\\\"Lydia\\\",\\\"Lynette\\\",\\\"Lillian\\\",\\\"Louise\\\",\\\"Lucia\\\",\\\"Lucille\\\",\\\"Lucinda\\\",\\\"Rachel\\\",\\\"Leonora\\\",\\\"Regina\\\",\\\"Rebecca\\\",\\\"Loretta\\\"]\"}"]

@command changeName
@text Name change
@desc Change the name of the actor.
@arg actorId
@text actor
@desc Specifies the actor to rename.
@type actor
@default 0
@arg selectListName
@text List Name
@desc Specifies the candidate list name to be renamed.
@type string
*/

/*~struct~nameList:
@param listName
@text List Name
@desc The list name for the name suggestion list. This must be a unique name.
@type string
@default list1

@param actorNames
@text Name candidates
@desc Please enter a possible name.
@type string[]
*/

/*:ja
@target MZ
@url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomActorNameMZ.js
@plugindesc アクターの名前をランダムに変更します。
@author munokura

@help
アクターの名前をランダムに変更します。
プラグインコマンドから呼び出して、使用します。

プラグインパラメーターに入力したものが、選択候補になります。


# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。


@param variableId
@text 名前保存変数
@desc ランダムに設定された名前を保存する変数を指定してください。無指定の場合、保存しません。
@type variable
@default 0

@param nameLists
@text 名前リスト
@desc 名前リストを設定します。
@type struct<nameList>[]
@default ["{\"listName\":\"list1\",\"actorNames\":\"[\\\"アーサー\\\",\\\"アーネスト\\\",\\\"アーノルド\\\",\\\"アービン\\\",\\\"アーロン\\\",\\\"アイザック\\\",\\\"アイバン\\\",\\\"アシュトン\\\",\\\"アドルフ\\\",\\\"アラスター\\\",\\\"アラステア\\\",\\\"アリエル\\\",\\\"アリスター\\\",\\\"アルバート\\\",\\\"アルビン\\\",\\\"アレクシス\\\",\\\"アレックス\\\",\\\"アンガス\\\",\\\"アンソニー\\\",\\\"アントン\\\",\\\"イーサン\\\",\\\"イーノック\\\",\\\"ウィリアム\\\",\\\"ウェスリー\\\",\\\"ウォーレン\\\",\\\"ウォルター\\\",\\\"エイブラム\\\",\\\"エイベル\\\",\\\"エグバート\\\",\\\"エドウィン\\\",\\\"エドガー\\\",\\\"エドワード\\\",\\\"エリアル\\\",\\\"エリオット\\\",\\\"エルトン\\\",\\\"エルビス\\\",\\\"オーウェン\\\",\\\"オーガスト\\\",\\\"オーブリー\\\",\\\"オスニエル\\\",\\\"オズワルド\\\",\\\"カーティス\\\",\\\"ガドフリー\\\",\\\"カルビン\\\",\\\"キャルビン\\\",\\\"ギルバート\\\",\\\"クラーク\\\",\\\"クライド\\\",\\\"クラレンス\\\",\\\"クリフトン\\\",\\\"グレアム\\\",\\\"グレゴリー\\\",\\\"ゴードン\\\",\\\"コンラッド\\\",\\\"サイモン\\\",\\\"サイラス\\\",\\\"サミュエル\\\",\\\"サンディー\\\",\\\"ジェイコブ\\\",\\\"ジェイソン\\\",\\\"ジェームズ\\\",\\\"ジェラルド\\\",\\\"シミオン\\\",\\\"ジャクソン\\\",\\\"ジャスパー\\\",\\\"ジュード\\\",\\\"ジュリアン\\\",\\\"ジョエル\\\",\\\"ジョージ\\\",\\\"ショーン\\\",\\\"ジョシュア\\\",\\\"ジョスリン\\\",\\\"ジョナサン\\\",\\\"スコット\\\",\\\"スタンリー\\\",\\\"スティーブ\\\",\\\"スペンサー\\\",\\\"セオドア\\\",\\\"ソロモン\\\",\\\"ダグラス\\\",\\\"ダスティン\\\",\\\"ダニエル\\\",\\\"ダライアス\\\",\\\"ダンカン\\\",\\\"チェスター\\\",\\\"チャールズ\\\",\\\"ディーン\\\",\\\"ディック\\\",\\\"デービッド\\\",\\\"デクスター\\\",\\\"デズモンド\\\",\\\"デューク\\\",\\\"デリック\\\",\\\"テレンス\\\",\\\"ドウェイン\\\",\\\"トーマス\\\",\\\"ドミニク\\\",\\\"トラビス\\\",\\\"トリスタン\\\",\\\"ナイジェル\\\",\\\"ニコラス\\\",\\\"ネイサン\\\",\\\"ノーマン\\\",\\\"バーナード\\\",\\\"ハーバート\\\",\\\"ハーベイ\\\",\\\"ハーマン\\\",\\\"バイロン\\\",\\\"パスカル\\\",\\\"パトリック\\\",\\\"ハミルトン\\\",\\\"ハリソン\\\",\\\"ハロルド\\\",\\\"ハワード\\\",\\\"ハンフリー\\\",\\\"ビクター\\\",\\\"ヒューゴー\\\",\\\"ビンセント\\\",\\\"フィリップ\\\",\\\"ブライアン\\\",\\\"ブランドン\\\",\\\"ブルース\\\",\\\"ブレンダン\\\",\\\"ブレント\\\",\\\"ブレンドン\\\",\\\"ベイジル\\\",\\\"ヘイデン\\\",\\\"マーカス\\\",\\\"マーティン\\\",\\\"マイケル\\\",\\\"マイルズ\\\",\\\"マックス\\\",\\\"マヌエル\\\",\\\"マルコム\\\",\\\"メイナード\\\",\\\"メルビン\\\",\\\"メレディス\\\",\\\"モーガン\\\",\\\"モーリス\\\",\\\"モンタギュー\\\",\\\"ユーイン\\\",\\\"ユリシーズ\\\",\\\"ライオネル\\\",\\\"ライナス\\\",\\\"ラッセル\\\",\\\"ラフェエル\\\",\\\"ランドル\\\",\\\"リーアム\\\",\\\"リーバイ\\\",\\\"リチャード\\\",\\\"ルーカス\\\",\\\"ルーシャン\\\",\\\"ルーパート\\\",\\\"ルーファス\\\",\\\"ルシアン\\\",\\\"ルパート\\\",\\\"レイモンド\\\",\\\"レックス\\\",\\\"レナード\\\",\\\"ロードリック\\\",\\\"ローマン\\\",\\\"ローランド\\\",\\\"ローレンス\\\",\\\"ロナルド\\\",\\\"ロバート\\\"]\"}","{\"listName\":\"list2\",\"actorNames\":\"[\\\"アイリーン\\\",\\\"アイリス\\\",\\\"アヴリル\\\",\\\"アグネス\\\",\\\"アデライン\\\",\\\"アドレイド\\\",\\\"アニータ\\\",\\\"アマンダ\\\",\\\"アメーリア\\\",\\\"アラベラ\\\",\\\"アリエル\\\",\\\"アリシア\\\",\\\"アレクシア\\\",\\\"アンジェラ\\\",\\\"アンソニア\\\",\\\"イーディス\\\",\\\"イーデン\\\",\\\"イザベル\\\",\\\"イボーン\\\",\\\"イライザ\\\",\\\"イレイン\\\",\\\"ウェンディ\\\",\\\"エイリーン\\\",\\\"エステル\\\",\\\"エディス\\\",\\\"エノーラ\\\",\\\"エミリア\\\",\\\"エリアル\\\",\\\"エリザベス\\\",\\\"エレノーラ\\\",\\\"オーレリア\\\",\\\"オリビア\\\",\\\"カトリーナ\\\",\\\"キャサリン\\\",\\\"キャメロン\\\",\\\"キャロル\\\",\\\"クラリス\\\",\\\"クリスティン\\\",\\\"グレイス\\\",\\\"グレンダ\\\",\\\"グロリア\\\",\\\"コーデリア\\\",\\\"サブリナ\\\",\\\"サマンサ\\\",\\\"サンドラ\\\",\\\"ジェーン\\\",\\\"ジェシカ\\\",\\\"シェリル\\\",\\\"シオドーラ\\\",\\\"ジャスミン\\\",\\\"ジャネット\\\",\\\"シャロン\\\",\\\"ジューン\\\",\\\"ジュディ\\\",\\\"ジュリアン\\\",\\\"ジョアンナ\\\",\\\"ショーナ\\\",\\\"シルビア\\\",\\\"シンシア\\\",\\\"スーザン\\\",\\\"スザンナ\\\",\\\"セオドーラ\\\",\\\"セシリア\\\",\\\"セリーナ\\\",\\\"ソフィア\\\",\\\"ダイアナ\\\",\\\"ディアドラ\\\",\\\"ディアナ\\\",\\\"テリーサ\\\",\\\"ドリーン\\\",\\\"ドロシア\\\",\\\"ナタリア\\\",\\\"ナディア\\\",\\\"ニコール\\\",\\\"ネイオミ\\\",\\\"ノーリーン\\\",\\\"バーバラ\\\",\\\"パトリシア\\\",\\\"ビクトリア\\\",\\\"ビビアン\\\",\\\"フィオナ\\\",\\\"フィリス\\\",\\\"フェリシア\\\",\\\"フランシス\\\",\\\"プリシラ\\\",\\\"ブレンダ\\\",\\\"フローラ\\\",\\\"ベアトリス\\\",\\\"ヘイゼル\\\",\\\"ベネッサ\\\",\\\"ベリンダ\\\",\\\"ヘロイーズ\\\",\\\"ベロニカ\\\",\\\"ポーリーン\\\",\\\"マーゴット\\\",\\\"マーシャ\\\",\\\"マーリーン\\\",\\\"マチルダ\\\",\\\"マデリン\\\",\\\"マドライン\\\",\\\"マライア\\\",\\\"マリアン\\\",\\\"マリリン\\\",\\\"マルビナ\\\",\\\"ミッシェル\\\",\\\"ミランダ\\\",\\\"ミリアム\\\",\\\"メイベル\\\",\\\"メリッサ\\\",\\\"メリンダ\\\",\\\"メレディス\\\",\\\"メロディ\\\",\\\"モーリーン\\\",\\\"モニーク\\\",\\\"ユーニス\\\",\\\"ヨランダ\\\",\\\"ラモーナ\\\",\\\"リオノーラ\\\",\\\"リディア\\\",\\\"リネット\\\",\\\"リリアン\\\",\\\"ルイーズ\\\",\\\"ルーシャ\\\",\\\"ルシール\\\",\\\"ルシンダ\\\",\\\"レイチェル\\\",\\\"レオノーラ\\\",\\\"レジーナ\\\",\\\"レベッカ\\\",\\\"ロレッタ\\\"]\"}"]


@command changeName
@text 名前の変更
@desc アクターの名前を変更します。

@arg actorId
@text アクター
@desc 名前を変更するアクターを指定します。
@type actor
@default 0

@arg selectListName
@text リスト名
@desc 名前を変更する候補リスト名を指定します。
@type string
@default
*/

/*~struct~nameList:ja
@param listName
@text リスト名
@type string
@default list1
@desc 名前の候補リストのリスト名。重複しない名前にしてください。

@param actorNames
@text 名前候補
@type string[]
@default
@desc 候補になる名前を入れてください。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const pluginParameters = PluginManager.parameters(pluginName);
  const variableId = Number(pluginParameters['variableId'] || 0);

  const settings = {
    nameLists: JSON.parse(pluginParameters.nameLists || '[]').map((e) => {
      return ((parameter) => {
        const parsed = JSON.parse(parameter);
        return {
          listName: String(parsed.listName || ''),
          actorNames: JSON.parse(parsed.actorNames || '[]').map((e) => {
            return String(e || '');
          }),
        };
      })(e || '{}');
    }),
  };

  PluginManager.registerCommand(pluginName, "changeName", args => {
    const actorId = Number(args.actorId);
    const selectListName = String(args.selectListName);
    const arr = settings.nameLists;
    const filterArr = arr.filter(e => e.listName === selectListName);
    const arrNames = filterArr[0].actorNames;
    const changeName = arrNames[Math.floor(Math.random() * arrNames.length)];
    if (variableId > 0) {
      $gameVariables.setValue(variableId, changeName);
    }
    $gameActors.actor(actorId).setName(changeName);
  });

})();