#! /usr/bin/env node
'use strict';
const commander = require('commander');
const chunk = require('lodash.chunk');
const elmServer = require('.');
const version = require('./package.json').version;

commander
  .version(version)
  .option('-o, --output <path>', 'Path to elm-make output [index.html].')
  .option('-s, --start-path <path>', 'Initial path when opening browser.')
  .usage('[options] <inputFile> [inputFiles...]')

const descriptionWidth = 35;
const unformattedWatchDescription = 'Path to served directory.  Defaults to directory of output file path.';

const watchDescription =
  chunk(unformattedWatchDescription, descriptionWidth)
    .map(line => line.join(''))
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
