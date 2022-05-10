export interface ICanvasObject {
  width: number;
  height: number;
  x: number;
  y: number;
  image?: HTMLImageElement;
}
export interface IUnit extends ICanvasObject {
  maxY: number; //공룡이 올라갈수 있는 최대 높이
  color?: string;
}
export interface IObstacle extends ICanvasObject {
  color?: string;
}
export interface IPlayState {
  timer: number;
  level: number;
  animation?: number;
}
export interface IJumpState {
  level: number;
  maxY: number;
  isjumping: boolean;
}
export interface IGameLevel {
  [key: number]: Array<IObstacle>;
}
