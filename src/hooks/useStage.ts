import { useCallback, useState } from 'react';
export interface IStageHookProps {
  stage: number;
  nextStage: () => void;
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

  return { stage, nextStage, clearStage };
}

export default useStage;
