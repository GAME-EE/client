import Link from 'next/link';
import { chakra, Button, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';

import { ELEMENT_COLOR } from '../styles/colors';
import { ROUTES } from '../constants';

const HeaderBox = chakra(motion.header, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const Header = ({ isVisible }: { isVisible: boolean }) => {
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
              >
                LOGIN
              </Button>
            </Link>
          </HStack>
        </HeaderBox>
      )}
    </AnimatePresence>
  );
};

export default Header;
