import { IGameLevel, IJumpState, IObstacle, IPlayState, IUnit } from '../types/dyno';

export const CANVAS_OBJECT = {
  width: 1200,
  height: 600,
};

export const INIT_PLAY_STATE: IPlayState = {
  timer: 0,
  level: 1,
  animation: undefined,
};
export const INIT_JUMP_STATE: IJumpState = {
  isjumping: false,
  level: 0,
  maxY: 0,
  speed: 13,
};

export const UNIT_OBJECT: IUnit = {
  width: 80,
  height: 80,
  x: 80,
  y: CANVAS_OBJECT.height - 80,
};

const OBSTACLE_OBJECT: IObstacle = {
  width: 100,
  height: 100,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 100,
  imageURL: '/cactus.png',
  blank: {
    topLeft: 40,
    topRight: 10,
  },
};
const OBSTACLE_OBJECT_V2: IObstacle = {
  width: 150,
  height: 150,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 150,
  color: '#6B46C1',
  imageURL: '/dino1.png',

  blank: {
    topLeft: 40,
    topRight: 60,
  },
};

export const GAME_MAX_LEVEL = 4;
export const GAME_LEVEL: IGameLevel = {
  1: {
    speed: 14,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  2: {
    speed: 14,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  3: {
    speed: 16,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  4: {
    speed: 16,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
};
