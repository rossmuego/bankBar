const formatCurrency = require('./formatCurrency');

describe('formatCurrency', () => {
  test('should format a zero balance to correct amount', () => {
    const currency = 'en-gb';
    const balance = '0';

    expect(formatCurrency(balance, currency)).toBe('0.00');
  });

  test('should format the positive balance to correct amount', () => {
    const currency = 'en-gb';
    const balance1 = '1';
    const balance2 = '12';
    const balance3 = '123';
    const balance4 = '1234';
    const balance5 = '12345';
    const balance6 = '123450';

    expect(formatCurrency(balance1, currency)).toBe('0.01');
    expect(formatCurrency(balance2, currency)).toBe('0.12');
    expect(formatCurrency(balance3, currency)).toBe('1.23');
    expect(formatCurrency(balance4, currency)).toBe('12.34');
    expect(formatCurrency(balance5, currency)).toBe('123.45');
    expect(formatCurrency(balance6, currency)).toBe('1,234.50');
  });

  test('should format the negative balance to correct amount', () => {
    const currency = 'en-gb';
    const balance1 = '-1';
    const balance2 = '-12';
    const balance3 = '-123';
    const balance4 = '-1234';
    const balance5 = '-12345';
    const balance6 = '-123450';

    expect(formatCurrency(balance1, currency)).toBe('-0.01');
    expect(formatCurrency(balance2, currency)).toBe('-0.12');
    expect(formatCurrency(balance3, currency)).toBe('-1.23');
    expect(formatCurrency(balance4, currency)).toBe('-12.34');
    expect(formatCurrency(balance5, currency)).toBe('-123.45');
    expect(formatCurrency(balance6, currency)).toBe('-1,234.50');
  });
});
