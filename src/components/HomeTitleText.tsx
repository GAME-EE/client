/* eslint-disable @typescript-eslint/ban-ts-comment */
import { chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const Text = chakra(motion.h1, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const HomeTitleText = () => (
  <Text
    fontFamily="Press Start 2P"
    fontWeight="bold"
    color="white"
    fontSize="75px"
    animate={{
      opacity: [0, 1],
      y: ['-100%', '0%'],
    }}
    // https://chakra-ui.com/guides/integrations/with-framer
    // NOTE: 해당 에러는 무시가능합니다.
    // @ts-ignore
    transition={{
      duration: 1,
      ease: 'easeOut',
    }}
  >
    GAME-EE
  </Text>
);

export default HomeTitleText;
