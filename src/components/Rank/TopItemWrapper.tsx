import { Avatar, Box, chakra } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import { motion, isValidMotionProp } from 'framer-motion';

import { ELEMENT_COLOR } from '../../styles/colors';

// type Props = {};
const ItemWrapperMotionProps = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const TopItemMotionProps = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const data = [
  {
    size: 1.3,
    index: 1,
    order: 1,
    content: 'one',
  },
  {
    size: 1,
    index: 2,
    order: -1,
    content: 'two',
  },
  {
    size: 1,
    order: 3,
    index: 3,
    content: 'three',
  },
];
const TopItemWrapper = () => {
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
        marginY={8}
        variants={ItemWrapperMotionProps}
        initial="hidden"
        animate="visible"
      >
        {data.map(item => (
          <AvatarWrapper flex={item.size} key={item.index} order={item.order}>
            <MotionDiv
              position="absolute"
              w="100%"
              height={'100%'}
              variants={TopItemMotionProps}
              whileHover={{ scale: 1.03 }}
            >
              <Avatar
                size="full"
                name={item.content}
                bg={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
                color={'#fff'}
              ></Avatar>
              <Box
                w="fit-content"
                top={'-20px'}
                left={0}
                right={0}
                m={'0 auto'}
                position="absolute"
              >
                {item.index}
              </Box>
            </MotionDiv>
          </AvatarWrapper>
        ))}
      </MotionDiv>
    </>
  );
};
const AvatarWrapper = styled(Box)`
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
export default TopItemWrapper;
