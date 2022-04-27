import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  mobile: '360px',
  tablet: '600px',
  desktop: '1000px',
};

export const theme = extendTheme({ breakpoints });
