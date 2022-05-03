// import React from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';

const DynoCanvas = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // const [dinoYRef, setdinoYRefRef] = useState(120);
  const obstacleRef = useRef<number[]>([]);
  const dinoYRef = useRef<number>(120);
  // const jumpRef = useRef<boolean>(false);/
  let jumping: boolean = false;
  let timer = 0;
  const OBSTACLE_OBJECT = {
    y: 130,
    width: 20,
    height: 20,
  };
  const drawDino = useCallback(() => {
    const rect = {
      x: 20,
      y: dinoYRef.current,
      width: 30,
      height: 30,
    };

    if (!context) return;
    context.fillStyle = 'green';
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }, [context, dinoYRef]);

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
    obstacleRef.current = obstacleRef.current.map(i => i - 1);
    // NOTE: 1씩 줄였으니까, 다시 그려줘야 함
    obstacleRef.current.forEach((value, i, o) => {
      if (value < 0 - OBSTACLE_OBJECT.width) {
        o.splice(i, 1); //화면 밖으로 나가면 제거
      }
      drawObstacleToX(context, value);
    });
    if (jumping == true) {
      dinoYRef.current = dinoYRef.current - 1;
      // setdinoYRef(dino => dino - 1);
    }
    // NOTE: 프레임 반복
    requestAnimationFrame(byFrame);
  };

  const drawObstacleToX = (ctx: CanvasRenderingContext2D | null, x: number) => {
    if (!ctx) return;

    ctx.fillRect(x, OBSTACLE_OBJECT.y, OBSTACLE_OBJECT.width, OBSTACLE_OBJECT.height);
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  const handleJump = () => {
    jumping = true;
    // jumpRef.current = true;
    console.log(jumping);
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: `${600}px`,
          height: `${300}px`,
          border: '0.1px solid black',
        }}
      />
      <button onClick={byFrame}>start</button>
      <button onClick={handleJump}>jump</button>
    </div>
  );
};

export default DynoCanvas;
