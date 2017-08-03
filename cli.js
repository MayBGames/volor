#! /usr/bin/env node

const args  = require('./params')
const parse = require('./rule_parser')
const rules = parse(args.biom.rules)

rules.total_volume = args.biom.total_volume

let remaining_volume = rules.total_volume

let previous_dir = undefined
let map          = [ ]

const { direction_allowed, properties } = args.biom

const tests = Object.keys(properties)

const roundedRandomIn = (range) => {
  return Math.round(Math.random() * (range.max - range.min) + range.min)
}

const { template, mask } = args.biom.transform

const temp = { }

template
  .split(',')
  .map(t => t.trim())
  .forEach(t => {
    let   tokens = t.split(':').map((t) => t.trim())
    const alias  = tokens.shift()

    temp[alias] = tokens
  })

const masks   = [ ]
let   matches = [ ]
const mask_effects = { }

mask
  .split(',')
  .map(m => m.trim())
  .forEach(m => {
    const tokens = m.split('=').map(i => i.trim())

    masks.push(tokens[0].split(''))
    matches.push([ ])

    mask_effects[tokens[0]] = tokens[1].split('')
  })

const aliases = Object.keys(temp)

const role = () => {
  const seed       = Math.random()
  const directions = Object.keys(rules).filter((d) => d !== 'total_volume')

  for (let dir of directions) {
    if (seed >= rules[dir].percent.min && seed <= rules[dir].percent.max) {
      if (direction_allowed(dir, previous_dir)) {
        const width  = roundedRandomIn(rules[dir].width_range)
        const height = roundedRandomIn(rules[dir].height_range)
        const volume = width * height

        const tile = {
          direction: dir,
          height:    height,
          width:     width,
          x:         rules[dir].width_range,
          y:         rules[dir].height_range
        }

        const props = [ ]

        for (let test of tests) {
          if (properties[test](tile.width, tile.height, tile.x, tile.y)) {
            props.push(test)
          }
        }

        tile.props = props

        remaining_volume -= volume
        previous_dir      = dir

        map.push(tile)
      } else {
        role()
      }
    }
  }
}

while (remaining_volume > 0) {
  role()
}

let previous_run = undefined

const last = (arr) => arr[arr.length - 1]

map.forEach((x, i) => {
  const as = aliases.map(a => {
    let hits = 0

    temp[a].forEach(t => {
      if (x.props.includes(t)) {
        ++hits
      }
    })

    if (hits === temp[a].length) {
      return a
    }
  }).filter(a => typeof a !== 'undefined')

  let found_match = false

  masks.forEach((mask, j) => {
    const key = mask.join('')

    let current = matches[j]

    mask.forEach((m, mindex) => {
      const aindex = as.indexOf(m)

      if (aindex > -1) {
        let lst = last(current)

        if (mindex === 0) {
          current.push([ i ])

          found_match = true
        } else if (Array.isArray(lst) && previous_run === i - 1) {
          if (mindex    === lst.length &&
              mindex    >   0          &&
              last(lst) === i - 1) {
            lst.push(i)

            found_match = true
          } else if (mindex      === 0 &&
                     lst.length  === 1 &&
                     mask.length >   1) {
            lst[0] = i

            found_match = true
          }
        }
      } else if (as.length === 0 || i - previous_run > 1) {
        previous_run = undefined

        let modify = last(current)

        modify = [ ]

        found_match = false
      }
    })
  })

  if (found_match) {
    previous_run = i
  }
})

const full_matches = { }

masks.forEach((mask, i) => {
  const key = mask.join('')

  matches[i].forEach((match) => {
    let fully_matches = true

    if (match.length !== mask.length) {
      fully_matches = false
    }

    if (fully_matches) {
      if (typeof full_matches[key] === 'undefined') {
        full_matches[key] = [ ]
      }

      full_matches[key].push(match)
    }
  })
})

console.log('aliases', aliases)
console.log('matches', full_matches)

const effects = { }

args.biom.transform.effects
  .split(',')
  .map(e => {
    const tokens = e.split('=')
      .map(t => t.trim())

    const template = tokens[0]
    const effect   = tokens[1]

    effects[template] = parse(effect)
  })

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
      const index = mask_effects[k][idx]

      map[i] = Object.assign({ }, deep_update(map[i], effects[index]))
    })
  })
})

map.forEach((m, i) => {
  if (m.ground) {
    console.log('\nTILE', i, m.ground)
  }
})
