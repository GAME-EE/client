import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { Header, Footer } from '../../components';

const Login: NextPage = () => {
  return (
    <main>
      <Header isVisible={true} />
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        로그인 페이지
      </Box>
      <Footer />
    </main>
  );
};

export default Login;
