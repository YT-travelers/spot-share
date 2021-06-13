import { NumberUtils } from 'src/app/shared/utils/number-utils.const';
import { Const } from 'src/app/shared/const/const.const';

/**
 * 数時間ユーティリティ
 */
 export class TimeUtils {
  /**
   * 「分」の入力値を補完します。
   * ・数字以外の場合、'0'を返却
   * ・全角の場合、半角に変換
   * ・59より大きい数字の場合は、59に変換
   * @param value 入力値（分）
   * @returns 変換後の値
   */
   static complementMinutes(value: string): string {
      // 「数字」以外の場合、'0'を返却
      const match = new RegExp(Const.RegularExpr.HalfNumber);
      if (!match.test(value)) {
        return '0';
      }

      // 全角数字を半角数字に変換
      value = NumberUtils.convNumberFulltoHalf(value);

      // 59(分)より高い値の場合は 59(分)に変換
      const maxMinutes = 59;
      if (Number(value) > maxMinutes ) {
        return maxMinutes.toString();
      } else {
        return value;
      }
    }

}
  