#! /usr/bin/env node
'use strict';
const commander = require('commander');
const chunk = require('lodash.chunk');
const times = require('lodash.times');
const elmServer = require('.');
const version = require('./package.json').version;

commander
  .version(version)
  .option('-o, --output <path>', 'Path to elm-make output [index.html].')
  .usage('[options] <pathe> [paths...]')

const descriptionWidth = 35;
const descriptionPadding = commander.largestOptionLength() + 6;
const unformattedWatchDescription = 'Path to served directory.  If provided, ' +
  'will prefix output file path.  Served assets are live reloaded.  Useful' +
  ' for watching and serving non-html non-js assets.  Defaults to directory ' +
  'of output file path.';

const watchDescription =
  chunk(unformattedWatchDescription, descriptionWidth)
    .map((line, i) => {
      return i === 0 ?
        line :
        times(descriptionPadding, ()=> ' ').concat(line);
    })
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
