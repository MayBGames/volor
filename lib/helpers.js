const randomIn        = (r) => Math.random() * (r.max - r.min) + r.min
const roundedRandomIn = (r) => Math.round(randomIn(r))

module.exports = {
  randomIn,
  roundedRandomIn
}