# babel-plugin-stylus-basic

Replaces stylus with css.

## Usage

Install the package:

```bash
$ npm install --save afaur/babel-plugin-stylus-basic
```

Add `babel-plugin-stylus-basic` to `plugins` in the babel config:

```json
{
  "plugins": [
    "babel-plugin-stylus-basic"
  ]
}
```

When you write code that looks like this:

```js
var css = 'styl/style.styl';
```

The plugin will generate css from the contents of the stylus file.
