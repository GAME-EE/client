import { ChakraProvider } from '@chakra-ui/react';

import '../styles/fonts.css';
import { theme } from '../styles/theme';

import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import cookies from 'next-cookies';
import { useEffect } from 'react';
import { token } from '../atom';

function MyApp({ Component, pageProps }: AppProps) {
  const setUserState = useSetRecoilState(token);

  useEffect(() => {
    const { accessToken, refreshToken } = pageProps;

    setUserState({ accessToken, refreshToken });
  }, [pageProps, setUserState]);

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
  const refreshTokenByCookie = allCookies['refresh_token'] || '';
  console.log(accessTokenByCookie, 'accessTokenByCookie');

  return { pageProps: { accessTokenByCookie, refreshTokenByCookie } };
};

export default MyApp;
