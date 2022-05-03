import { useState } from 'react';

const useScore = () => {
  const [score, setScore] = useState<number>(0);

  // TODO: 나중에 말 맞춰보자
  const increaseScore = () => {
    setScore(prev => prev + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return { score, increaseScore, resetScore };
};

export default useScore;
