'use strict'
module.exports = function (tp) {
  var tag = require ('./tag') (tp);
  var verify = require ('./verify');
  var utilityBase = require('./utilityBase');

  class server extends utilityBase {

    static _sendGoodResponse (args) {
      let data = args.constructedTagData || args.placedTagData;
      let res = args.res;
      res.send (200, data);
    }

    static _sendBadResponse (args) {
      console.log (arguments);
    }

    static processCreateTagData (req, res, next) {
      verify.tagRequestData (req, res)
        .then (tag.createNewTag)
        .then (server._sendGoodResponse)
        .catch (server._sendBadResponse);
      next ();
    }

    static processPlaceTagData (req, res, next) {
      verify.tagRequestData (req, res)
        .then (tag.placeTag)
        .then (server._sendGoodResponse)
        .catch (server._sendBadResponse);
      next ();
    }

  }

  return server;
}