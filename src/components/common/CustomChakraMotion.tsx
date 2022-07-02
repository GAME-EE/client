/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidMotionProp } from 'framer-motion';
import { As, chakra } from '@chakra-ui/react';

/**
 * @description
 * framer + chakra의 property들을 모두 사용 가능한 컴포넌트
 *
 * usage: `const Component = CustomChakraMotion(HTMLElement);`
 */
const CustomChakraMotion = (motionElement: As<any>) => {
  return chakra(motionElement, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
  });
};

export default CustomChakraMotion;
