import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Progress, Text } from '@chakra-ui/react';
import MemoryGameBoxBtn from '../../components/MemoryGameBoxBtn';

const GRID_ITEM_COUNT = 25;
interface IViewBtn {
  correctIndexs: any;
  isLoading: boolean;
  setIsLoading: any;
}
function viewBtn({ correctIndexs, isLoading, setIsLoading }: IViewBtn) {
  return Array.from({ length: GRID_ITEM_COUNT }).map((_, idx) => {
    let count = correctIndexs.findIndex((e: number) => e === idx);
    return (
      <MemoryGameBoxBtn
        changedColor={correctIndexs.includes(idx) ? 'green.600' : 'red.600'}
        key={`${idx}-grid-item`}
        count={count}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  });
}
const Memory: NextPage = () => {
  const [correctIndexs, setCorrectIndexs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCorrectIndexs = () => {
    let indexs: number[] = [];
    while (indexs.length < 6) {
      let ans = Math.floor(Math.random() * GRID_ITEM_COUNT);
      if (!indexs.includes(ans)) {
        indexs.push(ans);
      }
    }
    setCorrectIndexs(indexs);
  };
  useEffect(() => {
    getCorrectIndexs();
  }, []);
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
        <Box display="flex" justifyContent="space-around" alignItems={'center'} width="600px">
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
          width="550px"
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
            height="70px"
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
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(5, 1fr)"
            gap={1.5}
            width="100%"
            height="550px"
          >
            {viewBtn({ correctIndexs, isLoading, setIsLoading })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Memory;
