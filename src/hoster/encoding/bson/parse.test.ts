import * as bson from './';
describe('parses with schema', () => {
  test.each([
    ['boolean', '\\field\\true', { field: bson.Boolean }, { field: true }],
    ['string', '\\field\\asd', { field: bson.String }, { field: 'asd' }],
    ['number', '\\field\\123', { field: bson.Number }, { field: 123 }],
  ])('%s type value', (_, bsonStr, schema, want) => {
    const got = bson.parse(bsonStr, schema);

    expect(got).toEqual(want);
  });

  test('ignoring excess fields', () => {
    const bsonStr = '\\field\\asd\\excessField\\asd';
    const schema = { field: bson.String };

    const got = bson.parse(bsonStr, schema);

    expect(got).toEqual({ field: 'asd' });
  });
});

test('parses without schema', () => {
  const bsonStr = '\\field1\\val1\\field2\\val2';
  const res = bson.parse(bsonStr);

  expect(res).toEqual({ field1: 'val1', field2: 'val2' });
});

test('throws error if bson string doesnt starts with a backslash', () => {
  const bsonStr = 'field\\asd\\';
  try {
    bson.parse(bsonStr);
  } catch (e) {
    expect(e).toBeInstanceOf(bson.NotStartWithBackslashError);
  }
});

test('throws error if bson string contains odd number of backslashes', () => {
  const bsonStr = '\\field\\asd\\';
  try {
    bson.parse(bsonStr);
  } catch (e) {
    expect(e).toBeInstanceOf(bson.NumberOfBackslashesIsNotEvenError);
  }
});
