import React, { useEffect, useRef, useState } from 'react';

interface Iobstacle {
  id: number;
  x: number;
}

function DynoCanvas({}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [obstacles, setObstacles] = useState<Array<Iobstacle>>([]);
  const [dinoObj, setDinoObj] = useState({
    x: 10,
    y: 10,
    width: 20,
    height: 20,
  });
  let timer: number = 0;
  let idCnt = 0;
  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawDino(context, dinoObj);
      frameRepeat();
    }
  }, [context]);

  useEffect(() => {
    console.log('obstacles.length', obstacles, obstacles.length);
  }, [obstacles]);

  const frameRepeat = () => {
    timer++;
    window.requestAnimationFrame(frameRepeat);
    context && context.clearRect(200, 200, 500, 500); //초기화
    if (timer % 120 === 0) {
      setObstacles(obstacles => [...obstacles, { id: obstacles.length + 1, x: 100 }]);
      // context && drawObstacle(context, { x: 10, y: 120 });
      // drawObstacles(obstacles, timer);
    }
    drawObstacles(obstacles, timer);
    // setDinoObj({ ...dinoObj, x: dinoObj.x++ });
  };
  const drawObstacles = (obstacles: Array<Iobstacle>, timer: number) => {
    context &&
      obstacles.forEach((o: Iobstacle) => {
        // console.log({ x: o.x-- - timer });
        o.x--;
        drawObstacle(context, o.x - timer);
      });
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: `${600}px`,
          height: `${200}px`,
          border: '0.1px solid black',
        }}
      />
    </>
  );
}
const drawDino = (
  context: CanvasRenderingContext2D,
  dino: { x: any; y: any; width: any; height: any },
) => {
  if (context) {
    context.fillRect(dino.x, dino.y, dino.width, dino.height);
  }
};
const drawObstacle = (context: CanvasRenderingContext2D, x: number) => {
  const obstacle = {
    x: x,
    y: 120,
    width: 20,
    height: 30,
  };
  if (context) {
    context.fillStyle = 'green';
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
};

export default DynoCanvas;
