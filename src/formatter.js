import _ from 'lodash';

const getSign = (state) => {
  const signs = {
    deleted: '- ',
    added: '+ ',
  };

  return signs[state] || '  ';
};

const stylish = (gendiffResult, nestingLevel = 1) => {
  const indentSize = 4;
  const leftShift = 2;
  const beginningSpaces = ' '.repeat(nestingLevel * indentSize - leftShift);
  const spacesСlosingIndent = ' '.repeat((nestingLevel - 1) * indentSize);

  const formattedResult = _.map(gendiffResult, (item) => {
    if (_.isArray(item.value)) {
      const nestedResult = stylish(item.value, nestingLevel + 1);
      return `${beginningSpaces}${getSign(item.state)}${item.key}: ${nestedResult}`;
    }

    if (_.isObject(item.value)) {
      const objectAsArray = _.map(item.value, (val, key) => ({ key, value: val }));
      return `${beginningSpaces}${getSign(item.state)}${item.key}: ${stylish(
        objectAsArray,
        nestingLevel + 1,
      )}`;
    }

    return `${beginningSpaces}${getSign(item.state)}${item.key}: ${item.value}`;
  });

  return `{\n${formattedResult.join('\n')}\n${spacesСlosingIndent}}`;
};

const formatter = (gendiffResult, format) => {
  console.log(format);
  if (format === 'stylish') {
    return stylish(gendiffResult);
  }

  return '';
};

export default formatter;
