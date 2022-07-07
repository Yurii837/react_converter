import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import './ExchangeType.scss';
import { getExchangeType, setExchangeType } from "../../Components/ReduxStore/Store.jsx";

export const ExchangeType = () => {

  const exchangeType = useSelector(getExchangeType);
  const dispatch = useDispatch();

  return (
      <form className="radio">
        <label className="radio__label">
          <input
            className="radio__input"
            type="radio"
            name="type"
            value="cash"
            checked={exchangeType === 'cash'}
            onChange={(e) => {dispatch(setExchangeType(e.target.value))}}
          />
          <span className="radio__name">Cash exchange</span> 
        </label>
        <label className="radio__label">
          <input
            className="radio__input"
            type="radio"
            name="type"
            value="cashless"
            checked={exchangeType === 'cashless'}
            onChange={(e) => {dispatch(setExchangeType(e.target.value))}}
          />
          <span className="radio__name">Cashless exchange</span> 
        </label>
      </form>
  )
}