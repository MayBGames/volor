module.exports = (level) => {
  const { tiles, landscape } = level

  landscape.generated = [ ]

  for (let block of tiles.generated) {
    const to_add = [ ]

    landscape.generated.push(to_add)
  }
}