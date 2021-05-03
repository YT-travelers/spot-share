import { ICodeList } from 'src/app/shared/model/code-list';

/**
 * ビーン種類区分
 */
export namespace Code.BeanKindDiv {
    /** 観光地 */
    export const Tourism = 0;
    /** 飲食店 */
    export const Restaurant = 1;
    /** ホテル */
    export const Hotel = 2;
    /** アクティビティ */
    export const Activity = 3;
    /** 食事 */
    export const Meal = 4;
    /** 移動 */
    export const Move = 5;
    /** 時間 */
    export const Time = 6;
    /** チェックリスト */
    export const Checklist = 7;
    /** メモ */
    export const Memo = 8;

    /** ビーン種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "観光地" },
        { div: 1, name: "飲食店" },
        { div: 2, name: "ホテル" },
        { div: 3, name: "アクティビティ" },
        { div: 4, name: "食事" },
        { div: 5, name: "移動" },
        { div: 6, name: "時間" },
        { div: 7, name: "チェックリスト" },
        { div: 8, name: "メモ" },
    ]
}

/**
 * ビーン種類区分名称
 */
export namespace Code.BeanKindDivName {
    export const Tourism = "観光地";
    export const Restaurant = "飲食店";
    export const Hotel = "ホテル";
    export const Activity = "アクティビティ";
    export const Meal = "食事";
    export const Move = "移動";
    export const Time = "時間";
    export const Checklist = "チェックリスト";
    export const Memo = "メモ";
}

/**
 * チェック区分
 */
export namespace Code.CheckDiv {
    /** チェック済み */
    export const Checked = 0;
    /** 未チェック */
    export const UnCheckd = 1;

    /** チェック区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "チェック済み" },
        { div: 1, name: "未チェック" },
    ]
}

/**
 * チェック区分名称
 */
export namespace Code.CheckDivName {
    export const Checked = "チェック済み";
    export const UnCheckd = "未チェック";
}

/**
 * 料理ジャンル区分
 */
export namespace Code.CuisineGenreDiv {
    /** 海鮮・寿司 */
    export const Seafood = 0;
    /** 魚料理 */
    export const FishDishes = 1;
    /** 和食・日本料理 */
    export const JapaneseFood = 2;
    /** ラーメン・麺類 */
    export const Noodles = 3;
    /** 丼もの */
    export const Donburi = 4;
    /** 揚げ物 */
    export const FriedFood = 5;
    /** お好み焼き・粉物 */
    export const GrilledFood = 6;
    /** アジア・エスニック */
    export const Asian = 7;
    /** 中華 */
    export const ChineseCuisine = 8;
    /** イタリアン */
    export const Italian = 9;
    /** 洋食 */
    export const WesternFood = 10;
    /** フレンチ */
    export const French = 11;
    /** ビストロ */
    export const Bistro = 12;
    /** 焼き肉・ステーキ */
    export const Steak = 13;
    /** 焼き鳥 */
    export const Yakitori = 14;
    /** 串料理 */
    export const Skewers = 15;
    /** 鍋 */
    export const Pot = 16;
    /** その他 */
    export const Other = 17;

    /** 料理ジャンル区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "海鮮・寿司" },
        { div: 1, name: "魚料理" },
        { div: 2, name: "和食・日本料理" },
        { div: 3, name: "ラーメン・麺類" },
        { div: 4, name: "丼もの" },
        { div: 5, name: "揚げ物" },
        { div: 6, name: "お好み焼き・粉物" },
        { div: 7, name: "アジア・エスニック" },
        { div: 8, name: "中華" },
        { div: 9, name: "イタリアン" },
        { div: 10, name: "洋食" },
        { div: 11, name: "フレンチ" },
        { div: 12, name: "ビストロ" },
        { div: 13, name: "焼き肉・ステーキ" },
        { div: 14, name: "焼き鳥" },
        { div: 15, name: "串料理" },
        { div: 16, name: "鍋" },
        { div: 17, name: "その他" },
    ]
}

/**
 * 料理ジャンル区分名称
 */
export namespace Code.CuisineGenreDivName {
    export const Seafood = "海鮮・寿司";
    export const FishDishes = "魚料理";
    export const JapaneseFood = "和食・日本料理";
    export const Noodles = "ラーメン・麺類";
    export const Donburi = "丼もの";
    export const FriedFood = "揚げ物";
    export const GrilledFood = "お好み焼き・粉物";
    export const Asian = "アジア・エスニック";
    export const ChineseCuisine = "中華";
    export const Italian = "イタリアン";
    export const WesternFood = "洋食";
    export const French = "フレンチ";
    export const Bistro = "ビストロ";
    export const Steak = "焼き肉・ステーキ";
    export const Yakitori = "焼き鳥";
    export const Skewers = "串料理";
    export const Pot = "鍋";
    export const Other = "その他";
}

/**
 * フラグ区分
 */
export namespace Code.FlgDiv {
    /** フラグあり */
    export const Flagged = 0;
    /** フラグなし */
    export const NotFlagged = 0;

    /** フラグ区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "フラグあり" },
        { div: 0, name: "フラグなし" },
    ]
}

/**
 * フラグ区分名称
 */
export namespace Code.FlgDivName {
    export const Flagged = "フラグあり";
    export const NotFlagged = "フラグなし";
}

/**
 * ホテル種類区分
 */
export namespace Code.HotelKindDiv {
    /** ホテル */
    export const Hotel = 0;
    /** 旅館 */
    export const Ryokan = 1;
    /** ゲストハウス */
    export const GuestHouse = 2;
    /** ユースホステル */
    export const YouthHostel = 3;
    /** キャンプ */
    export const Camp = 4;
    /** その他 */
    export const Other = 5;

    /** ホテル種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "ホテル" },
        { div: 1, name: "旅館" },
        { div: 2, name: "ゲストハウス" },
        { div: 3, name: "ユースホステル" },
        { div: 4, name: "キャンプ" },
        { div: 5, name: "その他" },
    ]
}

/**
 * ホテル種類区分名称
 */
export namespace Code.HotelKindDivName {
    export const Hotel = "ホテル";
    export const Ryokan = "旅館";
    export const GuestHouse = "ゲストハウス";
    export const YouthHostel = "ユースホステル";
    export const Camp = "キャンプ";
    export const Other = "その他";
}

/**
 * 論理削除区分
 */
export namespace Code.LogicalDeleteDiv {
    /** 有効 */
    export const Valid = 0;
    /** 論理削除済み */
    export const LgicalDeleted = 1;

    /** 論理削除区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "有効" },
        { div: 1, name: "論理削除済み" },
    ]
}

/**
 * 論理削除区分名称
 */
export namespace Code.LogicalDeleteDivName {
    export const Valid = "有効";
    export const LgicalDeleted = "論理削除済み";
}

/**
 * 食事種類区分
 */
export namespace Code.MealKindDiv {
    /** 朝食 */
    export const BreakFast = 0;
    /** 昼食 */
    export const Lunch = 1;
    /** 夜食 */
    export const Dinner = 2;
    /** グルメ */
    export const Gourmet = 3;
    /** おやつ */
    export const Snack = 4;
    /** その他 */
    export const Other = 5;

    /** 食事種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "朝食" },
        { div: 1, name: "昼食" },
        { div: 2, name: "夜食" },
        { div: 3, name: "グルメ" },
        { div: 4, name: "おやつ" },
        { div: 5, name: "その他" },
    ]
}

/**
 * 食事種類区分名称
 */
export namespace Code.MealKindDivName {
    export const BreakFast = "朝食";
    export const Lunch = "昼食";
    export const Dinner = "夜食";
    export const Gourmet = "グルメ";
    export const Snack = "おやつ";
    export const Other = "その他";
}

/**
 * 移動手段区分
 */
export namespace Code.MoveWayDiv {
    /** 徒歩 */
    export const OnFoot = 0;
    /** 自転車 */
    export const Bycycle = 1;
    /** バイク */
    export const Bike = 2;
    /** 車 */
    export const Car = 3;
    /** タクシー */
    export const Taxi = 4;
    /** バス */
    export const Bus = 5;
    /** 電車 */
    export const Train = 6;
    /** 寝台列車 */
    export const SleeperTrain = 7;
    /** 新幹線 */
    export const Shinkansen = 8;
    /** 飛行機 */
    export const AirPlane = 9;
    /** 船 */
    export const Ship = 10;
    /** フェリー */
    export const Ferry = 11;
    /** その他 */
    export const Other = 12;

    /** 移動手段区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "徒歩" },
        { div: 1, name: "自転車" },
        { div: 2, name: "バイク" },
        { div: 3, name: "車" },
        { div: 4, name: "タクシー" },
        { div: 5, name: "バス" },
        { div: 6, name: "電車" },
        { div: 7, name: "寝台列車" },
        { div: 8, name: "新幹線" },
        { div: 9, name: "飛行機" },
        { div: 10, name: "船" },
        { div: 11, name: "フェリー" },
        { div: 12, name: "その他" },
    ]
}

/**
 * 移動手段区分名称
 */
export namespace Code.MoveWayDivName {
    export const OnFoot = "徒歩";
    export const Bycycle = "自転車";
    export const Bike = "バイク";
    export const Car = "車";
    export const Taxi = "タクシー";
    export const Bus = "バス";
    export const Train = "電車";
    export const SleeperTrain = "寝台列車";
    export const Shinkansen = "新幹線";
    export const AirPlane = "飛行機";
    export const Ship = "船";
    export const Ferry = "フェリー";
    export const Other = "その他";
}

/**
 * 飲食店種類区分
 */
export namespace Code.RestaurantKindDiv {
    /** レストラン */
    export const Restaurant = 0;
    /** 居酒屋 */
    export const Izakaya = 1;
    /** バー */
    export const Bar = 2;
    /** カフェ */
    export const Cafe = 3;
    /** ファミレス */
    export const FamilyRestaurant = 4;
    /** ファーストフード */
    export const FastFood = 5;
    /** ビュッフェ */
    export const Buffet = 6;
    /** バイキング */
    export const Viking = 7;
    /** その他 */
    export const Other = 8;

    /** 飲食店種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "レストラン" },
        { div: 1, name: "居酒屋" },
        { div: 2, name: "バー" },
        { div: 3, name: "カフェ" },
        { div: 4, name: "ファミレス" },
        { div: 5, name: "ファーストフード" },
        { div: 6, name: "ビュッフェ" },
        { div: 7, name: "バイキング" },
        { div: 8, name: "その他" },
    ]
}

/**
 * 飲食店種類区分名称
 */
export namespace Code.RestaurantKindDivName {
    export const Restaurant = "レストラン";
    export const Izakaya = "居酒屋";
    export const Bar = "バー";
    export const Cafe = "カフェ";
    export const FamilyRestaurant = "ファミレス";
    export const FastFood = "ファーストフード";
    export const Buffet = "ビュッフェ";
    export const Viking = "バイキング";
    export const Other = "その他";
}

/**
 * 有無区分
 */
export namespace Code.YesNoDiv {
    /** 有り */
    export const Yes = 0;
    /** 無し */
    export const No = 1;

    /** 有無区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "有り" },
        { div: 1, name: "無し" },
    ]
}

/**
 * 有無区分名称
 */
export namespace Code.YesNoDivName {
    export const Yes = "有り";
    export const No = "無し";
}

