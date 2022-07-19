import { Avatar, Box, chakra } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React, { useCallback } from 'react';
import { ItemMotion, BottonItemWrapperMotion } from '../../constants/rank';

interface IBottomItemWraer {
  data: Array<any>;
  handleCardOpen: any;
  idx: any;
}
function BottomItemWrapper({ data, handleCardOpen }: IBottomItemWraer) {
  // NOTE :왜 이 코드를 안에 두어야 챕을 옮길때마가 모션이 다시 실행되는걸까요. 이유?!

  const MotionDiv = useCallback(
    chakra(motion.div, {
      shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
    }),
    [data],
  );

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
        <MotionDiv h="50px" lineHeight={'50px'} key={idx} variants={ItemMotion} color={'#fff'}>
          <Box onClick={() => handleCardOpen(item.name + idx)} gap={8} display={'flex'}>
            <span>{item.index}</span>
            <Avatar
              name={item.name}
              color={'#fff'}
              bg={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
            ></Avatar>
            <span>{item.name}</span>
            <span>{item.score}</span>
          </Box>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}

export default React.memo(BottomItemWrapper);
