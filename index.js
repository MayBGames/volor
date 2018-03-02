module.exports = (name, total_volume, pipeline) => {
  const recipe = require('./lib/builder')(name, total_volume, pipeline)

  for (let pipe of recipe.pipeline) {
    require(`./recipies/${recipe.name}/delegates/${pipe}`)(recipe)
  }

  delete recipe.properties
  delete recipe.direction_allowed

  return recipe
}
