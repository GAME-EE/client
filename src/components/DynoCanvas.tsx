import { Button, Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IDino, IObstacle, ICanvasObject } from '../types/dyno';
const CANVAS_OBJECT = {
  width: 300,
  height: 150,
};
const OBSTACLE_OBJECT: IObstacle = {
  width: 30,
  height: 30,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 30,
  color: '#6B46C1',
};
const DINO_OBJECT: IDino = {
  width: 20,
  height: 20,
  x: 20,
  y: CANVAS_OBJECT.height - 20,
  maxY: 50,
};

const INIT_PLAY_STATE: IPlayState = {
  jumping: false,
  timer: 0,
  stayTime: 0,
  animation: undefined,
};
const DINO_SPEED = 3;
const OBSTACLE_SPEED = 2;
const STAY_MAX_TIME = 0;

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
}
interface IPlayState {
  timer: number;
  stayTime: number;
  jumping: boolean;
  animation?: number;
}

const DynoCanvas = ({ isPlay, stopPlay }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<IObstacle[]>([]);
  const dinoRef = useRef<IDino>(DINO_OBJECT);
  const playStateRef = useRef<IPlayState>(INIT_PLAY_STATE);

  useEffect(() => {
    dinoRef.current.image = new window.Image();
    dinoRef.current.image.src = '/chick.png';
    // drawDino(); //왜 처음부터 보이지 않을 까요
    drawImage(context, dinoRef.current);
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
      drawImage(context, dinoRef.current);
    }
  }, [context, drawImage]);

  const byFrame = () => {
    playStateRef.current.animation = requestAnimationFrame(byFrame);

    playStateRef.current.timer++;
    clearCanvas();
    drawImage(context, dinoRef.current);
    if (playStateRef.current.timer % 120 === 0) {
      const tObstacle = {
        ...OBSTACLE_OBJECT,
        image: new window.Image(),
      };
      tObstacle.image.src = '/dino1.png';
      obstacleRef.current = [...obstacleRef.current, tObstacle];
    }

    obstacleRef.current = obstacleRef.current.map(obstacle => ({
      ...obstacle,
      x: obstacle.x - OBSTACLE_SPEED,
    }));

    obstacleRef.current.forEach((obstacle, i, list) => {
      //장애물이 화면 밖으로 나가면 제거
      if (obstacle.x < 0 - OBSTACLE_OBJECT.width) {
        list.splice(i, 1);
      }
      drawImage(context, obstacle);
      collision(dinoRef.current, obstacle); //충돌 체크
    });

    //체공 상태인 경우 dinoRef.current.y === OBSTACLE_OBJECT.maxY
    if (dinoRef.current.y <= DINO_OBJECT.maxY) {
      playStateRef.current.stayTime++;
    }

    //체공 상태에서 끝나, 점프를 멈추어야 하는 상태
    if (playStateRef.current.stayTime > STAY_MAX_TIME) {
      playStateRef.current.jumping = false;
      playStateRef.current.stayTime = 0;
    }

    //점프를 해야하는 상태
    if (dinoRef.current.y > DINO_OBJECT.maxY && playStateRef.current.jumping == true) {
      dinoRef.current.y = dinoRef.current.y - DINO_SPEED;
    }

    //점프 상태가 아닌때 아래로, 내려갈수 있는 한계를 지정
    if (
      playStateRef.current.jumping == false &&
      dinoRef.current.y + dinoRef.current.height < CANVAS_OBJECT.height
    ) {
      dinoRef.current.y = dinoRef.current.y + DINO_SPEED;
    }
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleJump = () => {
    //점프 상태가 아닐때만 점프
    if (
      !playStateRef.current.jumping &&
      dinoRef.current.y + dinoRef.current.height == CANVAS_OBJECT.height
    ) {
      playStateRef.current.jumping = true;
    }
  };
  const collision = (dino: IDino, obstacle: IObstacle) => {
    /*
    충돌 조건

    [x]
    - 올라가는 경우 => obstacle.x <= dino.x + dino.width
    - 내려가는 경우 => dino.x <= obstacle.x + obstacle.width

    [y]
    x가 겹친 상태에서 y가 겹치면 안됨
    - dino.y >= obstacle.y - obstacle.height
    */
    const someGap = 10;
    const xFlag = obstacle.x < dino.x + dino.width && dino.x < obstacle.x + obstacle.width;
    const yFlag = dino.y - someGap > obstacle.y - obstacle.height;
    if (xFlag && yFlag) {
      console.log('충돌 !!!');
      playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
      stopPlay();
    }
  };
  const initPlayState = () => {
    clearCanvas();
    playStateRef.current.animation && cancelAnimationFrame(playStateRef.current.animation);
    obstacleRef.current = [];
    playStateRef.current = INIT_PLAY_STATE;
  };
  const handleStart = () => {
    initPlayState();
    byFrame();
  };
  return (
    <Center flexDirection={'column'} marginTop={10}>
      <canvas
        ref={canvasRef}
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
