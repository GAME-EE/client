import { SNAKE_ACTIONS } from '../hooks/useSnakeGame';
import { SNAKE } from '../constants';

import type { IObjectBody } from './canvas';

export interface ISnakeGameAction {
  type: SnakeGameActionType;
  payload?: any;
}

type SnakeGameActionType =
  | typeof SNAKE_ACTIONS.MOVE
  | typeof SNAKE_ACTIONS.STOP // TODO: 정지 없애기
  | typeof SNAKE_ACTIONS.CHANGE_DIRECTION
  | typeof SNAKE_ACTIONS.ADD_SNAKE_BODY
  | typeof SNAKE_ACTIONS.CHANGE_FOOD_POSITION
  | typeof SNAKE_ACTIONS.RESET
  | typeof SNAKE_ACTIONS.CHANGE_FRAME;

export type SnakeDirectionType =
  | typeof SNAKE.SNAKE_LEFT_DIRECTION
  | typeof SNAKE.SNAKE_RIGHT_DIRECTION
  | typeof SNAKE.SNAKE_UP_DIRECTION
  | typeof SNAKE.SNAKE_DOWN_DIRECTION
  | typeof SNAKE.SNAKE_STOP; // TODO: 정지 없애기

export interface ISnakeGameHook extends ISnakeState {
  snakeGameDispatch: React.Dispatch<ISnakeGameAction>;
}

export interface ISnakeState {
  snakeBody: IObjectBody[];
  snakeDirection: SnakeDirectionType;
  snakeBodyLength: number;
  foodPosition: IObjectBody;
  currentFrame: number;
  isPlaying: boolean;
}
