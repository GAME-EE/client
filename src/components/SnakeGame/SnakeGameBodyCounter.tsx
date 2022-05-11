import { memo } from 'react';
import { Progress, Box } from '@chakra-ui/react';

import type { ISnakeGameHook } from '../../types/snake';

const SnakeGameBodyCounter = ({ snakeBodyLength }: Pick<ISnakeGameHook, 'snakeBodyLength'>) => {
  return (
    <Box>
      {snakeBodyLength}
      <Progress width="360px" colorScheme="purple" hasStripe value={snakeBodyLength} />
    </Box>
  );
};

export default memo(SnakeGameBodyCounter);
