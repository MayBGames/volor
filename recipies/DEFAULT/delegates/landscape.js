const helpers = require('../../../lib/helpers')
const fs      = require('fs')

module.exports = (recipe) => {
  const { landscape, tiles, path, grid } = recipe

  const keys = Object.keys(landscape)

  keys.splice(keys.indexOf('meta'), 1)

  landscape.generated = [ ]

  for (let t in tiles.generated) {
    const tile   = tiles.generated[t]
    const width  = path.generated[t].width.actual
    const height = path.generated[t].height.actual
    const props  = path.generated[t].props
    const to_add = [ ]
    const chance = { }

    for (const pass of landscape.meta.render_order) {
      chance[pass] = 100 / tile.length

      const weights = Object.entries(landscape[pass].weights)

      for (const weight of weights) {
        const clauses = weight[0].split(/\s+/g)
        let   match   = true

        for (const clause of clauses) {
          if (props.includes(clause) === false) {
            match = false

            break
          }
        }

        if (match) {
          chance[pass] += weight[1]
        }
      }

      if (tile.includes(pass)) {
        const path     = `${process.cwd()}/recipies/${recipe.name}/delegates/landscape/${pass}.js`
        const exists   = fs.existsSync(path)

        if (exists === true) {
          const delegate = require(path)
          let   traveled = 0

          while (traveled < width) {
            let   wide = helpers.roundedRandomIn(landscape[pass].width)
            const high = helpers.roundedRandomIn(landscape[pass].height)

            let w  = traveled, x = w
            let h  = 0
            let _y = 0
            let y  = 0

            if (traveled + wide >= width) {
              wide = width - traveled
            }

            const seed = helpers.randomIn({ min: 0, max: 100 })

            if (seed <= chance[pass]) {
              while (w < wide + traveled) {
                while (h < high) {
                  y = delegate.render(grid[t], wide, high, w, h, x, _y)

                  ++h
                }

                h = 0
                ++w
              }

              to_add.push({
                x, y,
                seed,
                type: pass,
                width: wide,
                height: high,
                chance: chance[pass]
              })
            }

            traveled += wide
          }

          landscape.generated.push(to_add)
        }
      }
    }
  }
}