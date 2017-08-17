module.exports = {
  biom: {
    path: {
      right: {
        chance: 70,
        width:  { min: 10, max: 20  },
        height: { min: 10, max: 20  },
        options: [
          {
            chance: 100,
            width:  { min: 16, max: 20 },
            height: { min: 10, max: 12 }
          }
        ]
      },
      up: {
        chance: 30,
        width:  { min:  10, max: 20 },
        height: { min:  10, max: 20 },
        options: [
          {
            chance: 100,
            width:  { min: 10, max: 12 },
            height: { min: 18, max: 20 }
          }
        ]
      }
    },
    total_volume: 1000,
    properties: require('./biom_properties'),
    direction_allowed: require('./direction_allowed'),
    tiles: {
      property_sets: {
        flat: [ 'is_horizontal' ],
        tall: [ 'is_tall'       ]
      },
      effect_sets: {
        more_ground_less_stairs: {
          ground:    { chance: +20 },
          stairs_up: { chance: -20 }
        },
        more_stairs_less_ground: {
          ground:    { chance: -20 },
          stairs_up: { chance: +20 }
        },
        // c: {
        //   ground: {
        //     width: {
        //       min: -10,
        //       max: -10
        //     },
        //     height: {
        //       max: 20
        //     }
        //   }
        // }
      },
      filter_sets: {
        ground: [{ flat: [ 'more_ground_less_stairs' ] }],
        stairs: [{ tall: [ 'more_stairs_less_ground' ] }],
        // double: [
        //   { flat:   [ 'a' ] },
        //   { skinny: [ 'a' ] }
        // ],
        // bubble: [
        //   { skinny: [ 'b' ] },
        //   { flat:   [ 'b' ] }
        // ]
      }
    },
    landscapes: {
      // ground:      () => { },
      ground: {
        width: { min: 1, max: 8 }
      },
      // stairs_up:   () => { },
      stairs_up: {
        steps: { min: 3, max: 9 },
        delta: { min: 1, max: 4 }
      },
      stairs_down: {
        steps: { min: 3, max: 9 },
        delta: { min: 1, max: 4 }
      },
      // stairs_down: () => { },
      // slope_up:    () => { },
      slope_up: {
        width: { min: 4, max: 8 },
        delta: { min: 1, max: 4 }
      },
      slope_down: {
        width: { min: 4, max: 8 },
        delta: { min: 1, max: 4 }
      }
      // slope_down:  () => { },
      // spring:      () => { }
    },
    platforms: {
      stationary: () => { },
      moving:     () => { },
      crumbling:  () => { },
      bouncy:     () => { }
    },
    obstacles: {
      pit:    () => { },
      lazers: () => { },
      mines:  () => { }
    },
    puzzles: {
      wall_jump:     () => { },
      locked_door:   () => { },
      box_movement:  () => { },
      timed_jump:    () => { },
      jump_sequence: () => { },
      precise_jump:  () => { }
    },
    enemies: {

    },
    pickups: {
      onyx_bar:   () => { },
      multiplier: () => { },
      checkpoint: () => { },
      hit_point:  () => { }
    }
  }
}
