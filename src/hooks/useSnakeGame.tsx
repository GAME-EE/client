import { useCallback, useReducer } from 'react';

import type { IObjectBody } from '../types/canvas';
import { SNAKE_GAME } from '../constants';

const LEFT_DIRECTION = 'LEFT';
const RIGHT_DIRECTION = 'RIGHT';
const UP_DIRECTION = 'UP';
const DOWN_DIRECTION = 'DOWN';
const STOP = 'STOP';

export const SNAKE_ACTIONS = {
  MOVE: 'MOVE',
  STOP: 'STOP', // TODO: 정지 없애기
  CHANGE_DIRECTION_TO_LEFT: 'CHANGE_DIRECTION_TO_LEFT',
  CHANGE_DIRECTION_TO_RIGHT: 'CHANGE_DIRECTION_TO_RIGHT',
  CHANGE_DIRECTION_TO_UP: 'CHANGE_DIRECTION_TO_UP',
  CHANGE_DIRECTION_TO_DOWN: 'CHANGE_DIRECTION_TO_DOWN',
  ADD_SNAKE_BODY: 'ADD_SNAKE_BODY',
  CHANGE_FOOD_POSITION: 'CHANGE_FOOD_POSITION',
};

type SnakeGameAction =
  | { type: typeof SNAKE_ACTIONS.MOVE }
  | { type: typeof SNAKE_ACTIONS.STOP } // TODO: 정지 없애기
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN }
  | { type: typeof SNAKE_ACTIONS.ADD_SNAKE_BODY }
  | { type: typeof SNAKE_ACTIONS.CHANGE_FOOD_POSITION };

type SnakeDirection =
  | typeof LEFT_DIRECTION
  | typeof RIGHT_DIRECTION
  | typeof UP_DIRECTION
  | typeof DOWN_DIRECTION
  | typeof STOP; // TODO: 정지 없애기

interface SnakeState {
  snakeBody: IObjectBody[];
  snakeDirection: SnakeDirection;
  foodPosition: IObjectBody;
}

const SNAKE_BODY_INITIAL = [
  { x: SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT * 5, y: SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT * 6, y: SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT * 7, y: SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT * 8, y: SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT * 5 },
  { x: SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT * 9, y: SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT * 5 },
];

const INITIAL_STATE: SnakeState = {
  snakeBody: SNAKE_BODY_INITIAL,
  snakeDirection: RIGHT_DIRECTION,
  foodPosition: {
    x: 150,
    y: 75,
  },
};

const moveSnakeWithDirection = (snakeBody: IObjectBody[], direction: SnakeDirection) => {
  let xDelta = 0;
  let yDelta = 0;

  if (direction === 'RIGHT') xDelta = SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT;
  if (direction === 'LEFT') xDelta = -SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT;
  if (direction === 'DOWN') yDelta = SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT;
  if (direction === 'UP') yDelta = -SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT;

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

const reducer = (state: SnakeState, action: SnakeGameAction): SnakeState => {
  switch (action.type) {
    case SNAKE_ACTIONS.MOVE:
      return {
        ...state,
        snakeBody: moveSnakeWithDirection(state.snakeBody, state.snakeDirection),
      };
    case SNAKE_ACTIONS.ADD_SNAKE_BODY:
      return {
        ...state,
        snakeBody: [
          ...state.snakeBody,
          {
            x: state.snakeBody[state.snakeBody.length - 1].x + 10,
            y: state.snakeBody[state.snakeBody.length - 1].y + 10,
          },
        ],
      };
    case SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT:
      return {
        ...state,
        snakeDirection: LEFT_DIRECTION,
      };
    case SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT:
      return {
        ...state,
        snakeDirection: RIGHT_DIRECTION,
      };
    case SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP:
      return {
        ...state,
        snakeDirection: UP_DIRECTION,
      };
    case SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN:
      return {
        ...state,
        snakeDirection: DOWN_DIRECTION,
      };

    case SNAKE_ACTIONS.CHANGE_FOOD_POSITION:
      return {
        ...state,
        foodPosition: {
          x:
            Math.floor(Math.random() * (290 / SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT)) *
            SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT,
          y:
            Math.floor(Math.random() * (145 / SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT)) *
            SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT,
        },
      };
    // TODO: 정지 없애기
    case SNAKE_ACTIONS.STOP:
      return {
        ...state,
        snakeDirection: STOP,
      };
    default:
      return state;
  }
};

const useSnake = () => {
  const [{ snakeBody, snakeDirection, foodPosition }, snakeGameDispatch] = useReducer(
    reducer,
    INITIAL_STATE,
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowRight':
          snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT });
          break;
        case 'ArrowLeft':
          snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT });
          break;
        case 'ArrowUp':
          snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP });
          break;
        case 'ArrowDown':
          snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN });
          break;
        // TODO: 정지 없애기
        case 'Space':
          snakeGameDispatch({ type: SNAKE_ACTIONS.STOP });
          break;
        default:
          null;
      }
    },
    [snakeGameDispatch],
  );

  return {
    snakeBody,
    snakeDirection,
    foodPosition,
    snakeGameDispatch,
    handleKeyDown,
  };
};

export default useSnake;
