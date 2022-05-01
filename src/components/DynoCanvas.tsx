import React, { useEffect, useRef, useState } from 'react';

// type Props = {};

function DynoCanvas({}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));

    context && context.fillRect(25, 25, 100, 100);
  }, [context, canvasRef]);
  console.log(context, canvasRef);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: `${500}px`,
          height: `${500}px`,
          border: '0.1px solid black',
        }}
      />
    </>
  );
}

export default DynoCanvas;
