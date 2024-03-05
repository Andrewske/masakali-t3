export const formatCurrency = (value: number, currency: string) => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  };

  // Check if the currency is IDR and adjust the fraction digits accordingly
  if (currency === 'IDR') {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  }

  return new Intl.NumberFormat('en-US', options).format(value);
};
