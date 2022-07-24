import { Button, Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IUnit, IObstacle, ICanvasObject, IPlayState, IJumpState } from '../../types/dyno';
import { getAccelerate, getRandomNumber } from '../../utils/number';
import DYNO, {
  CANVAS_OBJECT,
  GAME_LEVEL,
  INIT_JUMP_STATE,
  INIT_PLAY_STATE,
  UNIT_OBJECT,
} from '../../constants/dyno';
import { KeyboardCodeType } from '../../types/common';

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
  updateGameState: (stage: number, lastScore?: number) => void;
}

const DynoCanvas = ({ isPlay, stopPlay, updateGameState }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<IObstacle[]>([]);
  const unitRef = useRef<IUnit>({ ...UNIT_OBJECT });
  const jumpRef = useRef<IJumpState>(INIT_JUMP_STATE);
  const playStateRef = useRef<IPlayState>(INIT_PLAY_STATE);

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

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const code = event.code as KeyboardCodeType;
    switch (code) {
      case 'Space':
        handleJump();
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const byFrame = useCallback(() => {
    const collision = (unit: IUnit, obstacle: IObstacle) => {
      const isXTopLeftCollision = obstacle.x + (obstacle.blank?.topLeft ?? 0) < unit.x + unit.width;
      const isTTopRightCollision =
        unit.x < obstacle.x + obstacle.width - (obstacle.blank?.topRight ?? 0);
      const isXCollision = isXTopLeftCollision && isTTopRightCollision;
      const isYCollision = unit.y + unit.width > obstacle.y;

      if (isXCollision && isYCollision) {
        // console.log('충돌 !!!, 점수 : ', `${playStateRef.current.timer}`);
        // alert(`점수 : ${playStateRef.current.timer}`);
        playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
        stopPlay();
        updateGameState(playStateRef.current.level, playStateRef.current.timer);
      }
    };

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
        collision(unitRef.current, obstacle);
      });
    };

    playStateRef.current.animation = requestAnimationFrame(byFrame);
    playStateRef.current.timer++;

    clearCanvas();
    drawImage(context, unitRef.current);

    if (playStateRef.current.timer % DYNO.OBSTACLE_CREATE_TIME === 0) {
      createObstacle();
    }
    if (playStateRef.current.timer % DYNO.GAME_LEVEL_UP_TIME === 0) {
      playStateRef.current.level++;
      updateGameState(playStateRef.current.level);
      console.log('level up !!', playStateRef.current.level);
    }

    drawMoveObstacles();
    handleJumpState();
  }, [clearCanvas, context, stopPlay]);

  useEffect(() => {
    const initPlayState = () => {
      clearCanvas();
      playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
      obstacleRef.current = [];
      playStateRef.current = { ...INIT_PLAY_STATE };
      jumpRef.current = { ...INIT_JUMP_STATE };
    };

    if (isPlay) {
      console.log('Game start!!!');
      const handleStart = () => {
        initPlayState();
        byFrame();
      };
      handleStart();
    }
  }, [byFrame, clearCanvas, isPlay]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawImage(context, unitRef.current);
    }
  }, [context]);

  const createObstacle = () => {
    const randomIndex = getRandomNumber(0, 10);
    const currentGameLevel =
      playStateRef.current.level < DYNO.GAME_MAX_LEVEL
        ? playStateRef.current.level
        : DYNO.GAME_MAX_LEVEL;
    const selectObstacle = GAME_LEVEL[currentGameLevel].obstacleList[randomIndex];
    const selectSpeed = GAME_LEVEL[currentGameLevel].speed;

    const tObstacle: IObstacle = {
      ...selectObstacle,
      speed: selectSpeed,
      image: new window.Image(),
    };

    if (tObstacle.image == undefined) return;
    tObstacle.image.src = tObstacle.imageURL;
    obstacleRef.current = [...obstacleRef.current, tObstacle];
  };

  const handleJumpState = () => {
    const unit = unitRef.current;
    const jumpState = jumpRef.current;
    const time = DYNO.JUMP_HEIGHT + (jumpState.maxY - unit.y);
    const isJumping = jumpState.isjumping;

    const isStopJump = jumpState.maxY >= unit.y;
    if (isJumping && isStopJump) {
      jumpState.isjumping = false;
    }

    const isDoJump = unit.y > jumpState.maxY;
    if (isJumping && isDoJump) {
      const acceleration = getAccelerate(DYNO.ACCELERATION_UP, time);
      const JUMP_UP_SPEED_LIMIT = 1;

      jumpState.speed =
        jumpState.speed - acceleration > JUMP_UP_SPEED_LIMIT
          ? jumpState.speed - acceleration
          : JUMP_UP_SPEED_LIMIT;

      unit.y =
        unit.y - jumpState.speed > jumpState.maxY ? unit.y - jumpState.speed : jumpState.maxY;
    }

    const isNotCanvasFloor = unit.y + unit.height < CANVAS_OBJECT.height;
    if (!isJumping && isNotCanvasFloor) {
      const downAcceleration = getAccelerate(DYNO.ACCELERATION_DOWN, time);
      const JUMP_DOWN_SPEED_LIMIT = INIT_JUMP_STATE.speed + DYNO.DOWN_PLUS_SPEED;
      const unitDownLimit = CANVAS_OBJECT.height - unit.height;

      jumpState.speed =
        jumpState.speed + downAcceleration < JUMP_DOWN_SPEED_LIMIT
          ? jumpState.speed + downAcceleration
          : JUMP_DOWN_SPEED_LIMIT;

      unit.y = unit.y + jumpState.speed < unitDownLimit ? unit.y + jumpState.speed : unitDownLimit;
    }

    const isUnitLocationFloor = unit.y + unit.height >= CANVAS_OBJECT.height;
    if (jumpState.level !== 0 && isUnitLocationFloor) {
      jumpState.level = 0;
      jumpState.speed = INIT_JUMP_STATE.speed;
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
