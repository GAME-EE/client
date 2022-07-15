import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Header, Footer, HomeTitleText } from '../../components';
import SNSKakaoButton from '../../components/Login/SNSKakaoButton';
import SNSNaverButton from '../../components/Login/SNSNaverButton';

const Login: NextPage = () => {
  return (
    <main>
      <Header isVisible={true} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <HomeTitleText color="black" />
        <SNSKakaoButton />
        <SNSNaverButton />
      </Box>
      <Footer />
    </main>
  );
};

export default Login;
