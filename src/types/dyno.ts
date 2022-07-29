export interface ICanvasObject {
  width: number;
  height: number;
  x: number;
  y: number;
  image?: HTMLImageElement;

  blank?: {
    // 굳이 width, height로 나누어야 할까
    topLeft: number;
    topRight: number;
  };
}

export type IUnit = ICanvasObject;

export interface IObstacle extends ICanvasObject {
  imageURL: string;
  speed?: number;
}

export interface IJumpState {
  isjumping: boolean; //점프하고있는지
  level: number;
  maxY: number; //점프 최대 높이
  speed: number;
}

export interface IGameLevel {
  [key: number]: {
    speed: number;
    obstacleList: Array<IObstacle>;
  };
}
