module.exports = {
  "meta": {
    "reserved": [ "options" ]
  },
  "up": {
    "chance": { "min":  0, "max": 10 },
    "width":  { "min": 10, "max": 20 },
    "height": { "min": 10, "max": 20 },
    "options": [{
      "chance": { "min":  0, "max":  3 },
      "width":  { "min": 10, "max": 12 },
      "height": { "min": 18, "max": 20 }
    }, {
      "chance": { "min":  4, "max":  6 },
      "width":  { "min": 13, "max": 16 },
      "height": { "min": 15, "max": 17 }
    }, {
      "chance": { "min":  7, "max": 10 },
      "width":  { "min": 17, "max": 20 },
      "height": { "min": 10, "max": 14 }
    }]
  },
  "right": {
    "chance": { "min": 11, "max": 70 },
    "width":  { "min": 10, "max": 20 },
    "height": { "min": 10, "max": 20 },
    "options": [{
      "chance": { "min": 11, "max": 30 },
      "width":  { "min": 12, "max": 15 },
      "height": { "min": 10, "max": 12 }
    }, {
      "chance": { "min": 31, "max": 50 },
      "width":  { "min": 16, "max": 20 },
      "height": { "min": 15, "max": 18 }
    }, {
      "chance": { "min": 51, "max": 70 },
      "width":  { "min": 19, "max": 20 },
      "height": { "min": 17, "max": 20 }
    }]
  },
  "down": {
    "chance": { "min": 71, "max": 80 },
    "width":  { "min": 10, "max": 20 },
    "height": { "min": 10, "max": 20 },
    "options": [{
      "chance": { "min": 71, "max": 73 },
      "width":  { "min": 10, "max": 12 },
      "height": { "min": 18, "max": 20 }
    }, {
      "chance": { "min": 74, "max": 77 },
      "width":  { "min": 13, "max": 16 },
      "height": { "min": 15, "max": 17 }
    }, {
      "chance": { "min": 78, "max": 80 },
      "width":  { "min": 17, "max": 20 },
      "height": { "min": 10, "max": 14 }
    }]
  },
  "left": {
    "chance": { "min": 81, "max": 100 },
    "width":  { "min": 10, "max":  20 },
    "height": { "min": 10, "max":  20 },
    "options": [{
      "chance": { "min": 81, "max": 87 },
      "width":  { "min": 12, "max": 15 },
      "height": { "min": 10, "max": 12 }
    }, {
      "chance": { "min": 88, "max": 95 },
      "width":  { "min": 16, "max": 20 },
      "height": { "min": 15, "max": 18 }
    }, {
      "chance": { "min": 96, "max": 100 },
      "width":  { "min": 19, "max":  20 },
      "height": { "min": 17, "max":  20 }
    }]
  }
}