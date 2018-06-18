module.exports = (amount, currency) => {
  const decimalAmount = Number(amount / 100);
  return decimalAmount.toLocaleString(currency, { minimumFractionDigits: 2 });
};
