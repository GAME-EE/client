import { Button, Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
interface DinoI {
  width: number;
  height: number;
  x: number;
  y: number;
  maxY: number; //공룡이 올라갈수 있는 최대 높이
}
interface ObstacleI {
  width: number;
  height: number;
  x: number;
  y: number;
  color?: '#6B46C1';
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
  width: 30,
  height: 30,
  x: 20,
  y: CANVAS_OBJECT.height - 30,
  maxY: 30,
};
const DINO_SPEED = 3;
const OBSTACLE_SPEED = 2;
const STAY_MAX_TIME = 5;

const DynoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const obstacleRef = useRef<number[]>([]);
  const dinoRef = useRef<DinoI>(DINO_OBJECT);

  let jumping: boolean = false;
  let timer = 0;
  let stayTime = 0;

  const drawDino = useCallback(() => {
    // const rect = {
    //   x: dinoRef.current.x,
    //   y: dinoRef.current.y,
    //   width: dinoRef.current.width,
    //   height: dinoRef.current.height,
    // };

    if (!context) return;
    context.fillStyle = 'pink';
    context.fillRect(
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
    timer++;
    clearCanvas();

    // NOTE: 계속해서 Dino를 그려줘야 해
    drawDino();

    // NOTE: 오른쪽에서 추가하기
    if (timer % 120 === 0) {
      const tempX = 300;
      obstacleRef.current = [...obstacleRef.current, tempX];
    }

    // NOTE: 장애물들을 프레임마다 1씩 줄이고
    obstacleRef.current = obstacleRef.current.map(i => i - OBSTACLE_SPEED);

    // NOTE: 1씩 줄였으니까, 다시 그려줘야 함
    obstacleRef.current.forEach((value, i, o) => {
      if (value < 0 - OBSTACLE_OBJECT.width) {
        o.splice(i, 1); //화면 밖으로 나가면 제거
      }
      drawObstacleToX(context, value);
    });

    //체공 상태인 경우 dinoRef.current.y === OBSTACLE_OBJECT.maxY
    if (dinoRef.current.y === DINO_OBJECT.maxY) {
      stayTime++;
    }

    //체공 상태에서 끝나, 점프를 멈추어야 하는 상태
    if (stayTime > STAY_MAX_TIME) {
      jumping = false;
      stayTime = 0;
    }

    //점프를 해야하는 상태
    if (dinoRef.current.y > DINO_OBJECT.maxY && jumping == true) {
      dinoRef.current.y = dinoRef.current.y - DINO_SPEED;
    }

    //점프 상태가 아닌때 아래로, 내려갈수 있는 한계를 지정
    if (jumping == false && dinoRef.current.y < CANVAS_OBJECT.height - OBSTACLE_OBJECT.height) {
      dinoRef.current.y = dinoRef.current.y + DINO_SPEED;
    }

    requestAnimationFrame(byFrame);
  };

  const drawObstacleToX = (ctx: CanvasRenderingContext2D | null, x: number) => {
    if (!ctx) return;
    ctx.fillStyle = OBSTACLE_OBJECT?.color ?? '#6B46C1';
    ctx.fillRect(x, OBSTACLE_OBJECT.y, OBSTACLE_OBJECT.width, OBSTACLE_OBJECT.height);
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  const handleJump = () => {
    //점프 상태가 아닐때만 점프
    if (!jumping && dinoRef.current.y == CANVAS_OBJECT.height - OBSTACLE_OBJECT.height) {
      jumping = true;
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
        <Button colorScheme="purple" onClick={byFrame} m={5}>
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
