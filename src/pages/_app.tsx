import { ChakraProvider } from '@chakra-ui/react';

import '../styles/fonts.css';
import { theme } from '../styles/theme';

import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import cookies from 'next-cookies';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies['access_token'] || '';
  console.log(accessTokenByCookie, 'accessTokenByCookie');

  return { pageProps: { accessTokenByCookie } };
};

export default MyApp;
