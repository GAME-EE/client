import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Header, Footer, HomeTitleText } from '../../components';
import SNSLoginButton from '../../components/Login/SNSLoginButton';
import { LOGIN_TYPE } from '../../constants';

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
        {LOGIN_TYPE.map(type => (
          <SNSLoginButton type={type} key={type.name} />
        ))}
      </Box>
      <Footer />
    </main>
  );
};

export default Login;
