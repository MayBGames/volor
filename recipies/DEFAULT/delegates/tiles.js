const parser = require('../../../lib/property_parser')

module.exports = (level) => {
  const { path, tiles } = level

  tiles.generated = [ ]

  for (let step of path.generated) {
    tiles.generated.push(parser(tiles.config, step.props))
  }
}