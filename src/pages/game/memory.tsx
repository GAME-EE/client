import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { MemoryGame } from '../../components';

const Memory: NextPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="10px"
      alignItems="center"
      mt="60px"
      as="main"
    >
      <MemoryGame />
    </Box>
  );
};

export default Memory;
