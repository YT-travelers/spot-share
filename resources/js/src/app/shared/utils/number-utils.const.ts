/**
 * 数字ユーティリティ
 */
export class NumberUtils {
  /**
   * 全角数字を半角数字に変換します。
   * @param value 数字
   * @returns 半角数字
   */
  static convNumberFulltoHalf(value: string): string {
    if (!value) {
      return "0";
    }

    return value.replace(/[０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

}
