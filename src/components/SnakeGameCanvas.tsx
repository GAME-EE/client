import { useEffect, useRef, useState, useCallback } from 'react';

import { drawObject, clearBoard, drawLine } from '../utils/canvas';

import type { ObjectBody } from '../types/canvas';

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 280;

// TODO: useSnake로 훅 만들어서 거기서 데이터들 관리하기.
// TODO: 지렁이 이동 초마다 이동 구현
// TODO: 음식 먹을 때 마다 이동 주기 짧아짐
// TODO: 음식 먹을 때 랜덤 위치에 음식 생성 구현
// TODO: point 관리하기
const SnakeGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const [pos, setPos] = useState<ObjectBody>({
    x: 100,
    y: 80,
  });

  const [snake, setSnake] = useState<ObjectBody[]>([
    { x: 50, y: 32 },
    { x: 60, y: 32 },
    { x: 70, y: 32 },
    { x: 80, y: 32 },
    { x: 90, y: 32 },
  ]);

  const moveRight = () => {
    setSnake(prevSnake => prevSnake.map(({ x, y }) => ({ x: x + 5, y })));
  };

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context);
    drawLine(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawObject(context, snake, '#f5046d');
    drawObject(context, [pos], '#676FA3');
  }, [context, pos, snake]);

  useEffect(() => {
    const interval = setInterval(() => {
      // window.requestAnimationFrame(moveRight);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = useCallback((key: string) => {
    switch (key) {
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowLeft':
        moveRight();
        break;
      case 'ArrowUp':
        moveRight();
        break;
      case 'ArrowDown':
        moveRight();
        break;
      default:
        null;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', event => handleKeyDown(event.key));
    return () => removeEventListener('keydown', () => handleKeyDown);
  }, [handleKeyDown]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${CANVAS_WIDTH}px`,
        height: `${CANVAS_HEIGHT}px`,
        border: '0.1px solid black',
      }}
    />
  );
};

export default SnakeGameCanvas;
