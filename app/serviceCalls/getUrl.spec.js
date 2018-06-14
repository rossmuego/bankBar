const getUrl = require('./getUrl');

describe('getUrl', () => {
  test('should return the correct url', () => {
    const accountId = 'abc123';
    const account = 'account';
    const balance = 'balance';
    const pots = 'pots';
    const whoAmI = 'whoAmI';

    expect(getUrl(account, accountId)).toBe('/accounts?account_type=uk_retail');
    expect(getUrl(balance, accountId)).toBe('/balance?account_id=abc123');
    expect(getUrl(pots, accountId)).toBe('/pots');
    expect(getUrl(whoAmI, accountId)).toBe('/ping/whoami');
  });

  test('should throw if something incorrect is passed in', () => {
    const accountId = 'abc123';
    const incorrectValue = 'incorrectValue';
    const undefinedValue = undefined;

    expect(() => getUrl(incorrectValue, accountId)).toThrow();
    expect(() => getUrl(undefinedValue, accountId)).toThrow();
  });
});

