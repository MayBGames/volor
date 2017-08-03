module.exports = require('yargs')
  .usage('Usage: $0 [options] schtuff')
  .string('biom')
  .describe('biom', 'The biom rules to generate')
  .argv
