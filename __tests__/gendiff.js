import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

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
      'Should correctly compare two files with the specified output format $format',
      ({ format, expectedOutput }) => {
        const filePath1 = getFixturePath(`file1.${fileFormat}`);
        const filePath2 = getFixturePath(`file2.${fileFormat}`);
        const expected = getExpectedOutput(expectedOutput);

        expect(genDiff(filePath1, filePath2, format)).toBe(expected);
      },
    );

    test('Should correctly compare two files without specifying a format', () => {
      const filePath1 = getFixturePath(`file1.${fileFormat}`);
      const filePath2 = getFixturePath(`file2.${fileFormat}`);
      const expected = getExpectedOutput('expectedStylish.txt');
      expect(genDiff(filePath1, filePath2)).toBe(expected);
    });
  });
});
