/* eslint-disable @typescript-eslint/ban-ts-comment */
import { chakra } from '@chakra-ui/react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';

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
          backgroundColor="purple.700"
          initial={{ opacity: 0, top: -100 }}
          animate={{ opacity: 1, top: 0 }}
          exit={{ opacity: 0, top: -100 }}
        >
          헤더입니다.
        </HeaderBox>
      )}
    </AnimatePresence>
  );
};

export default Header;
