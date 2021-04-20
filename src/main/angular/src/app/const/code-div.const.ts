import { ICodeList } from '../model/code-list';

/**
 * ビーン種類区分
 */
export namespace Code.BeanKindDiv {
    /** アクティビティ */
    export const Activity = 3;
    /** チェックリスト */
    export const Checklist = 7;
    /** ホテル */
    export const Hotel = 2;
    /** 食事 */
    export const Meal = 4;
    /** メモ */
    export const Memo = 8;
    /** 移動 */
    export const Move = 5;
    /** 飲食店 */
    export const Restaurant = 1;
    /** 時間 */
    export const Time = 6;
    /** 観光地 */
    export const Tourism = 0;

    /** ビーン種類区分List */
    export const List: ICodeList[] = [
        { div: 3, name: "アクティビティ" },
        { div: 7, name: "チェックリスト" },
        { div: 2, name: "ホテル" },
        { div: 4, name: "食事" },
        { div: 8, name: "メモ" },
        { div: 5, name: "移動" },
        { div: 1, name: "飲食店" },
        { div: 6, name: "時間" },
        { div: 0, name: "観光地" },
    ]
}

/**
 * ビーン種類区分名称
 */
export namespace Code.BeanKindDivName {
    export const Activity = "アクティビティ";
    export const Checklist = "チェックリスト";
    export const Hotel = "ホテル";
    export const Meal = "食事";
    export const Memo = "メモ";
    export const Move = "移動";
    export const Restaurant = "飲食店";
    export const Time = "時間";
    export const Tourism = "観光地";
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
    /** アジア・エスニック */
    export const Asian = 7;
    /** ビストロ */
    export const Bistro = 12;
    /** 中華 */
    export const ChineseCuisine = 8;
    /** 丼もの */
    export const Donburi = 4;
    /** 魚料理 */
    export const FishDishes = 1;
    /** フレンチ */
    export const French = 11;
    /** 揚げ物 */
    export const FriedFood = 5;
    /** お好み焼き・粉物 */
    export const GrilledFood = 6;
    /** イタリアン */
    export const Italian = 9;
    /** 和食・日本料理 */
    export const JapaneseFood = 2;
    /** ラーメン・麺類 */
    export const Noodles = 3;
    /** その他 */
    export const Other = 17;
    /** 鍋 */
    export const Pot = 16;
    /** 海鮮・寿司 */
    export const Seafood = 0;
    /** 串料理 */
    export const Skewers = 15;
    /** 焼き肉・ステーキ */
    export const Steak = 13;
    /** 洋食 */
    export const WesternFood = 10;
    /** 焼き鳥 */
    export const Yakitori = 14;

    /** 料理ジャンル区分List */
    export const List: ICodeList[] = [
        { div: 7, name: "アジア・エスニック" },
        { div: 12, name: "ビストロ" },
        { div: 8, name: "中華" },
        { div: 4, name: "丼もの" },
        { div: 1, name: "魚料理" },
        { div: 11, name: "フレンチ" },
        { div: 5, name: "揚げ物" },
        { div: 6, name: "お好み焼き・粉物" },
        { div: 9, name: "イタリアン" },
        { div: 2, name: "和食・日本料理" },
        { div: 3, name: "ラーメン・麺類" },
        { div: 17, name: "その他" },
        { div: 16, name: "鍋" },
        { div: 0, name: "海鮮・寿司" },
        { div: 15, name: "串料理" },
        { div: 13, name: "焼き肉・ステーキ" },
        { div: 10, name: "洋食" },
        { div: 14, name: "焼き鳥" },
    ]
}

/**
 * 料理ジャンル区分名称
 */
export namespace Code.CuisineGenreDivName {
    export const Asian = "アジア・エスニック";
    export const Bistro = "ビストロ";
    export const ChineseCuisine = "中華";
    export const Donburi = "丼もの";
    export const FishDishes = "魚料理";
    export const French = "フレンチ";
    export const FriedFood = "揚げ物";
    export const GrilledFood = "お好み焼き・粉物";
    export const Italian = "イタリアン";
    export const JapaneseFood = "和食・日本料理";
    export const Noodles = "ラーメン・麺類";
    export const Other = "その他";
    export const Pot = "鍋";
    export const Seafood = "海鮮・寿司";
    export const Skewers = "串料理";
    export const Steak = "焼き肉・ステーキ";
    export const WesternFood = "洋食";
    export const Yakitori = "焼き鳥";
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
    /** キャンプ */
    export const Camp = 4;
    /** ゲストハウス */
    export const GuestHouse = 2;
    /** ホテル */
    export const Hotel = 0;
    /** その他 */
    export const Other = 5;
    /** 旅館 */
    export const Ryokan = 1;
    /** ユースホステル */
    export const YouthHostel = 3;

    /** ホテル種類区分List */
    export const List: ICodeList[] = [
        { div: 4, name: "キャンプ" },
        { div: 2, name: "ゲストハウス" },
        { div: 0, name: "ホテル" },
        { div: 5, name: "その他" },
        { div: 1, name: "旅館" },
        { div: 3, name: "ユースホステル" },
    ]
}

/**
 * ホテル種類区分名称
 */
export namespace Code.HotelKindDivName {
    export const Camp = "キャンプ";
    export const GuestHouse = "ゲストハウス";
    export const Hotel = "ホテル";
    export const Other = "その他";
    export const Ryokan = "旅館";
    export const YouthHostel = "ユースホステル";
}

/**
 * 論理削除区分
 */
export namespace Code.LogicalDeleteDiv {
    /** 論理削除済み */
    export const LgicalDeleted = 1;
    /** 有効 */
    export const Valid = 0;

    /** 論理削除区分List */
    export const List: ICodeList[] = [
        { div: 1, name: "論理削除済み" },
        { div: 0, name: "有効" },
    ]
}

/**
 * 論理削除区分名称
 */
export namespace Code.LogicalDeleteDivName {
    export const LgicalDeleted = "論理削除済み";
    export const Valid = "有効";
}

/**
 * 食事種類区分
 */
export namespace Code.MealKindDiv {
    /** 朝食 */
    export const BreakFast = 0;
    /** 夜食 */
    export const Dinner = 2;
    /** グルメ */
    export const Gourmet = 3;
    /** 昼食 */
    export const Lunch = 1;
    /** その他 */
    export const Other = 5;
    /** おやつ */
    export const Snack = 4;

    /** 食事種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "朝食" },
        { div: 2, name: "夜食" },
        { div: 3, name: "グルメ" },
        { div: 1, name: "昼食" },
        { div: 5, name: "その他" },
        { div: 4, name: "おやつ" },
    ]
}

/**
 * 食事種類区分名称
 */
export namespace Code.MealKindDivName {
    export const BreakFast = "朝食";
    export const Dinner = "夜食";
    export const Gourmet = "グルメ";
    export const Lunch = "昼食";
    export const Other = "その他";
    export const Snack = "おやつ";
}

/**
 * 移動手段区分
 */
export namespace Code.MoveWayDiv {
    /** 飛行機 */
    export const AirPlane = 9;
    /** バイク */
    export const Bike = 2;
    /** バス */
    export const Bus = 5;
    /** 自転車 */
    export const Bycycle = 1;
    /** 車 */
    export const Car = 3;
    /** フェリー */
    export const Ferry = 11;
    /** 徒歩 */
    export const OnFoot = 0;
    /** その他 */
    export const Other = 12;
    /** 新幹線 */
    export const Shinkansen = 8;
    /** 船 */
    export const Ship = 10;
    /** 寝台列車 */
    export const SleeperTrain = 7;
    /** タクシー */
    export const Taxi = 4;
    /** 電車 */
    export const Train = 6;

    /** 移動手段区分List */
    export const List: ICodeList[] = [
        { div: 9, name: "飛行機" },
        { div: 2, name: "バイク" },
        { div: 5, name: "バス" },
        { div: 1, name: "自転車" },
        { div: 3, name: "車" },
        { div: 11, name: "フェリー" },
        { div: 0, name: "徒歩" },
        { div: 12, name: "その他" },
        { div: 8, name: "新幹線" },
        { div: 10, name: "船" },
        { div: 7, name: "寝台列車" },
        { div: 4, name: "タクシー" },
        { div: 6, name: "電車" },
    ]
}

/**
 * 移動手段区分名称
 */
export namespace Code.MoveWayDivName {
    export const AirPlane = "飛行機";
    export const Bike = "バイク";
    export const Bus = "バス";
    export const Bycycle = "自転車";
    export const Car = "車";
    export const Ferry = "フェリー";
    export const OnFoot = "徒歩";
    export const Other = "その他";
    export const Shinkansen = "新幹線";
    export const Ship = "船";
    export const SleeperTrain = "寝台列車";
    export const Taxi = "タクシー";
    export const Train = "電車";
}

/**
 * 飲食店種類区分
 */
export namespace Code.RestaurantKindDiv {
    /** バー */
    export const Bar = 2;
    /** ビュッフェ */
    export const Buffet = 6;
    /** カフェ */
    export const Cafe = 3;
    /** ファミレス */
    export const FamilyRestaurant = 4;
    /** ファーストフード */
    export const FastFood = 5;
    /** 居酒屋 */
    export const Izakaya = 1;
    /** その他 */
    export const Other = 8;
    /** レストラン */
    export const Restaurant = 0;
    /** バイキング */
    export const Viking = 7;

    /** 飲食店種類区分List */
    export const List: ICodeList[] = [
        { div: 2, name: "バー" },
        { div: 6, name: "ビュッフェ" },
        { div: 3, name: "カフェ" },
        { div: 4, name: "ファミレス" },
        { div: 5, name: "ファーストフード" },
        { div: 1, name: "居酒屋" },
        { div: 8, name: "その他" },
        { div: 0, name: "レストラン" },
        { div: 7, name: "バイキング" },
    ]
}

/**
 * 飲食店種類区分名称
 */
export namespace Code.RestaurantKindDivName {
    export const Bar = "バー";
    export const Buffet = "ビュッフェ";
    export const Cafe = "カフェ";
    export const FamilyRestaurant = "ファミレス";
    export const FastFood = "ファーストフード";
    export const Izakaya = "居酒屋";
    export const Other = "その他";
    export const Restaurant = "レストラン";
    export const Viking = "バイキング";
}
