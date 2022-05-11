import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { scoreState } from '../atom';

export interface TimerHookProps {
  score: number;
  plusScore: () => void;
  clearScore: () => void;
}

export interface IStage {
  stage: number;
}

function useScore({ stage = 1 }: IStage): TimerHookProps {
  const [score, setScore] = useRecoilState<number>(scoreState);

  const plusScore = useCallback(() => {
    setScore(prev => (prev += stage * 1000));
  }, [stage, setScore]);

  const clearScore = useCallback(() => setScore(0), [setScore]);
  return { score, plusScore, clearScore };
}

export default useScore;
