import { ICodeList } from '../model/code-list';

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
    export const Other =  5;
    
    /** 食事種類区分List */
    export const List: ICodeList[] = [
        { div: 0, name: "朝食" },
        { div: 1, name: "昼食" },
        { div: 2, name: "夜食" },
        { div: 3, name: "グルメ" },
        { div: 4, name: "おやつ" },
        { div: 5, name: "その他" }
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