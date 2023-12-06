import dataParse from '../src/parseData.js';

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('dataParse', () => {
  expect(dataParse('__fixtures__/file1.json')).toEqual(file1);
});
