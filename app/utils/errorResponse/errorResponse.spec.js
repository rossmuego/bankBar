const errorResponse = require('./errorResponse');

describe('errorResponse', () => {
  test('should return if the response code is 400', () => {
    const response = { status: 400 };
    const response2 = { status: '400' };

    expect(errorResponse(response)).toBeTruthy();
    expect(errorResponse(response2)).toBeTruthy();
  });

  test('should return if the response code is above 400', () => {
    const response = { status: 401 };
    const response2 = { status: '401' };

    expect(errorResponse(response)).toBeTruthy();
    expect(errorResponse(response2)).toBeTruthy();
  });

  test('should not return if the response code is below 400', () => {
    const response = { status: 399 };
    const response2 = { status: '399' };

    expect(errorResponse(response)).toBeFalsy();
    expect(errorResponse(response2)).toBeFalsy();
  });
});
