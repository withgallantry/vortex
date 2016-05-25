var ld = require ('../');

var tp = new ld.ToyPadEmu ();
var restify = require ('restify');
var verify = require ('./libs/verify');

tp.registerDefaults ();
var tag = require ('./libs/tag') (tp);

function processCreateTagData (req, res, next) {
  verify.verifyCreateTagData (req.params)
    .then (tag.createNewTag)
    .then (function (tag) {
    res.send (200, tag);
  })
    .catch (function (err) {
    res.send (500, err);
  });
  next ();
};

function processPlaceTagData (req, res, next) {
  verify.verifyPlaceTagData (req.params)
    .then (tag.placeTag)
    .then (function () {
    res.send (200);
  }).catch (function (err) {
    res.send (500, "Something went wrong");
  });
  next ();
};

function beginBruteForceAttack () {

  var tagId = 1;
  var lastPlaced = {};

  function createCharTagFromId (id) {
    var newTag = {
      type: 'character',
      id: id
    }

    return tag.createNewTag (newTag);
  }

  function placeFirstTag () {
    return new Promise (function (resolve, reject) {
      createCharTagFromId (tagId)
        .then (function (tagData) {
        tagData.pad = 2;
        tagData.padPosition = 0;
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
    console.log('Create From: ' + tagId);
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
    console.log('SETTING TIMER');
    setInterval (incrementCharacters, 7000);

  })

}

var server = restify.createServer ();
server.use (restify.bodyParser ({ mapParams: true }));
server.post ('/api/tag/create', processCreateTagData);
server.post ('/api/tag/place', processPlaceTagData);
server.post ('/api/tag/brute', beginBruteForceAttack);

server.listen (9090, function () {
  console.log ('%s listening at %s', server.name, server.url);
});



