import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

import { HomeGameLinkButton, HomeDownArrow, HomeTitleText, Header, Footer } from '../components/';

import { useWindowLayout } from '../hooks/';
import { ROUTES } from '../constants';
import { ELEMENT_COLOR } from '../styles/colors';

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
          backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
          rowGap="100px"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100vh"
        >
          <HomeTitleText color="white" />
          <Box
            as="article"
            display="flex"
            width={{ base: '80vw', tablet: '360px' }}
            justifyContent="center"
            borderBottom="7px solid white"
            borderRadius="5px"
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
          flexDirection={{ base: 'column', desktop: 'row' }}
          backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
          columnGap="50px"
          rowGap="50px"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="150vh"
        >
          <HomeGameLinkButton
            imageSrc="/home/chicken-game.gif"
            imageAlt="chicken game gif"
            href={ROUTES.DYNO}
          />
          <HomeGameLinkButton
            imageSrc="/home/snake-game.gif"
            imageAlt="snake game gif"
            href={ROUTES.SNAKE}
          />
          <HomeGameLinkButton
            imageSrc="/home/memory-game.gif"
            imageAlt="memory game gif"
            href={ROUTES.MEMORY}
          />
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default Home;
