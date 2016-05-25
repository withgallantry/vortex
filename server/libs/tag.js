module.exports = function (tp) {

  var self = this;

  this.createNewTag = function (tagData) {
    return new Promise (function (resolve, reject) {
      if (tagData.type === 'character') {
        resolve (self.createCharacter (tagData.id));
      } else {
        resolve (self.createVehicle (tagData.id, [0xEFFFFFFF, 0xEFFFFFFF]));
      }
    });
  };

  this.placeTag = function (tag) {
    return new Promise (function (resolve, reject) {
      var tagBuffer = new Buffer (tag.buffer.data ? tag.buffer.data : tag.buffer);
      var tagData = tp.place (tagBuffer, tag.pad, tag.padPosition, tag.uid)
      resolve(tagData);
    });
  };

  this.removeTag = function(tag) {
    tp.remove(tag);
  };

  this.createVehicle = function (id, upgrades) {
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
  };

  this.createCharacter = function (id) {
    var token = {};
    token.buffer = new Buffer (180);
    token.buffer.fill (0); // Game really only cares about 0x26 being 0 and D4 returning an ID
    token.uid = tp.randomUID ();
    token.id = id;
    return token;
  };

  return this;
};