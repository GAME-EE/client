import type { NextPage } from 'next';
import { Box, Button, Grid, Progress, Text } from '@chakra-ui/react';
import MemoryGameBoxBtn from '../../components/MemoryGameBoxBtn';

function viewBtn() {
  let temp = [];
  for (let i = 0; i < 36; i++) {
    temp.push(<MemoryGameBoxBtn index={`${i}`} />);
  }
  console.log(1);
  return temp;
}
const Memory: NextPage = () => {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        rowGap="10px"
        alignItems="center"
        mt="50px"
        as="main"
      >
        <Box display="flex" justifyContent="space-around" alignItems={'center'} width="40vw">
          <Text as="h1" fontWeight="bold" fontSize="28px">
            Memory게임
          </Text>
          <Button colorScheme="red" height={'28px'} as="button">
            나가기
          </Button>
        </Box>

        <Box
          as="article"
          display="flex"
          flexDirection="column"
          alignItems="center"
          backgroundColor="whiteAlpha.900"
          width="40vw"
          height="45vw"
          px="10px"
          py="7px"
          borderRadius={'8px'}
          boxShadow="2xl"
        >
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor={'whiteAlpha.900'}
            width="100%"
            height="5vw"
          >
            <Box display="flex" justifyContent="flex-end">
              <Text as="h1" fontWeight="bold" fontSize="14px">
                나의 최고 점수 : 26,000
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text as="h1" fontWeight="bold" fontSize="14px">
                Stage 1
              </Text>
              <Text as="h1" fontWeight="bold" fontSize="14px">
                나의 현재 점수 : 26,000
              </Text>
            </Box>
            <Progress hasStripe value={80} />
          </Box>
          <Grid
            templateColumns="repeat(6, 1fr)"
            templateRows="repeat(6, 1fr)"
            gap={1.5}
            width="100%"
            height="40vw"
          >
            {viewBtn()}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Memory;
