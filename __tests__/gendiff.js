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
  const paths = {};
  const expectResult = {};

  beforeEach(() => {
    paths.filePathJson1 = getFixturePath('file1.json');
    paths.filePathJson2 = getFixturePath('file2.json');
    paths.filePathYaml1 = getFixturePath('file1.yaml');
    paths.filePathYaml2 = getFixturePath('file2.yaml');
    paths.filePathYml1 = getFixturePath('file1.yml');
    paths.filePathYml2 = getFixturePath('file2.yml');
    expectResult.expectedStylish = getExpectedOutput('expectedStylish.txt');
    expectResult.expectedPlain = getExpectedOutput('expectedPlain.txt');
    expectResult.expectedJson = getExpectedOutput('expectedJson.txt');
  });

  it('должен корректно сравнивать два файла без указания формата', () => {
    expect(genDiff(paths.filePathJson1, paths.filePathJson2)).toBe(
      expectResult.expectedStylish,
    );
    expect(genDiff(paths.filePathYaml1, paths.filePathYaml2)).toBe(
      expectResult.expectedStylish,
    );
    expect(genDiff(paths.filePathYml1, paths.filePathYml2)).toBe(
      expectResult.expectedStylish,
    );
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода stylish', () => {
    expect(genDiff(paths.filePathJson1, paths.filePathJson2, 'stylish')).toBe(
      expectResult.expectedStylish,
    );
    expect(genDiff(paths.filePathYaml1, paths.filePathYaml2, 'stylish')).toBe(
      expectResult.expectedStylish,
    );
    expect(genDiff(paths.filePathYml1, paths.filePathYml2, 'stylish')).toBe(
      expectResult.expectedStylish,
    );
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода plain', () => {
    expect(genDiff(paths.filePathJson1, paths.filePathJson2, 'plain')).toBe(
      expectResult.expectedPlain,
    );
    expect(genDiff(paths.filePathYaml1, paths.filePathYaml2, 'plain')).toBe(
      expectResult.expectedPlain,
    );
    expect(genDiff(paths.filePathYml1, paths.filePathYml2, 'plain')).toBe(
      expectResult.expectedPlain,
    );
  });

  it('должен корректно сравнивать два файла с указанным форматом вывода json', () => {
    expect(genDiff(paths.filePathJson1, paths.filePathJson2, 'json')).toBe(
      expectResult.expectedJson,
    );
    expect(genDiff(paths.filePathYaml1, paths.filePathYaml2, 'json')).toBe(
      expectResult.expectedJson,
    );
    expect(genDiff(paths.filePathYml1, paths.filePathYml2, 'json')).toBe(
      expectResult.expectedJson,
    );
  });
});
