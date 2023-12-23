import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (gendiffResult, format) => {
  if (format === 'stylish') {
    return stylish(gendiffResult);
  }

  if (format === 'plain') {
    return plain(gendiffResult);
  }

  return '';
};

export default formatter;
