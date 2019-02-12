const rimraf = require('rimraf')

class CleanPlugin {
  constructor(options) {
    this.opts = options
  }

  apply(compiler) {
    compiler.hooks.bundled.tap('bundled', ({ options, graph, distName }) => {
      rimraf.sync(options.output.path)
      console.log('dist cleaned!')
    })
  }
}

module.exports = CleanPlugin
