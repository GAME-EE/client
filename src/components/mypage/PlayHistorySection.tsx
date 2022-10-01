import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

function PlayHistorySection() {
  return (
    <>
      <Flex>
        <Label size="sm">Current Rank</Label>
        <Text>114</Text>
      </Flex>
      <Flex>
        <Label size="sm">Play Time</Label>
        <Text>1h 23m</Text>
      </Flex>
      <Flex>
        <Label size="sm">Played</Label>
        <Text> Diff color, Photo puzzle</Text>
      </Flex>
    </>
  );
}

const Label = styled(Text)`
  min-width: 120px;
`;
export default PlayHistorySection;
