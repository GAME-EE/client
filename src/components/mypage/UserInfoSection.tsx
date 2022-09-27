import { Flex, Heading, Input, Text, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {};

function UserInfoSection({}: Props) {
  return (
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
    </div>
  );
}

export default UserInfoSection;
