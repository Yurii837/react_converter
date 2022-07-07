import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import './CurrencyInput.scss';
import arrow from '../../Images/Arrow-Down-Transparent-Images-PNG.png';

import { 
  getCurrencies,
  getValueFirstIn,
  getCurrencyFirstIn,
  getValueSecondIn,
  getCurrencySecondIn,

  setValueFirstIn,
  setCurrencyFirstIn,
  setValueSecondtIn,
  setCurrencySecondIn,
  setChangeFromInpu,
  } from "../ReduxStore/Store";

export const CurrencyInput = ({inpNumb}) => {

  const dispatch = useDispatch();

  const currencies = useSelector(getCurrencies);
  const valueFirstIn = useSelector(getValueFirstIn);
  const currencyFirstIn = useSelector(getCurrencyFirstIn);
  const valueSecondIn = useSelector(getValueSecondIn);
  const currencySecondIn = useSelector(getCurrencySecondIn);

  const value = () => {
    if (inpNumb === 1) {
      return valueFirstIn
    } else {
      return valueSecondIn
    };
  };

  const setValue = (value) => {
    dispatch(setChangeFromInpu(inpNumb))
    if (inpNumb === 1) {
      return dispatch(setValueFirstIn(value))
    } else {
      return dispatch(setValueSecondtIn(value))
    };
  };

  const currency = () => {
    if (inpNumb === 1) {
      return currencyFirstIn
    } else {
      return currencySecondIn
    };
  };

  const setCurrency = (currType) => {
    dispatch(setChangeFromInpu(inpNumb))
    if (inpNumb === 1) {
      return dispatch(setCurrencyFirstIn(currType))
    } else {
      return dispatch(setCurrencySecondIn(currType))
    };
  };

  const baseCcy = currencies.length > 0 
    ? currencies[1].base_ccy
    : 'UAH';

  const setCorrectValue = (s) => {
      const rgx = /^[0-9]*\.?[0-9]*$/;
      s.match(rgx) && setValue(s.match(rgx)[0]);
  };

  return (
    <div className="bar">
      <input 
        className="bar__input"
        type="text" 
        value={value()}
        onChange={(e) => setCorrectValue(e.target.value)}
      />
      <select 
        style={{backgroundImage: `url(${arrow})`}}
        className="bar__select"
        value={currency()} 
        onChange={(e) => {setCurrency(e.target.value)}}
      >
        <option value={baseCcy}>{baseCcy}</option>
        {currencies.map(currency => {
          return <option key={currency.buy} value={currency.ccy}>{currency.ccy}</option>
        })}
      </select>
    </div>
  );
};
