/* eslint-disable @typescript-eslint/ban-ts-comment */
import { chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

import { FONTS } from '../constants';
interface Props {
  color: string;
}
const Text = chakra(motion.h1, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

const HomeTitleText = ({ color }: Props) => (
  <Text
    fontFamily={FONTS.COOKIE_RUN_BLACK}
    fontWeight="bold"
    color={color}
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
