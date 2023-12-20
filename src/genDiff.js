import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import dataParse from './parseData.js';
import formatter from './formatter.js';

const fileReader = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf8');
};

// Функция для сравнения двух объектов данных

const compareData = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      acc.push({
        key,
        value: compareData(data1[key], data2[key]),
        state: 'nested',
      });
    } else if (_.isEqual(data1[key], data2[key])) {
      acc.push({ key, value: data1[key], state: 'not changed' });
    } else {
      if (Object.hasOwn(data1, key)) {
        acc.push({ key, value: data1[key], state: 'deleted' });
      }
      if (Object.hasOwn(data2, key)) {
        acc.push({ key, value: data2[key], state: 'added' });
      }
    }

    return acc;
  }, []);
};

// Основная функция для генерации различий

const genDiff = (filePath1, filePath2) => {
  const file1Content = fileReader(filePath1);
  const file2Content = fileReader(filePath2);

  const file1Format = path.extname(filePath1);
  const file2Format = path.extname(filePath2);

  const parsedData1 = dataParse(file1Content, file1Format);
  const parsedData2 = dataParse(file2Content, file2Format);

  const diffResult = compareData(parsedData1, parsedData2);
  const formatedResult = formatter(diffResult);

  console.log(formatedResult);
  return formatedResult;
};

export default genDiff;
