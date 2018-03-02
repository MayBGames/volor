module.exports = {
    render: (grid, wide, high, w, h, x, y) => {
      let col = y
  
      while (grid[w][col].indexOf('ground') > -1) {
        ++col
      }
      
      grid[w][h + col].push('slope_up')
  
      return col
    }
  }