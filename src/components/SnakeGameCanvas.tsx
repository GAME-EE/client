import { useCallback, useEffect, useRef, useState } from 'react';

import { useSnake } from '../hooks/';
import { SNAKE_ACTIONS } from '../hooks/useSnake';
import { SNAKE_GAME } from '../constants';
import { drawObject, clearBoard, drawLine } from '../utils/canvas';

import type { IObjectBody } from '../types/canvas';

const FRAME = 5;

// TODO: useSnake로 훅 만들어서 거기서 데이터들 관리하기.
// TODO: 지렁이 이동 초마다 이동 구현
// TODO: 음식 먹을 때 마다 이동 주기 짧아짐
// TODO: 음식 먹을 때 랜덤 위치에 음식 생성 구현
// TODO: point 관리하기
const SnakeGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<any>(null);
  const timerRef = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const { snakeBody, snakeDispatch, handleKeyDown } = useSnake();

  const [pos] = useState<IObjectBody>({
    x: 100,
    y: 80,
  });

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  }, [context]);

  const render = useCallback(() => {
    clearBoard(context);

    timerRef.current++;

    if (timerRef.current % FRAME === 0) {
      snakeDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    // if ()
    drawLine(context, SNAKE_GAME.CANVAS_WIDTH, SNAKE_GAME.CANVAS_HEIGHT);
    drawObject(context, snakeBody, '#f5046d');
    drawObject(context, [pos], '#676FA3');

    requestAnimationRef.current = requestAnimationFrame(render);
  }, [context, pos, snakeBody, snakeDispatch]);

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, [render]);

  useEffect(() => {
    window.addEventListener('keydown', event => handleKeyDown(event));
    return () => window.removeEventListener('keydown', () => handleKeyDown);
  }, [handleKeyDown]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${SNAKE_GAME.CANVAS_WIDTH}px`,
        height: `${SNAKE_GAME.CANVAS_HEIGHT}px`,
        border: '0.1px solid black',
      }}
    />
  );
};

export default SnakeGameCanvas;
