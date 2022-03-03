export class AppChannel {
  static messages: any[] = [];
  static add(message){
      this.messages.push(message)
  }
  static remove(message){
      this.messages.splice(this.messages.indexOf(message));
  }
}
