import { useCallback, useRef, useState } from 'react';

export interface TimerHookProps {
  time: number;
  startTimer: (timeStamp: number) => void;
  stopTimer: () => void;
}

function useTimer(): TimerHookProps {
  const INITIAL_TIME = 60000; // 60s
  const [time, setTime] = useState<number>(INITIAL_TIME);

  const startTime = useRef<number | null>(null);
  const startTimer = useCallback((timeStamp: number) => {
    if (!startTime.current) {
      startTime.current = timeStamp;
    }
    const elapsedTime = timeStamp - startTime.current;
    setTime(INITIAL_TIME - elapsedTime);
    if (elapsedTime < INITIAL_TIME) {
      requestAnimationFrame(startTimer);
    }
  }, []);

  const stopTimer = useCallback(() => {
    startTime.current = null;
    setTime(INITIAL_TIME);
  }, []);

  return { time, startTimer, stopTimer };
}

export default useTimer;
