const helpers = require('../../../lib/helpers')

module.exports = (recipe) => {
  const { total_volume, direction_allowed, properties, path, grid } = recipe
  
  let remaining_volume = total_volume
  let previous_dir     = undefined

  const map        = [ ]
  const tests      = Object.keys(properties)
  const directions = Object.keys(path)

  directions.splice(directions.indexOf('meta'), 1)

  const role = () => {
    const direction_seed = helpers.randomIn({ min: 0, max: 100 })
    
    for (let d = 0; d < directions.length; d++) {
      const dir    = directions[d]
      const chance = path[dir].chance

      if (direction_seed >= chance.min && direction_seed <= chance.max) {
        if (direction_allowed(dir, previous_dir)) {
          const options    = path[dir].options
          const inner_seed = helpers.randomIn({ min: 0, max: 100 })

          for (let o = 0; o < options.length; o++) {
            const option = options[o]

            if (inner_seed >= option.chance.min && inner_seed <= option.chance.max) {
              const width  = helpers.roundedRandomIn(option.width)
              const height = helpers.roundedRandomIn(option.height)
              const volume = width * height

              const tile = {
                dir,
                height: { ...path[dir].height, actual: height },
                width:  { ...path[dir].width,  actual: width  },
                option
              }

              const props = [ ]

              for (let test of tests) {
                if (properties[test](tile.width, tile.height)) {
                  props.push(test)
                }
              }

              let   row  = 0
              const rows = [ ]

              while (row++ < tile.width.actual) {
                const column = [ ]
                let   col    = 0

                while (col++ < tile.height.actual) {
                  column.push([ ])
                }

                rows.push(column)
              }

              grid.push(rows)

              tile.props = props

              remaining_volume -= volume
              previous_dir      = dir

              map.push(tile)

              break
            }
          }

          break
        }
      }
    }
  }

  while (remaining_volume > 0) {
    role()
  }

  recipe.path.generated = map
}