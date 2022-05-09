export interface ICanvasObject {
  width: number;
  height: number;
  x: number;
  y: number;
  image?: HTMLImageElement;
}
export interface IDino extends ICanvasObject {
  maxY: number; //공룡이 올라갈수 있는 최대 높이
}
export interface IObstacle extends ICanvasObject {
  color?: '#6B46C1';
}
