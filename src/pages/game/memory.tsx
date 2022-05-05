import type { NextPage } from 'next';
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, Progress, Text } from '@chakra-ui/react';
import MemoryGameBoxBtn from '../../components/MemoryGameBoxBtn';

export const GRID_ITEM_COUNT = [
  { size: 2, count: 4 },
  {
    size: 2,
    count: 1,
  },
  {
    size: 2,
    count: 2,
  },
  {
    size: 2,
    count: 3,
  },
  {
    size: 3,
    count: 2,
  },
  {
    size: 3,
    count: 3,
  },
  {
    size: 3,
    count: 4,
  },
  {
    size: 4,
    count: 3,
  },
  {
    size: 4,
    count: 4,
  },
  {
    size: 4,
    count: 5,
  },
  {
    size: 5,
    count: 4,
  },
  {
    size: 5,
    count: 5,
  },
  {
    size: 5,
    count: 6,
  },
  {
    size: 5,
    count: 7,
  },
  {
    size: 5,
    count: 8,
  },
  {
    size: 5,
    count: 9,
  },
];

const Memory: NextPage = () => {
  const [correctIndexs, setCorrectIndexs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stage, setStage] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  // const [life, setLife] = useState(3);
  function viewBtn() {
    console.log('correct:', correctIndexs);
    return Array.from({ length: GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size }).map(
      (_, idx) => {
        let isReload = correctIndexs.length === GRID_ITEM_COUNT[stage].count;
        let count = isReload ? correctIndexs.findIndex((e: number) => e === idx) : -1;
        return (
          <MemoryGameBoxBtn
            changedColor={correctIndexs[clickCount] === idx ? 'green.600' : 'red.600'}
            clickCount={clickCount}
            key={`${idx}-grid-item`}
            count={count}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            stage={stage}
            setClickCount={setClickCount}
          />
        );
      },
    );
  }
  const getCorrectIndexs = useCallback(() => {
    let indexs: number[] = [];
    while (indexs.length < GRID_ITEM_COUNT[stage].count) {
      const ans = Math.floor(
        Math.random() * GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size,
      );
      if (!indexs.includes(ans)) {
        indexs.push(ans);
      }
    }
    setCorrectIndexs(indexs);
  }, [stage]);

  useEffect(() => {
    setTimeout(() => {
      if (clickCount === 0) getCorrectIndexs();
    }, 900);
  }, [getCorrectIndexs, clickCount]);

  useEffect(() => {
    if (clickCount === GRID_ITEM_COUNT[stage].count || clickCount === -1) {
      setIsLoading(true);
      setTimeout(() => {
        if (clickCount !== -1) {
          setStage(stage + 1);
        }
        setClickCount(0);
      }, 700);
    }
  }, [clickCount, stage]);
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
                {`Stage ${stage}`}
              </Text>
              <Text as="h1" fontWeight="bold" fontSize="14px">
                나의 현재 점수 : 26,000
              </Text>
            </Box>
            <Progress hasStripe value={80} />
          </Box>
          <Grid
            templateColumns={`repeat(${GRID_ITEM_COUNT[stage].size}, 1fr)`}
            templateRows={`repeat(${GRID_ITEM_COUNT[stage].size}, 1fr)`}
            gap={1.5}
            width="100%"
            height="550px"
          >
            {viewBtn()}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Memory;
