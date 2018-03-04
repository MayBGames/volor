#! /usr/bin/env node

const fs      = require('fs')
const args    = require('./arguments')
const builder = require('./index')
const built   = builder('DEFAULT', 1000, [ 'path', 'tiles', 'landscape', 'platforms' ])

fs.writeFile(`./tmp/${Date.now()}.json`, JSON.stringify(built, null, 2), 'utf8', (err) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    console.log('Output saved')
    process.exit(0)
  }
})