import base from "daisyui/dist/base";
import { useEffect, useState } from "react";
import CurrencyRow from "./components/CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  var myHeaders = new Headers();
  myHeaders.append("apikey", "sqnPZGLIAE3PS5VOozj5lDm8pwnkwspi");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // set firsCurrency to USD
        console.log(data.rates);
        const firstCurrency = Object.keys(data.rates)[
          Object.keys(data.rates).findIndex((x) => x === "USD")
        ];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols${toCurrency}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency]);
        })
        .catch((error) => console.log("error", error));
    }
  }, [fromCurrency, toCurrency]);

  function fromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function toAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="flex flex-col gap-1 m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-4xl mx-auto mb-4">Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={fromAmountChange}
      />
      <div className="font-bold text-2xl text-center">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={toAmountChange}
      />
    </div>
  );
}

export default App;
