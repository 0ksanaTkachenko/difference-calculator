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

describe('genDiff', () => {
  const filePathJson1 = getFixturePath('file1.json');
  const filePathJson2 = getFixturePath('file2.json');
  const filePathYaml1 = getFixturePath('file1.yaml');
  const filePathYaml2 = getFixturePath('file2.yaml');
  const filePathYml1 = getFixturePath('file1.yml');
  const filePathYml2 = getFixturePath('file2.yml');
  const expectedStylish = getExpectedOutput('expectedStylish.txt');
  const expectedPlain = getExpectedOutput('expectedPlain.txt');
  const expectedJson = getExpectedOutput('expectedJson.txt');

  it('должен корректно сравнивать два файла без указания формата', () => {
    expect(genDiff(filePathJson1, filePathJson2)).toBe(expectedStylish);
    expect(genDiff(filePathYaml1, filePathYaml2)).toBe(expectedStylish);
    expect(genDiff(filePathYml1, filePathYml2)).toBe(expectedStylish);
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода stylish', () => {
    expect(genDiff(filePathJson1, filePathJson2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(filePathYaml1, filePathYaml2, 'stylish')).toBe(expectedStylish);
    expect(genDiff(filePathYml1, filePathYml2, 'stylish')).toBe(expectedStylish);
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода plain', () => {
    expect(genDiff(filePathJson1, filePathJson2, 'plain')).toBe(expectedPlain);
    expect(genDiff(filePathYaml1, filePathYaml2, 'plain')).toBe(expectedPlain);
    expect(genDiff(filePathYml1, filePathYml2, 'plain')).toBe(expectedPlain);
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода json', () => {
    expect(genDiff(filePathJson1, filePathJson2, 'json')).toBe(expectedJson);
    expect(genDiff(filePathYaml1, filePathYaml2, 'json')).toBe(expectedJson);
    expect(genDiff(filePathYml1, filePathYml2, 'json')).toBe(expectedJson);
  });
});
