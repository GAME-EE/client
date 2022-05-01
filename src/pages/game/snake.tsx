import { Box } from '@chakra-ui/react';

import { SnakeGameCanvas } from '../../components';

import type { NextPage } from 'next';

const Snake: NextPage = () => {
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <SnakeGameCanvas />
    </Box>
  );
};

export default Snake;
