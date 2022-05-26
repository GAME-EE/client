import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

import { HomeDownArrow, HomeTitleText } from '../components/';
// import HomeGameButton from '../components/HomeGameButton';

// import { ROUTES } from '../constants';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>GAME-EE</title>
        <meta name="description" content="Game-ee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="header"></Box>
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="blackAlpha.900"
        rowGap="100px"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        as="main"
      >
        <HomeTitleText />
        <Box
          as="article"
          display="flex"
          width={{ base: '80vw', tablet: '360px' }}
          justifyContent="center"
          borderBottom="3px solid white"
          alignItems="baseline"
          columnGap="30px"
          rowGap="30px"
        >
          <Image src="/chick.png" alt="chicken" width="50px" height="50px" draggable={false} />
          <Image src="/dino1.png" alt="dino" width="75px" height="75px" draggable={false} />
          {/* <HomeGameButton href={ROUTES.DYNO}>다이노</HomeGameButton>
          <HomeGameButton href={ROUTES.SNAKE}>뱀</HomeGameButton>
          <HomeGameButton href={ROUTES.MEMORY}>기억력</HomeGameButton> */}
        </Box>
        <HomeDownArrow />
      </Box>
      <Box as="footer"></Box>
    </div>
  );
};

export default Home;
