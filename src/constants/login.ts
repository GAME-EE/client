import { KAKAO_AUTH_URL } from '../api/oauth';

const LOGIN_TYPE = [
  {
    name: 'kakao',
    img: '/login/kakao.png',
    title: '카카오 로그인',
    bg: '#FEE500',
    color: 'black',
    uri: KAKAO_AUTH_URL,
  },
  {
    name: 'naver',
    img: '/login/naver.png',
    title: '네이버 로그인',
    bg: '#03C85A',
    color: 'black',
    uri: KAKAO_AUTH_URL,
  },
  {
    name: 'facebook',
    img: '/login/facebook.png',
    title: '페이스북 로그인',
    bg: '#3B5B98',
    color: 'white',
    uri: KAKAO_AUTH_URL,
  },
  {
    name: 'github',
    img: '/login/github.png',
    title: '깃허브 로그인',
    bg: '#374051',
    color: 'white',
    uri: KAKAO_AUTH_URL,
  },
];

export default LOGIN_TYPE;
