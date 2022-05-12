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
