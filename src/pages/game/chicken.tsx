import type { NextPage } from 'next';
import ChickenGame from '../../components/chicken-game';
import { Box } from '@chakra-ui/react';
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
