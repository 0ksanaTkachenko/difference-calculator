const getSign = (state) => {
  if (state === 'deleted') {
    return '- ';
  }

  if (state === 'added') {
    return '+ ';
  }

  if (state === 'not changed') {
    return '  ';
  }
  return '';
};

const spaces = '  ';

const formatter = (gendiffResult) => {
  const data = gendiffResult
    .map((item) => `${spaces}${getSign(item.state)}${item.key}: ${item.value}`)
    .join('\n');

  return `{\n${data}\n}`;
};

export default formatter;
