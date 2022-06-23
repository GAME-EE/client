import { useCallback, useRef, useState } from 'react';

export interface TimerHookProps {
  time: number;
  startTimer: () => void;
  stopTimer: () => void;
}

function useTimer(): TimerHookProps {
  const INITIAL_TIME = 150000;
  const MILLI_SECOND = 100;
  const [time, setTime] = useState<number>(INITIAL_TIME);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTime(time => time - MILLI_SECOND);
    }, MILLI_SECOND);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    setTime(INITIAL_TIME);
    intervalRef.current = null;
  }, []);

  return { time, startTimer, stopTimer };
}

export default useTimer;
