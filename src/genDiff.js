import dataParse from './parseData.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const file1 = dataParse(filepath1);
  const file2 = dataParse(filepath2);

  const keysArray = _.union(_.keys(file1), _.keys(file2)).sort();
  const result = keysArray
    .reduce((acc, key) => {
      if (file1[key] === file2[key]) {
        acc.push(`    ${key}: ${file1[key]}`);
      } else {
        if (file1.hasOwnProperty(key)) {
          acc.push(`  - ${key}: ${file1[key]}`);
        }
        if (file2.hasOwnProperty(key)) {
          acc.push(`  + ${key}: ${file2[key]}`);
        }
      }
      return acc;
    }, [])
    .join('\n');

  console.log(`{\n${result}\n}`);
};

export default genDiff;
