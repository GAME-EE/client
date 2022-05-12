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

export const isSnakeOutOfCanvas = (snakeHeadPosition: IObjectBody): boolean =>
  snakeHeadPosition.x < SNAKE.CANVAS_REAL_WIDTH_MIN ||
  snakeHeadPosition.y < SNAKE.CANVAS_REAL_HEIGHT_MIN ||
  snakeHeadPosition.x > SNAKE.CANVAS_REAL_WIDTH_MAX ||
  snakeHeadPosition.y > SNAKE.CANVAS_REAL_HEIGHT_MAX;

export const isSnakeEatFood = (
  snakeHeadPosition: IObjectBody,
  foodPosition: IObjectBody,
): boolean => {
  const foodPositionX = [foodPosition.x, foodPosition.x + SNAKE.SNAKE_BODY_WIDTH_UNIT];
  const foodPositionY = [foodPosition.y, foodPosition.y + SNAKE.SNAKE_BODY_HEIGHT_UNIT];
  console.log(foodPositionX, foodPositionY);

  return foodPositionX.includes(snakeHeadPosition.x) && foodPositionY.includes(snakeHeadPosition.y);
};
