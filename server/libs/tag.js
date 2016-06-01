'use strict'
module.exports = function (tp) {
  class virtualTag {

    static createCharacter (id) {
      var token = {};
      token.buffer = new Buffer (180);
      token.buffer.fill (0); // Game really only cares about 0x26 being 0 and D4 returning an ID
      token.uid = tp.randomUID ();
      token.id = id;
      return token;
    }

    static createVehicle (id, upgrades) {
      upgrades = upgrades || [0, 0];
      var token = {};
      token.buffer = new Buffer (180);
      token.buffer.fill (0);
      token.uid = tp.randomUID ();
      token.buffer.writeUInt32LE (upgrades[0], 0x23 * 4);
      token.buffer.writeUInt16LE (id, 0x24 * 4);
      token.buffer.writeUInt32LE (upgrades[1], 0x25 * 4);
      token.buffer.writeUInt16BE (1, 0x26 * 4);
      return token;
    }

    static createNewTag (args) {
      var res = args.res;
      var tagData = args.tagData;

      return new Promise ((resolve, reject) => {
        if (tagData.type === 'character') {
          resolve ({ res: res, constructedTagData: virtualTag.createCharacter (tagData.id) });
        } else {
          resolve ({ res: res, constructedTagData: virtualTag.createVehicle (tagData.id, [0xEFFFFFFF, 0xEFFFFFFF]) });
        }
      });
    }

    static placeTag (tag) {
      return new Promise (function (resolve, reject) {
        var tagBuffer = new Buffer (tag.buffer.data ? tag.buffer.data : tag.buffer);
        tagBuffer.id = tag.id;
        var tagData = tp.place (tagBuffer, tag.pad, undefined, tag.uid);
        resolve (tagData);
      });
    }

    static removeTag (tag) {
      tp.remove (tag);
    }

  }

  return virtualTag;
}