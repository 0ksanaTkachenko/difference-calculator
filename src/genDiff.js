import _ from 'lodash';
import path from 'path';
import fs from 'fs';
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

  const keys = _.union(_.keys(parsedData1), _.keys(parsedData2)).sort();

  const gendiffResult = keys.reduce((acc, dataKey) => {
    if (parsedData1[dataKey] === parsedData2[dataKey]) {
      acc.push({ key: dataKey, value: parsedData1[dataKey], state: 'not changed' });
    } else {
      if (Object.hasOwn(parsedData1, dataKey)) {
        acc.push({ key: dataKey, value: parsedData1[dataKey], state: 'deleted' });
      }
      if (Object.hasOwn(parsedData2, dataKey)) {
        acc.push({ key: dataKey, value: parsedData2[dataKey], state: 'added' });
      }
    }
    return acc;
  }, []);

  const formatedResult = formatter(gendiffResult);

  console.log(formatedResult);
  return formatedResult;
};

export default genDiff;
