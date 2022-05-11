import { useCallback, useEffect, useRef, useState } from 'react';

import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';
import { SNAKE } from '../../constants';
import { drawObject, clearBoard, drawLine } from '../../utils/canvas';
import { hasSnakeCollided } from '../../utils/snake';

import type { ISnakeGameHook } from '../../types/snake';

// TODO: 음식 먹을 때 마다 이동 주기 짧아짐
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
  const timerRef = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  }, []);

  const render = useCallback(() => {
    clearBoard(context);

    timerRef.current += 10;

    if (timerRef.current > currentFrame) {
      timerRef.current = 0;
      snakeGameDispatch({ type: SNAKE_ACTIONS.MOVE });
    }

    // 타겟을 먹었을 때
    if (snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y) {
      if (currentFrame > 50) snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_FRAME });
      snakeGameDispatch({ type: SNAKE_ACTIONS.ADD_SNAKE_BODY });
      snakeGameDispatch({ type: SNAKE_ACTIONS.CHANGE_FOOD_POSITION });
    }

    // 뱀 얼굴이 보드 밖에 나갔을 때
    if (snakeBody[0].x < 0 || snakeBody[0].y < 0 || snakeBody[0].x > 290 || snakeBody[0].y > 145) {
      snakeGameDispatch({ type: SNAKE_ACTIONS.RESET });
      alert('뱀이 게임 밖으로 나갔습니다.');
    }

    // 뱀 얼굴이 뱀 몸통에 부딪혔을 때
    if (hasSnakeCollided(snakeBody, snakeBody[0])) {
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
