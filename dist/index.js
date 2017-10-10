(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./helloworld', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./helloworld'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.helloworld, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (_helloworld) {
  'use strict';

  (0, _helloworld.hello)('world');
});