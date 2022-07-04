import React from "react";
import { useSelector } from "react-redux";
import { getCurrencies } from "../ReduxStore/Store";

export const Header = () => {

  const currencies = useSelector(getCurrencies)

  return (
    <div className="header">
    {currencies.map(currency => {
      return (
        <div key={currency.buy}>
          <h2>{currency.ccy}</h2>
          <h2>{currency.buy}</h2>
        </div>
      )
    })}

    </div>
  )
}