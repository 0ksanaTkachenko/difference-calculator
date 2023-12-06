import _ from 'lodash';
import dataParse from './parseData.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = dataParse(filepath1);
  const file2 = dataParse(filepath2);

  const keysArray = _.union(_.keys(file1), _.keys(file2)).sort();
  const resultObject = keysArray.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      acc.push(`    ${key}: ${file1[key]}`);
    } else {
      if (Object.hasOwn(file1, key)) {
        acc.push(`  - ${key}: ${file1[key]}`);
      }
      if (Object.hasOwn(file2, key)) {
        acc.push(`  + ${key}: ${file2[key]}`);
      }
    }
    return acc;
  }, []);

  const resultString = resultObject.join('\n');
  console.log(`{\n${resultString}\n}`);
};

export default genDiff;
