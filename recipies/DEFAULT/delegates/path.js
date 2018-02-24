module.exports = (level) => {
  const { total_volume, direction_allowed, properties, path } = level
  
  let remaining_volume = total_volume
  let previous_dir     = undefined

  const map             = [ ]
  const tests           = Object.keys(properties)
  const directions      = Object.keys(path.config)
  const randomIn        = (r) => Math.random() * (r.max - r.min) + r.min
  const roundedRandomIn = (r) => Math.round(randomIn(r))

  const role = () => {
    const direction_seed = randomIn({ min: 0, max: 100 })
    
    for (let d = 0; d < directions.length; d++) {
      const dir    = directions[d]
      const chance = path.config[dir].chance

      if (direction_seed >= chance.min && direction_seed <= chance.max) {
        if (direction_allowed(dir, previous_dir)) {
          const options    = path.config[dir].options
          const inner_seed = randomIn({ min: 0, max: 100 })

          for (let o = 0; o < options.length; o++) {
            const option = options[o]

            if (inner_seed >= option.chance.min && inner_seed <= option.chance.max) {
              const width  = roundedRandomIn(option.width)
              const height = roundedRandomIn(option.height)
              const volume = width * height

              const tile = {
                dir,
                height: { ...path.config[dir].height, actual: height },
                width:  { ...path.config[dir].width,  actual: width  },
                option
              }

              const props = [ ]

              for (let test of tests) {
                if (properties[test](tile.width, tile.height)) {
                  props.push(test)
                }
              }

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

  level.path.generated = map
}