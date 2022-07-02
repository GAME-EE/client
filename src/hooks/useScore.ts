/* eslint-disable no-unused-vars */
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { scoreState } from '../atom';
import { stringToNumber, numberToString } from '../utils/number';

export interface TimerHookProps {
  score: string;
  plusScore: (amount: number) => void;
  clearScore: () => void;
}

function useScore(): TimerHookProps {
  const [score, setScore] = useRecoilState<string>(scoreState);

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
