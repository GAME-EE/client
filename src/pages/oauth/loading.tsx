import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

const OAuth2RedirectHandler = () => {
  const getToken = async (authCode: string | null) => {
    const token = await axios.post('http://52.79.240.156:50000/oauth/kakao/code', {
      code: authCode,
    });
    console.log(token);
    return token;
  };
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    getToken(code);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Box>
  );
};

export default OAuth2RedirectHandler;
