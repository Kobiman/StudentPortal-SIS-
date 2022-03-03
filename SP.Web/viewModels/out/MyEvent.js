export class MyEvent {
    constructor() {
        this.actions = [];
    }
    add(func) {
        this.actions.push(func);
    }
    execute() {
        for (var action of this.actions)
            action();
    }
}
//# sourceMappingURL=MyEvent.js.map