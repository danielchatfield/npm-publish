# npm-publish [![Build Status](https://secure.travis-ci.org/danielchatfield/npm-publish.png?branch=master)](http://travis-ci.org/danielchatfield/npm-publish) [![Dependency Status](https://david-dm.org/danielchatfield/npm-publish.png)](https://david-dm.org/danielchatfield/npm-publish)

A cross platform script to publish NPM modules. Based on `npm-release` but rewritten to add support for windows.

## What it does

 * Bumps version number in `package.json`
 * Pushes to git
 * Publishes to npm

## Installation
Install the module with: `npm install -g npm-publish`

## Usage

```shell
npm-publish [<newversion> | major | minor | patch] -m "message" -f "Force message"
```

`newversion` publishes the specified version
Major, minor and patch increase a semver compatible version number.

Use the `-m` flag to customise the release commit message.

Use the `-f` flag to stage and commit all changes before releasing with the specified message.


## License
Copyright (c) 2013 Daniel Chatfield. Licensed under the MIT license.
