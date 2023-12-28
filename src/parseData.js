import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const dataParse = (readFileResult, fileExt) => {
  const parser = parsers[fileExt];
  return parser(readFileResult);
};

export default dataParse;
