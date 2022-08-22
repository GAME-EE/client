import { Avatar, Box, chakra, Td } from '@chakra-ui/react';
import { ELEMENT_COLOR } from '../../styles/colors';
import { motion, isValidMotionProp } from 'framer-motion';
import React, { useCallback } from 'react';
import { ItemMotion, BottonItemWrapperMotion } from '../../constants/rank';
import { IRankData } from '../../types/rank';

interface IBottomItemWraer {
  data: IRankData[];
  idx: number;
}

function BottomItemWrapper({ data }: IBottomItemWraer) {
  const MotionDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
  });
  const MotionTr = chakra(motion.tr, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
  });
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
      <table>
        {data.map((item: IRankData, idx) => (
          <MotionTr h="60px" lineHeight={'50px'} key={idx} variants={ItemMotion} color={'#fff'}>
            <Td w="20px" textAlign="center">
              {item.rank}
            </Td>
            <Td w="100px" textAlign="center">
              <Avatar
                name={item.name}
                color={'#fff'}
                bg={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
              ></Avatar>
            </Td>

            <Td w="150px">{item.name}</Td>
            <Td isNumeric>{item.score}</Td>
          </MotionTr>
        ))}
      </table>
    </MotionDiv>
  );
}

export default React.memo(BottomItemWrapper);
