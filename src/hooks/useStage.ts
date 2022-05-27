import { useCallback, useState } from "react";
export interface IStageHookProps {
  stage: number;
  nextStage: () => void;
  skipMultipleStage: (skip: number) => void;
  setState: (stage: number) => void;
  clearStage: () => void;
}

function useStage(): IStageHookProps {
  const [stage, setStage] = useState<number>(1);

  const nextStage = useCallback(() => {
    setStage((prevStage) => prevStage + 1);
  }, []);

  const skipMultipleStage = useCallback((skip: number) => {
    setStage((prevStage) => prevStage + skip);
  }, []);

  const setState = (stage: number) => {
    setStage(stage);
  };
  const clearStage = useCallback(() => {
    setStage(1);
  }, []);

  return { stage, nextStage, skipMultipleStage, setState, clearStage };
}

export default useStage;
