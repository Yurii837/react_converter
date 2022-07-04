import { useSelector, useDispatch } from "react-redux/es/exports";
import { GetEndpoint } from "./Components/Api/Api";
import { useEffect } from "react";
import { Oval } from  'react-loader-spinner';
import './App.scss';
import { Header } from './Components/Header/Header';
import { CurrencyInput } from './Components/CurrencyInput/CurrencyInput';
import { Hint } from './Components/Hint/Hint';
import { ExchangeType } from './Components/ExchangeType/ExchangeType';
import { Logic } from './Components/Logic/Logic';
import { uploadCurrencies, setIsLoading, getIsLoading } from "./Components/ReduxStore/Store";


function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading)

  const GetCurrencies = async() => {
    try {
      const currencies = await GetEndpoint();
      dispatch(setIsLoading(false));
      dispatch(uploadCurrencies(currencies))
    } catch (error) {
      alert(error)
    }
  }
  
  useEffect(() => {
  GetCurrencies()
  }, []);

  return (
    <>
    {!isLoading && <Logic />}
    <div className='page'>
    {isLoading 
      ? <Oval
        className="loader"
        ariaLabel="loading-indicator"
        height={48}
        width={48}
        strokeWidth={3}
        // strokeWidthSecondary={1}
        color="white"
        secondaryColor='blue'
      />
      : <Header />
    }
      
      <CurrencyInput inpNumb={1}/>
      <Hint />
      <CurrencyInput inpNumb={2}/>
      <ExchangeType />
    </div>
    </>
    
  );
}

export default App;
