import { useCallback, useState } from 'react';
import { GRID_ITEM_COUNT } from '../constants';
export interface IStageHookProps {
  stage: number;
  nextStage: () => void;
  getCorrectIndexes: () => number[];
}

function useStage(): IStageHookProps {
  const [stage, setStage] = useState<number>(1);

  const nextStage = useCallback(() => {
    setStage(prevStage => prevStage + 1);
  }, []);

  const getCorrectIndexes = useCallback(() => {
    let indexes: number[] = [];
    while (indexes.length < GRID_ITEM_COUNT[stage].count) {
      const correctIndex = Math.floor(
        Math.random() * GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size,
      );
      if (!indexes.includes(correctIndex)) {
        indexes.push(correctIndex);
      }
    }
    return indexes;
  }, [stage]);
  return { stage, nextStage, getCorrectIndexes };
}

export default useStage;
