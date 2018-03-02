const tall        = (w, h) => h.actual / h.max > 0.8
const short       = (w, h) => h.actual / h.min < 1.4
const wide        = (w, h) => w.actual / w.max > 0.8
const narrow      = (w, h) => w.actual / w.min < 1.4
const max_height  = (w, h) => h.actual === h.max
const min_height  = (w, h) => h.actual === h.min
const max_width   = (w, h) => w.actual === w.max
const min_width   = (w, h) => w.actual === w.min
const avg_height  = (w, h) => h.actual / h.max <= 0.8 && h.actual / h.min >= 1.4
const avg_width   = (w, h) => w.actual / w.max <= 0.8 && w.actual / w.min >= 1.4
const total_avg   = (w, h) => avg_height(w, h) && avg_width(w, h)
const tiny        = (w, h) => min_height(w, h) && min_width(w, h)
const huge        = (w, h) => max_height(w, h) && max_width(w, h)
const big         = (w, h) =>       tall(w, h) &&      wide(w, h)
const small       = (w, h) =>      short(w, h) &&    narrow(w, h)
const vertical    = (w, h) =>       tall(w, h) &&    narrow(w, h)
const horizontal  = (w, h) =>      short(w, h) &&      wide(w, h)
const tower       = (w, h) => max_height(w, h) && min_width(w, h)
const plain       = (w, h) => min_height(w, h) && max_width(w, h)
const square      = (w, h) => h.actual === w.actual
const even_width  = (w)    => w.actual % 2 === 0
const even_height = (_, h) => h.actual % 2 === 0
const odd_width   = (w)    => w.actual % 2 !== 0
const odd_height  = (_, h) => h.actual % 2 !== 0
const even_volume = (w, h) => even_width(w) === true  && even_height(null, h) === true
const odd_volume  = (w, h) => even_width(w) === false && even_height(null, h) === false
const _16_x_9     = (w, h) => w.actual / h.actual > 1.77 && w.actual / h.actual < 1.78
const _4_x_3      = (w, h) => w.actual / h.actual > 1.33 && w.actual / h.actual < 1.34

const tall_relative  = (w, h) => w.actual / h.actual < 0.75
const wide_relative  = (w, h) => w.actual / h.actual > 1.3
const tower_relative = (w, h) => w.actual / h.actual > 2
const plain_relative = (w, h) => w.actual / h.actual < 0.5

module.exports = {
  vertical,
  horizontal,
  tall,
  short,
  wide,
  narrow,
  big,
  small,
  max_width,
  max_height,
  min_width,
  min_height,
  tiny,
  huge,
  tower,
  plain,
  avg_height,
  avg_width,
  total_avg,
  square,
  even_width,
  even_height,
  even_volume,
  odd_width,
  odd_height,
  odd_volume,
  tall_relative,
  wide_relative,
  tower_relative,
  plain_relative,

  "16_x_9": _16_x_9,
  "4_x_3":  _4_x_3,
}
