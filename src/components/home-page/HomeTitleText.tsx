/* eslint-disable @typescript-eslint/ban-ts-comment */
import { motion } from 'framer-motion';

import CustomChakraMotion from '../common/CustomChakraMotion';

import { FONTS } from '../../constants';

const Text = CustomChakraMotion(motion.h1);

const HomeTitleText = () => (
  <Text
    fontFamily={FONTS.COOKIE_RUN_BLACK}
    fontWeight="bold"
    color="white"
    fontSize="75px"
    animate={{
      opacity: [0, 1],
      y: ['-100%', '0%'],
    }}
    // https://chakra-ui.com/guides/integrations/with-framer
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
