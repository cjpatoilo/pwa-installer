#!/usr/bin/env node
'use strict'
const options = require('rasper')()
const pkg = require('./package.json')
const app = require('./index')
const { info } = console
const { exit } = process

if (options.help || options.h) help()
if (options.version || options.v) version()
if (options.config || options.c) help()
app(options)

function help () {
	info(`
  Usage:

    $ pwa-installer [<output>] [<options>]

  Options:

    -h, --help              Display help information
    -v, --version           Output version
    -c, --config              Display help information

  Examples:

    $ pwa-installer
    $ pwa-installer dist/index.html
    $ pwa-installer dist --config=pwa.config.js
`)
	exit(1)
}

function version () {
	info(pkg.version)
	exit(1)
}
