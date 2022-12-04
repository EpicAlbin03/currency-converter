import React from "react";

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <div className="relative rounded-md shadow-sm w-64">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="number"
        name="price"
        id="price"
        value={amount}
        onChange={onChangeAmount}
        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
        placeholder="0.00"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={selectedCurrency}
          onChange={onChangeCurrency}
          className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-secondary focus:ring-secondary sm:text-sm"
        >
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyRow;
