module.exports = (endpoint, accountId) => {
  switch (endpoint) {
    case 'account':
      return '/accounts?account_type=uk_retail';
    case 'balance':
      return `/balance?account_id=${accountId}`;
    case 'pots':
      return '/pots';
    case 'whoAmI':
      return '/ping/whoami';
    default:
      throw new Error('Incorrect Endpoint');
  }
};
