module.exports = (name, total_volume, pipeline) => {
  const level = require('./lib/builder')(name, total_volume, pipeline)

  for (let pipe of level.pipeline) {
    require(`./recipies/${level.name}/delegates/${pipe}`)(level)
  }

  delete level.properties
  delete level.direction_allowed

  return level
}
