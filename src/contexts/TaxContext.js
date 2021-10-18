import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';

import TaxRatesData from '../data/TaxRatesData';

const MAX = Math.max;
const MIN = Math.min;

const DEFAULT_COUNTRY = TaxRatesData.getCountrys()[0];
const DEFAULT_YEAR = TaxRatesData.getCountryYears(DEFAULT_COUNTRY)[0];
const DEFAULT_INCOME = 70000;

export const TaxContext = createContext();

export default function TaxContextProvider({ children }) {
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  const TaxCountrys = useMemo(() => {
    return TaxRatesData.getCountrys();
  }, []);

  const TaxYears = useMemo(() => {
    return TaxRatesData.getCountryYears(country);
  }, [country]);

  const updateIncome = useCallback(i => {
    try {
      validateIncome(i);
      setIncome(i);
    } catch (err) {
      setIncome(0);
    }
  });

  const updateYear = useCallback(y => {
    setYear(y);
  });

  const updateCountry = useCallback(c => {
    setCountry(c);
  });

  const taxBreakdown = useMemo(() => {
    let data = {};
    if (TaxRatesData.hasYear(country, year)) {
      const taxBrackets = TaxRatesData.getBrackets(country, year);
      for (let i = 0; i < taxBrackets.length; i++) {
        const lower = taxBrackets[i];
        const upper = taxBrackets[i + 1] || Infinity;
        const rate = TaxRatesData.getRate(country, year, lower);
        const tax = rate * MAX(0, MIN(income - (lower - 1), upper - lower));
        data[lower] = tax;
      }
    }
    return data;
  }, [country, year, income]);

  const taxBreakdownTotal = useMemo(() => {
    let total = 0;
    for (let key in taxBreakdown) {
      total += taxBreakdown[key];
    }
    return total;
  }, [taxBreakdown]);

  useEffect(() => {
    updateYear(TaxRatesData.getCountryYears(country)[0]);
  }, [country]);

  const validateIncome = i => {
    if (i.trim() === '' || Number.isNaN(Number(i))) {
      throw new Error('Invalid income');
    }
  };

  return (
    <TaxContext.Provider
      value={{
        TaxCountrys,
        TaxYears,
        updateIncome,
        updateYear,
        updateCountry,
        income,
        year,
        country,
        taxBreakdown,
        taxBreakdownTotal
      }}
    >
      {children}
    </TaxContext.Provider>
  );
}
