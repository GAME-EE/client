import { Button, Center } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IUnit, IObstacle, ICanvasObject, IPlayState, IJumpState, IGameLevel } from '../types/dyno';
import { getAccelerate, getRandomNumber } from '../utils/number';

const OBSTACLE_CREATE_TIME = 120;
const GAME_LEVEL_UP_TIME = 600;
const INIT_OBSTACLE_SPEED = 10;
const JUMP_HEIGHT = 200;
const JUMP_MAX_LEVEL = 2;
const DOWN_PLUS_SPEED = 3;
const GAME_MAX_LEVEL = 4;
const ACCELERATION_UP = 0.002;
const ACCELERATION_DOWN = 0.01;
const CANVAS_OBJECT = {
  width: 1200,
  height: 600,
};
const UNIT_OBJECT: IUnit = {
  width: 80,
  height: 80,
  x: 80,
  y: CANVAS_OBJECT.height - 80,
  color: '#6B46C1',
};

const INIT_PLAY_STATE: IPlayState = {
  timer: 0,
  level: 1,
  animation: undefined,
};
const INIT_JUMP_STATE: IJumpState = {
  isjumping: false,
  level: 0,
  maxY: 0,
  speed: 13,
};
const OBSTACLE_OBJECT: IObstacle = {
  width: 100,
  height: 100,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 100,
  color: '#6B46C1',
  imageURL: '/cactus.png',
  blank: {
    topLeft: 40,
    topRight: 10,
  },
};
const OBSTACLE_OBJECT_V2: IObstacle = {
  width: 150,
  height: 150,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 150,
  color: '#6B46C1',
  imageURL: '/dino1.png',

  blank: {
    topLeft: 40,
    topRight: 60,
  },
};
const GAME_LEVEL: IGameLevel = {
  1: {
    speed: 14,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  2: {
    speed: 14,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  3: {
    speed: 16,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
  4: {
    speed: 16,
    obstacleList: [
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
      OBSTACLE_OBJECT_V2,
    ],
  },
};

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
}

const DynoCanvas = ({ isPlay, stopPlay }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<IObstacle[]>([]);
  const unitRef = useRef<IUnit>(UNIT_OBJECT);
  const playStateRef = useRef<IPlayState>(INIT_PLAY_STATE);
  const jumpRef = useRef<IJumpState>(INIT_JUMP_STATE);

  useEffect(() => {
    unitRef.current.image = new window.Image();
    unitRef.current.image.src = '/chick.png';
    drawImage(context, unitRef.current); //왜 처음부터 보이지 않을 까요
  }, []);

  useEffect(() => {
    if (isPlay) {
      console.log('Game start!!!');
      handleStart();
    }
  }, [isPlay]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawImage(context, unitRef.current);
    }
  }, [context, drawImage]);

  const byFrame = () => {
    playStateRef.current.animation = requestAnimationFrame(byFrame);
    playStateRef.current.timer++;

    clearCanvas();
    drawImage(context, unitRef.current);

    if (playStateRef.current.timer % OBSTACLE_CREATE_TIME === 0) {
      createObstacle();
    }
    if (playStateRef.current.timer % GAME_LEVEL_UP_TIME === 0) {
      playStateRef.current.level++;
      console.log('level up !!', playStateRef.current.level);
    }

    drawMoveObstacles(); //생성한 장애물 canvas에 그리기
    handleJumpState();
  };

  const createObstacle = () => {
    const randomIndex = getRandomNumber(0, 10); //0~9
    const currentGameLevel =
      playStateRef.current.level < GAME_MAX_LEVEL ? playStateRef.current.level : GAME_MAX_LEVEL;

    const selectObstacle = GAME_LEVEL[currentGameLevel].obstacleList[randomIndex];
    const selectSpeed = GAME_LEVEL[currentGameLevel].speed;

    const tObstacle: IObstacle = {
      ...selectObstacle,
      speed: selectSpeed,
      image: new window.Image(),
    };
    if (tObstacle.image == undefined) return; //error처리
    tObstacle.image.src = tObstacle.imageURL;
    obstacleRef.current = [...obstacleRef.current, tObstacle];
  };

  const drawMoveObstacles = () => {
    obstacleRef.current = obstacleRef.current.map(obstacle => ({
      ...obstacle,
      x: obstacle.x - (obstacle.speed ?? INIT_OBSTACLE_SPEED),
    }));

    obstacleRef.current.forEach((obstacle, i, list) => {
      //장애물이 화면 밖으로 나가면 제거
      if (obstacle.x < 0 - obstacle.width) {
        list.splice(i, 1);
      }
      drawImage(context, obstacle);
      //충돌 체크
      collision(unitRef.current, obstacle);
    });
  };

  const handleJumpState = () => {
    const unit = unitRef.current;
    const jumpState = jumpRef.current;
    const time = JUMP_HEIGHT + (jumpState.maxY - unit.y);
    const isJumping = jumpState.isjumping;

    const isStopJump = jumpState.maxY >= unit.y;
    if (isJumping && isStopJump) {
      jumpState.isjumping = false;
    }

    const isDoJump = unit.y > jumpState.maxY;
    if (isJumping && isDoJump) {
      const acceleration = getAccelerate(ACCELERATION_UP, time);
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
      const downAcceleration = getAccelerate(ACCELERATION_DOWN, time);
      const JUMP_DOWN_SPEED_LIMIT = INIT_JUMP_STATE.speed + DOWN_PLUS_SPEED;
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
    if (jumpRef.current.level < JUMP_MAX_LEVEL) {
      console.log('jump');
      jumpRef.current.isjumping = true;
      jumpRef.current.level += 1;
      jumpRef.current.maxY = unitRef.current.y - JUMP_HEIGHT;
      jumpRef.current.speed = INIT_JUMP_STATE.speed;
    }
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const collision = (unit: IUnit, obstacle: IObstacle) => {
    const isXTopLeftCollision = obstacle.x + (obstacle.blank?.topLeft ?? 0) < unit.x + unit.width;
    const isTTopRightCollision =
      unit.x < obstacle.x + obstacle.width - (obstacle.blank?.topRight ?? 0);
    const isXCollision = isXTopLeftCollision && isTTopRightCollision;
    const isYCollision = unit.y + unit.width > obstacle.y;

    if (isXCollision && isYCollision) {
      console.log('충돌 !!!, 점수 : ', `${playStateRef.current.timer}`);
      alert(`점수 : ${playStateRef.current.timer}`);
      playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
      stopPlay();
    }
  };

  const initPlayState = () => {
    clearCanvas();
    playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
    obstacleRef.current = [];
    playStateRef.current = { ...INIT_PLAY_STATE };
    jumpRef.current = { ...INIT_JUMP_STATE };
  };

  const handleStart = () => {
    initPlayState();
    byFrame();
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
      {isPlay && (
        <Center>
          <Button colorScheme="purple" onClick={handleJump} m={5}>
            jump
          </Button>
        </Center>
      )}
    </Center>
  );
};
export const drawImage = (ctx: CanvasRenderingContext2D | null, object: ICanvasObject) => {
  if (!ctx) return;
  const img: CanvasImageSource = object.image as HTMLImageElement;
  ctx.drawImage(img, object.x, object.y, object.width, object.height);
};
export default DynoCanvas;
