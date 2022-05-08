import { useCallback, useEffect, useRef, useState } from 'react';

import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';
import { SNAKE_GAME } from '../../constants';
import { drawObject, clearBoard, drawLine } from '../../utils/canvas';

import type { ISnakeGameHook } from '../../types/snakeGame';

const FRAME = 5;

// TODO: 음식 먹을 때 마다 이동 주기 짧아짐
// TODO: point 관리하기
const SnakeGameCanvas = ({
  snakeBody,
  foodPosition,
  snakeGameDispatch,
  handleKeyDown,
}: Pick<ISnakeGameHook, 'snakeBody' | 'foodPosition' | 'snakeGameDispatch' | 'handleKeyDown'>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<any>(null);
  const timerRef = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  }, []);

  const render = useCallback(() => {
    clearBoard(context);

    timerRef.current++;

    if (timerRef.current % FRAME === 0) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    if (timerRef.current % 100 === 0) {
      console.log(snakeBody[0]);
    }

    // 타겟을 먹었을 때
    if (snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.ADD_SNAKE_BODY });
      snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_FOOD_POSITION });
    }

    drawLine(context, SNAKE_GAME.CANVAS_WIDTH, SNAKE_GAME.CANVAS_HEIGHT);
    drawObject(context, snakeBody, SNAKE_GAME.SNAKE_BODY_COLOR);
    drawObject(context, [foodPosition], SNAKE_GAME.FOOD_COLOR);

    requestAnimationRef.current = requestAnimationFrame(render);
  }, [context, foodPosition, snakeBody, snakeGameDispatch]);

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
