'use strict'
const {join} = require('path')
const {readFileSync} = require('fs')
const {exit} = require('process')
const jtry = require('just-try')
const {getOwnPropertyDescriptor, defineProperty} = Object
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

const setprop = (object, property, value) =>
  defineProperty(object, property, {value, enumerable: true})

const getproppath = (object, ...properties) => properties.reduce(getprop, object)

const setproppath = (value, object, first, ...rest) => {
  if (first === undefined) return value
  switch (typeof object) {
    case 'object':
      if (object === null) return null
      object[first] = setproppath(value, object[first], ...rest)
      return object
    case 'string':
      const index = parseInt(first)
      return isFinite(first)
        ? object.slice(0, index) + value + object.slice(index)
        : object
  }
  return object
}

const tryReadFile = (file, value, ...args) =>
  jtry(() => readFileSync(file, ...args), () => value)

const help = () =>
  error(readFileSync(join(__dirname, 'help.txt'), 'utf8'))

const endhelp = () => {
  help()
  exit(0)
}

module.exports = {
  success,
  failure,
  getprop,
  setprop,
  getproppath,
  setproppath,
  tryReadFile,
  help,
  endhelp
}
