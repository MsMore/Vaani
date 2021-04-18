"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APPROX_STATUSBAR_HEIGHT = void 0;

var _reactNative = require("react-native");

var _expoConstants = _interopRequireDefault(require("expo-constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APPROX_STATUSBAR_HEIGHT = _reactNative.Platform.select({
  android: _expoConstants.default.statusBarHeight,
  ios: _reactNative.Platform.Version < 11 ? _expoConstants.default.statusBarHeight : 0
});

exports.APPROX_STATUSBAR_HEIGHT = APPROX_STATUSBAR_HEIGHT;
//# sourceMappingURL=constants.expo.js.map