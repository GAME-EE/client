import { SNAKE } from '../constants';

import type { IObjectBody } from '../types/canvas';

export const isSnakeCollided = (
  snake: IObjectBody[],
  currentSnakeHeadPos: IObjectBody,
): boolean => {
  for (let i = 0; i < snake.length; i++) {
    const isCurrentCollided =
      snake[i].x === currentSnakeHeadPos.x && snake[i].y === currentSnakeHeadPos.y && i !== 0;
    if (isCurrentCollided) return true;
  }
  return false;
};

export const isSnakeOutOfCanvas = (currentSnakeHeadPos: IObjectBody): boolean => {
  return (
    currentSnakeHeadPos.x < SNAKE.CANVAS_REAL_WIDTH_MIN ||
    currentSnakeHeadPos.y < SNAKE.CANVAS_REAL_HEIGHT_MIN ||
    currentSnakeHeadPos.x > SNAKE.CANVAS_REAL_WIDTH_MAX ||
    currentSnakeHeadPos.y > SNAKE.CANVAS_REAL_HEIGHT_MAX
  );
};
