import type { ObjectBody } from '../types/canvas';

const WIDTH_UNIT = 10;
const HEIGHT_UNIT = 8;

export const drawLine = (
  context: CanvasRenderingContext2D | null,
  width: number,
  height: number,
) => {
  if (context) {
    Array.from({ length: width / WIDTH_UNIT }, () => 0).forEach((_, idx) => {
      context.beginPath();
      context.lineWidth = 0.1;
      context.moveTo(idx * WIDTH_UNIT, 0);
      context.lineTo(idx * WIDTH_UNIT, height);
      context.strokeStyle = 'gray';
      context.stroke();
    });

    Array.from({ length: height / HEIGHT_UNIT }, () => 0).forEach((_, idx) => {
      context.beginPath();
      context.lineWidth = 0.1;
      context.moveTo(0, idx * HEIGHT_UNIT);
      context.lineTo(width, idx * HEIGHT_UNIT);
      context.strokeStyle = 'gray';
      context.stroke();
    });
  }
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: ObjectBody[],
  fillColor: string,
) => {
  if (context) {
    objectBody.forEach((object: ObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = 'gray';
      context.fillRect(object.x, object.y, 10, 8);
      context.strokeRect(object.x, object.y, 10, 8);
    });
  }
};

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) context.clearRect(0, 0, 360, 360);
};
