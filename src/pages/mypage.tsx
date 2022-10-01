import React from 'react';
import PlayHistorySection from '../components/mypage/PlayHistorySection';
import { Flex, Input, Image, Text, Box, Center, Grid, GridItem, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ELEMENT_COLOR } from '../styles/colors';

const MyPage = () => {
  return (
    <Center
      w="100vw"
      h="100vh"
      flexDirection="column"
      backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
    >
      <Grid w="800px" gridTemplateColumns={'200px 1fr'} gap="5" color={'white'}>
        <GridItem>
          <Box>
            <ProfileImage>
              <Image src="/sumi.jpeg" alt="profile image" />
            </ProfileImage>
            <EditBtn>edit</EditBtn>
          </Box>
        </GridItem>
        <GridItem>
          <Flex flexDirection={'column'} gap={5} flex={1}>
            <Box>
              <HeadText size="md" fontWeight={'bold'}>
                GOLD
              </HeadText>
              <Flex>
                <Text>수미</Text>
                {/* <Input placeholder="  User name" borderColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR} /> */}
              </Flex>
            </Box>
            <Box>
              <HeadText size="md" fontWeight={'bold'}>
                Award
              </HeadText>
              <Flex alignItems={'flex-end'} gap={5}>
                <CrownWrapper>
                  <Image boxSize="30px" src="/crown1.webp" alt="Dan Abramov" />
                  <Text>n</Text>
                </CrownWrapper>
                <CrownWrapper>
                  <Image boxSize="30px" src="/crown2.webp" alt="Dan Abramov" />
                  <Text>n</Text>
                </CrownWrapper>
                <CrownWrapper>
                  <Image boxSize="30px" src="/crown3.webp" alt="Dan Abramov" />
                  <Text>n</Text>
                </CrownWrapper>
              </Flex>
            </Box>
          </Flex>
        </GridItem>
        <GridItem display={'flex'} flexDirection={'column'} gap={2}>
          <Box>
            <HeadText as="h4" size="md" fontWeight={'bold'}>
              Mention
            </HeadText>
            <Text>l & m sumi</Text>
          </Box>
          <Box>
            <HeadText as="h4" size="md" fontWeight={'bold'}>
              Achievements
            </HeadText>
            <Text> Winner of 2021</Text>
          </Box>
        </GridItem>
        <GridItem
          border={`1px solid ${ELEMENT_COLOR.HOME_SECOND_BG_COLOR}`}
          borderRadius={'5px'}
          padding={5}
          display="flex"
          flexDirection={'column'}
          justifyContent="space-evenly"
        >
          <PlayHistorySection></PlayHistorySection>
        </GridItem>
      </Grid>
    </Center>
  );
};
const CrownWrapper = styled(Flex)`
  align-items: flex-end;
  gap: 10px;
`;
const HeadText = styled(Text)`
  color: #fab931;
  font-weight: bold;
  margin-bottom: 3px;
`;
const EditBtn = styled.button`
  float: right;
`;

const ProfileImage = styled(Box)`
  width: 200px;
  height: 200px;
  background-color: yellow;
`;
export default MyPage;
