# elm-server

An npm package for compiling, serving, and hot-reloading Elm code.

#### Installation

```sh
$ npm install -g elm-server
```

#### Getting started
By default elm-server will direct produce and serve an html file in your current directory.

```sh
$ elm-server path/to/Main.elm
```

#### Usage

```sh
  Usage: bin [options] <inputFile> [inputFiles...]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -o, --output <path>      Path to elm-make output [index.html].
    -w, --watch <directory>  Path to served directory.  If provi
                             ded, will prefix output file path.
                              Defaults to directory of output fi
                             le path.
```

###### output

In most cases you'll want to specify an output file path in your project's assets directory.

```sh
$ elm-server src/elm/Main.elm --output assets/js/elm.js
```

###### watch

Specifying a watched directory is useful when you want to serve assets in development which aren't generated from elm-make, like images and css.

```sh
$ elm-server src/elm/Main.elm --output js/elm.js --watch assets
```

This will allow elm-server to serve all files in the assets directory.

#### Programmatic Usage

In addition to providing a cli, elm-server can also be called programmatically.

```javascript
const elmServer = require('elm-server');

elmServer('src/elm/Main.elm', { output: 'js/elm.js', watch: 'assets' });
```

or in the case of multiple entrypoints,

```javascript
const elmServer = require('elm-server');

elmServer(['src/elm/Main1.elm', 'src/elm/Main2.elm'], { output: 'js/elm.js', watch: 'assets' });
```
