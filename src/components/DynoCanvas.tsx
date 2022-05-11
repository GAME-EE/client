import { Button, Center } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IUnit, IObstacle, ICanvasObject, IPlayState, IJumpState, IGameLevel } from '../types/dyno';
import { getRandomNumber } from '../utils/number';
const OBSTACLE_CREATE_TIME = 120;
const GAME_LEVEL_UP_TIME = 600;
const INIT_OBSTACLE_SPEED = 10;
const JUMP_HEIGHT = 200;
const JUMP_MAX_LEVEL = 2;
const DOWN_PLUS_SPEED = 3;
const GAME_MAX_LEVEL = 4;

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
    //NOTE : y가 작을수록 unit이 높은 위치에 있는 것
    const time = JUMP_HEIGHT + (jumpState.maxY - unit.y);
    const acceleration =
      Math.ceil(0.01 * time * 100) / 200 > 0 ? Math.ceil(0.003 * time * 100) / 200 : 0;
    const downAcceleration =
      Math.ceil(0.03 * time * 100) / 200 > 0 ? Math.ceil(0.003 * time * 100) / 100 : 0;

    //State 1 : 점프를 멈추어야 하는 상태
    if (jumpState.isjumping && jumpState.maxY >= unit.y) {
      jumpState.isjumping = false;
    }

    //점프를 해야하는 상태
    if (unit.y > jumpState.maxY && jumpState.isjumping) {
      jumpState.speed = jumpState.speed - acceleration > 0 ? jumpState.speed - acceleration : 0;
      unit.y =
        unit.y - jumpState.speed > jumpState.maxY ? unit.y - jumpState.speed : jumpState.maxY;
    }

    //점프 상태가 아닐때 아래로, 내려갈수 있는 한계를 지정
    if (!jumpState.isjumping && unit.y + unit.height < CANVAS_OBJECT.height) {
      jumpState.speed =
        jumpState.speed + downAcceleration < INIT_JUMP_STATE.speed + DOWN_PLUS_SPEED
          ? jumpState.speed + downAcceleration
          : INIT_JUMP_STATE.speed + DOWN_PLUS_SPEED;
      unit.y =
        unit.y + jumpState.speed < CANVAS_OBJECT.height - unit.height
          ? unit.y + jumpState.speed
          : CANVAS_OBJECT.height - unit.height;
    }

    //unit이 땅에 닿으면, jump level초기화
    if (jumpState.level !== 0 && unit.y + unit.height >= CANVAS_OBJECT.height) {
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
    }
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const collision = (unit: IUnit, obstacle: IObstacle) => {
    /*
    충돌 조건

    [x]
    - 올라가는 경우 => obstacle.x <= unit.x + unit.width
    - 내려가는 경우 => unit.x <= obstacle.x + obstacle.width

    [y]
    x가 겹친 상태에서 y가 겹치면 안됨
    - unit.y >= obstacle.y - obstacle.height
    */
    const xTopLeftFlag = obstacle.x + (obstacle.blank?.topLeft ?? 0) < unit.x + unit.width;
    const xTopRightFlag = unit.x < obstacle.x + obstacle.width - (obstacle.blank?.topRight ?? 0);
    const xFlag = xTopLeftFlag && xTopRightFlag;
    const yFlag = unit.y + unit.width > obstacle.y;

    if (xFlag && yFlag) {
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
