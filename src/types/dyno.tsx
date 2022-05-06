export interface IDino {
  width: number;
  height: number;
  x: number;
  y: number;
  maxY: number; //공룡이 올라갈수 있는 최대 높이
  image?: HTMLImageElement;
}
export interface IObstacle {
  width: number;
  height: number;
  x: number;
  y: number;
  color?: '#6B46C1';
  image?: HTMLImageElement;
}
