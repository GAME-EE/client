import { Button, Center } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useState } from 'react';
import DynoCanvas from '../../components/DynoCanvas';
const Dyno: NextPage = () => {
  const [isPlay, setIsPlay] = useState(false);
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export default Dyno;
