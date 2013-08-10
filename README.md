# npm-publish [![Build Status](https://secure.travis-ci.org/danielchatfield/npm-publish.png?branch=master)](http://travis-ci.org/danielchatfield/npm-publish)

A cross platform script to publish NPM modules. Based on `npm-release` but rewritten to add support for windows.

## What it does

 * Bumps version number in `package.json`
 * 

## Installation
Install the module with: `npm install -g npm-publish`

## Usage

`sh
npm-publish [<newversion> | major | minor | patch]
`

`sh
npm-publish 1.0.2 # publishes version 1.0.2
`


## License
Copyright (c) 2013 Daniel Chatfield. Licensed under the MIT license.
