'use strict'
class utilityBase {
  static include (mixin) {
    Object.getOwnPropertyNames (mixin)
      .forEach ((property) => {
      if (typeof this[property] === 'undefined')
        this[property] = mixin[property];
    });
  }
}

module.exports = utilityBase;