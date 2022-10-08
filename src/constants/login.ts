import { KAKAO_AUTH_URL } from '../api/url';

const LOGIN_TYPE = Object.freeze({
  kakao: {
    name: 'kakao',
    img: '/login/kakao.png',
    title: '카카오 로그인',
    bg: '#FEE500',
    color: 'black',
    uri: KAKAO_AUTH_URL,
  },
  naver: {
    name: 'naver',
    img: '/login/naver.png',
    title: '네이버 로그인',
    bg: '#03C85A',
    color: 'black',
  },
});

export default LOGIN_TYPE;
