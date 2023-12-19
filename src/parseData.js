import yaml from 'js-yaml';

const dataParse = (readFileResult, fileExt) => {
  if (fileExt === '.json') {
    return JSON.parse(readFileResult);
  }

  if (fileExt === '.yaml' || fileExt === '.yml') {
    return yaml.load(readFileResult);
  }

  return null;
};

export default dataParse;
