import { Button, Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface DinoI {
  width: number;
  height: number;
  x: number;
  y: number;
  maxY: number; //공룡이 올라갈수 있는 최대 높이
  image?: HTMLImageElement;
}
interface ObstacleI {
  width: number;
  height: number;
  x: number;
  y: number;
  color?: '#6B46C1';
  image?: HTMLImageElement;
}

//상수값
const CANVAS_OBJECT = {
  width: 300,
  height: 150,
};
const OBSTACLE_OBJECT: ObstacleI = {
  width: 30,
  height: 30,
  x: CANVAS_OBJECT.width,
  y: CANVAS_OBJECT.height - 30,
  color: '#6B46C1',
};

const DINO_OBJECT: DinoI = {
  width: 20,
  height: 20,
  x: 20,
  y: CANVAS_OBJECT.height - 20,
  maxY: 30,
};
const DINO_SPEED = 3;
const OBSTACLE_SPEED = 2;
const STAY_MAX_TIME = 0; //Note : 점프 높이가 낮을떄는 필요했는데, 점프 높이를 늘려서 없어도 될수도 있음

const DynoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<ObstacleI[]>([]);
  const dinoRef = useRef<DinoI>(DINO_OBJECT);
  let animation: number;
  let jumping: boolean = false;
  let timer = 0;
  let stayTime = 0;

  useEffect(() => {
    dinoRef.current.image = new window.Image();
    dinoRef.current.image.src = '/chick.png';
    drawDino(); //왜 처음부터 보이지 않을 까요오오오오
  }, []);

  const drawDino = useCallback(() => {
    if (!context || !dinoRef.current.image) return;

    const img: CanvasImageSource = dinoRef.current.image as HTMLImageElement;
    context.drawImage(
      img,
      dinoRef.current.x,
      dinoRef.current.y,
      dinoRef.current.width,
      dinoRef.current.height,
    );
  }, [context, dinoRef]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawDino();
    }
  }, [context, drawDino]);

  const byFrame = () => {
    animation = requestAnimationFrame(byFrame);

    timer++;
    clearCanvas();

    // NOTE: 계속해서 Dino를 그려줘야 해
    drawDino();

    // NOTE: 오른쪽에서 추가하기
    if (timer % 120 === 0) {
      const tObstacle = {
        ...OBSTACLE_OBJECT,
        image: new window.Image(),
      };
      tObstacle.image.src = '/dino1.png';
      obstacleRef.current = [...obstacleRef.current, tObstacle];
      console.log(obstacleRef.current);
    }

    // NOTE: 장애물들을 프레임마다 1씩 줄이고
    obstacleRef.current = obstacleRef.current.map(obstacle => ({
      ...obstacle,
      x: obstacle.x - OBSTACLE_SPEED,
    }));

    // NOTE: 1씩 줄였으니까, 다시 그려줘야 함
    obstacleRef.current.forEach((obstacle, i, list) => {
      if (obstacle.x < 0 - OBSTACLE_OBJECT.width) {
        list.splice(i, 1); //화면 밖으로 나가면 제거
      }
      drawObstacleToX(context, obstacle);

      collision(dinoRef.current, obstacle); //충돌 체크
    });

    //체공 상태인 경우 dinoRef.current.y === OBSTACLE_OBJECT.maxY
    if (dinoRef.current.y <= DINO_OBJECT.maxY) {
      console.log('체공');
      stayTime++;
    }

    //체공 상태에서 끝나, 점프를 멈추어야 하는 상태
    if (stayTime > STAY_MAX_TIME) {
      console.log('stop');

      jumping = false;
      stayTime = 0;
    }

    //점프를 해야하는 상태
    if (dinoRef.current.y > DINO_OBJECT.maxY && jumping == true) {
      console.log('jump');

      dinoRef.current.y = dinoRef.current.y - DINO_SPEED;
    }
    console.log(dinoRef.current.y);

    //점프 상태가 아닌때 아래로, 내려갈수 있는 한계를 지정
    if (jumping == false && dinoRef.current.y + dinoRef.current.height < CANVAS_OBJECT.height) {
      console.log('down');

      dinoRef.current.y = dinoRef.current.y + DINO_SPEED;
    }
  };

  const drawObstacleToX = (ctx: CanvasRenderingContext2D | null, obstacle: ObstacleI) => {
    if (!ctx) return;
    // ctx.fillStyle = OBSTACLE_OBJECT?.color ?? '#6B46C1';
    // ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    const img: CanvasImageSource = obstacle.image as HTMLImageElement;
    ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleJump = () => {
    //점프 상태가 아닐때만 점프
    console.log(dinoRef.current.y, CANVAS_OBJECT.height, OBSTACLE_OBJECT.height);

    if (!jumping && dinoRef.current.y + dinoRef.current.height == CANVAS_OBJECT.height) {
      jumping = true;
    }
  };
  const collision = (dino: DinoI, obstacle: ObstacleI) => {
    /*
    충돌 조건

    [x]
    - 올라가는 경우 => obstacle.x <= dino.x + dino.width
    - 내려가는 경우 => dino.x <= obstacle.x + obstacle.width

    [y]
    x가 겹친 상태에서 y가 겹치면 안됨
    - dino.y >= obstacle.y - obstacle.height
    */
    const xFlag = obstacle.x <= dino.x + dino.width && dino.x <= obstacle.x + obstacle.width;
    const yFlag = dino.y >= obstacle.y - obstacle.height;
    if (xFlag && yFlag) {
      cancelAnimationFrame(animation);
      console.log('끝');
    }
  };

  return (
    <Center flexDirection={'column'} m={10}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${600}px`,
          height: `${300}px`,
          border: '0.1px solid black',
        }}
      />
      <Center>
        <Button
          colorScheme="purple"
          onClick={() => {
            // 초기화
            clearCanvas();
            obstacleRef.current = [];
            jumping = false;
            timer = 0;
            stayTime = 0;
            byFrame();
          }}
          m={5}
        >
          start
        </Button>
        <Button colorScheme="purple" onClick={handleJump} m={5}>
          jump
        </Button>
      </Center>
    </Center>
  );
};

export default DynoCanvas;
