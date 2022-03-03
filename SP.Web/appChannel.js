"use strict";
exports.__esModule = true;
exports.AppChannel = void 0;
var AppChannel = /** @class */ (function () {
    function AppChannel() {
    }
    AppChannel.add = function (message) {
        this.messages.push(message);
    };
    AppChannel.remove = function (message) {
        this.messages.splice(this.messages.indexOf(message));
    };
    AppChannel.messages = [];
    return AppChannel;
}());
exports.AppChannel = AppChannel;
