import { Avatar, chakra } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React from 'react';
import { ItemMotion, BottonItemWrapperMotion } from '../../constants/rank';

interface IBottomItemWraer {
  data: Array<any>;
  idx: any;
}
function BottomItemWrapper({ data }: IBottomItemWraer) {
  // NOTE :왜 이 코드를 안에 두어야 챕을 옮길때마가 모션이 다시 실행되는걸까요. 이유?!
  const MotionDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
  });

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
