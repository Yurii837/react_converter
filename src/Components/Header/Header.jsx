import React from "react";
import { useSelector } from "react-redux";
import { getCurrencies } from "../ReduxStore/Store";
import './Header.scss';

export const Header = () => {

  const currencies = useSelector(getCurrencies);

  return (
    <div className="header">
      <h2 className="header__title">{`${currencies[0].base_ccy} exchange rates`}</h2>
    {currencies.map(currency => {
      return (
        <div key={currency.buy}>
          <h2 className="header__currency">{currency.ccy}</h2>
          <h2 className="header__rate">{currency.sale}</h2>
        </div>
      )
    })}
    </div>
  );
};
