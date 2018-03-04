module.exports = {
  meta: {
    skip: {
      x: { min: 4, max: 9 },
      y: { min: 4, max: 9 }
    }
  },
  stationary: {
    chance:     { min: 0, max: 40 },
    width:      { min: 2, max:  8 },
    height:     { min: 1, max:  5 },
    volitility: { min: 0, max:  4 },
    buffer:     {
      x: { left: 4, right:  4 },
      y: { top:  3, bottom: 3 }
    }
  },
  moving: {
    chance:    { min: 55, max: 70 },
    width:     { min:  2, max:  8 },
    height:    { min:  1, max:  5 },
    direction: {
      up:    { min:  0, max:  10 },
      down:  { min: 11, max:  20 },
      left:  { min: 21, max:  85 },
      right: { min: 86, max: 100 }
    },
    buffer: {
      x: { left: 4, right:  4 },
      y: { top:  3, bottom: 3 }
    }
  },
  crumbling: {
    chance: { min: 81, max: 90 },
    width:  { min:  2, max:  8 },
    height: { min:  1, max:  3 },
    decay:  { min:  1, max:  3 },
    buffer: {
      x: { left: 2, right:  2 },
      y: { top:  5, bottom: 4 }
    }
  },
  bouncy: {
    chance: { min: 95, max: 100 },
    width:  { min:  2, max:   8 },
    height: { min:  1, max:   5 },
    spring: { min:  3, max:   7 },
    buffer: {
      x: { left: 2, right:  2 },
      y: { top:  5, bottom: 3 }
    }
  }
}