import { Box, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atom';
import { useCallback } from 'react';

interface IToken {
  accessToken: string;
  id: number;
  nickname: string;
}

const OAuth2RedirectHandler = () => {
  const setUserState = useSetRecoilState(userState);

  const saveToken = useCallback(
    ({ accessToken, id, nickname }: IToken) => {
      console.log(id, nickname);

      setUserState({ id: id, nickname: nickname });
      window.localStorage.setItem('user', JSON.stringify({ accessToken, id, nickname }));
    },
    [setUserState],
  );

  const getToken = useCallback(
    async (authCode: string | null) => {
      const token = await axios.post('http://52.79.240.156:50000/oauth/kakao/code', {
        code: authCode,
      });
      console.log(token.data);
      const accessToken = token.data.access_token;
      const id = token.data.id;
      const nickname = token.data.kakao_account.profile.nickname;
      saveToken({ accessToken, id, nickname });
      return token;
    },
    [saveToken],
  );

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    getToken(code);
  }, [getToken]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    </Box>
  );
};

export default OAuth2RedirectHandler;
