#! /usr/bin/env node

const args  = require('./params')
const parse = require('./rule_parser')
const rules = args.biom.path

let remaining_volume = args.biom.total_volume

let previous_dir = undefined
let map          = [ ]

const { direction_allowed, properties } = args.biom

const tests = Object.keys(properties)

const randomIn = (r) => Math.random() * (r.max - r.min) + r.min

const roundedRandomIn = (r) => Math.round(randomIn(r))

const { property_sets, filter_sets } = args.biom.tiles

const directions = Object.keys(rules)

let direction_chance = 0
let option_chance    = 0

for (let d = 0; d < directions.length; d++) {
  const dir = directions[d]

  let dir_chance    = parseFloat(rules[dir].chance)
  let dir_decorated = {
    min: direction_chance,
    val: dir_chance,
    max: direction_chance + dir_chance
  }

  direction_chance += dir_decorated.val

  rules[dir].chance = dir_decorated

  const options = rules[dir].options

  for (let o = 0; o < options.length; o++) {
    const option = options[o]

    let opt_chance    = parseFloat(option.chance)
    let opt_decorated = {
      min: option_chance,
      val: opt_chance,
      max: option_chance + opt_chance
    }

    option_chance += opt_decorated.val

    option.chance = opt_decorated
  }
}

const role = () => {
  const direction_seed = randomIn({ min: 0, max: direction_chance })

  for (let d = 0; d < directions.length; d++) {
    const dir    = directions[d]
    const chance = rules[dir].chance

    if (direction_seed >= chance.min && direction_seed <= chance.max) {
      if (direction_allowed(dir, previous_dir)) {
        const inner_seed = randomIn({ min: 0, max: option_chance })
        const options    = rules[dir].options

        for (let o = 0; o < options.length; o++) {
          const option = options[o]

          if (inner_seed >= option.chance.min && inner_seed <= option.chance.max) {
            const width  = roundedRandomIn(option.width)
            const height = roundedRandomIn(option.height)
            const volume = width * height

            const tile = {
              direction: dir,
              height:    {
                min:    rules[dir].height.min,
                max:    rules[dir].height.max,
                actual: height
              },
              width: {
                min:    rules[dir].width.min,
                max:    rules[dir].width.max,
                actual: width
              }
            }

            const props = [ ]

            for (let test of tests) {
              if (properties[test](tile.width, tile.height)) {
                props.push(test)
              }
            }

            tile.props = props

            remaining_volume -= volume
            previous_dir      = dir

            map.push(tile)

            break
          }
        }

        break
      } else {
        role()
      }
    }
  }
}

while (remaining_volume > 0) {
  role()
}

const last = (arr) => arr[arr.length - 1]

const matches = Object.keys(filter_sets).map(f => [ ])

let previous_run = undefined

map.forEach((x, i) => {
  const properties    = Object.keys(property_sets)
  const matched_props = [ ]

  for (let z = 0; z < properties.length; z++) {
    const prop = properties[z]
    const set  = property_sets[prop]
    let   hits = 0

    for (let y = 0; y < set.length; y++) {
      const s = set[y]

      if (x.props.includes(s)) {
        ++hits
      }
    }

    if (hits === set.length) {
      matched_props.push(prop)
    }
  }

  let found_match = false

  const filters = Object.keys(filter_sets)

  for (let w = 0; w < filters.length; w++) {
    const filter_name  = filters[w]
    const filter       = filter_sets[filters[w]]
    const requirements = [ ]
    const current      = matches[w]

    for (let v = 0; v < filter.length; v++) {
      const f      = filter[v]
      const key    = Object.keys(f)[0]
      const aindex = matched_props.indexOf(key)

      if (aindex > -1) {
        let lst = last(current)

        if (v === 0) {
          current.push([ i ])

          found_match = true
        } else if (Array.isArray(lst) && previous_run === i - 1) {
          if (v         === lst.length &&
              v         >   0          &&
              last(lst) === i - 1) {
            lst.push(i)

            found_match = true
          } else if (v             === 0 &&
                     lst.length    === 1 &&
                     filter.length >   1) {
            lst[0] = i

            found_match = true
          }
        }
      } else if (matched_props.length === 0 || i - previous_run > 1) {
        previous_run = undefined

        let modify = last(current)

        modify = [ ]

        found_match = false
      }
    }
  }

  if (found_match) {
    previous_run = i
  }
})


const full_matches = { }

const filters = Object.keys(filter_sets)

filters.forEach((filter, i) => {
  matches[i].forEach((match) => {
    let fully_matches = true

    if (match.length !== filter_sets[filter].length) {
      fully_matches = false
    }

    if (fully_matches) {
      if (typeof full_matches[filter] === 'undefined') {
        full_matches[filter] = [ ]
      }

      full_matches[filter].push(match)
    }
  })
})

// console.log('matches', full_matches)

const keys = Object.keys(full_matches)

const deep_update = (src, mod) => {
  let   out  = Object.assign({ }, src)
  let   eff  = Object.assign({ }, mod)
  const keys = Object.keys(eff)

  keys.forEach(k => {
    if (typeof out[k] === 'undefined') {
      out[k] = Object.assign({ }, eff[k])
    } else {
      if (Array.isArray(eff[k]) === false && typeof eff[k] === 'object') {
        out[k] = deep_update(out[k], eff[k])
      } else {
        out[k] = parseFloat(out[k]) + eff[k]
      }
    }
  })

  return out
}

keys.forEach(k => {
  full_matches[k].forEach(m => {
    m.forEach((i, idx) => {
      const filter = args.biom.tiles.filter_sets[k]

      for (let k = 0; k < filter.length; k++) {
        const f    = filter[k]
        const keys = Object.keys(f)

        for (let l = 0; l < keys.length; l++) {
          const key      = keys[l]
          const to_apply = f[key]

          for (let m = 0; m < to_apply.length; m++) {
            const apply   = to_apply[m]
            const effects = Object.keys(args.biom.tiles.effect_sets[apply])

            for (let j = 0; j < effects.length; j++) {
              const effect = { [effects[j]]: args.biom.tiles.effect_sets[apply][effects[j]] }

              map[i] = Object.assign({ }, deep_update(map[i], effect))
            }
          }
        }
      }
    })
  })
})

map.forEach((m, i) => {
  if (m.stairs_up || m.ground) {
    console.log('\nTILE', i, m)
  }
})
