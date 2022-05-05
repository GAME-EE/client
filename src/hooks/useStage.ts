import { useCallback, useState } from 'react';

export interface StageHookProps {
  stage: number;
  nextStage: () => void;
  resetStage: () => void;
}

function useStage(): StageHookProps {
  const [stage, setStage] = useState<number>(1);

  const nextStage = useCallback(() => {
    setStage(prevStage => prevStage + 1);
  }, []);

  const resetStage = useCallback(() => {
    setStage(1);
  }, []);

  return { stage, nextStage, resetStage };
}

export default useStage;
