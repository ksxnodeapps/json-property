#! /usr/bin/env node
'use strict'

const {resolve} = require('path')
const {readFileSync} = require('fs')
const {argv} = require('process')
const getStdIn = require('get-stdin')
const {success, failure, getproppath, endhelp} = require('./lib/utils.js')
const {parse, stringify} = JSON
const usefulargv = argv.slice(2)

const main = (json, field) =>
  success(stringify(getproppath(parse(json), ...field), undefined, 2))

getStdIn()
  .then(
    value => {
      const string = String(value)
      if (string) return main(string, usefulargv)
      const [file, ...field] = usefulargv
      if (!file) return endhelp()
      return main(readFileSync(file, 'utf8'), field)
    }
  )
  .catch(failure)
