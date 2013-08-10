#!/usr/bin/env node
'use strict';
var argv = require('optimist').argv;
var async = require('async');
var chalk = require('chalk');
var cmdify = require('cmdify');
//var exec = require('child_process').exec;
var Insight = require('insight');
var fs = require('fs');
var nopt = require('nopt');
var os = require('os');
var path = require('path');
var pkg = require('../package.json');
var spawn = require('child_process').spawn;
var updateNotifier = require('update-notifier');

var cli = module.exports;

cli.npmPublish = function(version) {
  var self = this;

  var exit = function () {
    console.log(chalk.red([].slice.call(arguments).join(' ')));
    process.exit(-1);
  };

  var error = exit.bind(null, 'Error:');

  var success = function () {
    console.log(chalk.green([].slice.call(arguments).join(' ')));
  };

  var msg = function () {
    console.log(chalk.cyan([].slice.call(arguments).join(' ')));
  };

  var getPkg = function () {
    var pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './package.json')));
    } catch(e) {
      error(' Could not open and parse package.json.');
    }
    return pkg;
  };

  var getCurrentVersion = function () {
    return getPkg().version;
  };

  var done = function () {
    success('Released new version ' + getCurrentVersion() + ' successfully.');
    process.exit(0);
  };


  var bumpVersion = function (cb) {
    msg('Updating version...');

    var npm = spawn(cmdify('npm'), ['version', this.version, '-m', this.message || "Release v%s."]);
    npm.stdout.pipe(process.stdout);
    npm.stderr.pipe(process.stderr);

    npm.on('close', cb);
  }.bind(cli);

  var gitPush = function (cb) {
    msg('Pushing...');
    var git = spawn('git', ['push']);

    git.stdout.pipe(process.stdout);
    git.stderr.pipe(process.stderr);

    git.on('close', cb);
  };

  var gitTag = function (cb) {
    msg('Tagging...');
    var git = spawn('git', ['push', '--tags']);

    git.stdout.pipe(process.stdout);
    git.stderr.pipe(process.stderr);

    git.on('close', cb);
  };

  var npmPublish = function (cb) {
    if (getPkg().private) {
      msg("This is a private repo so npm publish cancelled.");
      return cb();
    }
    msg('Publishing to npm...');
    var npm = spawn(cmdify('npm'), ['publish']);
    npm.stdout.pipe(process.stdout);
    npm.stderr.pipe(process.stderr);

    npm.on('close', cb);
  };

  var onSuccess = function (cb) {
    success('Version bumped from', cli.oldVersion, 'to', getCurrentVersion());
    cb();
  };


  cli.version = version;
  cli.oldVersion = getCurrentVersion();
  cli.message = argv.m || argv.message;

  if (!cli.oldVersion) {
    error('No version in package.json found.');
  }
  if (!cli.version){
    error('No version supplied.');
  }

  async.series([bumpVersion, gitPush, gitTag, npmPublish, onSuccess]);
};
