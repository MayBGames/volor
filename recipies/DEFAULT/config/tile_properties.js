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
  is_vertical:    vertical,
  is_horizontal:  horizontal,
  is_tall:        tall,
  is_short:       short,
  is_wide:        wide,
  is_narrow:      narrow,
  is_big:         big,
  is_small:       small,
  is_max_width:   max_width,
  is_max_height:  max_height,
  is_min_width:   min_width,
  is_min_height:  min_height,
  is_tiny:        tiny,
  is_huge:        huge,
  is_tower:       tower,
  is_plain:       plain,
  is_avg_height:  avg_height,
  is_avg_width:   avg_width,
  is_totally_avg: total_avg,
  is_square:      square,
  is_even_width:  even_width,
  is_even_height: even_height,
  is_even_volume: even_volume,
  is_odd_width:   odd_width,
  is_odd_height:  odd_height,
  is_odd_volume:  odd_volume,
  is_16_x_9:      _16_x_9,
  is_4_x_3:       _4_x_3,

  is_tall_relative:  tall_relative,
  is_wide_relative:  wide_relative,
  is_tower_relative: tower_relative,
  is_plain_relative: plain_relative
}
