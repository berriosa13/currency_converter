import React, {useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=7c5b72f62efad96ce822c19044321e2d'; 

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCuurrency, setFromCurrency] = useState()
  const [toCuurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState() 
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  /*
  useEffect reads in an empty array as second parameter
  so that useEffect() is only ran once when the app loads
  */ 
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  },[])
  
  return (
      <>
        <h1> Currency Converter </h1>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCuurrency} 
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
         />
        <div className="equals"> = </div>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCuurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        />
      </>
    
  );
}

export default App;