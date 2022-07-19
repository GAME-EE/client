/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { stringToNumber, numberToString } from '../utils/number';

export interface TimerHookProps {
  score: string;
  plusScore: (amount: number) => void;
  clearScore: () => void;
}

function useScore(): TimerHookProps {
  const [score, setScore] = useState('0');

  const plusScore = useCallback(
    (amount: number) => {
      setScore(prev => {
        let number = stringToNumber(prev);
        number += amount;
        return numberToString(number);
      });
    },
    [setScore],
  );

  const clearScore = useCallback(() => setScore('0'), [setScore]);
  return { score, plusScore, clearScore };
}

export default useScore;
