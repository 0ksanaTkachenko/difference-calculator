import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import dataParse from '../src/parseData.js';
import formatter from '../src/formatters/index.js';

const fileReader = (filepath) => {
  const absolutePath = path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath);

  return fs.readFileSync(absolutePath, 'utf8');
};

const objectMaker = (key, value, state) => {
  if (state === 'updated') {
    const [oldValue, newValue] = value;
    return {
      key,
      oldValue,
      newValue,
      state,
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

    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return objectMaker(key, [data1[key], data2[key]], 'updated');
    }

    if (Object.hasOwn(data1, key)) {
      return objectMaker(key, data1[key], 'removed');
    }

    if (Object.hasOwn(data2, key)) {
      return objectMaker(key, data2[key], 'added');
    }
    return '';
  });
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1Content = fileReader(filePath1);
  const file2Content = fileReader(filePath2);

  const file1Format = path.extname(filePath1);
  const file2Format = path.extname(filePath2);

  const parsedData1 = dataParse(file1Content, file1Format);
  const parsedData2 = dataParse(file2Content, file2Format);

  const diffResult = compareData(parsedData1, parsedData2);
  const formatedResult = formatter(diffResult, format);

  console.log(formatedResult);
  return formatedResult;
};

export default genDiff;
