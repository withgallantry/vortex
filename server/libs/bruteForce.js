'use strict'
class bruteForce {

  static bruteForce () {
    let tagId = 1;
    let lastPlaced = {};

    function createCharTagFromId (id) {
      let newTag = {
        type: 'character',
        id: id,
        pad: 2
      }

      return tag.createNewTag (newTag);
    }

    function placeFirstTag () {
      return new Promise (function (resolve, reject) {
        createCharTagFromId (tagId)
          .then (function (tagData) {
          tag.placeTag (tagData).then (function (placedTag) {
            lastPlaced = placedTag;
            resolve (placedTag);
          });

        });
      });
    }

    function incrementCharacters () {
      tagId++;

      tag.removeTag (lastPlaced);
      console.log ('Create From: ' + tagId);
      createCharTagFromId (tagId)
        .then (function (tagData) {
        tagData.pad = 2;
        tagData.padPosition = 0;
        tag.placeTag (tagData)
          .then (function (placedTag) {
          lastPlaced = placedTag;
        });
      });
    }

    placeFirstTag ()
      .then (function (data) {
      console.log ('SETTING TIMER');
      setInterval (incrementCharacters, 7000);

    })
  }


}

module.exports = bruteForce;