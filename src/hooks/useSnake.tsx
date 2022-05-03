import { useCallback, useReducer } from 'react';

import type { ObjectBody } from '../types/canvas';

const LEFT_DIRECTION = 'LEFT';
const RIGHT_DIRECTION = 'RIGHT';
const UP_DIRECTION = 'UP';
const DOWN_DIRECTION = 'DOWN';
const STOP = 'STOP';

export const SNAKE_ACTIONS = {
  MOVE: 'MOVE',
  STOP: 'STOP',
  CHANGE_DIRECTION_TO_LEFT: 'CHANGE_DIRECTION_TO_LEFT',
  CHANGE_DIRECTION_TO_RIGHT: 'CHANGE_DIRECTION_TO_RIGHT',
  CHANGE_DIRECTION_TO_UP: 'CHANGE_DIRECTION_TO_UP',
  CHANGE_DIRECTION_TO_DOWN: 'CHANGE_DIRECTION_TO_DOWN',
};

type SnakeAction =
  | { type: typeof SNAKE_ACTIONS.MOVE }
  | { type: typeof SNAKE_ACTIONS.STOP }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN };

type SnakeDirection =
  | typeof LEFT_DIRECTION
  | typeof RIGHT_DIRECTION
  | typeof UP_DIRECTION
  | typeof DOWN_DIRECTION
  | typeof STOP;

interface SnakeState {
  snakeBody: ObjectBody[];
  snakeDirection: SnakeDirection;
}

const SNAKE_BODY_INITIAL = [
  { x: 50, y: 32 },
  { x: 60, y: 32 },
  { x: 70, y: 32 },
  { x: 80, y: 32 },
  { x: 90, y: 32 },
];

const INITIAL_STATE: SnakeState = {
  snakeBody: SNAKE_BODY_INITIAL,
  snakeDirection: RIGHT_DIRECTION,
};

const moveSnakeWithDirection = (snakeBody: ObjectBody[], direction: SnakeDirection) => {
  let xDelta = 0;
  let yDelta = 0;

  if (direction === 'RIGHT') xDelta = 10;
  if (direction === 'LEFT') xDelta = -10;
  if (direction === 'DOWN') yDelta = 8;
  if (direction === 'UP') yDelta = -8;

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

const reducer = (state: SnakeState, action: SnakeAction): SnakeState => {
  switch (action.type) {
    case SNAKE_ACTIONS.MOVE:
      return {
        ...state,
        snakeBody: moveSnakeWithDirection(state.snakeBody, state.snakeDirection),
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
  const [{ snakeBody, snakeDirection }, snakeDispatch] = useReducer(reducer, INITIAL_STATE);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowRight':
          snakeDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT });
          break;
        case 'ArrowLeft':
          snakeDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT });
          break;
        case 'ArrowUp':
          snakeDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP });
          break;
        case 'ArrowDown':
          snakeDispatch({ type: SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN });
          break;
        case 'Space':
          snakeDispatch({ type: SNAKE_ACTIONS.STOP });
          break;
        default:
          null;
      }
    },
    [snakeDispatch],
  );

  return {
    snakeBody,
    snakeDirection,
    snakeDispatch,
    handleKeyDown,
  };
};

export default useSnake;
