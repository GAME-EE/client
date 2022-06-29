const CLIENT_ID = '91f7fc7c7c29a201a48ba81616d60f22';
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
