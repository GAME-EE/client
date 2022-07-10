import { Avatar, chakra } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React from 'react';
import { ItemMotion, BottonItemWrapperMotion } from '../../constants/rank';

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});
interface IBottomItemWraer {
  data: Array<any>;
  idx: any;
}
function BottomItemWrapper({ data, idx }: IBottomItemWraer) {
  return (
    <MotionDiv
      display="flex"
      flexDirection={'column'}
      marginY={8}
      // paddingY={5}
      gap={5}
      variants={BottonItemWrapperMotion}
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
          variants={ItemMotion}
          color={'#fff'}
        >
          <span>{item.index}</span>
          <Avatar name={item.name} color={'#fff'} bg={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}></Avatar>
          <span>{item.name}</span>
          <span>{item.score}</span>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}

export default BottomItemWrapper;
