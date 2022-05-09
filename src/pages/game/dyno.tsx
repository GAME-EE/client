import { Button, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import DynoCanvas from '../../components/DynoCanvas';
const Dyno: NextPage = () => {
  const [isPlay, setIsPlay] = useState(false);
  return (
    <div>
      <DynoCanvas
        isPlay={isPlay}
        stopPlay={() => {
          setIsPlay(false);
        }}
      />
      <Center>
        {!isPlay && (
          <Button colorScheme="purple" m={5} onClick={() => setIsPlay(true)}>
            start
          </Button>
        )}
      </Center>
    </div>
  );
};

export default Dyno;
