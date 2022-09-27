import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function PlayHistorySection() {
  return (
    <div>
      <Flex>
        <Heading size="sm">Current Rank</Heading>
        <Text>114</Text>
      </Flex>
      <Flex>
        <Heading size="sm">Play Time</Heading>
        <Text>1h 23m</Text>
      </Flex>
      <Flex>
        <Heading size="sm">Played</Heading>
        <Text> Diff color, Photo puzzle</Text>
      </Flex>
    </div>
  );
}

export default PlayHistorySection;
