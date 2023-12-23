### Hexlet tests and linter status:

[![Actions Status](https://github.com/0ksanaTkachenko/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-46/actions)

[![latest build of the project](https://github.com/0ksanaTkachenko/frontend-project-46/actions/workflows/build.yml/badge.svg)](https://github.com/0ksanaTkachenko/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/94a1b56d2f5284215651/maintainability)](https://codeclimate.com/github/0ksanaTkachenko/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/94a1b56d2f5284215651/test_coverage)](https://codeclimate.com/github/0ksanaTkachenko/frontend-project-46/test_coverage)

### Using the program without specifying the format (the default format will be 'stylish')

- Finding differences between two flat json files:
  - https://asciinema.org/a/625382
- Finding differences between two flat yaml/yml files:
  - https://asciinema.org/a/627608
- Finding differences between nested data structures in two JSON files:
  - https://asciinema.org/a/628390
- Finding differences between nested data structures in two yaml/yml files:
  - https://asciinema.org/a/628391

### 'Plain' format

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

- Finding differences between two json files:
  - https://asciinema.org/a/628608
- Finding differences between two yaml/yml files:
  - https://asciinema.org/a/628606
