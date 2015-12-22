'use strict';
var browserSync = require('browser-sync');
var chokidar = require('chokidar');
var spawn = require('child_process').spawn;
var platform = require('elm/platform');
var path = require('path');
var fs = require('fs');
var elmPackage = require(path.join(process.cwd(), 'elm-package'));

var sourceDirectories =
  elmPackage['source-directories']
    .map(function createGlob(directory) {
      return path.join(directory, '**', '*.elm');
    });

process.env.ELM_HOME = platform.shareDir;

module.exports = function elmServer(inputFilesArg, optsArg) {
  var opts = optsArg || {};
  var inputFiles = inputFilesArg instanceof Array ?
    inputFilesArg :
    [inputFilesArg];

  var outputFile =
    !opts.output ?
      'index.html' :
      opts.output;

  var watch = opts.watch || path.dirname(outputFile);
  var startPath =
    opts.startPath ||
    (path.extname(outputFile) === '.html' ?
      path.basename(outputFile) :
      '/');

  function elmMake() {
    var makeArgs = inputFiles.concat(['--output', outputFile]);
    var executablePath = platform.executablePaths['elm-make'];

    spawn(executablePath, makeArgs, { stdio: 'inherit' });
  }

  elmMake();

  chokidar
    .watch(sourceDirectories, { ignored: /elm-stuff/ })
    .on('change', elmMake);

  return browserSync({
    server: watch,
    watchOptions: {
      ignored: /(elm-stuff|\.elm)/
    },
    startPath: startPath,
    files: [path.join(watch, '**', '*')]
  });
};
