import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
const Dyno: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // if (canvasRef != undefined) {
    if (!canvasRef.current) {
      console.log('canvasRef.current');

      return;
    }
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext('2d');
    console.log(ctx);
    if (!ctx) {
      console.log('ctx');
      return;
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);

    // }
  }, []);
  // const dino = {
  //   x: 10,
  //   y: 200,
  //   width: 50,
  //   height: 50,
  //   draw() {
  //     ctx.fillStyle = 'green';
  //     ctx.fillReact(this.x, this.y, this.width, this.height);
  //   },
  // };
  return (
    <div>
      dyno
      {/* <div style={{ width: '700px', height: '400px', backgroundColor: '#afafaf' }}> */}
      <canvas ref={canvasRef} id="canvas"></canvas>
      {/* </div> */}
    </div>
  );
};

export default Dyno;
