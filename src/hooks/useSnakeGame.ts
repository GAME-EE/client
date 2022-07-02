import { useReducer } from 'react';

import { SNAKE } from '../constants';

import type { IObjectBody } from '../types/canvas';
import type {
  ISnakeGameHook,
  ISnakeState,
  SnakeDirectionType,
  ISnakeGameAction,
} from '../types/snake';

export const SNAKE_ACTIONS = {
  GAME_START: 'GAME START',
  GAME_OVER: 'GAME OVER',
  MOVE: 'MOVE',
  STOP: 'STOP', // TODO: 정지 없애기
  CHANGE_DIRECTION: 'CHANGE_DIRECTION',
  ADD_SNAKE_BODY: 'ADD_SNAKE_BODY',
  CHANGE_FOOD_POSITION: 'CHANGE_FOOD_POSITION',
  RESET: 'RESET',
  CHANGE_FRAME: 'CHANGE_FRAME',
};

const SNAKE_BODY_INITIAL = [
  { x: SNAKE.SNAKE_BODY_WIDTH_UNIT * 9, y: SNAKE.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE.SNAKE_BODY_WIDTH_UNIT * 8, y: SNAKE.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE.SNAKE_BODY_WIDTH_UNIT * 7, y: SNAKE.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE.SNAKE_BODY_WIDTH_UNIT * 6, y: SNAKE.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE.SNAKE_BODY_WIDTH_UNIT * 5, y: SNAKE.SNAKE_BODY_HEIGHT_UNIT * 5 },
];

const INITIAL_STATE: ISnakeState = {
  snakeBody: SNAKE_BODY_INITIAL,
  snakeDirection: SNAKE.SNAKE_RIGHT_DIRECTION,
  snakeBodyLength: 5,
  foodPosition: {
    x: 150,
    y: 75,
  },
  currentFrame: SNAKE.FRAME_START,
  isPlaying: false,
};

const moveSnakeWithDirection = (snakeBody: IObjectBody[], direction: SnakeDirectionType) => {
  let xDelta = 0;
  let yDelta = 0;

  if (direction === SNAKE.SNAKE_RIGHT_DIRECTION) xDelta = SNAKE.SNAKE_BODY_WIDTH_UNIT;
  if (direction === SNAKE.SNAKE_LEFT_DIRECTION) xDelta = -SNAKE.SNAKE_BODY_WIDTH_UNIT;
  if (direction === SNAKE.SNAKE_DOWN_DIRECTION) yDelta = SNAKE.SNAKE_BODY_HEIGHT_UNIT;
  if (direction === SNAKE.SNAKE_UP_DIRECTION) yDelta = -SNAKE.SNAKE_BODY_HEIGHT_UNIT;

  let newSnake = [...snakeBody];

  newSnake = [
    {
      x: snakeBody[0].x + xDelta,
      y: snakeBody[0].y + yDelta,
    },
    ...newSnake,
  ];

  newSnake.pop();

  return newSnake;
};

const reducer = (state: ISnakeState, action: ISnakeGameAction): ISnakeState => {
  switch (action.type) {
    case SNAKE_ACTIONS.GAME_START:
      return {
        ...state,
        isPlaying: true,
      };
    case SNAKE_ACTIONS.GAME_OVER:
      return {
        ...state,
        isPlaying: false,
      };
    case SNAKE_ACTIONS.MOVE:
      return {
        ...state,
        snakeBody: moveSnakeWithDirection(state.snakeBody, state.snakeDirection),
      };
    case SNAKE_ACTIONS.ADD_SNAKE_BODY:
      return {
        ...state,
        snakeBody: [...state.snakeBody, state.snakeBody[state.snakeBody.length - 1]],
        snakeBodyLength: state.snakeBodyLength + 1,
      };
    case SNAKE_ACTIONS.CHANGE_DIRECTION:
      return {
        ...state,
        snakeDirection: action.payload,
      };
    case SNAKE_ACTIONS.CHANGE_FOOD_POSITION:
      return {
        ...state,
        // TODO: 유틸 함수로 빼기
        foodPosition: {
          x:
            Math.floor(
              Math.random() * (SNAKE.CANVAS_REAL_WIDTH_MAX / SNAKE.SNAKE_BODY_WIDTH_UNIT),
            ) * SNAKE.SNAKE_BODY_WIDTH_UNIT,
          y:
            Math.floor(
              Math.random() * (SNAKE.CANVAS_REAL_HEIGHT_MAX / SNAKE.SNAKE_BODY_HEIGHT_UNIT),
            ) * SNAKE.SNAKE_BODY_HEIGHT_UNIT,
        },
      };
    case SNAKE_ACTIONS.RESET:
      return {
        ...INITIAL_STATE,
      };
    case SNAKE_ACTIONS.CHANGE_FRAME:
      return {
        ...state,
        currentFrame: state.currentFrame - SNAKE.FRAME_DOWN_UNIT,
      };
    // TODO: 정지 없애기
    case SNAKE_ACTIONS.STOP:
      return {
        ...state,
        snakeDirection: SNAKE.SNAKE_STOP,
      };
    default:
      return state;
  }
};

const useSnakeGame = (): ISnakeGameHook => {
  const [
    { snakeBody, snakeDirection, foodPosition, snakeBodyLength, currentFrame, isPlaying },
    snakeGameDispatch,
  ] = useReducer(reducer, INITIAL_STATE);

  return {
    isPlaying,
    snakeBody,
    snakeDirection,
    snakeBodyLength,
    foodPosition,
    currentFrame,
    snakeGameDispatch,
  };
};

export default useSnakeGame;
