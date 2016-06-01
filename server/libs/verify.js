'use strict'
class verify {
  static tagRequestData (req, res) {
    var tagData = req.params;
    return new Promise (function (resolve, reject) {
      if (tagData.type === "character" || tagData.type === "vehicle") {
        resolve ({ res: res, tagData: tagData });
      } else if (typeof tagData.uid !== "undefined" && typeof tagData.pad !== "undefined") {
        resolve ({ res: res, tagData: tagData });
      } else {
        reject ();
      }
    })

  }
}

module.exports = verify;