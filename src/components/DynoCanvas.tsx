// import React from 'react';

import { useEffect, useRef, useState } from 'react';

const DynoCanvas = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dinoY, setDinoY] = useState(20);
  const [obstacleXList, setObstacleXList] = useState<Array<number>>([]);
  let timer = 0;

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      // context.fillStyle = 'green';
      // context.fillRect(10, 10, 10, 10);

      drawDino();
    }
  }, [context]);
  useEffect(() => {
    // console.log(obstacleXList);
    obstacleXList.forEach(o => {
      drawObstacleToX(context, o);
    });
  }, [obstacleXList]);

  const byFrame = () => {
    requestAnimationFrame(byFrame);
    clearCanvas();
    timer++;
    if (timer % 120 === 0) {
      const tempX = 450;
      setObstacleXList(o => {
        console.log(o);
        return [...o, tempX];
      });
    }
    setObstacleXList(o => {
      // console.log(o.map(i => i - 1));
      return o.map(i => i - 1);
    });
  };
  const drawDino = () => {
    const rect = {
      x: 10,
      y: dinoY,
      width: 50,
      height: 50,
    };

    if (!context) return;
    context.fillStyle = 'green';
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  };
  const handleClick = () => {
    // const tempX = 450;
    // setObstacleXList(o => [...o.map(i => i - 1), tempX]);
    // console.log('minuse', obstacleXList);
    byFrame();

    // console.log();
    // setDinoY(dinoY => dinoY - 1);
    // clearCanvas();
    // drawDino();
  };
  const clearCanvas = () => {
    //canvas 클리어
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
      <button onClick={handleClick}>start</button>
    </div>
  );
};
const drawObstacleToX = (ctx: CanvasRenderingContext2D | null, x: number) => {
  if (!ctx) return;
  ctx.fillRect(x, 100, 50, 50);
};
// class Obstacle {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   constructor() {
//     this.x = 200;
//     this.y = 100;
//     this.width = 50;
//     this.height = 50;
//   }
//   draw(ctx: CanvasRenderingContext2D | null) {
//     if (!ctx) return;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
//   drawToX(ctx: CanvasRenderingContext2D | null, x: number) {
//     if (!ctx) return;
//     ctx.fillRect(x, this.y, this.width, this.height);
//   }
// }
export default DynoCanvas;
