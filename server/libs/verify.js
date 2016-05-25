module.exports = {
  verifyCreateTagData: function (tagData) {
    return new Promise (function (resolve, reject) {
      if (tagData.type === "character" || tagData.type === "vehicle") {
        resolve (tagData)
      } else {
        reject (tagData)
      }
    })

  },
  verifyPlaceTagData: function (tagData) {
    return new Promise (function (resolve, reject) {
      if (typeof tagData.uid !== "undefined" && typeof tagData.pad !== "undefined"  && typeof tagData.padPosition !== "undefined") {
        resolve (tagData)
      } else {
        reject (tagData)
      }
    })

  }
}