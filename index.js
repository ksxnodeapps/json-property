#! /usr/bin/env node
'use strict'

const {join} = require('path')
const {readFileSync} = require('fs')
const process = require('process')
const getStdIn = require('get-stdin')
const {getOwnPropertyDescriptor} = Object
const {parse, stringify} = JSON
const {exit, argv} = process
const usefulargv = argv.slice(2)
const {info, error} = global.console

const success = message => {
  info(message)
  exit(0)
}

const failure = (message, code = 1) => {
  error(message)
  exit(code)
}

const getprop = (object, property) => {
  if (object === undefined || object === null) return undefined
  const descriptor = getOwnPropertyDescriptor(object, property)
  if (!descriptor) return undefined
  return descriptor.value
}

const main = (json, field) =>
  success(stringify(field.reduce(getprop, parse(json)), undefined, 2))

getStdIn()
  .then(
    value => {
      const string = String(value)
      if (string) return main(string, usefulargv)
      const [file, ...field] = usefulargv
      if (!file) failure(readFileSync(join(__dirname, 'help.txt'), 'utf8'), 0)
      return main(readFileSync(file, 'utf8'), field)
    }
  )
  .catch(failure)
