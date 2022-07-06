import React from "react";
import { useSelector } from "react-redux/es/exports";
import { getChangeFromInput } from "../ReduxStore/Store";
import './Hint.scss';
import classNames from "classnames";

export const Hint = () => {

  const direction = useSelector(getChangeFromInput)

  return (
    <>
    <div className="hint">
      <div className={classNames('hint__icon', {open: direction === 2})}>
        <span className="left-bar"></span>
        <span className="right-bar"></span>
      </div>
      <h2 className="hint__title">You can buy</h2>
    </div>
      
    
    </>
    
  )
}