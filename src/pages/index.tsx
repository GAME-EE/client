import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

import { HomeGameButton, HomeDownArrow, HomeTitleText, Header } from '../components/';

import { useWindowLayout } from '../hooks/';
import { ROUTES } from '../constants';

const Home: NextPage = () => {
  const { scrollTop } = useWindowLayout();
  const gameSelectSection = useRef<HTMLDivElement>(null);
  const [isHeaderShow, setIsHeaderShow] = useState<boolean>(false);

  useEffect(() => {
    if (gameSelectSection.current && gameSelectSection.current.offsetTop < scrollTop) {
      setIsHeaderShow(true);
    } else {
      setIsHeaderShow(false);
    }
  }, [scrollTop]);

  return (
    <div>
      <Head>
        <title>GAME-EE</title>
        <meta name="description" content="Game-ee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as="main"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        display="flex"
      >
        <Header isVisible={isHeaderShow} />
        <Box
          as="section"
          display="flex"
          flexDirection="column"
          backgroundColor="blackAlpha.900"
          rowGap="100px"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100vh"
        >
          <HomeTitleText />
          <Box
            as="article"
            display="flex"
            width={{ base: '80vw', tablet: '360px' }}
            justifyContent="center"
            borderBottom="7px solid white"
            alignItems="baseline"
            columnGap="30px"
            rowGap="30px"
          >
            <Image src="/chick.png" alt="chicken" width="50px" height="50px" draggable={false} />
            <Image src="/dino1.png" alt="dino" width="75px" height="75px" draggable={false} />
          </Box>
          <HomeDownArrow />
        </Box>
        <Box
          ref={gameSelectSection}
          as="section"
          display="flex"
          flexDirection={{ base: 'column', tablet: 'row' }}
          backgroundColor="blackAlpha.900"
          columnGap="30px"
          rowGap="30px"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="200vh"
        >
          <HomeGameButton href={ROUTES.DYNO}>다이노</HomeGameButton>
          <HomeGameButton href={ROUTES.SNAKE}>뱀</HomeGameButton>
          <HomeGameButton href={ROUTES.MEMORY}>기억력</HomeGameButton>
        </Box>
        <Box
          as="footer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          backgroundColor="blackAlpha.900"
          color="white"
          height="200px"
        >
          FOOTER
        </Box>
      </Box>
    </div>
  );
};

export default Home;
