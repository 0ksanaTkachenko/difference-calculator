import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormat from './json.js';

const formatter = (gendiffResult, format) => {
  if (format === 'stylish') {
    return stylish(gendiffResult);
  }

  if (format === 'plain') {
    return plain(gendiffResult);
  }

  if (format === 'json') {
    return jsonFormat(gendiffResult);
  }

  return '';
};

export default formatter;
