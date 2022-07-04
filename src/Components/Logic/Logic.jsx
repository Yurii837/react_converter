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
  const currencies = useSelector(getCurrencies);
  const valueFirstIn = useSelector(getValueFirstIn);
  const currencyFirstIn = useSelector(getCurrencyFirstIn);
  const valueSecondIn = useSelector(getValueSecondIn);
  const currencySecondIn = useSelector(getCurrencySecondIn);


  const dispatch = useDispatch();


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

    
  const exchangeObj = findExchaneObj(currencies, currencyFirstIn, currencySecondIn);
  // console.log(`Logic.comp`)
  // console.log(exchangeObj)

  const findKoefic = (exchObj, initialCcy) => {
    if (initialCcy === exchObj.ccy) {
      return +exchObj.buy
    } if (initialCcy === exchObj.base_ccy) {
      return +exchObj.sale
    } else {
      return 0
    }
  }

  // console.log(`active input ${activeInput}`)
  useEffect(() => {

    switch(activeInput) {
      case 1: 
        const koef1 = findKoefic(exchangeObj, currencyFirstIn)
        dispatch(setValueSecondtIn(
          +(valueFirstIn / koef1).toFixed(2)
          ))
        // console.log(`1-st formula, equal ${+(valueFirstIn * findKoefic(exchangeObj, currencyFirstIn)).toFixed(2)}`)
        // console.log(`1-st formula, 2-nd value ${valueSecondIn}`)  
        break
      case 2: 
        const koef2 = findKoefic(exchangeObj, currencySecondIn)
        dispatch(setValueFirstIn(
          +(valueSecondIn * koef2).toFixed(2)
          ))
          // console.log(`2-st formula, equal ${+(valueSecondIn / findKoefic(exchangeObj, currencySecondIn)).toFixed(2)}`)
          // console.log(`2-st formula, 1-st value ${valueFirstIn}`)
        break
  
      default: dispatch(valueFirstIn(1))
    }
  },[activeInput, currencyFirstIn, currencySecondIn, valueFirstIn, valueSecondIn])
  

    // console.log(activeInput)
  // console.log(currencies)
  // console.log(valueFirstIn)
  // console.log(currencyFirstIn)
  // console.log(valueSecondIn)
  // console.log(currencySecondIn)
  // console.log(isLoading)

}
