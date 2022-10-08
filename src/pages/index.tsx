import { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import {
  HomeGameLinkButton,
  HomeDownArrow,
  HomeTitleText,
  Header,
  Footer,
  CustomChakraMotion,
} from '../components/';

import { useWindowLayout } from '../hooks/';
import { ROUTES } from '../constants';
import { ELEMENT_COLOR } from '../styles/colors';
import { useRecoilState } from 'recoil';
import { token, userState } from '../atom';
import { ITokenProps } from '../types/home';
import { getAccessToken, getUserState } from '../api';

const JumpChicken = CustomChakraMotion(motion.div);

const Home: NextPage<ITokenProps> = pageProps => {
  const { scrollTop } = useWindowLayout();
  const gameSelectSection = useRef<HTMLDivElement>(null);
  const [isHeaderShow, setIsHeaderShow] = useState<boolean>(false);
  const [tokenState, setTokenState] = useRecoilState(token);
  const [userProfile, setUserProfile] = useRecoilState(userState);

  const setUserStateToRecoil = useCallback(async () => {
    const profile = await getUserState();
    setUserProfile(profile.data);
  }, [setUserProfile]);

  useEffect(() => {
    if (gameSelectSection.current && gameSelectSection.current.offsetTop < scrollTop) {
      setIsHeaderShow(true);
    } else {
      setIsHeaderShow(false);
    }
  }, [scrollTop]);

  useEffect(() => {
    const { refreshToken } = pageProps;

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
      setTokenState({ refreshToken });
    } else {
      const refreshTokenInLocalStroge = localStorage.getItem('refreshToken');

      if (refreshTokenInLocalStroge) setTokenState({ refreshToken: refreshTokenInLocalStroge });
    }
  }, [pageProps, setTokenState]);

  useEffect(() => {
    const { refreshToken } = tokenState;
    const { accessToken } = pageProps;
    const hasRefreshToken = refreshToken !== null;
    const noneAccessToken = accessToken === '';

    if (hasRefreshToken) {
      if (noneAccessToken) {
        getAccessToken(refreshToken);
      } else {
        setUserStateToRecoil();
      }
    }
  }, [tokenState, pageProps, setUserStateToRecoil]);

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
            <JumpChicken
              transition={{
                duration: 1 as never,
                repeat: Infinity as never,
              }}
              animate={{ y: [-75, 0, 0, 0, 0, -75] }}
            >
              <Image src="/chick.png" alt="chicken" width="50px" height="50px" draggable={false} />
            </JumpChicken>
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
            href={ROUTES.CHICKEN}
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
