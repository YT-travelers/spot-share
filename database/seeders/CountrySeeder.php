<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use PHPUnit\Framework\Constraint\Count;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::insert([
            [ 'country_code' => 'AFG', 'country_name' => 'アフガニスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ALA', 'country_name' => 'オーランド諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ALB', 'country_name' => 'アルバニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DZA', 'country_name' => 'アルジェリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ASM', 'country_name' => 'アメリカ領サモア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AND', 'country_name' => 'アンドラ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AGO', 'country_name' => 'アンゴラ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AIA', 'country_name' => 'アンギラ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ATA', 'country_name' => '南極大陸', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ATG', 'country_name' => 'アンティグア・バーブーダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ARG', 'country_name' => 'アルゼンチン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ARM', 'country_name' => 'アルメニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ABW', 'country_name' => 'アルバ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AUS', 'country_name' => 'オーストラリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AUT', 'country_name' => 'オーストリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'AZE', 'country_name' => 'アゼルバイジャン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BHS', 'country_name' => 'バハマ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BHR', 'country_name' => 'バーレーン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BGD', 'country_name' => 'バングラデシュ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BRB', 'country_name' => 'バルバドス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BLR', 'country_name' => 'ベラルーシ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BEL', 'country_name' => 'ベルギー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BLZ', 'country_name' => 'ベリーズ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BEN', 'country_name' => 'ベナン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BMU', 'country_name' => 'バミューダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BTN', 'country_name' => 'ブータン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BOL', 'country_name' => 'ボリビア多民族国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BES', 'country_name' => 'null', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BIH', 'country_name' => 'ボスニア・ヘルツェゴビナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BWA', 'country_name' => 'ボツワナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BVT', 'country_name' => 'ブーベ島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BRA', 'country_name' => 'ブラジル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IOT', 'country_name' => 'イギリス領インド洋地域', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'UMI', 'country_name' => '合衆国領有小離島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VGB', 'country_name' => 'イギリス領ヴァージン諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VIR', 'country_name' => 'アメリカ領ヴァージン諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BRN', 'country_name' => 'ブルネイ・ダルサラーム', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BGR', 'country_name' => 'ブルガリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BFA', 'country_name' => 'ブルキナファソ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BDI', 'country_name' => 'ブルンジ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KHM', 'country_name' => 'カンボジア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CMR', 'country_name' => 'カメルーン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CAN', 'country_name' => 'カナダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CPV', 'country_name' => 'カーボベルデ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CYM', 'country_name' => 'ケイマン諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CAF', 'country_name' => '中央アフリカ共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TCD', 'country_name' => 'チャド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CHL', 'country_name' => 'チリ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CHN', 'country_name' => '中国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CXR', 'country_name' => 'クリスマス島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CCK', 'country_name' => 'ココス（キーリング）諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'COL', 'country_name' => 'コロンビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'COM', 'country_name' => 'コモロ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'COG', 'country_name' => 'コンゴ共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'COD', 'country_name' => 'コンゴ民主共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'COK', 'country_name' => 'クック諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CRI', 'country_name' => 'コスタリカ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HRV', 'country_name' => 'クロアチア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CUB', 'country_name' => 'キューバ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CUW', 'country_name' => 'null', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CYP', 'country_name' => 'キプロス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CZE', 'country_name' => 'チェコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DNK', 'country_name' => 'デンマーク', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DJI', 'country_name' => 'ジブチ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DMA', 'country_name' => 'ドミニカ国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DOM', 'country_name' => 'ドミニカ共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ECU', 'country_name' => 'エクアドル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'EGY', 'country_name' => 'エジプト', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SLV', 'country_name' => 'エルサルバドル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GNQ', 'country_name' => '赤道ギニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ERI', 'country_name' => 'エリトリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'EST', 'country_name' => 'エストニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ETH', 'country_name' => 'エチオピア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FLK', 'country_name' => 'フォークランド（マルビナス）諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FRO', 'country_name' => 'フェロー諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FJI', 'country_name' => 'フィジー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FIN', 'country_name' => 'フィンランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FRA', 'country_name' => 'フランス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GUF', 'country_name' => 'フランス領ギアナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PYF', 'country_name' => 'フランス領ポリネシア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ATF', 'country_name' => 'フランス領南方・南極地域', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GAB', 'country_name' => 'ガボン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GMB', 'country_name' => 'ガンビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GEO', 'country_name' => 'グルジア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'DEU', 'country_name' => 'ドイツ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GHA', 'country_name' => 'ガーナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GIB', 'country_name' => 'ジブラルタル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GRC', 'country_name' => 'ギリシャ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GRL', 'country_name' => 'グリーンランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GRD', 'country_name' => 'グレナダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GLP', 'country_name' => 'グアドループ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GUM', 'country_name' => 'グアム', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GTM', 'country_name' => 'グアテマラ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GGY', 'country_name' => 'ガーンジー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GIN', 'country_name' => 'ギニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GNB', 'country_name' => 'ギニアビサウ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GUY', 'country_name' => 'ガイアナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HTI', 'country_name' => 'ハイチ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HMD', 'country_name' => 'ハード島とマクドナルド諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VAT', 'country_name' => '聖座', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HND', 'country_name' => 'ホンジュラス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HKG', 'country_name' => '香港', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'HUN', 'country_name' => 'ハンガリー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ISL', 'country_name' => 'アイスランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IND', 'country_name' => 'インド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IDN', 'country_name' => 'インドネシア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CIV', 'country_name' => 'コートジボワール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IRN', 'country_name' => 'イラン・イスラム共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IRQ', 'country_name' => 'イラク', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IRL', 'country_name' => 'アイルランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'IMN', 'country_name' => 'マン島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ISR', 'country_name' => 'イスラエル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ITA', 'country_name' => 'イタリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'JAM', 'country_name' => 'ジャマイカ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'JPN', 'country_name' => '日本', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'JEY', 'country_name' => 'ジャージー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'JOR', 'country_name' => 'ヨルダン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KAZ', 'country_name' => 'カザフスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KEN', 'country_name' => 'ケニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KIR', 'country_name' => 'キリバス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KWT', 'country_name' => 'クウェート', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KGZ', 'country_name' => 'キルギス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LAO', 'country_name' => 'ラオス人民民主共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LVA', 'country_name' => 'ラトビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LBN', 'country_name' => 'レバノン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LSO', 'country_name' => 'レソト', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LBR', 'country_name' => 'リベリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LBY', 'country_name' => 'リビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LIE', 'country_name' => 'リヒテンシュタイン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LTU', 'country_name' => 'リトアニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LUX', 'country_name' => 'ルクセンブルク', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MAC', 'country_name' => 'マカオ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MKD', 'country_name' => 'マケドニア旧ユーゴスラビア共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MDG', 'country_name' => 'マダガスカル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MWI', 'country_name' => 'マラウイ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MYS', 'country_name' => 'マレーシア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MDV', 'country_name' => 'モルディブ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MLI', 'country_name' => 'マリ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MLT', 'country_name' => 'マルタ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MHL', 'country_name' => 'マーシャル諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MTQ', 'country_name' => 'マルティニーク', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MRT', 'country_name' => 'モーリタニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MUS', 'country_name' => 'モーリシャス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MYT', 'country_name' => 'マヨット', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MEX', 'country_name' => 'メキシコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'FSM', 'country_name' => 'ミクロネシア連邦', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MDA', 'country_name' => 'モルドバ共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MCO', 'country_name' => 'モナコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MNG', 'country_name' => 'モンゴル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MNE', 'country_name' => 'モンテネグロ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MSR', 'country_name' => 'モントセラト', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MAR', 'country_name' => 'モロッコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MOZ', 'country_name' => 'モザンビーク', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MMR', 'country_name' => 'ミャンマー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NAM', 'country_name' => 'ナミビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NRU', 'country_name' => 'ナウル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NPL', 'country_name' => 'ネパール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NLD', 'country_name' => 'オランダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NCL', 'country_name' => 'ニューカレドニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NZL', 'country_name' => 'ニュージーランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NIC', 'country_name' => 'ニカラグア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NER', 'country_name' => 'ニジェール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NGA', 'country_name' => 'ナイジェリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NIU', 'country_name' => 'ニウエ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NFK', 'country_name' => 'ノーフォーク島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PRK', 'country_name' => '朝鮮民主主義人民共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MNP', 'country_name' => '北マリアナ諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'NOR', 'country_name' => 'ノルウェー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'OMN', 'country_name' => 'オマーン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PAK', 'country_name' => 'パキスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PLW', 'country_name' => 'パラオ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PSE', 'country_name' => 'パレスチナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PAN', 'country_name' => 'パナマ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PNG', 'country_name' => 'パプアニューギニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PRY', 'country_name' => 'パラグアイ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PER', 'country_name' => 'ペルー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PHL', 'country_name' => 'フィリピン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PCN', 'country_name' => 'ピトケアン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'POL', 'country_name' => 'ポーランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PRT', 'country_name' => 'ポルトガル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'PRI', 'country_name' => 'プエルトリコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'QAT', 'country_name' => 'カタール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KOS', 'country_name' => 'null', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'REU', 'country_name' => 'レユニオン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ROU', 'country_name' => 'ルーマニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'RUS', 'country_name' => 'ロシア連邦', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'RWA', 'country_name' => 'ルワンダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'BLM', 'country_name' => 'サン・バルテルミー', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SHN', 'country_name' => 'セントヘレナ・アセンションおよびトリスタンダクーニャ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KNA', 'country_name' => 'セントクリストファー・ネイビス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LCA', 'country_name' => 'セントルシア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'MAF', 'country_name' => 'サン・マルタン（フランス領）', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SPM', 'country_name' => 'サンピエール島・ミクロン島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VCT', 'country_name' => 'セントビンセントおよびグレナディーン諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'WSM', 'country_name' => 'サモア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SMR', 'country_name' => 'サンマリノ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'STP', 'country_name' => 'サントメ・プリンシペ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SAU', 'country_name' => 'サウジアラビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SEN', 'country_name' => 'セネガル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SRB', 'country_name' => 'セルビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SYC', 'country_name' => 'セーシェル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SLE', 'country_name' => 'シエラレオネ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SGP', 'country_name' => 'シンガポール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SXM', 'country_name' => 'null', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SVK', 'country_name' => 'スロバキア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SVN', 'country_name' => 'スロベニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SLB', 'country_name' => 'ソロモン諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SOM', 'country_name' => 'ソマリア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ZAF', 'country_name' => '南アフリカ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SGS', 'country_name' => 'サウスジョージア・サウスサンドウィッチ諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'KOR', 'country_name' => '大韓民国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SSD', 'country_name' => '南スーダン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ESP', 'country_name' => 'スペイン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'LKA', 'country_name' => 'スリランカ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SDN', 'country_name' => 'スーダン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SUR', 'country_name' => 'スリナム', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SJM', 'country_name' => 'スヴァールバル諸島およびヤンマイエン島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SWZ', 'country_name' => 'スワジランド', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SWE', 'country_name' => 'スウェーデン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'CHE', 'country_name' => 'スイス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'SYR', 'country_name' => 'シリア・アラブ共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TWN', 'country_name' => '台湾（中華民国）', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TJK', 'country_name' => 'タジキスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TZA', 'country_name' => 'タンザニア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'THA', 'country_name' => 'タイ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TLS', 'country_name' => '東ティモール', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TGO', 'country_name' => 'トーゴ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TKL', 'country_name' => 'トケラウ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TON', 'country_name' => 'トンガ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TTO', 'country_name' => 'トリニダード・トバゴ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TUN', 'country_name' => 'チュニジア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TUR', 'country_name' => 'トルコ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TKM', 'country_name' => 'トルクメニスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TCA', 'country_name' => 'タークス・カイコス諸島', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'TUV', 'country_name' => 'ツバル', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'UGA', 'country_name' => 'ウガンダ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'UKR', 'country_name' => 'ウクライナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ARE', 'country_name' => 'アラブ首長国連邦', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'GBR', 'country_name' => 'イギリス', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'USA', 'country_name' => 'アメリカ合衆国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'URY', 'country_name' => 'ウルグアイ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'UZB', 'country_name' => 'ウズベキスタン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VUT', 'country_name' => 'バヌアツ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VEN', 'country_name' => 'ベネズエラ・ボリバル共和国', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'VNM', 'country_name' => 'ベトナム', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'WLF', 'country_name' => 'ウォリス・フツナ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ESH', 'country_name' => '西サハラ', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'YEM', 'country_name' => 'イエメン', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ZMB', 'country_name' => 'ザンビア', 'currency' => '円', 'timezone' => '+09:00' ],
            [ 'country_code' => 'ZWE', 'country_name' => 'ジンバブエ', 'currency' => '円', 'timezone' => '+09:00' ],
        ]);
    }
}
