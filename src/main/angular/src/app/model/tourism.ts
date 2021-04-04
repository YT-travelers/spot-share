import { ICountry } from "./country";

/**
 * スポット
 */
export interface ITourism {
  /** スポットID */
  tourismId?: number;
  /**  スポット名称 */
  tourismName?: string;
  /** 国 */
  country?: ICountry;
  /** 画像パス */
  imagePaths?: string[];
  /** url */
  url?: string;
  /** メモ */
  memo?: string;
  /** 費用（予算） */
  costExpectation?: number;
  /** 所要時間（時） */
  requiredHours?: number;
  /** 所要時間（分） */
  requiredMinutes?: number;
}