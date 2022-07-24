import { IGameLevel, IJumpState, IObstacle, IPlayState, IUnit, IGameState } from '../types/dyno';

export default Object.freeze({
  GAME_LEVEL_UP_TIME: 600,
  GAME_MAX_LEVEL: 4,

  OBSTACLE_CREATE_TIME: 120,
  INIT_OBSTACLE_SPEED: 10,

  JUMP_HEIGHT: 200,
  JUMP_MAX_LEVEL: 2,
  DOWN_PLUS_SPEED: 3,

  ACCELERATION_UP: 0.002,
  ACCELERATION_DOWN: 0.01,
});

export const CANVAS_OBJECT = {
  width: 1200,
  height: 600,
};

export const INIT_JUMP_STATE: IJumpState = Object.freeze({
  isjumping: false,
  level: 0,
  maxY: 0,
  speed: 13,
});

export const UNIT_OBJECT: IUnit = Object.freeze({
  width: 80,
  height: 80,
  x: 80,
  y: CANVAS_OBJECT.height - 80,
});

const OBSTACLE_OBJECT: IObstacle = Object.freeze({
  width: 100,
  height: 100,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 100,
  imageURL: '/cactus.png',
  blank: {
    topLeft: 40,
    topRight: 10,
  },
});

const OBSTACLE_OBJECT_V2: IObstacle = Object.freeze({
  width: 150,
  height: 150,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 150,
  imageURL: '/dino1.png',
  blank: {
    topLeft: 40,
    topRight: 60,
  },
});

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
