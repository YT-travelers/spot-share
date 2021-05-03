/**
 * アクティビティ
 */
export interface IActivity {
  /** アクティビティID */
  activityId?: number;
  /** アクティビティ名称 */
  activityName?: string;
  /** 営業開始時間（時） */
  activityOpenTimeHours?: string;
  /** 営業開始時間（分） */
  activityOpenTimeMinutes?: string;
  /** 営業終了時間（時） */
  activityCloseTimeHours?: string;
  /** 営業終了時間（分） */
  activityCloseTimeMinutes?: string;
  /** 概要 */
  activitySummary?: string;
  /** 住所 */
  activityAddress?: string;
  /** URL */
  activityUrl?: string;
}