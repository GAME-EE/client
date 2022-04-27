import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
const Dyno: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef != undefined) {
      const canvas: any = canvasRef.current;
      const ctx = canvas.getContext('2d');
      console.log(canvas);
    }
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
