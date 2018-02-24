module.exports = (name, total_volume, pipeline) => {
  const level = {
    name,
    pipeline,
    total_volume,
    
    properties: require(`./recipies/${name}/config/tile_properties`),
    direction_allowed: require(`./recipies/${name}/config/allowed_directions`)
  }

  for (let piece of pipeline) {
    level[piece] = { config: require(`./recipies/${name}/config/${piece}`) }
  }
  
  return level
}

// platforms: {
//   stationary: () => { },
//   moving:     () => { },
//   crumbling:  () => { },
//   bouncy:     () => { }
// },
// obstacles: {
//   pit:    () => { },
//   lazers: () => { },
//   mines:  () => { }
// },
// puzzles: {
//   wall_jump:     () => { },
//   locked_door:   () => { },
//   box_movement:  () => { },
//   timed_jump:    () => { },
//   jump_sequence: () => { },
//   precise_jump:  () => { }
// },
// pickups: {
//   onyx_bar:   () => { },
//   multiplier: () => { },
//   checkpoint: () => { },
//   hit_point:  () => { }
// }
