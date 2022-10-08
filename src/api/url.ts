const CLIENT_ID = '91f7fc7c7c29a201a48ba81616d60f22';
const baseURL = 'http://localhost:4000/api';

const OAUTH_ACCESS_TOKEN_URL = `${baseURL}/oauth/regenerate/access`;

const REDIRECT_URI = `${baseURL}/api/oauth/kakao/sign-up`;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const GET_USER_PROFILE = `${baseURL}/user/profile`;

export { REDIRECT_URI, KAKAO_AUTH_URL, OAUTH_ACCESS_TOKEN_URL, GET_USER_PROFILE };
