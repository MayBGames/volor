module.exports = {
  "up": {
    "chance": { "min":  0, "max": 30 },
    "width":  { "min": 10, "max": 20 },
    "height": { "min": 10, "max": 20 },
    "options": [{
      "chance": { "min":  0, "max": 50 },
      "width":  { "min": 10, "max":  12 },
      "height": { "min": 18, "max":  20 }
    }, {
      "chance": { "min": 51, "max": 90 },
      "width":  { "min": 13, "max": 16 },
      "height": { "min": 15, "max": 17 }
    }, {
      "chance": { "min": 91, "max": 100 },
      "width":  { "min": 17, "max":  20 },
      "height": { "min": 10, "max":  14 }
    }]
  },
  "right": {
    "chance": { "min": 31, "max": 100 },
    "width":  { "min": 10, "max":  20 },
    "height": { "min": 10, "max":  20 },
    "options": [{
      "chance": { "min":  0, "max": 30 },
      "width":  { "min": 12, "max": 15 },
      "height": { "min": 10, "max": 12 }
    }, {
      "chance": { "min": 31, "max": 66 },
      "width":  { "min": 16, "max": 20 },
      "height": { "min": 15, "max": 18 }
    }, {
      "chance": { "min": 67, "max": 100 },
      "width":  { "min": 19, "max":  20 },
      "height": { "min": 17, "max":  20 }
    }]
  }
}