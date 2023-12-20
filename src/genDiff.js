import _ from 'lodash';
import path from 'path';
import fs from 'fs';
// import util from 'util';
import dataParse from './parseData.js';
import formatter from './formatter.js';

const fileReader = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const genDiff = (filePath1, filePath2) => {
  const readFile1Result = fileReader(filePath1);
  const readFile2Result = fileReader(filePath2);

  const file1Format = path.extname(filePath1);
  const file2Format = path.extname(filePath2);

  const parsedData1 = dataParse(readFile1Result, file1Format);
  const parsedData2 = dataParse(readFile2Result, file2Format);

  const makeCompareFiles = (data1, data2) => {
    const keys = _.union(_.keys(data1), _.keys(data2)).sort();

    return keys.reduce((acc, dataKey) => {
      if (_.isObject(data1[dataKey]) && _.isObject(data2[dataKey])) {
        acc.push({
          key: dataKey,
          value: makeCompareFiles(data1[dataKey], data2[dataKey]),
          state: 'nested',
        });
      } else if (_.isEqual(data1[dataKey], data2[dataKey])) {
        acc.push({ key: dataKey, value: data1[dataKey], state: 'not changed' });
      } else {
        if (Object.hasOwn(data1, dataKey)) {
          acc.push({ key: dataKey, value: data1[dataKey], state: 'deleted' });
        }
        if (Object.hasOwn(data2, dataKey)) {
          acc.push({ key: dataKey, value: data2[dataKey], state: 'added' });
        }
      }

      return acc;
    }, []);
  };

  const gendiffResult = makeCompareFiles(parsedData1, parsedData2);
  const formatedResult = formatter(gendiffResult);

  // console.log(
  //   util.inspect(gendiffResult, { showHidden: false, depth: null, colors: true }),
  // );

  // console.log(
  //   util.inspect(formatedResult, { showHidden: false, depth: null, colors: true }),
  // );

  // console.log(formatedResult);
  return formatedResult;
};

export default genDiff;
