export default class TaxRateBreakdown {
  data;
  constructor(data) {
    this.data = data;
  }
  getCountrys() {
    return Object.keys(this.data);
  }
  hasYear(country, year) {
    return this.data[country][year];
  }
  getCountryYears(country) {
    return Object.keys(this.data[country]);
  }
  getBrackets(country, year) {
    return Object.keys(this.data[country][year]);
  }
  getRate(country, year, bracket) {
    return this.data[country][year][bracket];
  }
}
