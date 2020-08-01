#!/usr/bin/env node
'use strict'
const rasper = require('rasper')
const pkg = require('./package.json')
const app = require('./index')
const options = process.argv[0].match(/node/i)
  ? rasper(process.argv.slice(2))
  : rasper()

if (options.help || options.h) help()
if (options.version || options.v) version()
app(options)

function help () {
  console.info(`
  Usage:

    $ pwa-installer <directory> [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version
    -c, --config              Display help information

  Examples:

    $ pwa-installer dist
    $ pwa-installer dist --config=pwa.config.js
`)
  process.exit(1)
}

function version () {
  console.info(pkg.version)
  process.exit(1)
}
