import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { REDIRECT_URI } from '../../api/url';

declare global {
  interface Window {
    naver: any;
  }
}

const SNSNaverButton = () => {
  useEffect(() => {
    initNaverLogin();
    getData();
  }, []);
  const initNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'KRQCzGAMe8PFJ0FaoK_Q',
      callbackUrl: REDIRECT_URI,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 60 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getData = () => {
    if (window.location.href.includes('access_token')) {
      console.log('We got AccessToken');
    }
  };
  return (
    <Box width="250px" marginTop="20px" _hover={{ opacity: 0.7 }}>
      <div id="naverIdLogin"></div>
    </Box>
  );
};

export default SNSNaverButton;
