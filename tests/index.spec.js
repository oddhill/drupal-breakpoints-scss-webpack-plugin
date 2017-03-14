const fs = require('fs');
const path = require('path');
const test = require('tape');
const webpack = require('webpack');

const DrupalBreakpointsScssPlugin = require('../index');

test('It requires an option object to be defined.', (t) => {
  t.plan(1);

  t.throws(() => new DrupalBreakpointsScssPlugin(), /An options object must be supplied\./);
});

test('It requires the entry and output option to be defined.', (t) => {
  const errorMessage = /The entry and output options must be defined\./;

  t.plan(2);

  t.throws(() => new DrupalBreakpointsScssPlugin({
    output: '',
  }), errorMessage);

  t.throws(() => new DrupalBreakpointsScssPlugin({
    entry: '',
  }), errorMessage);
});

test('It should write breakpoints to the defined output destination.', (t) => {
  const tempPath = fs.mkdtempSync('/tmp/drupal-breakpoints-scss-webpack-plugin');

  const entry = path.resolve(__dirname, './files/breakpoints.yml');
  const output = path.join(tempPath, 'breakpoints.scss');

  const options = {
    entry: './files/entry.js',
    context: path.resolve(__dirname),
    plugins: [
      new DrupalBreakpointsScssPlugin({ entry, output }),
    ],
  };

  t.plan(1);

  webpack(options, (err) => {
    t.doesNotThrow(() => fs.accessSync(output));
    t.end(err);
  });
});
