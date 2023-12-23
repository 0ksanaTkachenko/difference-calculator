import _ from 'lodash';

const getSign = (state) => {
  const signs = {
    removed: '- ',
    added: '+ ',
    default: '  ',
  };

  return signs[state] || signs.default;
};

const getIndent = (depth, leftShift = 0) => {
  const indentSize = 4;
  const currIndent = ' '.repeat(depth * indentSize - leftShift);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  return [currIndent, bracketIndent];
};

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const [currIndent, bracketIndent] = getIndent(depth);
  const lines = _.map(
    value,
    (val, key) => `${currIndent}${key}: ${formatValue(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const stylish = (gendiffResult, depth = 1) => {
  const leftShift = 2;
  const [currIndent, bracketIndent] = getIndent(depth, leftShift);

  const formattedResult = _.map(gendiffResult, (item) => {
    if (_.isArray(item.value)) {
      const nestedResult = stylish(item.value, depth + 1);
      return `${currIndent}${getSign(item.state)}${item.key}: ${nestedResult}`;
    }

    if (_.isObject(item.value)) {
      const objectAsArray = _.map(item.value, (val, key) => ({ key, value: val }));
      const nestedResult = stylish(objectAsArray, depth + 1);
      return `${currIndent}${getSign(item.state)}${item.key}: ${nestedResult}`;
    }

    if (item.state === 'updated') {
      const oldFormatVal = formatValue(item.oldValue, depth + 1);
      const newFormatVal = formatValue(item.newValue, depth + 1);
      const oldValue = `${currIndent}${getSign('removed')}${item.key}: ${oldFormatVal}`;
      const newValue = `${currIndent}${getSign('added')}${item.key}: ${newFormatVal}`;
      return `${oldValue}\n${newValue}`;
    }

    const formatItemVal = formatValue(item.value, depth + 1);
    return `${currIndent}${getSign(item.state)}${item.key}: ${formatItemVal}`;
  });

  return `{\n${formattedResult.join('\n')}\n${bracketIndent}}`;
};

export default stylish;
