#! /usr/bin/env node
'use strict';
var commander = require('commander');
var chunk = require('lodash.chunk');
var elmServer = require('./index');
var version = require('./package.json').version;

commander
  .version(version)
  .option('-o, --output <path>', 'Path to elm-make output [index.html].')
  .option('-s, --start-path <path>', 'Initial path when opening browser.')
  .usage('[options] <inputFile> [inputFiles...]');

var descriptionWidth = 35;
var unformattedWatchDescription = 'Path to served directory.  Defaults to directory of output file path.';

var watchDescription =
  chunk(unformattedWatchDescription, descriptionWidth)
    .map(function(line) {
      return line.join('');
    })
    .join('\n');

commander
  .option('-w, --watch <directory>', watchDescription)
  .parse(process.argv);

if (!commander.args.length) {
  console.log('\n  Invalid arguments: missing inputFile');
  commander.help();
  process.exit();
}

elmServer(commander.args, {
  output: commander.output,
  startPath: commander.startPath,
  watch: commander.watch
});
