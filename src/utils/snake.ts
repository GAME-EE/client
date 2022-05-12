import { SNAKE } from '../constants';

import type { IObjectBody } from '../types/canvas';

export const isSnakeCollided = (
  SnakeBodyPosition: IObjectBody[],
  SnakeHeadPosition: IObjectBody,
): boolean => {
  for (let i = 0; i < SnakeBodyPosition.length; i++) {
    const isCurrentCollided =
      SnakeBodyPosition[i].x === SnakeHeadPosition.x &&
      SnakeBodyPosition[i].y === SnakeHeadPosition.y &&
      i !== 0;
    if (isCurrentCollided) return true;
  }
  return false;
};

export const isSnakeOutOfCanvas = (snakeHeadPosition: IObjectBody): boolean => {
  return (
    snakeHeadPosition.x < SNAKE.CANVAS_REAL_WIDTH_MIN ||
    snakeHeadPosition.y < SNAKE.CANVAS_REAL_HEIGHT_MIN ||
    snakeHeadPosition.x > SNAKE.CANVAS_REAL_WIDTH_MAX ||
    snakeHeadPosition.y > SNAKE.CANVAS_REAL_HEIGHT_MAX
  );
};
