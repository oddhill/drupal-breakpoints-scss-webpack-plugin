# Drupal breakpoints scss webpack plugin

This Webpack plugins lets you turn the breakpoints YAML-file from a Drupal theme into variables in a scss-file.

To achieve this this the plugin uses the following package [drupal-breakpoints-scss](https://github.com/jenslind/drupal-breakpoints-scss).

## Install

```
npm install --save-dev @oddhill/drupal-breakpoints-scss-webpack-plugin
# OR
yarn add --dev @oddhill/drupal-breakpoints-scss-webpack-plugin
```

## Example usage with Webpack

```js
const DrupalBreakpointsScssPlugin = require('@oddhill/drupal-breakpoints-scss-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new DrupalBreakpointsScssPlugin({
      entry: 'theme.breakpoints.yml',
      output: 'breakpoints.scss',
    }),
  ],
  // ...
}
```

### Options

The options for the plugin are required, both the entry and output options must be defined.

- `entry:` Path to the file containing the theme breakpoints. (Required)
- `output:` Path of the file to write the scss variables to. (Required)
