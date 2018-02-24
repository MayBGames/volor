module.exports = (dir, previous_dir) => {
  switch(previous_dir) {
    case 'left':  return dir !== 'right'
    case 'right': return dir !== 'left'
    case 'up':    return dir !== 'down'
    case 'down':  return dir !== 'up'
    default:      return dir === 'right'
  }
}
