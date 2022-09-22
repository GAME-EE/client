import axios from 'axios';
import { GET_USER_PROFILE, OAUTH_ACCESS_TOKEN_URL } from './url';
// TODO: api 관련 코드 처리

const getUserState = async () => {
  const profile = await axios.get(GET_USER_PROFILE, { withCredentials: true });
  console.log(profile);
};
export { getAccessToken, getUserState };

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
  console.log('getAccessToken');
  getUserState();
};
