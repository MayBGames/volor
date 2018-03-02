module.exports = (obj, props) => {
  const out = [ ]

  for (let condition of Object.entries(obj)) {
    const clauses = condition[0].split(/\s+/g)
    let   match   = true

    for (let qualifier of clauses) {
      if (props.indexOf(qualifier) === -1) {
        match = false

        break
      }
    }

    if (match === true) {
      const to_add = condition[1].split(/\s+/g)

      for (let add of to_add) {
        if (out.indexOf(add) === -1) {
          out.push(add)
        }
      }
    }

    return out
  }
}