import React, { useEffect, useRef, useState } from 'react';

// type Props = {};

function DynoCanvas({}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dinoObj, setDinoObj] = useState({
    x: 10,
    y: 10,
    width: 20,
    height: 20,
  });
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));

    // var c = new Cactus();
    if (context) {
      // context && context.fillRect(10, 20, 50, 50);
      drawDino(context, dinoObj);
      drawObstacle(context, { x: 100, y: 120 });
      frameRepeat();
    }
  }, [context, canvasRef]);
  const frameRepeat = () => {
    window.requestAnimationFrame(frameRepeat);
    setTimer(timer + 1);
    if (!context) return;

    context.clearRect(0, 0, 500, 500); //초기화

    if (timer % 120 === 0) {
      drawObstacle(context, { x: 100, y: 120 });
    }
    setDinoObj({ ...dinoObj, x: dinoObj.x++ });
    drawDino(context, dinoObj);
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
const drawDino = (context: CanvasRenderingContext2D, dino) => {
  console.log(context);

  if (context) {
    context.fillRect(dino.x, dino.y, dino.width, dino.height);
  }
};
const drawObstacle = (context: CanvasRenderingContext2D, obj: { x: number; y: number }) => {
  const obstacle = {
    x: obj.x,
    y: obj.y,
    width: 20,
    height: 30,
  };
  if (context) {
    context.fillStyle = 'green';
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
};

export default DynoCanvas;
