const tall       = (w, h, x, y) => h / y.max > 0.8
const short      = (w, h, x, y) => h / y.min < 1.4
const wide       = (w, h, x, y) => w / x.max > 0.8
const narrow     = (w, h, x, y) => w / x.min < 1.4
const max_height = (w, h, x, y) => h === y.max
const min_height = (w, h, x, y) => h === y.min
const max_width  = (w, h, x, y) => w === x.max
const min_width  = (w, h, x, y) => w === x.min
const tiny       = (w, h, x, y) => min_height(w, h, x, y) && min_width(w, h, x, y)
const huge       = (w, h, x, y) => max_height(w, h, x, y) && max_width(w, h, x, y)
const big        = (w, h, x, y) =>       tall(w, h, x, y) &&      wide(w, h, x, y)
const small      = (w, h, x, y) =>      short(w, h, x, y) &&    narrow(w, h, x, y)
const vertical   = (w, h, x, y) =>       tall(w, h, x, y) &&    narrow(w, h, x, y)
const horizontal = (w, h, x, y) =>      short(w, h, x, y) &&      wide(w, h, x, y)
const tower      = (w, h, x, y) => max_height(w, h, x, y) && min_width(w, h, x, y)
const plain      = (w, h, x, y) => min_height(w, h, x, y) && max_width(w, h, x, y)

module.exports = {
  is_vertical:   vertical,
  is_horizontal: horizontal,
  is_tall:       tall,
  is_short:      short,
  is_wide:       wide,
  is_narrow:     narrow,
  is_big:        big,
  is_small:      small,
  is_max_width:  max_width,
  is_max_height: max_height,
  is_min_width:  min_width,
  is_min_height: min_height,
  is_tiny:       tiny,
  is_huge:       huge,
  is_tower:      tower,
  is_plain:      plain
}
