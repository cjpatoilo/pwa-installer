<a align="center" href="https://cjpatoilo.com/pwa-installer"><img width="100%" src="https://cjpatoilo.com/pwa-installer/assets/icons/thumbnail.png" alt="PWA Installer - Zero-configuration installer for PWA features."></a>

> Zero-configuration installer for PWA features.

[![Travis Status](https://travis-ci.org/cjpatoilo/pwa-installer.svg?branch=master)](https://travis-ci.org/cjpatoilo/pwa-installer?branch=master)
[![AppVeyor Status](https://ci.appveyor.com/api/projects/status/3e7283286e2147c78c41eac515714429?svg=true)](https://ci.appveyor.com/project/cjpatoilo/pwa-installer)
[![Codacy Status](https://img.shields.io/codacy/grade/99f45f0e32c649e79db8ba48c66b468f/master.svg)](https://www.codacy.com/app/cjpatoilo/pwa-installer/dashboard)
[![Dependencies Status](https://david-dm.org/cjpatoilo/pwa-installer.svg)](https://david-dm.org/cjpatoilo/pwa-installer)
[![Version Status](https://badge.fury.io/js/pwa-installer.svg)](https://www.npmjs.com/package/pwa-installer)
[![Download Status](https://img.shields.io/npm/dt/pwa-installer.svg)](https://www.npmjs.com/package/pwa-installer)
[![Gitter Chat](https://img.shields.io/badge/gitter-join_the_chat-4cc61e.svg)](https://gitter.im/cjpatoilo/pwa-installer)


## Why it's awesome

Zero-configuration installer for PWA features. Although [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) works great as a light-weight tool to quickly install service worker support, it currently does not provide much functionality for installing specific "features".

**Features**

- [ ] Read config from `pwa.config.js`
- [ ] Inject preload e prefetch tags on html files
- [ ] Generate manifesto.json file
- [x] Generate `service-worker.js` (files)
- [x] Generate hashs in scripts and styles files (files)
- [x] Automate `service-worker.js` call in your `html` files


## Install

**Install with npm**

```sh
$ npm i pwa-installer
```

**Install with Yarn**

```sh
$ yarn add pwa-installer
```

**Run with npx (without installing)**

```sh
$ npx pwa-installer
```

*NOTE: Install this npm package with the flag `-g` or `--global` for global use. Install with the flag `-D` or `--save-dev` for add the package as a devDependency of your project.*


## Usage

```
$ pwa-installer --help

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
```

NOTE: `dist` is output by default when output is undefined. If you don't define a specific file the support will be extended to all `.html` files.


## Contributing

Want to contribute? Follow these [recommendations](.github/contributing.md).


## License

Designed with ♥ by [CJ Patoilo](https://twitter.com/cjpatoilo). Licensed under the [MIT License](license).
