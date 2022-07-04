import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
  changeFromInput: 1,
  currencies: [],
  valueFirstIn: 1,
  currencyFirstIn: 'USD',
  valueSecondIn: 1,
  currencySecondIn: 'UAH',
  isLoading: true,

};

const CHANGE_FROM_INPUT = 'CHANGE_FROM_INPUT';
const GET_CURRENCIES = 'GET_CURRENCIES';
const SET_VALUE_FIRST_INPUT = 'SET_VALUE_FIRST_INPUT';
const SET_CURRENCY_FIRST_INPUT = 'SET_CURRENCY_FIRST_INPUT';
const SET_VALUE_SECOND_INPUT = 'SET_VALUE_SECOND_INPUT';
const SET_CURRENCY_SECOND_INPUT = 'SET_CURRENCY_SECOND_INPUT';
const SET_IS_LOADING = 'SET_IS_LOADING';

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_FROM_INPUT:
      return { ...state, changeFromInput: action.payload };

    case GET_CURRENCIES:
      return { ...state, currencies: action.payload };

    case SET_VALUE_FIRST_INPUT:
      return { ...state, valueFirstIn: action.payload };

    case SET_CURRENCY_FIRST_INPUT:
      return { ...state, currencyFirstIn: action.payload };

    case SET_VALUE_SECOND_INPUT:
      return { ...state, valueSecondIn: action.payload };

    case SET_CURRENCY_SECOND_INPUT:
      return { ...state, currencySecondIn: action.payload };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
  

    default: return state;
  }
};

// Selectors
export const getChangeFromInput = (state) => state.changeFromInput;
export const getCurrencies = (state) => state.currencies;
export const getValueFirstIn = (state) => state.valueFirstIn;
export const getCurrencyFirstIn = (state) => state.currencyFirstIn;
export const getValueSecondIn = (state) => state.valueSecondIn;
export const getCurrencySecondIn = (state) => state.currencySecondIn;
export const getIsLoading = (state) => state.isLoading;


// Creators
export const setChangeFromInpu = (activeInput) => ({ type: CHANGE_FROM_INPUT, payload: activeInput });
export const uploadCurrencies = (currencyArray) => ({ type: GET_CURRENCIES, payload: currencyArray});
export const setValueFirstIn = (amount) => ({ type: SET_VALUE_FIRST_INPUT, payload: amount});
export const setCurrencyFirstIn = (currency) => ({ type: SET_CURRENCY_FIRST_INPUT, payload: currency});
export const setValueSecondtIn = (amount) => ({ type: SET_VALUE_SECOND_INPUT, payload: amount});
export const setCurrencySecondIn = (currency) => ({ type: SET_CURRENCY_SECOND_INPUT, payload: currency});
export const setIsLoading = (boolean) => ({ type: SET_IS_LOADING, payload: boolean});



export const store = createStore(reducer, composeWithDevTools());