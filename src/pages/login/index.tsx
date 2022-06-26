import { Box, Button, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Header, Footer, HomeTitleText } from '../../components';

const Login: NextPage = () => {
  const LOGIN_TYPE = [
    {
      name: 'kakao',
      img: '/login/kakao.png',
      title: '카카오 로그인',
      bg: '#FEE500',
      color: 'black',
    },
    {
      name: 'naver',
      img: '/login/naver.png',
      title: '네이버 로그인',
      bg: '#03C85A',
      color: 'black',
    },
    {
      name: 'facebook',
      img: '/login/facebook.png',
      title: '페이스북 로그인',
      bg: '#3B5B98',
      color: 'white',
    },
    {
      name: 'github',
      img: '/login/github.png',
      title: '깃허브 로그인',
      bg: '#374051',
      color: 'white',
    },
  ];
  return (
    <main>
      <Header isVisible={true} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <HomeTitleText color="black" />
        {LOGIN_TYPE.map(type => {
          return (
            <Button
              bg={type.bg}
              color={type.color}
              height="50px"
              width="300px"
              fontSize="24px"
              as="button"
              _hover={{ opacity: 0.7 }}
              // onClick={onClickStartBtn}
              marginTop="20px"
              key={type.name}
            >
              <Image src={type.img} alt={type.name} width="24px" height="24px" draggable={false} />
              <Text ml="10px">{type.title}</Text>
            </Button>
          );
        })}
      </Box>
      <Footer />
    </main>
  );
};

export default Login;
