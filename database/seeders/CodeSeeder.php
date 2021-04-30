<?php

namespace Database\Seeders;

use App\Models\Code\Code;
use Illuminate\Database\Seeder;

class CodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Code::insert([
            ['division' => 'LogicalDeleteDiv',  'div_name' => '論理削除区分',    'div_key' => 'Valid',             'div_key_name' => '有効',        'div_value' => 0],
            ['division' => 'LogicalDeleteDiv',  'div_name' => '論理削除区分',    'div_key' => 'LgicalDeleted',     'div_key_name' => '論理削除済み',  'div_value' => 1],
            ['division' => 'YesNoDiv',          'div_name' => '有無区分',       'div_key' => 'Yes',               'div_key_name' => '有り',         'div_value' => 0],
            ['division' => 'YesNoDiv',          'div_name' => '有無区分',       'div_key' => 'No',                'div_key_name' => '無し',         'div_value' => 1],
            ['division' => 'FlgDiv',            'div_name' => 'フラグ区分',     'div_key' => 'Flagged',            'div_key_name' => 'フラグあり',    'div_value' => 0],
            ['division' => 'FlgDiv',            'div_name' => 'フラグ区分',     'div_key' => 'NotFlagged',         'div_key_name' => 'フラグなし',    'div_value' => 1],
            ['division' => 'CheckDiv',          'div_name' => 'チェック区分',    'div_key' => 'Checked',           'div_key_name' => 'チェック済み',   'div_value' => 0],
            ['division' => 'CheckDiv',          'div_name' => 'チェック区分',    'div_key' => 'UnCheckd',          'div_key_name' => '未チェック',     'div_value' => 1],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Tourism',            'div_key_name' => '観光地',       'div_value' => 0],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Restaurant',         'div_key_name' => '飲食店',       'div_value' => 1],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Hotel',              'div_key_name' => 'ホテル',       'div_value' => 2],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Activity',           'div_key_name' => 'アクティビティ','div_value' => 3],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Meal',               'div_key_name' => '食事',        'div_value' => 4],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Move',               'div_key_name' => '移動',        'div_value' => 5],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Time',               'div_key_name' => '時間',        'div_value' => 6],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Checklist',          'div_key_name' => 'チェックリスト','div_value' => 7],
            ['division' => 'BeanKindDiv',       'div_name' => 'ビーン種類区分',  'div_key' => 'Memo',               'div_key_name' => 'メモ',        'div_value' => 8],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'BreakFast',         'div_key_name' => '朝食',        'div_value' => 0],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'Lunch',             'div_key_name' => '昼食',         'div_value' => 1],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'Dinner',            'div_key_name' => '夜食',         'div_value' => 2],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'Gourmet',           'div_key_name' => 'グルメ',       'div_value' => 3],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'Snack',             'div_key_name' => 'おやつ',       'div_value' => 4],
            ['division' => 'MealKindDiv',       'div_name' => '食事種類区分',    'div_key' => 'Other',             'div_key_name' => 'その他',       'div_value' => 5],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'Hotel',              'div_key_name' => 'ホテル',       'div_value' => 0],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'Ryokan',             'div_key_name' => '旅館',        'div_value' => 1],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'GuestHouse',         'div_key_name' => 'ゲストハウス',  'div_value' => 2],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'YouthHostel',        'div_key_name' => 'ユースホステル', 'div_value' => 3],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'Camp',               'div_key_name' => 'キャンプ',      'div_value' => 4],
            ['division' => 'HotelKindDiv',      'div_name' => 'ホテル種類区分',  'div_key' => 'Other',              'div_key_name' => 'その他',       'div_value' => 5],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'OnFoot',            'div_key_name' => '徒歩',         'div_value' => 0],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Bycycle',           'div_key_name' => '自転車',        'div_value' => 1],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Bike',              'div_key_name' => 'バイク',        'div_value' => 2],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Car',               'div_key_name' => '車',           'div_value' => 3],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Taxi',              'div_key_name' => 'タクシー',      'div_value' => 4],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Bus',               'div_key_name' => 'バス',         'div_value' => 5],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Train',             'div_key_name' => '電車',         'div_value' => 6],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'SleeperTrain',      'div_key_name' => '寝台列車',      'div_value' => 7],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Shinkansen',        'div_key_name' => '新幹線',        'div_value' => 8],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'AirPlane',          'div_key_name' => '飛行機',        'div_value' => 9],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Ship',              'div_key_name' => '船',           'div_value' => 10],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Ferry',             'div_key_name' => 'フェリー',      'div_value' => 11],
            ['division' => 'MoveWayDiv',        'div_name' => '移動手段区分',    'div_key' => 'Other',             'div_key_name' => 'その他',        'div_value' => 12],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Seafood',           'div_key_name' => '海鮮・寿司',     'div_value' => 0],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'FishDishes',        'div_key_name' => '魚料理',        'div_value' => 1],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'JapaneseFood',      'div_key_name' => '和食・日本料理',  'div_value' => 2],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Noodles',           'div_key_name' => 'ラーメン・麺類',  'div_value' => 3],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Donburi',           'div_key_name' => '丼もの',         'div_value' => 4],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'FriedFood',         'div_key_name' => '揚げ物',         'div_value' => 5],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'GrilledFood',       'div_key_name' => 'お好み焼き・粉物',  'div_value' => 6],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Asian',             'div_key_name' => 'アジア・エスニック', 'div_value' => 7],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'ChineseCuisine',    'div_key_name' => '中華',            'div_value' => 8],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Italian',           'div_key_name' => 'イタリアン',       'div_value' => 9],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'WesternFood',       'div_key_name' => '洋食',            'div_value' => 10],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'French',            'div_key_name' => 'フレンチ',         'div_value' => 11],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Bistro',            'div_key_name' => 'ビストロ',         'div_value' => 12],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Steak',             'div_key_name' => '焼き肉・ステーキ',  'div_value' => 13],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Yakitori',          'div_key_name' => '焼き鳥',          'div_value' => 14],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Skewers',           'div_key_name' => '串料理',          'div_value' => 15],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Pot',               'div_key_name' => '鍋',              'div_value' => 16],
            ['division' => 'CuisineGenreDiv',   'div_name' => '料理ジャンル区分', 'div_key' => 'Other',             'div_key_name' => 'その他',          'div_value' => 17],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Restaurant',       'div_key_name' => 'レストラン',        'div_value' => 0],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Izakaya',          'div_key_name' => '居酒屋',           'div_value' => 1],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Bar',              'div_key_name' => 'バー',             'div_value' => 2],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Cafe',             'div_key_name' => 'カフェ',           'div_value' => 3],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'FamilyRestaurant', 'div_key_name' => 'ファミレス',        'div_value' => 4],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'FastFood',         'div_key_name' => 'ファーストフード',   'div_value' => 5],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Buffet',           'div_key_name' => 'ビュッフェ',        'div_value' => 6],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Viking',           'div_key_name' => 'バイキング',        'div_value' => 7],
            ['division' => 'RestaurantKindDiv', 'div_name' => '飲食店種類区分',   'div_key' => 'Other',            'div_key_name' => 'その他',           'div_value' => 8],
        ]);
    }
}
