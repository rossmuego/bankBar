const convertToPositive = require('./convertToPositive');

describe('convertToPositive should format the value negative value to a positive', () => {
  test('should convert the negative value to a positive value', () => {
    const currency = 'en-gb';
    const balance = '-10';
    const balance2 = '-1.65';
    const balance3 = '-1.3';

    expect(convertToPositive(balance, currency)).toBe('10.00');
    expect(convertToPositive(balance2, currency)).toBe('1.65');
    expect(convertToPositive(balance3, currency)).toBe('1.30');
  });

  test('shouldn\t do anything if the value is 0', () => {
    const currency = 'en-gb';
    const balance = '0';

    expect(convertToPositive(balance, currency)).toBe('0.00');
  });
});
