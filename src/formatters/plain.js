import _ from 'lodash';

const chooseItemValueFormat = (value) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case value === null:
      return 'null';
    case typeof value === 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const formatDiffItem = (item, currentPath) => {
  switch (item.state) {
    case 'updated': {
      const itemOldValue = chooseItemValueFormat(item.oldValue);
      const itemNewValue = chooseItemValueFormat(item.newValue);
      return `Property '${currentPath}' was updated. From ${itemOldValue} to ${itemNewValue}`;
    }
    case 'added': {
      const itemValue = chooseItemValueFormat(item.value);
      return `Property '${currentPath}' was added with value: ${itemValue}`;
    }
    case 'removed':
      return `Property '${currentPath}' was removed`;

    case 'not changed':
      return [];

    default:
      return '';
  }
};

const plain = (gendiffResult, parentPath = '') => {
  const formattedResult = _.flatMap(gendiffResult, (item) => {
    const currentPath = parentPath === '' ? item.key : `${parentPath}.${item.key}`;

    if (_.isArray(item.value)) {
      return plain(item.value, currentPath);
    }

    return formatDiffItem(item, currentPath);
  });

  return formattedResult.join('\n');
};

export default plain;
