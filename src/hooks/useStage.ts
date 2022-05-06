import { useCallback, useState } from 'react';
import { GRID_ITEM_COUNT } from '../constants';
export interface IStageHookProps {
  stage: number;
  nextStage: () => void;
  getCorrectIndexs: () => number[];
}

function useStage(): IStageHookProps {
  const [stage, setStage] = useState<number>(1);

  const nextStage = useCallback(() => {
    setStage(prevStage => prevStage + 1);
  }, []);

  const getCorrectIndexs = useCallback(() => {
    let indexs: number[] = [];
    while (indexs.length < GRID_ITEM_COUNT[stage].count) {
      const ans = Math.floor(
        Math.random() * GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size,
      );
      if (!indexs.includes(ans)) {
        indexs.push(ans);
      }
    }
    return indexs;
  }, [stage]);
  return { stage, nextStage, getCorrectIndexs };
}

export default useStage;
