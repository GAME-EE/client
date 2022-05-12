import { useCallback, useEffect, useRef, useState } from 'react';

import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';
import { SNAKE } from '../../constants';
import { drawObject, drawImage, clearBoard, drawLine } from '../../utils/canvas';
import { isSnakeCollided, isSnakeOutOfCanvas, isSnakeEatFood } from '../../utils/snake';

import type { ISnakeGameHook } from '../../types/snake';

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
  const appleImageRef = useRef<HTMLImageElement | null>(null);
  const requestAnimationRef = useRef<any>(null);
  const tick = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const render = useCallback(() => {
    clearBoard(context);

    tick.current += SNAKE.TICK_TOC_UNIT;

    if (tick.current > currentFrame) {
      tick.current = 0;
      snakeGameDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    if (isSnakeEatFood(snakeBody[0], foodPosition)) {
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
    drawImage(context, foodPosition, appleImageRef.current);

    requestAnimationRef.current = requestAnimationFrame(render);
  }, [context, currentFrame, foodPosition, snakeBody, snakeGameDispatch]);

  useEffect(() => {
    const appleImage = new Image();
    appleImage.src = '/snake/apple.png';
    appleImageRef.current = appleImage;
  }, []);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  }, []);

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
