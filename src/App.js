import React, {useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=7c5b72f62efad96ce822c19044321e2d'; 

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState() 
  const [amount,setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount*exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
 

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

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

 function handleFromAmountChange(e) {
   setAmount(e.target.value)
   setAmountInFromCurrency(true)
 }

 function handleToAmountChange(e) {
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}
  
  return (
      <>
        <h1> Currency Converter </h1>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency} 
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        onChangeAmount = {handleFromAmountChange}
        amount={fromAmount}
         />
        <div className="equals"> = </div>
        <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        onChangeAmount = {handleToAmountChange}
        amount={toAmount}
        />
      </>
    
  );
}

export default App;


