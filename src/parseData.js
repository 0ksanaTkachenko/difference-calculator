import fs from 'fs';
import path from 'path';

const dataParse = (filepath) => {
  const absolutePathFile = path.resolve(process.cwd(), filepath);
  return JSON.parse(fs.readFileSync(absolutePathFile, 'utf8'));
};

export default dataParse;
