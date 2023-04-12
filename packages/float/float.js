export class Float {
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
    return (float1 * common) / (float2 * common);
  }
}

export function floatAdd(float1, float2) {
  return Float.add(float1, float2);
}

export function floatSub(float1, float2) {
  return Float.sub(float1, float2);
}

export function floatMul(float1, float2) {
  return Float.mul(float1, float2);
}

export function floatDiv(float1, float2) {
  return Float.div(float1, float2);
}
