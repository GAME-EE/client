import { useCallback, useState } from 'react';
import { GRID_ITEM_COUNT } from '../constants';
export interface IStageHookProps {
  stage: number;
  nextStage: () => void;
  getCorrectIndexes: () => number[];
  clearStage: () => void;
}

function useStage(): IStageHookProps {
  const [stage, setStage] = useState<number>(1);

  const nextStage = useCallback(() => {
    setStage(prevStage => prevStage + 1);
  }, []);
  const clearStage = useCallback(() => {
    setStage(1);
  }, []);
  const getCorrectIndexes = useCallback(() => {
    let correctIndexes: number[] = [];
    while (correctIndexes.length < GRID_ITEM_COUNT[stage].count) {
      const correctIndex = Math.floor(
        Math.random() * GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size,
      );
      if (!correctIndexes.includes(correctIndex)) {
        correctIndexes.push(correctIndex);
      }
    }
    return correctIndexes;
  }, [stage]);
  return { stage, nextStage, getCorrectIndexes, clearStage };
}

export default useStage;
