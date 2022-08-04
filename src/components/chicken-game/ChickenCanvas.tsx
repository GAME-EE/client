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
  getJumpFlag,
  getJumpState,
  getMoveState,
  getNewObstacle,
  getUnitState,
} from '../../hooks/useChicken';
import { getUnit } from '@mui/material/styles/cssUtils';

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
  updateGameState: (time: number) => void;
}

const DynoCanvas = ({ isPlay, stopPlay, updateGameState }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<IObstacle[]>([]);
  const unitRef = useRef<IUnit>({ ...UNIT_OBJECT });
  const jumpRef = useRef<IJumpState>(INIT_JUMP_STATE);
  const requestAnimationRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const drawImage = (ctx: CanvasRenderingContext2D | null, object: ICanvasObject) => {
    if (!ctx) return;
    const img: CanvasImageSource = object.image as HTMLImageElement;
    ctx.drawImage(img, object.x, object.y, object.width, object.height);
  };

  useEffect(() => {
    unitRef.current.image = new window.Image();
    unitRef.current.image.src = '/chick.png';
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

  const byFrame = useCallback(() => {
    const drawMoveObstacles = () => {
      obstacleRef.current = obstacleRef.current.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - (obstacle.speed ?? DYNO.INIT_OBSTACLE_SPEED),
      }));

      obstacleRef.current.forEach((obstacle, i, list) => {
        const isObstacleOffScreen = obstacle.x < 0 - obstacle.width;
        if (isObstacleOffScreen) {
          list.splice(i, 1);
        }
        drawImage(context, obstacle);

        // 충돌
        if (checkCollision(unitRef.current, obstacle)) {
          cancelAnimationFrame(requestAnimationRef.current);
          stopPlay();
          updateGameState(timerRef.current);
        }
      });
    };

    requestAnimationRef.current = requestAnimationFrame(byFrame);
    timerRef.current++;

    clearCanvas();
    drawImage(context, unitRef.current);

    if (timerRef.current % DYNO.OBSTACLE_CREATE_TIME === 0) {
      createObstacle();
    }
    if (timerRef.current % DYNO.GAME_LEVEL_UP_TIME === 0) {
      updateGameState(timerRef.current);
    }

    drawMoveObstacles();
    handleMoveState();
  }, [clearCanvas, context, stopPlay]);

  useEffect(() => {
    const initPlayState = () => {
      clearCanvas();
      cancelAnimationFrame(requestAnimationRef.current);
      obstacleRef.current = [];
      timerRef.current = 0;
      jumpRef.current = { ...INIT_JUMP_STATE };
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

  const createObstacle = () => {
    const currentGameLevel = getCurrentGameLevel(timerRef.current);
    const tObstacle: IObstacle = getNewObstacle(currentGameLevel);

    obstacleRef.current = [...obstacleRef.current, tObstacle];
  };

  const handleMoveState = () => {
    const { unitState, jumpState } = getMoveState(unitRef.current, jumpRef.current);
    unitRef.current = unitState;
    jumpRef.current = jumpState;
  };

  const handleJump = () => {
    if (jumpRef.current.level < DYNO.JUMP_MAX_LEVEL) {
      const newJumpState = {
        ...jumpRef.current,
        isjumping: true,
        level: jumpRef.current.level + 1,
        maxY: unitRef.current.y - DYNO.JUMP_HEIGHT,
        speed: INIT_JUMP_STATE.speed,
      };
      jumpRef.current = newJumpState;
    }
  };

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
