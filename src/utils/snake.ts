import type { IObjectBody } from '../types/canvas';

export const hasSnakeCollided = (snake: IObjectBody[], currentSnakeHeadPos: IObjectBody) => {
  let flag = false;
  snake.forEach((position: IObjectBody, index: number) => {
    if (
      position.x === currentSnakeHeadPos.x &&
      position.y === currentSnakeHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};
