// -----------------------------------------------------------------------
// 正規表現
export namespace Const.RegularExpr {
  /** 数字 */
  export const Number = '^[0-9０-９]*$';
  /** 半角数字 */
  export const HalfNumber = '^[0-9]*$';
  /** 全角数字 */
  export const FullNumber = '^[０-９]*$';
}

export namespace Const.DateTimeFormat {
  /** ハイフン区切り */
  export const Hyphen = 'YYYY-MM-DD HH:mm:00';
  /** スラッシュ区切り */
  export const Slash = 'YYYY/MM/DD HH:mm:00';
  /** 日本語区切り */
  export const Japan = 'YYYY年MM月DD日 HH:mm:00';
  /** 月/日 */
  export const SlashMonthDay = "MM/DD";
}


// -----------------------------------------------------------------------
// 画面間で使用する共通のリテラル

// 一覧画面のタブインデックス
export namespace Const { 
  export const SELECT_INDEX = 'selectIndex';
}


// -----------------------------------------------------------------------
// 画面間で使用する共通のEnum

// 一覧ページ タブインデックス 列挙値
export enum TabIndex {
  // ルート一覧
  Route = 0,
  // タブ一覧
  Spot,
}