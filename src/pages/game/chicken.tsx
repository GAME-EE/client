import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import ChickenGame from '../../components/chicken-game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../atom';

const Dyno: NextPage = () => {
  const user = useRecoilValue(userState);
  console.log('user: ', user);
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
