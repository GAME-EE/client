import { Box } from '@chakra-ui/react';

import { SnakeGame } from '../../components';

import type { NextPage } from 'next';

const Snake: NextPage = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <SnakeGame />
    </Box>
  );
};

export default Snake;
