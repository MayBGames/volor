#! /usr/bin/env node

const args    = require('./arguments')
const builder = require('./index')
const built   = builder('DEFAULT', 1000, [ 'path', 'tiles', 'landscape' ])

console.log(built)
