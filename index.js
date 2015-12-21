'use strict';
const browserSync = require('browser-sync');
const chokidar = require('chokidar');
const spawn = require('child_process').spawn;
const platform = require('elm/platform');
const path = require('path');
const fs = require('fs');
const elmPackage = require(path.join(__dirname, 'elm-package'));

process.env.ELM_HOME = platform.shareDir;

module.exports = function elmServer(inputFilesArg, optsArg) {
  const opts = optsArg || {};
  const inputFiles = inputFilesArg instanceof Array ?
    inputFilesArg :
    [inputFilesArg];

  const outputFile =
    !opts.output ?
      'index.html' :
      opts.output;

  const watch = opts.watch || path.dirname(outputFile);
  const startPath =
    opts.startPath ||
    (path.extname(outputFile) === '.html' ?
      path.basename(outputFile) :
      '/');

  function elmMake() {
    const makeArgs = inputFiles.concat(['--output', outputFile]);
    const executablePath = platform.executablePaths['elm-make'];

    spawn(executablePath, makeArgs, { stdio: 'inherit' });
  }

  elmMake();

  chokidar
    .watch(elmPackage['source-directories'])
    .on('change', elmMake);

  return browserSync({
    server: watch,
    startPath: startPath,
    files: [path.join(watch, '**', '*')]
  });
}
