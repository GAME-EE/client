import React from 'react';
import ProfileSection from '../components/mypage/ProfileSection';
import UserInfoSection from '../components/mypage/UserInfoSection';
import PlayHistorySection from '../components/mypage/PlayHistorySection';
import PlayGlassSection from '../components/mypage/PlayGlassSection';
import AwardSection from '../components/mypage/AwardSection';
import { Flex, Heading, Input, Image, Text } from '@chakra-ui/react';

type IMyPage = {};

const MyPage = () => {
  return (
    <>
      <Flex>
        <ProfileSection></ProfileSection>
        <div>
          <Heading size="md">Tier</Heading>
          <Flex>
            <Input placeholder="  User name" />
            <Text>Country</Text>
          </Flex>
          <Heading size="md">Award</Heading>
          <Flex>
            <Flex>
              <Image boxSize="30px" src="/crown1.webp" alt="Dan Abramov" />
              <Text>n</Text>
            </Flex>
            <Flex>
              <Image boxSize="30px" src="/crown2.webp" alt="Dan Abramov" />
              <Text>n</Text>
            </Flex>
            <Flex>
              <Image boxSize="30px" src="/crown3.webp" alt="Dan Abramov" />
              <Text>n</Text>
            </Flex>
          </Flex>
          <PlayHistorySection></PlayHistorySection>
        </div>
      </Flex>
      <PlayGlassSection></PlayGlassSection>
    </>
  );
};

export default MyPage;
