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
    -s, --start-path <path>  Initial path when opening browser.
    -a. --spa                Set to something to enable single page application mode
    -w, --watch <directory>  Path to served directory.  Defaults
                              to directory of output file path.
```

###### output

In most cases you'll want to specify an output file path in your project's assets directory.

```sh
$ elm-server src/elm/Main.elm --output assets/index.html
```

###### watch

Specifying a watched directory is useful when you want to serve assets in development which aren't generated from elm-make, like images and css.

```sh
$ elm-server src/elm/Main.elm --output assets/html/index.html --watch assets
```

This will allow elm-server to serve all files in the assets directory.

###### start-path

The initial path opened in the browser on start, for convenience.

```sh
$ elm-server src/elm/Main.elm \
    --output assets/js/elm.js \
    --watch assets \
    --start-path html/index.html
```

###### spa
When you have a Single Page Application with routing on the client side, this mode is for you. It uses the [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) library.

It currently assumes that you are using index.html as the entry point for your app.



#### Programmatic Usage

In addition to providing a cli, elm-server can also be called programmatically.

```javascript
const elmServer = require('elm-server');

elmServer('src/elm/Main.elm', {
  output: 'assets/js/elm.js',
  watch: 'assets'
});
```

or in the case of multiple entrypoints,

```javascript
const elmServer = require('elm-server');

elmServer(['src/elm/Main1.elm', 'src/elm/Main2.elm']);
```
