module.exports = (amount, currency) => {
  const decimalAmount = Number((amount / 100).toFixed(2));
  return decimalAmount.toLocaleString(currency);
};
