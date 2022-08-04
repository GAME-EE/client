import { Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IUnit, IObstacle, ICanvasObject, IJumpState } from '../../types/dyno';
import { KeyboardCodeType } from '../../types/common';
import { getAccelerate, getRandomNumber } from '../../utils/number';
import DYNO, {
  CANVAS_OBJECT,
  GAME_LEVEL,
  INIT_JUMP_STATE,
  UNIT_OBJECT,
} from '../../constants/dyno';
import {
  checkCollision,
  getCurrentGameLevel,
  getMoveState,
  getNewObstacle,
  getObstacleMovePosition,
} from '../../hooks/useChicken';
import useChickenGame from '../../hooks/useChickenGame';

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
  updateGameState: (time: number) => void;
}

const DynoCanvas = ({ isPlay, stopPlay, updateGameState }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const { unitRef, handleJump, drawMoveObstacles, handleMoveState, createObstacle, clearState } =
    useChickenGame();
  const requestAnimationRef = useRef<number>(0);
  const timerRef = useRef<number>(0);

  const drawImage = (ctx: CanvasRenderingContext2D | null, object: ICanvasObject) => {
    if (!ctx) return;
    const img: CanvasImageSource = object.image as HTMLImageElement;
    ctx.drawImage(img, object.x, object.y, object.width, object.height);
  };

  useEffect(() => {
    drawImage(context, unitRef.current); //왜 처음부터 보이지 않을 까요
  }, [context]);

  const clearCanvas = useCallback(() => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [context]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const code = event.code as KeyboardCodeType;
      switch (code) {
        case 'Space':
          isPlay && handleJump();
          break;
      }
    },
    [isPlay],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const stopGame = () => {
    cancelAnimationFrame(requestAnimationRef.current);
    stopPlay();
    updateGameState(timerRef.current);
  };

  const byFrame = () => {
    requestAnimationRef.current = requestAnimationFrame(byFrame);
    timerRef.current++;

    clearCanvas();
    drawImage(context, unitRef.current);

    const isObstacleCreateTime = timerRef.current % DYNO.OBSTACLE_CREATE_TIME === 0;
    const isLevelUpTime = timerRef.current % DYNO.GAME_LEVEL_UP_TIME === 0;
    if (isObstacleCreateTime) {
      const currentGameLevel = getCurrentGameLevel(timerRef.current);
      createObstacle(currentGameLevel);
    }
    if (isLevelUpTime) {
      updateGameState(timerRef.current);
    }

    drawMoveObstacles(stopGame, (obstacle: IObstacle) => drawImage(context, obstacle));
    handleMoveState();
  };

  useEffect(() => {
    const initPlayState = () => {
      clearCanvas();
      cancelAnimationFrame(requestAnimationRef.current);
      clearState();
      timerRef.current = 0;
    };

    if (isPlay) {
      const handleStart = () => {
        initPlayState();
        byFrame();
      };
      handleStart();
    }
  }, [isPlay]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawImage(context, unitRef.current);
    }
  }, [context]);

  return (
    <Center flexDirection={'column'} marginTop={10}>
      <canvas
        ref={canvasRef}
        width={CANVAS_OBJECT.width}
        height={CANVAS_OBJECT.height}
        style={{
          width: `${600}px`,
          height: `${300}px`,
          border: '0.1px solid black',
        }}
      />
    </Center>
  );
};

export default DynoCanvas;
