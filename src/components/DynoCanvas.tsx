// import React from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';

const DynoCanvas = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dinoY, setDinoY] = useState(20);
  const obstacleRef = useRef<number[]>([]);
  let timer = 0;

  const drawDino = useCallback(() => {
    const rect = {
      x: 10,
      y: dinoY,
      width: 50,
      height: 50,
    };

    if (!context) return;
    context.fillStyle = 'green';
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }, [context, dinoY]);

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
      const tempX = 450;
      obstacleRef.current = [...obstacleRef.current, tempX];
    }

    // NOTE: 장애물들을 프레임마다 1씩 줄이고
    obstacleRef.current = obstacleRef.current.map(i => i - 1);
    // NOTE: 1씩 줄였으니까, 다시 그려줘야 함
    obstacleRef.current.forEach(o => drawObstacleToX(context, o));

    // NOTE: 프레임 반복
    requestAnimationFrame(byFrame);
  };

  const drawObstacleToX = (ctx: CanvasRenderingContext2D | null, x: number) => {
    if (!ctx) return;

    ctx.fillRect(x, 130, 20, 20);
  };

  const clearCanvas = () => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: `${1000}px`,
          height: `${500}px`,
          border: '0.1px solid black',
        }}
      />
      <button onClick={byFrame}>start</button>
    </div>
  );
};

export default DynoCanvas;
