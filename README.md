### Hexlet tests and linter status:

[![Actions Status](https://github.com/0ksanaTkachenko/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-46/actions) [![latest build of the project](https://github.com/0ksanaTkachenko/frontend-project-46/actions/workflows/build.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/94a1b56d2f5284215651/maintainability)](https://codeclimate.com/github/0ksanaTkachenko/frontend-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/94a1b56d2f5284215651/test_coverage)](https://codeclimate.com/github/0ksanaTkachenko/frontend-project-46/test_coverage)

## gendiff

The gendiff program is designed to compare and identify differences between two files. It reads the contents of the files, analyzes their data, and determines changes such as added, deleted, or modified elements. The results are presented in a user-friendly format, making this program a useful tool for analyzing and comparing data between files of various formats. The program can work with both relative and absolute paths to files.

The program accepts input paths to the files that need to be compared and also the format for outputting information. It can handle three types of output formats:

- stylish (default format);
- plain;
- json;

```console
gendiff [--format] filepath1 filepath2
```

The program also functions as a library. It can be installed as a dependency in any other NPM package.

```
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2);
console.log(diff);
```

## Installation

Before starting, you need to install the program by running the command "make install" or "npm ci && sudo npm link" in the terminal, after which you can start using the program.

```console
make install
```

or

```console
npm ci && sudo npm link
```

[See an example of installation](https://asciinema.org/a/628789)

## About program

The program can compare two types of files:

- JSON
- YAML/YML

When using the program without specifying a format, the default format will be 'stylish'.

```console
gendiff filepath1 filepath2
```

- [Finding differences between two JSON files](https://asciinema.org/a/628390)
- [Finding differences between two yaml/yml files](https://asciinema.org/a/628391)

### 'stylish' format

```console
gendiff --format stylish filepath1 filepath2`
```

The 'stylish' format provides a visually structured representation of the differences between two files. It uses a hierarchical, tree-like structure to display changes.
Key features:

- The format visually nests properties to reflect their structure in the original files.
- Added properties are prefixed with a + sign.
- Removed properties are prefixed with a - sign.
- Unchanged properties are displayed without a prefix.
- For complex values (like objects or arrays), the structure is expanded to show nested differences.
- The format is particularly useful for visualizing changes in deeply nested structures.

#### Example of data output in 'stylish' format

```console
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      + setting3: null
        setting4: {
            key: value
            + nestedKey: newNestedValue
        }
    }
}
```

#### Using a program with data output in 'stylish' format.

- [Finding differences between two json files](https://asciinema.org/a/628811)
- [Finding differences between two yaml/yml files](https://asciinema.org/a/628812)

### 'plain' format

```console
gendiff --format plain filepath1 filepath2`
```

The 'plain' format represents a way of displaying data in an easy-to-read textual form.
Key features:

- Added, removed, or updated properties are displayed as individual lines.
- Each line describes a single change and contains the full path to the property from the root of the data structure.
- For added properties, their new value is indicated.
- Removed properties are simply marked as removed.
- For updated properties, both their old and new values are shown.
- If the property value is a complex structure (like an object or array), instead of detailing, [complex value] is displayed.

#### Example of data output in 'plain' format

```console
Property 'common.follow' was added with value: false
Property 'common.setting3' was updated. From true to null
Property 'common.setting5' was added with value: [complex value]
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
```

#### Using a program with data output in 'plain' format.

- [Finding differences between two json files](https://asciinema.org/a/628608)
- [Finding differences between two yaml/yml files](https://asciinema.org/a/628606)

### 'json' format

```console
gendiff --format json filepath1 filepath2`
```

The 'JSON' format presents the differences between files in a structured, JSON object format. Key features:

- Each change is represented as an object in an array.
- key indicates the property name.
- state describes the type of change (added, removed, updated, nested, not changed).
- value contains the current value for added and unchanged properties, and the old value for removed properties.
- For updated properties, oldValue and newValue are shown.
- Nested changes are represented as arrays within parent objects.

#### Example of data output in 'json' format

```console
[
  {
    "key": "common",
    "state": "nested",
    "value": [
      {
        "key": "follow",
        "state": "added",
        "value": false
      }
    ]
  }
]
```

#### Using a program with data output in 'json' format.

- [Finding differences between two json files](https://asciinema.org/a/628814)
- [Finding differences between two yaml/yml files](https://asciinema.org/a/628813)

## Prerequisites for Installation

To run this console game, you will need:

1. **Node.js:** Ensure that you have Node.js installed, version 12 or higher. [Download Node.js](https://nodejs.org/)

2. **npm:** Install npm (comes with Node.js). [Instructions for installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

3. **Cross-Platform Compatibility:** This program is supported on all major operating systems (Windows, macOS, Linux).
