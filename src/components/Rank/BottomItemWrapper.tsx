import { Avatar, chakra } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React from 'react';

const ItemWrapperMotionProps = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};
const BottomItemMotionProps = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const MotionDiv = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});
interface IBottomItemWraer {
  data: Array<any>;
}
function BottomItemWrapper({ data }: IBottomItemWraer) {
  return (
    <MotionDiv
      display="flex"
      flexDirection={'column'}
      // borderY={`1px solid ${ELEMENT_COLOR.HOME_MAIN_BG_COLOR}`}
      marginY={8}
      paddingY={5}
      gap={5}
      variants={ItemWrapperMotionProps}
      initial="hidden"
      animate="visible"
    >
      {data.map((item, idx) => (
        <MotionDiv
          display={'flex'}
          h="50px"
          lineHeight={'50px'}
          key={idx}
          gap={8}
          // paddingX={16}
          variants={BottomItemMotionProps}
          color={'#fff'}
        >
          <span>{item.index}</span>
          <Avatar name={item.name} bg={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}></Avatar>
          <span>{item.name}</span>
          <span>{item.score}</span>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}

export default BottomItemWrapper;
