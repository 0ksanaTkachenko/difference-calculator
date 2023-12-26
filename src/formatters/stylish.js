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
  const [currIndent, bracketIndent] = getIndent(depth, 2);

  const formattedResult = _.map(gendiffResult, (item) => {
    if (item.state === 'nested') {
      const children = item.value;
      const nestedResult = stylish(children, depth + 1);
      return `${currIndent}${getSign(item.state)}${item.key}: ${nestedResult}`;
    }

    if (item.state === 'updated') {
      const formattedOldValue = `${currIndent}${getSign('removed')}${
        item.key
      }: ${formatValue(item.oldValue, depth + 1)}`;
      const formattedNewValue = `${currIndent}${getSign('added')}${
        item.key
      }: ${formatValue(item.newValue, depth + 1)}`;
      return `${formattedOldValue}\n${formattedNewValue}`;
    }

    return `${currIndent}${getSign(item.state)}${item.key}: ${formatValue(
      item.value,
      depth + 1,
    )}`;
  });

  return `{\n${formattedResult.join('\n')}\n${bracketIndent}}`;
};

export default stylish;
