#! /usr/bin/env node

const args  = require('./params')
const rules = require('./rule_parser')(args.biom.rules)

// console.log('\nBIOM', rules)

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

mask
  .split(',')
  .map(m => m.trim())
  .forEach(m => {
    masks.push(m.split(''))
    matches.push([ ])
  })

const aliases = Object.keys(temp)

// console.log('temp', temp)
// console.log('masks', masks)

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

let first_match_found = { }
let previous_run      = undefined

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

  // console.log('matched aliases', as)

  masks.forEach((mask, j) => {
    const key = mask.join('')

    let current = matches[j]

    mask.forEach((m, mindex) => {
      const aindex = as.indexOf(m)

      if (aindex > -1) {
        if (first_match_found[key] === true                 &&
            mindex                 === last(current).length &&
            previous_run           === i - 1                &&
            mindex                 >   0                    &&
            last(last(current))    === i - 1) {
          last(current).push(i)
          // console.log('next match', m, i, previous_run, mindex)

          found_match = true
        } else if (first_match_found[key] === undefined && mindex === 0) {
          current.push([ i ])

          // console.log('first match', m, i, previous_run, mindex)

          first_match_found[key] = true

          found_match = true
        } else if (first_match_found[key] === true  &&
                   previous_run           === i - 1 &&
                   mindex                 === 0     &&
                   last(current).length   === 1) {
          let mod = last(current)

          mod[0] = i

          found_match = true

          // console.log('other', m, i, previous_run, mindex, first_match_found[key])
        }
      } else if (as.length === 0 || i - previous_run > 1) {
        // console.log('no matching aliases', m, i, previous_run, mindex)

        first_match_found[key] = undefined
        previous_run           = undefined

        let modify = last(current)

        modify = [ ]

        found_match = false
      }
    })
    // console.log('CURRENT', mask.join(''), current)
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

console.log('matches', full_matches)

// console.log('\nMAP', map)
