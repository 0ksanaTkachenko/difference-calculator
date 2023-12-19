import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  const expectedResult =
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

  it('должен корректно сравнивать два плоских JSON-файла', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    expect(genDiff(filePath1, filePath2)).toBe(expectedResult);
  });

  it('должен корректно сравнивать два плоских yaml-файла', () => {
    const filePath1 = getFixturePath('file1.yaml');
    const filePath2 = getFixturePath('file2.yaml');

    expect(genDiff(filePath1, filePath2)).toBe(expectedResult);
  });
});
