import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
const Dyno: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // if (canvasRef != undefined) {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    console.log(context);

    // }
  }, []);

  return (
    <div>
      dyno
      <div style={{ width: '700px', height: '400px', backgroundColor: '#afafaf' }}>
        canvas
        <canvas ref={canvasRef} style={{ width: '600px', height: '300px' }}></canvas>
      </div>
    </div>
  );
};

export default Dyno;
