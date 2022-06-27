import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';

const OAuth2RedirectHandler = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Box>
  );
};

export default OAuth2RedirectHandler;
