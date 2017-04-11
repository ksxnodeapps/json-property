#! /usr/bin/env node
'use strict'

const {resolve} = require('path')
const {readFileSync, createWriteStream} = require('fs')
const {stdout, argv} = require('process')
const getStdIn = require('get-stdin')
const {success, failure, setproppath, endhelp, tryReadFile} = require('./lib/utils.js')
const {parse, stringify} = JSON
const [valueargv, ...restargv] = argv.slice(2)

if (!valueargv) endhelp()
const value = parse(valueargv)

getStdIn()
  .then(
    stdin => {
      const string = String(stdin)
      const [json, wstream, properties] = string
        ? [string, stdout, restargv]
        : [tryReadFile(restargv[0], 'null', 'utf8'), createWriteStream(restargv[0]), restargv.slice(1)]
      const input = parse(json)
      const output = setproppath(value, input, ...properties)
      wstream.end(stringify(output, undefined, 2))
    }
  )
  .catch(failure)
