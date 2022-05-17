import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { scoreState } from '../atom';

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

  const stringToNumber = (number: string) => parseInt(number.replace(',', ''));

  const numberToString = (number: number) => {
    let str = '';
    let count = 0;
    while (number > 0) {
      if (count === 3) {
        str += ',';
        count = 0;
      }
      let digit = number % 10;
      str += digit;
      number = Math.floor(number / 10);
      count += 1;
    }
    return str.split('').reverse().join('');
  };

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
