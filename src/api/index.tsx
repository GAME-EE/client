import axios from 'axios';
import { GET_USER_PROFILE, OAUTH_ACCESS_TOKEN_URL } from './url';
// TODO: api 관련 코드 처리

const getUserState = async () => {
  const profile = await axios.get(GET_USER_PROFILE, { withCredentials: true });
  return profile;
};

const getAccessToken = async (refreshToken: string | null) => {
  await axios.put(
    OAUTH_ACCESS_TOKEN_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    },
  );
  getUserState();
};

export { getAccessToken, getUserState };
