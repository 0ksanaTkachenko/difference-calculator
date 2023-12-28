import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../bin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const getExpectedOutput = (filename) => {
  const outputPath = getFixturePath(filename);
  return fs.readFileSync(outputPath, 'utf-8');
};

const fileFormats = ['json', 'yaml', 'yml'];

const outputFormats = [
  { format: 'stylish', expectedOutput: 'expectedStylish.txt' },
  { format: 'plain', expectedOutput: 'expectedPlain.txt' },
  { format: 'json', expectedOutput: 'expectedJson.txt' },
];

fileFormats.forEach((fileFormat) => {
  describe(`genDiff tests for ${fileFormat} files`, () => {
    test.each(outputFormats)(
      `должен корректно сравнивать два файла с указанным форматом вывода $format`,
      ({ format, expectedOutput }) => {
        const filePath1 = getFixturePath(`file1.${fileFormat}`);
        const filePath2 = getFixturePath(`file2.${fileFormat}`);
        const expected = getExpectedOutput(expectedOutput);

        expect(genDiff(filePath1, filePath2, format)).toBe(expected);
      },
    );

    test('должен корректно сравнивать два файла без указания формата', () => {
      const filePath1 = getFixturePath(`file1.${fileFormat}`);
      const filePath2 = getFixturePath(`file2.${fileFormat}`);
      const expected = getExpectedOutput('expectedStylish.txt');
      expect(genDiff(filePath1, filePath2)).toBe(expected);
    });
  });
});
