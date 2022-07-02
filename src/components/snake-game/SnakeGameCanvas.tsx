import { useCallback, useEffect, useRef, useState } from 'react';

import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';
import { SNAKE } from '../../constants';
import { SNAKE_COLOR } from '../../styles/colors';
import { drawObject, drawImage, clearBoard, drawLine } from '../../utils/canvas';
import { isSnakeCollided, isSnakeOutOfCanvas, isSnakeEatFood } from '../../services/snake';

import type { ISnakeGameHook } from '../../types/snake';
import type { KeyboardCodeType } from '../../types/common';

const SnakeGameCanvas = ({
  snakeBody,
  foodPosition,
  currentFrame,
  snakeDirection,
  snakeGameDispatch,
}: Pick<
  ISnakeGameHook,
  'snakeBody' | 'foodPosition' | 'snakeGameDispatch' | 'currentFrame' | 'snakeDirection'
>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appleImageRef = useRef<HTMLImageElement | null>(null);
  const requestAnimationRef = useRef<number>(0);
  const tick = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const code = event.code as KeyboardCodeType;
      switch (code) {
        case 'ArrowRight':
          if (snakeDirection !== SNAKE.SNAKE_LEFT_DIRECTION)
            snakeGameDispatch({
              type: SNAKE_ACTIONS.CHANGE_DIRECTION,
              payload: SNAKE.SNAKE_RIGHT_DIRECTION,
            });
          break;
        case 'ArrowLeft':
          if (snakeDirection !== SNAKE.SNAKE_RIGHT_DIRECTION)
            snakeGameDispatch({
              type: SNAKE_ACTIONS.CHANGE_DIRECTION,
              payload: SNAKE.SNAKE_LEFT_DIRECTION,
            });
          break;
        case 'ArrowUp':
          if (snakeDirection !== SNAKE.SNAKE_DOWN_DIRECTION)
            snakeGameDispatch({
              type: SNAKE_ACTIONS.CHANGE_DIRECTION,
              payload: SNAKE.SNAKE_UP_DIRECTION,
            });
          break;
        case 'ArrowDown':
          if (snakeDirection !== SNAKE.SNAKE_UP_DIRECTION)
            snakeGameDispatch({
              type: SNAKE_ACTIONS.CHANGE_DIRECTION,
              payload: SNAKE.SNAKE_DOWN_DIRECTION,
            });
          break;
        case 'Space':
          snakeGameDispatch({ type: SNAKE_ACTIONS.STOP });
          break;
        default:
          return;
      }
    },
    [snakeDirection, snakeGameDispatch],
  );

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

    // TODO: 충돌을 넣을까 말까? 고민해보기
    if (isSnakeCollided(snakeBody, snakeBody[0])) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.RESET });
      alert('뱀이 몸이랑 부딪혔습니다.');
    }

    drawLine(context, SNAKE.CANVAS_WIDTH, SNAKE.CANVAS_HEIGHT);
    drawObject(context, snakeBody, SNAKE_COLOR.BODY_COLOR);
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
