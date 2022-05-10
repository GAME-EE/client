import { useCallback, useRef, useState } from 'react';

export interface TimerHookProps {
  time: number;
  startTimer: () => void;
  stopTimer: () => void;
}

function useTimer(): TimerHookProps {
  const INITIAL_TIME = 120000;
  const ONE_SECOND = 1000;
  const [time, setTime] = useState<number>(INITIAL_TIME);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTime(time => time - 10000);
    }, ONE_SECOND);
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
