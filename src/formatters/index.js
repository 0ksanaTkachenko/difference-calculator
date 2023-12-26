import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatter = (gendiffResult, format) => {
  const formatFunction = formatters[format];
  return formatFunction(gendiffResult);
};

export default formatter;
