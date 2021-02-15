import * as bson from './index';

test('stringifies string, boolean and number and ignores anything else', () => {
  const obj = {
    str: 'asd',
    num: 123,
    bool: true,
    obj: {},
    arr: [],
  };
  const got = bson.stringify(obj);

  expect(got).toEqual('\\str\\asd\\num\\123\\bool\\true');
});
