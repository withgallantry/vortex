"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commands = {
	CMD_WAKE: 0xB0,
	CMD_SEED: 0xB1,
	CMD_CHAL: 0xB3,
	CMD_COL: 0xC0,
	CMD_GETCOL: 0xC1,
	CMD_FADE: 0xC2,
	CMD_FLASH: 0xC3,
	CMD_FADRD: 0xC4,
	CMD_FADAL: 0xC6,
	CMD_FLSAL: 0xC7,
	CMD_COLAL: 0xC8,
	CMD_TGLST: 0xD0,
	CMD_READ: 0xD2,
	CMD_WRITE: 0xD3,
	CMD_MODEL: 0xD4,
	CMD_PWD: 0xE1,
	CMD_ACTIVE: 0xE5,
	CMD_LEDSQ: 0xFF
};

var constants = function () {
	function constants() {
		_classCallCheck(this, constants);
	}

	_createClass(constants, null, [{
		key: "attach",
		value: function attach(obj) {
			for (var k in commands) {
				Object.defineProperty(obj, k, {
					value: commands[k],
					enumerable: false
				});
			}
		}
	}]);

	return constants;
}();

exports.default = constants;