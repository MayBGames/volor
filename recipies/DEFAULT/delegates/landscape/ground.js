module.exports = {
  render: (grid, wide, high, w, h, x, y) => {
    grid[w][h].push('ground')

    return y
  }
}