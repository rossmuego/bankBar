module.exports = (amount, currency) => {
  const positiveAmount = Number(amount * -1).toFixed(2);
  return positiveAmount.toLocaleString(currency);
};
