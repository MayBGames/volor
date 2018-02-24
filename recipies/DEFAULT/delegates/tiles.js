module.exports = (level) => {
  const { path, tiles } = level
  
  let temp

  tiles.generated = [ ]

  for (let block of path.generated) {
    temp = [ ]
    
    for (let condition of Object.entries(tiles.config)) {
      const clauses = condition[0].split(/\s+/g)
      let   match   = true
      
      for (let qualifier of clauses) {
        if (block.props.indexOf(qualifier) === -1) {
          match = false

          break
        }
      }

      if (match === true) {
        const to_add = condition[1].split(/\s+/g)
        
        for (let add of to_add) {
          if (temp.indexOf(add) === -1) {
            temp.push(add)
          }
        }
      }
    }
    
    tiles.generated.push(temp)
  }
}