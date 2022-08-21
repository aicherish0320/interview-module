# eslint-plugin-ac-lint

test eslint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ac-lint`:

```sh
npm install eslint-plugin-ac-lint --save-dev
```

## Usage

Add `ac-lint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ac-lint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ac-lint/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


