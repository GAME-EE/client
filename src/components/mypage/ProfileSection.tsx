import React from 'react';
import styled from '@emotion/styled';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

type Props = {};

function ProfileSection({}: Props) {
  return (
    <div>
      <ProfileImageWrapper>
        <ProfileImage>
          <Image src="/sumi.jpeg" alt="profile image" />
        </ProfileImage>
        <button>edit</button>
      </ProfileImageWrapper>
      <div>
        <Heading as="h4" size="md">
          Mention
        </Heading>
        <Text>l,m sumi</Text>
      </div>
      <div>
        <Heading as="h4" size="md">
          Achievements
        </Heading>
        <Text> Winner of 2021</Text>
      </div>
    </div>
  );
}

const ProfileImageWrapper = styled(Box)``;

const ProfileImage = styled(Box)`
  width: 200px;
  height: 200px;
  background-color: yellow;
`;

export default ProfileSection;
