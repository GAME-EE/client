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
  getJumpState,
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
    handleJumpState();
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

  const handleJumpState = () => {
    const unit = unitRef.current;
    const jumpState = jumpRef.current;
    const time = DYNO.JUMP_HEIGHT + (jumpState.maxY - unit.y);
    const isJumping = jumpState.isjumping;

    const isStopJump = isJumping && jumpState.maxY >= unit.y;
    if (isStopJump) {
      jumpState.isjumping = false;
    }

    const isJump = isJumping && unit.y > jumpState.maxY;
    if (isJump) {
      jumpRef.current = getJumpState('JUMP', jumpState, time);
      unitRef.current = getUnitState('JUMP', unit, jumpState);
    }

    const isNotCanvasFloor = unit.y + unit.height < CANVAS_OBJECT.height;
    const isUnitDescent = !isJumping && isNotCanvasFloor;
    if (isUnitDescent) {
      jumpRef.current = getJumpState('DESCENT', jumpState, time);
      unitRef.current = getUnitState('DESCENT', unit, jumpState);
    }

    const isUnitLocationFloor = unit.y + unit.height >= CANVAS_OBJECT.height;
    const isJumpStateInit = jumpState.level !== 0 && isUnitLocationFloor;
    if (isJumpStateInit) {
      jumpRef.current = getJumpState('FLOOER', jumpState, time);
    }
  };

  const handleJump = () => {
    if (jumpRef.current.level < DYNO.JUMP_MAX_LEVEL) {
      jumpRef.current.isjumping = true;
      jumpRef.current.level += 1;
      jumpRef.current.maxY = unitRef.current.y - DYNO.JUMP_HEIGHT;
      jumpRef.current.speed = INIT_JUMP_STATE.speed;
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
