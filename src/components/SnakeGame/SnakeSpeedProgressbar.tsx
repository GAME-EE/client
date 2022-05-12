import { memo } from 'react';
import { Progress } from '@chakra-ui/react';

import type { ISnakeGameHook } from '../../types/snake';

const SnakeSpeedProgressbar = ({ currentFrame }: Pick<ISnakeGameHook, 'currentFrame'>) => {
  const currentSpeedPercentage = ((100 - currentFrame) / 35) * 100 - 100;

  const colorScheme = (currentSpeedPercentage: number) => {
    if (currentSpeedPercentage < 20) return 'green';
    if (currentSpeedPercentage < 40) return 'blue';
    if (currentSpeedPercentage < 70) return 'orange';
    return 'red';
  };

  return (
    <Progress
      colorScheme={colorScheme(currentSpeedPercentage)}
      hasStripe
      isAnimated
      value={currentSpeedPercentage}
      width="360px"
      height="30px"
    />
  );
};

export default memo(SnakeSpeedProgressbar);
