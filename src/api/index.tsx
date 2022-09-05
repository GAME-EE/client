import axios from 'axios';
import { OAUTH_ACCESS_TOKEN_URL } from './oauth';
// TODO: api 관련 코드 처리
const getAccessToken = (refreshToken: string | null) => {
  console.timeLog(refreshToken);
  axios.put(
    OAUTH_ACCESS_TOKEN_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
};

export { getAccessToken };
