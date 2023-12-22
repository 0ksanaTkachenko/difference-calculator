import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const getExpectedOutput = (filename) => {
  const outputPath = getFixturePath(filename);
  return fs.readFileSync(outputPath, 'utf-8');
};

describe('genDiff', () => {
  const expectedOutput = getExpectedOutput('expectedOutput.txt');

  it('должен корректно сравнивать два JSON-файла', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    expect(genDiff(filePath1, filePath2)).toBe(expectedOutput);
  });

  it('должен корректно сравнивать два yaml-файла', () => {
    const filePath1 = getFixturePath('file1.yaml');
    const filePath2 = getFixturePath('file2.yaml');

    expect(genDiff(filePath1, filePath2)).toBe(expectedOutput);
  });
});
