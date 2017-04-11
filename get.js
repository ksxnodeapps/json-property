#! /usr/bin/env node
'use strict'

const {resolve} = require('path')
const {readFileSync} = require('fs')
const {argv} = require('process')
const getStdIn = require('get-stdin')
const {success, failure, getprop} = require('./lib/utils.js')
const {parse, stringify} = JSON
const usefulargv = argv.slice(2)

const main = (json, field) =>
  success(stringify(field.reduce(getprop, parse(json)), undefined, 2))

getStdIn()
  .then(
    value => {
      const string = String(value)
      if (string) return main(string, usefulargv)
      const [file, ...field] = usefulargv
      if (!file) failure(readFileSync(resolve(__dirname, 'help.txt'), 'utf8'), 0)
      return main(readFileSync(file, 'utf8'), field)
    }
  )
  .catch(failure)
