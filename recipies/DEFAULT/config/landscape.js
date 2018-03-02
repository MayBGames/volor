module.exports = {
  "ground": {
    "width":  { "min": 2, "max": 8, "step": 1 },
    "height": { "min": 2, "max": 2, "step": 1 },
    "weights": {
      "horizontal":     15,
      "vertical tall": -25,
      "wide":           30,
      "narrow":        -15,
      "max_width":      70
    }
  },
  "stairs_up": {
    "width":  { "min": 2, "max": 6, "step": 1 },
    "height": { "min": 2, "max": 6, "step": 1 },
    "delta":  { "min": 1, "max": 4, "step": 1 },
    "weights": {
      "vertical tall": -25,
      "narrow":        -15
    }
  },
  "stairs_down": {
    "width":  { "min": 2, "max": 6, "step": 1 },
    "height": { "min": 2, "max": 6, "step": 1 },
    "delta":  { "min": 1, "max": 4, "step": 1 },
    "weights": {
      "vertical tall": -25,
      "narrow":        -15
    }
  },
  "slope_up": {
    "width":  { "min": 4, "max": 8, "step": 1 },
    "height": { "min": 1, "max": 4, "step": 1 },
    "weights": {
      "vertical tall": -25,
      "narrow":        -15
    }
  },
  "slope_down": {
    "width":  { "min": 4, "max": 8, "step": 1 },
    "height": { "min": 1, "max": 4, "step": 1 },
    "weights": {
      "vertical tall": -25,
      "narrow":        -15
    }
  }
}