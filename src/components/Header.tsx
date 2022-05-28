import { chakra, Box } from '@chakra-ui/react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';

import { ELEMENT_COLOR } from '../styles/colors';

const HeaderBox = chakra(motion.header, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const Header = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <HeaderBox
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="70px"
          color="white"
          boxShadow="lg"
          backgroundColor={ELEMENT_COLOR.SECOND_BG_COLOR}
          initial={{ opacity: 0, top: -100 }}
          animate={{ opacity: 1, top: 0 }}
          exit={{ opacity: 0, top: -100 }}
          zIndex={10}
        >
          <Box>GAME-EE</Box>
        </HeaderBox>
      )}
    </AnimatePresence>
  );
};

export default Header;
