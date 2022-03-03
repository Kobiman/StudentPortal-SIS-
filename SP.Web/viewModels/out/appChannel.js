export class AppChannel {
    static add(message) {
        this.messages.push(message);
    }
    static remove(message) {
        this.messages.splice(this.messages.indexOf(message));
    }
}
AppChannel.messages = [];
//# sourceMappingURL=appChannel.js.map