const helpers = require('../../../lib/helpers')

module.exports = (recipe) => {
  const { platforms, grid } = recipe

  const keys = Object.keys(platforms)

  keys.splice(keys.indexOf('meta'), 1)

  for (let tile = 0; tile < grid.length; tile++) {
    for (let x = 0; x < grid[tile].length; x++) {
      const platform_seed = helpers.roundedRandomIn({ min: 0, max: 100 })
      
      for (let y = 0; y < grid[tile][x].length; y++) {
        let rendered_platform = false
        
        for (const key of keys) {
          const platform = platforms[key]
          
          if (platform_seed >= platform.chance.min && platform_seed <= platform.chance.max) {
            let   platform_width  = helpers.roundedRandomIn(platform.width)
            const platform_height = helpers.roundedRandomIn(platform.height)
            
            if (x + platform_width >= grid[tile].length) {
              platform_width = grid[tile].length - x - 1
            }
            
            const end = x + platform_width
            
            let space_right = true
            let step_y      = y

            if (step_y < platform.buffer.y.down) {
              step_y = platform.buffer.y.down
            }

            while (space_right && x < end) {
              let iteration_x = 0

              while (iteration_x < platform.buffer.x.right && x + iteration_x < grid[tile].length) {
                if (grid[tile][x + iteration_x][step_y].length > 0) {
                  ++step_y

                  iteration_x = 0

                  continue
                }
                
                let iteration_y = 0

                while (iteration_y < platform.buffer.y.down) {
                  if (grid[tile][x + iteration_x][step_y - iteration_y].length > 0) {
                    ++step_y

                    iteration_y = 0

                    continue
                  }

                  ++iteration_y
                }
                
                ++iteration_x
              }

              if (space_right) {
                const top = step_y + platform_height
                
                let stacked     = 0
                let cols_placed = 0

                while (cols_placed < platform_width) {
                  const col = x + cols_placed++
                  
                  while (step_y + stacked < top && step_y + stacked < grid[tile][col].length) {
                    grid[tile][col][step_y + stacked++].push(`${key}_platform`)
                  }

                  stacked = 0
                }

                y  = 0
                x += platform_width

                rendered_platform = true
              }
            }
          
            continue
          }
        }

        if (rendered_platform === false) {
          x += helpers.roundedRandomIn(platforms.meta.skip.x)

          break
        }
      }
    }
  }
}