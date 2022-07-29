import { Avatar, Box, chakra } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React, { useCallback } from 'react';
import { ItemMotion, BottonItemWrapperMotion } from '../../constants/rank';

interface IBottomItemWraer {
  data: Array<{
    name: string;
    score: string;
  }>;
  idx: number;
}

function BottomItemWrapper({ data }: IBottomItemWraer) {
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
      paddingY={5}
      gap={5}
      variants={BottonItemWrapperMotion}
      initial="hidden"
      animate="visible"
    >
      {data.map((item, idx) => (
        <MotionDiv h="50px" lineHeight={'50px'} key={idx} variants={ItemMotion} color={'#fff'}>
          <Box gap={8} display={'flex'}>
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
