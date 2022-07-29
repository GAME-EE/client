import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import ChickenGame from '../../components/chicken-game';

const Dyno: NextPage = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ChickenGame />
    </Box>
  );
};

export default Dyno;
