import type { IObjectBody } from '../types/canvas';

import { SNAKE_GAME } from '../constants';

export const drawLine = (
  context: CanvasRenderingContext2D | null,
  width: number,
  height: number,
) => {
  if (context) {
    Array.from({ length: width / SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT }, () => 0).forEach((_, idx) => {
      context.beginPath();
      context.lineWidth = 0.1;
      context.moveTo(idx * SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT, 0);
      context.lineTo(idx * SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT, height);
      context.strokeStyle = 'gray';
      context.stroke();
    });

    Array.from({ length: height / SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT }, () => 0).forEach(
      (_, idx) => {
        context.beginPath();
        context.lineWidth = 0.1;
        context.moveTo(0, idx * SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT);
        context.lineTo(width, idx * SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT);
        context.strokeStyle = 'gray';
        context.stroke();
      },
    );
  }
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
) => {
  if (context) {
    objectBody.forEach((object: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = 'gray';
      context.fillRect(
        object.x,
        object.y,
        SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT,
        SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT,
      );
      context.strokeRect(
        object.x,
        object.y,
        SNAKE_GAME.SNAKE_BODY_WIDTH_UNIT,
        SNAKE_GAME.SNAKE_BODY_HEIGHT_UNIT,
      );
    });
  }
};

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) context.clearRect(0, 0, SNAKE_GAME.CANVAS_WIDTH, SNAKE_GAME.CANVAS_HEIGHT);
};
