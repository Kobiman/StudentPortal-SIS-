export class Command {
  private actions = [];
  add(func: () => void) {
    this.actions.push(func);
  }

  execute() {
    for (var action of this.actions){
     action();
  }
}
}
