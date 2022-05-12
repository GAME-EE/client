import { useCallback, useEffect, useRef, useState } from 'react';

import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';
import { SNAKE } from '../../constants';
import { drawObject, clearBoard, drawLine } from '../../utils/canvas';
import { isSnakeCollided, isSnakeOutOfCanvas } from '../../utils/snake';

import type { ISnakeGameHook } from '../../types/snake';

// TODO: point 관리하기
const SnakeGameCanvas = ({
  snakeBody,
  foodPosition,
  currentFrame,
  snakeGameDispatch,
  handleKeyDown,
}: Pick<
  ISnakeGameHook,
  'snakeBody' | 'foodPosition' | 'snakeGameDispatch' | 'handleKeyDown' | 'currentFrame'
>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<any>(null);
  const tick = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  }, []);

  const render = useCallback(() => {
    clearBoard(context);

    tick.current += SNAKE.TICK_TOC_UNIT;

    if (tick.current > currentFrame) {
      tick.current = 0;
      snakeGameDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    // TODO: 유틸로 변경하기
    if (snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y) {
      if (currentFrame > SNAKE.FRAME_DOWN_LIMIT)
        snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_FRAME });
      snakeGameDispatch({ type: SNAKE_ACTIONS.ADD_SNAKE_BODY });
      snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_FOOD_POSITION });
    }

    if (isSnakeOutOfCanvas(snakeBody[0])) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.RESET });
      alert('뱀이 게임 밖으로 나갔습니다.');
    }

    if (isSnakeCollided(snakeBody, snakeBody[0])) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.RESET });
      alert('뱀이 몸이랑 부딪혔습니다.');
    }

    drawLine(context, SNAKE.CANVAS_WIDTH, SNAKE.CANVAS_HEIGHT);
    drawObject(context, snakeBody, SNAKE.SNAKE_BODY_COLOR);
    drawObject(context, [foodPosition], SNAKE.FOOD_COLOR);

    requestAnimationRef.current = requestAnimationFrame(render);
  }, [context, currentFrame, foodPosition, snakeBody, snakeGameDispatch]);

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestAnimationRef.current);
  }, [render]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${SNAKE.CANVAS_WIDTH}px`,
        height: `${SNAKE.CANVAS_HEIGHT}px`,
        border: '0.1px solid black',
      }}
    />
  );
};

export default SnakeGameCanvas;
