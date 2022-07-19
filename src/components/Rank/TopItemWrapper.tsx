import { Avatar, Box, chakra } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { ELEMENT_COLOR } from '../../styles/colors';
import { CROWN_ORDER, ItemMotion, TopItemWrapperMotion } from '../../constants/rank';

interface ITopItemWrapper {
  data: Array<any>;
  idx: any;
  handleCardOpen: (arg0: string) => void;
}

const TopItemWrapper = ({ data, handleCardOpen }: ITopItemWrapper) => {
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const MotionDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
  });
  return (
    <>
      <MotionDiv
        display="flex"
        alignItems={'flex-end'}
        gap={5}
        h="fit-content"
        marginY={10}
        marginBottom={16}
        variants={TopItemWrapperMotion}
        initial="hidden"
        animate="visible"
      >
        {data.map((item, idx) => (
          <AvatarWrapper
            flex={CROWN_ORDER[idx].size}
            key={idx}
            order={CROWN_ORDER[idx].order}
            layoutId={idx}
            onClick={() => handleCardOpen(item.name + idx)}
            // onClick={() => setSelectedId(idx + 1)}
          >
            <MotionDiv
              position="absolute"
              w="100%"
              height={'100%'}
              variants={ItemMotion}
              whileHover={{ scale: 1.03 }}
              color={'#fff'}
            >
              <Avatar
                size="full"
                name={item.content}
                bg={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
                color={'#fff'}
              ></Avatar>
              <Box
                w="fit-content"
                top={'-40px'}
                left={0}
                right={0}
                m={'0 auto'}
                position="absolute"
              >
                <Image
                  src={CROWN_ORDER[idx].img}
                  alt="crown"
                  width="60px"
                  height="50px"
                  draggable={false}
                />
              </Box>
              <Box bottom={-8} w="fit-content" left={0} right={0} m={'0 auto'} position="absolute">
                {item.name}
              </Box>{' '}
              <Box bottom={-14} w="fit-content" left={0} right={0} m={'0 auto'} position="absolute">
                {item.score}
              </Box>
            </MotionDiv>
          </AvatarWrapper>
        ))}
      </MotionDiv>
    </>
  );
};
const MotionWrapper = styled(Box)`
  position: fixed;
  width: 400px;
  height: 400px;
  background-color: #fff;
`;
const AvatarWrapper = styled(Box)`
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
export default React.memo(TopItemWrapper);
