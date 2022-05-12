import type { IObjectBody } from '../types/canvas';

import { SNAKE } from '../constants';

export const drawLine = (
  context: CanvasRenderingContext2D | null,
  width: number,
  height: number,
) => {
  if (context) {
    Array.from({ length: width / SNAKE.SNAKE_BODY_WIDTH_UNIT }, () => 0).forEach((_, idx) => {
      context.beginPath();
      context.lineWidth = 0.1;
      context.moveTo(idx * SNAKE.SNAKE_BODY_WIDTH_UNIT, 0);
      context.lineTo(idx * SNAKE.SNAKE_BODY_WIDTH_UNIT, height);
      context.strokeStyle = 'gray';
      context.stroke();
    });

    Array.from({ length: height / SNAKE.SNAKE_BODY_HEIGHT_UNIT }, () => 0).forEach((_, idx) => {
      context.beginPath();
      context.lineWidth = 0.1;
      context.moveTo(0, idx * SNAKE.SNAKE_BODY_HEIGHT_UNIT);
      context.lineTo(width, idx * SNAKE.SNAKE_BODY_HEIGHT_UNIT);
      context.strokeStyle = 'gray';
      context.stroke();
    });
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
        SNAKE.SNAKE_BODY_WIDTH_UNIT,
        SNAKE.SNAKE_BODY_HEIGHT_UNIT,
      );
      context.strokeRect(
        object.x,
        object.y,
        SNAKE.SNAKE_BODY_WIDTH_UNIT,
        SNAKE.SNAKE_BODY_HEIGHT_UNIT,
      );
    });
  }
};

export const drawImage = (
  context: CanvasRenderingContext2D | null,
  objectPosition: IObjectBody,
  image: HTMLImageElement | null,
): void => {
  if (image) {
    context?.drawImage(
      image,
      objectPosition.x,
      objectPosition.y,
      SNAKE.SNAKE_BODY_WIDTH_UNIT * 2,
      SNAKE.SNAKE_BODY_HEIGHT_UNIT * 2,
    );
  }
};

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) context.clearRect(0, 0, SNAKE.CANVAS_WIDTH, SNAKE.CANVAS_HEIGHT);
};
