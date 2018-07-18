module.exports = (endpoint, accountId) => {
  switch (endpoint) {
    case 'account':
      return '/accounts?account_type=uk_retail';
    case 'balance':
      return `/balance?account_id=${accountId}`;
    case 'transactions':
      return `/transactions?account_id=${accountId}&since=${new Date(new Date().setHours(0, 0, 0, 0)).toISOString()}&expand[]=merchant`;
    case 'pots':
      return '/pots';
    default:
      throw new Error('Incorrect Endpoint');
  }
};
