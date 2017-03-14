const drupalBreakpoints = require('drupal-breakpoints-scss');

/**
 * This webpack plugin will extract breakpoints from a Drupal theme YAML file
 * and write them to a SASS-file as variables.
 *
 * @param {object} options
 *   The plugin options.
 */
function DrupalBreakpointsScssPlugin(options) {
  if (!options) {
    throw new Error('An options object must be supplied.');
  }

  if (!options.entry || !options.output) {
    throw new Error('The entry and output options must be defined.');
  }

  this.options = options;
}

/**
 * Called when the plugin is invoked.
 *
 * @param {object} compiler
 *   The webpack compiler.
 */
DrupalBreakpointsScssPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    const { entry, output } = this.options;

    const stream = drupalBreakpoints
      .read(entry)
      .pipe(drupalBreakpoints.write(output));

    stream.on('close', () => {
      callback();
    });
  });
};

module.exports = DrupalBreakpointsScssPlugin;
