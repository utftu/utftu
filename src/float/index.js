class Float {
  static getCommon(float1, float2) {
    const float1Str = String(float1);
    const float2Str = String(float2);

    const float1Nums = float1Str.includes('.')
      ? float1Str.split('.')[1].length
      : 0;
    const float2Nums = float2Str.includes('.')
      ? float2Str.split('.')[1].length
      : 0;

    const maxLength = Math.max(float1Nums, float2Nums);

    return Math.pow(10, maxLength);
  }

  static add(float1, float2) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common + float2 * common) / common;
  }

  static mul(float1, float2) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common * (float2 * common)) / common / common;
  }

  static sub(float1, float2) {
    const common = Float.getCommon(float1, float2);
    return (float1 * common - float2 * common) / common;
  }

  static div(float1, float2) {
    const common = Float.getCommon(float1, float2);
    return (((float1 * common) / (float2 * common)) * common) / common;
  }
}

export default Float;

// console.log('-----', '', 0.1 * 0.2);
// console.log('-----', '', Float.mul(0.1, 0.2));
// console.log('-----', '', 0.3 - 0.1);
// console.log('-----', '', Float.sub(0.3, 0.1));
