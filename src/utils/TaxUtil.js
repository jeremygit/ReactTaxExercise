export default class TaxUtil {
  static formatPrice(price) {
    return Math.round(price).toLocaleString();
  }
  static formatDecimalPrice(price) {
    return Math.round(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  static formatBracket(lower, upper) {
    return `$${TaxUtil.formatPrice(lower)}${
      upper ? ` - $${TaxUtil.formatPrice(upper - 1)}` : '+'
    }`;
  }
}
