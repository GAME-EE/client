import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, Progress, Text } from '@chakra-ui/react';
import MemoryGameBoxBtn from '../../components/MemoryGameBoxBtn';
import useStage, { IStageHookProps } from '../../hooks/useStage';
import { GRID_ITEM_COUNT, COLOR, MEMORY_GAME_TERM } from '../../constants';

const Memory: NextPage = () => {
  const [correctIndexs, setCorrectIndexs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState(0);
  // const [life, setLife] = useState(3);
  const { stage, nextStage, getCorrectIndexes }: IStageHookProps = useStage();
  const { MEMORY_GAME_CORRECT_COLOR, MEMORY_GAME_WRONG_COLOR, MEMORY_GAME_BOARD_COLOR } = COLOR;
  const { MOVE_NEXT_CORRECT_STAGE_TERM, START_NEXT_STAGE_ANSWER_TERM } = MEMORY_GAME_TERM;
  const viewBtn = () => {
    console.log('correct:', correctIndexs);
    return Array.from({ length: GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size }).map(
      (_, idx) => {
        const isReload = correctIndexs.length === GRID_ITEM_COUNT[stage].count;
        const count = isReload
          ? correctIndexs.findIndex((correctIndex: number) => correctIndex === idx)
          : -1;
        return (
          <MemoryGameBoxBtn
            changedColor={
              correctIndexs[clickCount] === idx
                ? MEMORY_GAME_CORRECT_COLOR
                : MEMORY_GAME_WRONG_COLOR
            }
            key={`${idx}-grid-item`}
            count={count}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            stage={stage}
            setClickCount={setClickCount}
            clickCount={clickCount}
          />
        );
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (clickCount === 0) setCorrectIndexs(getCorrectIndexes());
    }, START_NEXT_STAGE_ANSWER_TERM);
  }, [getCorrectIndexes, clickCount, START_NEXT_STAGE_ANSWER_TERM]);

  useEffect(() => {
    const WRONG_TRACE = -1;
    const isClickCorrectTrace = clickCount === GRID_ITEM_COUNT[stage].count;
    const isClickWrongTrace = clickCount === WRONG_TRACE;

    if (isClickCorrectTrace || isClickWrongTrace) {
      setIsLoading(true);
      setTimeout(() => {
        if (isClickCorrectTrace) {
          nextStage();
        }
        setClickCount(0);
      }, MOVE_NEXT_CORRECT_STAGE_TERM);
    }
  }, [nextStage, clickCount, stage, MOVE_NEXT_CORRECT_STAGE_TERM]);

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
          backgroundColor={MEMORY_GAME_BOARD_COLOR}
          width="550px"
          px="10px"
          py="7px"
          borderRadius={'8px'}
          boxShadow="2xl"
        >
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor={MEMORY_GAME_BOARD_COLOR}
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
