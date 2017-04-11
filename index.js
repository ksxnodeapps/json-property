#! /usr/bin/env node
'use strict'

console.error(
  require('fs')
    .readFileSync(require('path').join(__dirname, 'help.txt'))
    .toString('utf8')
)
