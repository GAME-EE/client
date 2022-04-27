import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';

import HomeGameButton from '../components/HomeGameButton';

import { ROUTES } from '../constants';

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
        rowGap="100px"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        as="main"
      >
        <Text as="h1" fontWeight="bold" fontSize="36px">
          GAME-EE
        </Text>
        <Box
          as="article"
          display="flex"
          flexDirection={{ base: 'column', tablet: 'row' }}
          justifyContent="center"
          alignItems="center"
          columnGap="30px"
          rowGap="30px"
        >
          <HomeGameButton href={ROUTES.DYNO}>다이노</HomeGameButton>
          <HomeGameButton href={ROUTES.FIND_DIFFERENT_COLOR}>다른 색깔 찾기</HomeGameButton>
          <HomeGameButton href={ROUTES.MEMORY}>기억력</HomeGameButton>
        </Box>
      </Box>
      <Box as="footer"></Box>
    </div>
  );
};

export default Home;
