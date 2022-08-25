import { ChakraProvider } from '@chakra-ui/react';

import '../styles/fonts.css';
import { theme } from '../styles/theme';

import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import cookies from 'next-cookies';

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
  const refreshTokenByCookie = allCookies['refresh_token'] || '';

  console.log(refreshTokenByCookie, 'refreshTokenByCookie');

  return {};
};

export default MyApp;
