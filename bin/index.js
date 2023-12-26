import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import dataParse from '../src/parseData.js';
import formatter from '../src/formatters/index.js';

const fileReader = (filepath) => {
  const result = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
  return result;
};

const objectMaker = (key, value, state) => {
  if (state === 'updated') {
    const [oldValue, newValue] = value;
    return {
      key,
      state,
      oldValue,
      newValue,
    };
  }

  return {
    key,
    state,
    value,
  };
};

const compareData = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return objectMaker(key, compareData(data1[key], data2[key]), 'nested');
    }

    if (_.isEqual(data1[key], data2[key])) {
      return objectMaker(key, data1[key], 'not changed');
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      return objectMaker(key, [data1[key], data2[key]], 'updated');
    }

    if (_.has(data1, key)) {
      return objectMaker(key, data1[key], 'removed');
    }

    return _.has(data1, key)
      ? objectMaker(key, data1[key], 'removed')
      : objectMaker(key, data2[key], 'added');
  });
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1Content = fileReader(filePath1);
  const file2Content = fileReader(filePath2);

  const parsedData1 = dataParse(file1Content, path.extname(filePath1));
  const parsedData2 = dataParse(file2Content, path.extname(filePath2));

  const diffResult = compareData(parsedData1, parsedData2);

  return formatter(diffResult, format);
};

export default genDiff;
