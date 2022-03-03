export class Command {
    constructor() {
        this.actions = [];
    }
    add(func) {
        this.actions.push(func);
    }
    execute() {
        for (var action of this.actions) {
            action();
        }
    }
}
//# sourceMappingURL=Command.js.map