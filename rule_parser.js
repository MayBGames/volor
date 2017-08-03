module.exports = (rules) => {
  const top_level    = rules.split('->').map((t) => t.trim())
  const total_volume = parseInt(top_level[1], 10)
  const out          = { total_volume }

  let cumulative_percent = 0

  top_level[0]
    .split(',')
    .map((d) => d.trim())
    .forEach((d) => {
      const ruleset = d.split(':')
      const height  = ruleset[3].split('/').map((h) => h.trim())
      const width   = ruleset[2].split('/').map((w) => w.trim())

      out[ruleset[0]] = {
        percent: {
          min: cumulative_percent,
          max: cumulative_percent += parseInt(ruleset[1], 10) * 0.01
        },
        height_range: {
          min: parseInt(height[0], 10),
          max: parseInt(height[1], 10)
        },
        width_range: {
          min: parseInt(width[0], 10),
          max: parseInt(width[1], 10)
        }
      }
    })

  return out
}
