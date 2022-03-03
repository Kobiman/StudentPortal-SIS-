export interface IView {
  render(elementId: string): void;
  //render(elementId: string): Promise<void>;
  oninitialized(): Promise<void>;
}
