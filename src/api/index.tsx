import axios from 'axios';
import { getOauthAccessTokenUrl } from './oauth';
// TODO: api 관련 코드 처리
const getAccessToken = (refreshToken: string | null) => {
  axios.put(getOauthAccessTokenUrl, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

export { getAccessToken };
