export class Float {
  static getMaxFloatLength(float1: number, float2: number) {
    const float1Str = String(float1);
    const float2Str = String(float2);

    const float1Nums = float1Str.includes('.')
      ? float1Str.split('.')[1].length
      : 0;
    const float2Nums = float2Str.includes('.')
      ? float2Str.split('.')[1].length
      : 0;

    return Math.max(float1Nums, float2Nums);
  }

  static getCommon(float1: number, float2: number) {
    const maxLength = Float.getMaxFloatLength(float1, float2);

    return Math.pow(10, maxLength);
  }

  static add(float1: number, float2: number) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common + float2 * common) / common;
  }

  static mul(float1: number, float2: number) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common * (float2 * common)) / common / common;
  }

  static sub(float1: number, float2: number) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common - float2 * common) / common;
  }

  static div(float1: number, float2: number) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common) / (float2 * common);
  }
}
