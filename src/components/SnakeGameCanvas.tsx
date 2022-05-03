import { useCallback, useEffect, useRef, useState } from 'react';

import { drawObject, clearBoard, drawLine } from '../utils/canvas';

import { useSnake } from '../hooks/';

import { SNAKE_ACTIONS } from '../hooks/useSnake';

import type { ObjectBody } from '../types/canvas';

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 240;
const FRAME = 5;

// TODO: useSnake로 훅 만들어서 거기서 데이터들 관리하기.
// TODO: 지렁이 이동 초마다 이동 구현
// TODO: 음식 먹을 때 마다 이동 주기 짧아짐
// TODO: 음식 먹을 때 랜덤 위치에 음식 생성 구현
// TODO: point 관리하기
const SnakeGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<any>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const { snakeBody, snakeDispatch, handleKeyDown } = useSnake();

  let timer = 0;

  const [pos] = useState<ObjectBody>({
    x: 100,
    y: 80,
  });

  const render = useCallback(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context);

    timer++;

    if (timer % FRAME === 0) {
      snakeDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    drawLine(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawObject(context, snakeBody, '#f5046d');
    drawObject(context, [pos], '#676FA3');

    requestAnimationRef.current = requestAnimationFrame(render);
  }, [context, pos, snakeBody, snakeDispatch, timer]);

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, [render]);

  useEffect(() => {
    console.log('navigator.userAgent', navigator.userAgent);
    window.addEventListener('keydown', event => handleKeyDown(event));
    return () => window.removeEventListener('keydown', () => handleKeyDown);
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
