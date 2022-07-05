import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";

import { 
  getChangeFromInput,
  getCurrencies,
  getValueFirstIn,
  getCurrencyFirstIn,
  getValueSecondIn,
  getCurrencySecondIn,

  setValueSecondtIn,
  setValueFirstIn,
  } from "../ReduxStore/Store";

export const Logic = () => {

  const activeInput = useSelector(getChangeFromInput);
  const Currencies = useSelector(getCurrencies);
  const valueFirstIn = useSelector(getValueFirstIn);
  const currencyFirstIn = useSelector(getCurrencyFirstIn);
  const valueSecondIn = useSelector(getValueSecondIn);
  const currencySecondIn = useSelector(getCurrencySecondIn);


  const dispatch = useDispatch();

  const currenciesWithImplisitlyExchangeObj = (currencies) => {
    const adittionalExchArray = [];
    currencies.forEach((e, i, arr) => {
      const isExist = arr.some(el => el.base_ccy === e.ccy && el.ccy === arr[i+1].ccy);
      !isExist && i < arr.length - 1 && adittionalExchArray.push({
        ccy: e.ccy,
        base_ccy: arr[i+1].ccy,
        buy: (e.buy / arr[i+1].buy).toFixed(4),
        sale: (e.sale / arr[i+1].sale).toFixed(4),
      })
    })
    return currencies.concat(adittionalExchArray);
  }

  const preparedCurrencies = currenciesWithImplisitlyExchangeObj(Currencies);


  const findExchaneObj = (currencies, currFirst, currSecond) => {
    if (currFirst === currSecond) {
      return {
        ccy: currFirst, 
        base_ccy: currSecond,
        buy: 1,
        sale: 1,
      }
    }
    return currencies.find(currency => {
      const isFindInInitialOrder = currency.ccy === currFirst && currency.base_ccy === currSecond;
      const isFindInReverseOrder = currency.ccy === currSecond && currency.base_ccy === currFirst;
      return isFindInInitialOrder || isFindInReverseOrder
    })
  }
    
  const exchangeObj = findExchaneObj(preparedCurrencies, currencyFirstIn, currencySecondIn);

  const findKoefic = (exchObj, initialCcy) => {
    if (initialCcy === exchObj.ccy) {
      return +exchObj.buy
    } if (initialCcy === exchObj.base_ccy) {
      return +exchObj.sale
    } else {
      return 0
    }
  }

  const dependentValue = (exchObj, koef, value, currentCurrencyType, oppositeCurrencyType) => {
    if (currentCurrencyType === exchObj.ccy && oppositeCurrencyType === exchObj.base_ccy) {
      return +(value / koef).toFixed(2);
    } else {
      return +(value * koef).toFixed(2);
    }
  }

  useEffect(() => {

    switch(activeInput) {
      case 1: 
        const koef1 = findKoefic(exchangeObj, currencyFirstIn)
        dispatch(setValueSecondtIn(
          dependentValue(exchangeObj, koef1, valueFirstIn, currencySecondIn, currencyFirstIn)
          ))
        break
      case 2: 
        const koef2 = findKoefic(exchangeObj, currencySecondIn)
        dispatch(setValueFirstIn(
          dependentValue(exchangeObj, koef2, valueSecondIn, currencyFirstIn, currencySecondIn)
          ))
        break
  
      default: dispatch(valueFirstIn(1))
    }
  },[activeInput, currencyFirstIn, currencySecondIn, valueFirstIn, valueSecondIn])
}
