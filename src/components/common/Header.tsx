import Link from 'next/link';
import { Button, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { ELEMENT_COLOR } from '../../styles/colors';
import { ROUTES } from '../../constants';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom';
import { useCallback } from 'react';
import CustomChakraMotion from './CustomChakraMotion';

const HeaderBox = CustomChakraMotion(motion.header);

const Header = ({ isVisible }: { isVisible: boolean }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const isLoggined = userData.id !== null;

  const onClickLogoutButton = useCallback(() => {
    if (isLoggined) {
      setUserData({ id: null, name: null, nickname: null });
      localStorage.removeItem('refreshToken');
    }
  }, [setUserData, isLoggined]);

  return (
    <AnimatePresence>
      {isVisible && (
        <HeaderBox
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          padding="0px 20px"
          height="70px"
          boxShadow="lg"
          backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
          initial={{ opacity: 0, top: -100 }}
          animate={{ opacity: 1, top: 0 }}
          exit={{ opacity: 0, top: -100 }}
          zIndex={10}
        >
          <Link href={ROUTES.HOME} passHref>
            <Button
              as="a"
              backgroundColor={ELEMENT_COLOR.HEADER_BUTTON_BG_COLOR}
              _hover={{ backgroundColor: ELEMENT_COLOR.HEADER_BUTTON_HOVER_BG_COLOR }}
            >
              GAME-EE
            </Button>
          </Link>
          <HStack>
            <Link href={ROUTES.RANK} passHref>
              <Button
                as="a"
                backgroundColor={ELEMENT_COLOR.HEADER_BUTTON_BG_COLOR}
                _hover={{ backgroundColor: ELEMENT_COLOR.HEADER_BUTTON_HOVER_BG_COLOR }}
              >
                RANK
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN} passHref>
              <Button
                as="a"
                backgroundColor={ELEMENT_COLOR.HEADER_BUTTON_BG_COLOR}
                _hover={{ backgroundColor: ELEMENT_COLOR.HEADER_BUTTON_HOVER_BG_COLOR }}
                onClick={onClickLogoutButton}
              >
                {isLoggined ? 'LOGOUT' : 'LOGIN'}
              </Button>
            </Link>
          </HStack>
        </HeaderBox>
      )}
    </AnimatePresence>
  );
};

export default Header;
