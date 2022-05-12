import { memo } from 'react';
import { Box } from '@chakra-ui/react';

import type { ISnakeGameHook } from '../../types/snake';

const SnakeGameBodyCounter = ({ snakeBodyLength }: Pick<ISnakeGameHook, 'snakeBodyLength'>) => {
  return <Box>{snakeBodyLength}</Box>;
};

export default memo(SnakeGameBodyCounter);
