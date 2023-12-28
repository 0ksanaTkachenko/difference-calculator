import _ from 'lodash';

const valueFormat = (value) => {
  const format = {
    string: `'${value}'`,
    object: value === null ? 'null' : '[complex value]',
  };
  return format[typeof value] || value;
};

const formatDiffItem = (item, currentPath) => {
  const line = {
    updated: `Property '${currentPath}' was updated. From ${valueFormat(
      item.oldValue,
    )} to ${valueFormat(item.newValue)}`,
    added: `Property '${currentPath}' was added with value: ${valueFormat(item.value)}`,
    removed: `Property '${currentPath}' was removed`,
    'not changed': [],
  };
  return line[item.state];
};

const plain = (gendiffResult, parentPath = '') => {
  const formattedResult = _.flatMap(gendiffResult, (item) => {
    const currentPath = parentPath === '' ? item.key : `${parentPath}.${item.key}`;

    if (item.state === 'nested') {
      const children = item.value;
      return plain(children, currentPath);
    }

    return formatDiffItem(item, currentPath);
  });

  return formattedResult.join('\n');
};

export default plain;
