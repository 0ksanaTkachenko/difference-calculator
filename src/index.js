import path from 'path';
import fs from 'fs';
import dataParse from './parseData.js';
import formatter from './formatters/index.js';
import compareData from './diffGenerator.js';

const fileReader = (filepath) => {
  const result = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
  return result;
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1Content = fileReader(filePath1);
  const file2Content = fileReader(filePath2);

  const parsedData1 = dataParse(file1Content, path.extname(filePath1).slice(1));
  const parsedData2 = dataParse(file2Content, path.extname(filePath2).slice(1));

  const diffResult = compareData(parsedData1, parsedData2);

  return formatter(diffResult, format);
};

export default genDiff;
