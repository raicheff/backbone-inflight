/*
 * Backbone.Inflight
 *
 * Copyright (C) 2016 Boris Raicheff
 * All rights reserved
 */

(function(global, factory) {

  if (typeof exports === "object") {
    module.exports = factory(require("underscore"), require("backbone"));
  } else if (typeof define === "function" && define.amd) {
    define(["underscore", "backbone"], factory);
  } else {
    factory(global._, global.Backbone);
  }

})(this, function(_, Backbone) {

  "use strict";

  /*
   * http://bl.ocks.org/jwhitfieldseed/ba11edf04529c4603323
   *
   * Patches Backbone's `Model` and `Collection` to have awareness of current sync state.
   * Adds an `isLoading` method and `_inflight` count property.
   *
   * Based on http://tbranyen.com/post/how-to-indicate-backbone-fetch-progress
   */

  _([Backbone.Model, Backbone.Collection]).each(function(Class) {

    var sync = Class.prototype.sync;

    _(Class.prototype).extend({

      _inflight: 0,

      isLoading: function() {
        return this._inflight > 0;
      },

      sync: function() {
        ++this._inflight;
        return sync.apply(this, arguments).always(function() { --this._inflight; }.bind(this));
      }

    });

  });

});

/* EOF */
