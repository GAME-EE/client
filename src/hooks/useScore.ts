import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { scoreState } from '../atom';
import { stringToNumber, numberToString } from '../utils/number';
export interface TimerHookProps {
  score: string;
  plusScore: () => void;
  clearScore: () => void;
}

export interface IStage {
  stage: number;
}

function useScore({ stage = 1 }: IStage): TimerHookProps {
  const [score, setScore] = useRecoilState<string>(scoreState);

  const plusScore = useCallback(() => {
    setScore(prev => {
      let number = stringToNumber(prev);
      number += stage * 1000;
      return numberToString(number);
    });
  }, [stage, setScore]);

  const clearScore = useCallback(() => setScore('0'), [setScore]);
  return { score, plusScore, clearScore };
}

export default useScore;
