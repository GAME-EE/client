import { extendTheme } from '@chakra-ui/react';

import { FONTS } from '../constants';

const breakpoints = {
  mobile: '360px',
  tablet: '600px',
  desktop: '1000px',
};

export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      'html, body': {
        fontFamily: `${FONTS.COOKIE_RUN_REGULAR}, cursive`,
      },
    },
  },
});
