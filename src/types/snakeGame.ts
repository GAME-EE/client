import { SNAKE_ACTIONS } from '../hooks/useSnakeGame';
import { SNAKE_GAME } from '../constants';

import type { IObjectBody } from './canvas';

export type SnakeGameAction =
  | { type: typeof SNAKE_ACTIONS.MOVE }
  | { type: typeof SNAKE_ACTIONS.STOP } // TODO: 정지 없애기
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_LEFT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_RIGHT }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_UP }
  | { type: typeof SNAKE_ACTIONS.CHANGE_DIRECTION_TO_DOWN }
  | { type: typeof SNAKE_ACTIONS.ADD_SNAKE_BODY }
  | { type: typeof SNAKE_ACTIONS.CHANGE_FOOD_POSITION };

export type SnakeDirection =
  | typeof SNAKE_GAME.SNAKE_LEFT_DIRECTION
  | typeof SNAKE_GAME.SNAKE_RIGHT_DIRECTION
  | typeof SNAKE_GAME.SNAKE_UP_DIRECTION
  | typeof SNAKE_GAME.SNAKE_DOWN_DIRECTION
  | typeof SNAKE_GAME.SNAKE_STOP; // TODO: 정지 없애기

export interface ISnakeGameHook {
  snakeBody: IObjectBody[];
  snakeDirection: SnakeDirection;
  snakeBodyLength: number;
  foodPosition: IObjectBody;
  snakeGameDispatch: React.Dispatch<SnakeGameAction>;
  // eslint-disable-next-line no-unused-vars
  handleKeyDown: (event: KeyboardEvent) => void;
}

export interface ISnakeState {
  snakeBody: IObjectBody[];
  snakeDirection: SnakeDirection;
  snakeBodyLength: number;
  foodPosition: IObjectBody;
}
