import { Center } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IObstacle } from '../../types/dyno';
import { KeyboardCodeType } from '../../types/common';
import DYNO, { CANVAS_OBJECT } from '../../constants/chicken';
import { drawImage, getCurrentGameLevel } from '../../utils/chicken';
import useChickenGame from '../../hooks/useChickenGame';

interface IDynoCanvas {
  isPlay: boolean;
  stopPlay: () => void;
  updateGameState: (time: number) => void;
}

const DynoCanvas = ({ isPlay, stopPlay, updateGameState }: IDynoCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const requestAnimationRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const { unitRef, handleJump, drawMoveObstacles, handleMoveState, createObstacle, clearState } =
    useChickenGame();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const code = event.code as KeyboardCodeType;
      switch (code) {
        case 'Space':
          isPlay && handleJump();
          break;
      }
    },
    [isPlay],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const initPlayState = () => {
      clearCanvas();
      cancelAnimationFrame(requestAnimationRef.current);
      clearState();
      timerRef.current = 0;
    };

    if (isPlay) {
      initPlayState();
      byFrame();
    }
  }, [isPlay]);

  const clearCanvas = useCallback(() => {
    canvasRef.current &&
      context &&
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [context]);

  const stopGame = () => {
    cancelAnimationFrame(requestAnimationRef.current);
    stopPlay();
    updateGameState(timerRef.current);
  };

  const byFrame = () => {
    requestAnimationRef.current = requestAnimationFrame(byFrame);
    timerRef.current++;

    clearCanvas();
    drawImage(context, unitRef.current);

    const isObstacleCreateTime = timerRef.current % DYNO.OBSTACLE_CREATE_TIME === 0;
    const isLevelUpTime = timerRef.current % DYNO.GAME_LEVEL_UP_TIME === 0;
    if (isObstacleCreateTime) {
      const currentGameLevel = getCurrentGameLevel(timerRef.current);
      createObstacle(currentGameLevel);
    }
    if (isLevelUpTime) {
      updateGameState(timerRef.current);
    }

    drawMoveObstacles(stopGame, (obstacle: IObstacle) => drawImage(context, obstacle));
    handleMoveState();
  };

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    if (context) {
      drawImage(context, unitRef.current);
    }
  }, [context]);
  // useEffect(() => {
  //   drawImage(context, unitRef.current); //왜 처음부터 보이지 않을 까요
  // }, [context]);

  return (
    <Center flexDirection={'column'} marginTop={10}>
      <canvas
        ref={canvasRef}
        width={CANVAS_OBJECT.width}
        height={CANVAS_OBJECT.height}
        style={{
          width: `${600}px`,
          height: `${300}px`,
          border: '0.1px solid black',
        }}
      />
    </Center>
  );
};

export default DynoCanvas;
