import type { IObjectBody } from '../types/canvas';

export const hasSnakeCollided = (
  snake: IObjectBody[],
  currentSnakeHeadPos: IObjectBody,
): boolean => {
  for (let i = 0; i < snake.length; i++) {
    const hasCurrentCollided =
      snake[i].x === currentSnakeHeadPos.x && snake[i].y === currentSnakeHeadPos.y && i !== 0;
    if (hasCurrentCollided) return true;
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
