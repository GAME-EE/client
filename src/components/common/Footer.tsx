import { Box } from '@chakra-ui/react';

import { ELEMENT_COLOR } from '../../styles/colors';

const Footer = () => {
  return (
    <Box
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
      color="white"
      height="200px"
    >
      FOOTER
    </Box>
  );
};

export default Footer;
