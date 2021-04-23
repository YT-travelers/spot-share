/**
 * アクティビティ
 */
export interface IActivity {
  /** アクティビティID */
  activityId?: number;
  /** アクティビティ名称 */
  activityName?: string;
  /** 営業開始時間 */
  activityOpenTime?: string;
  /** 営業終了時間 */
  activityEndTime?: string;
  /** 概要 */
  activitySummary?: string;
  /** 住所 */
  activityAddress?: string;
  /** URL */
  activityUrl?: string;
}