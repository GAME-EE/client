import { Progress } from '@chakra-ui/react';
import { useEffect, Dispatch, SetStateAction } from 'react';
import useTimer, { TimerHookProps } from '../hooks/useTimer';
import { GAME_STATE } from '../constants/memory';
interface Props {
  setGameState: Dispatch<SetStateAction<string>>;
}
function MemoryGameTimer({ setGameState }: Props) {
  const { DONE } = GAME_STATE;
  const { time, startTimer }: TimerHookProps = useTimer();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (time <= 0) {
      setGameState(DONE);
    }
  }, [time, setGameState, DONE]);
  return <Progress hasStripe value={time / 1500} />;
}

export default MemoryGameTimer;
