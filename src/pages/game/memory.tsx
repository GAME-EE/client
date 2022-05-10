import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import MemoryGameBoxBtn from '../../components/MemoryGameBoxBtn';
import { useStage } from '../../hooks';
import { IStageHookProps } from '../../hooks/useStage';
import { GRID_ITEM_COUNT, COLOR, MEMORY_GAME_TERM, GAME_STATE } from '../../constants';
import MemoryGameReadyView from '../../components/MemoryGameReadyView';
import MemoryGameBoard from '../../components/MemoryGameBoard';

const Memory: NextPage = () => {
  const { stage, nextStage, getCorrectIndexes, clearStage }: IStageHookProps = useStage();
  const { MEMORY_GAME_CORRECT_COLOR, MEMORY_GAME_WRONG_COLOR, MEMORY_GAME_BOARD_COLOR } = COLOR;
  const { MOVE_NEXT_CORRECT_STAGE_TERM, START_NEXT_STAGE_ANSWER_TERM } = MEMORY_GAME_TERM;
  const { READY, DOING } = GAME_STATE;

  const [correctIndexs, setCorrectIndexs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);
  const [gameState, setGameState] = useState<string>(READY);

  const isDoing = gameState === DOING;

  const resetStates = () => {
    setCorrectIndexs([]);
    setClickCount(0);
    setIsLoading(true);
    clearStage();
  };

  const onClickStartBtn = () => {
    resetStates();
    setGameState(DOING);
  };

  const viewBtn = () => {
    console.log('correct:', correctIndexs);
    return Array.from({ length: GRID_ITEM_COUNT[stage].size * GRID_ITEM_COUNT[stage].size }).map(
      (_, idx) => {
        const isReload = correctIndexs.length === GRID_ITEM_COUNT[stage].count;
        const count = isReload
          ? correctIndexs.findIndex((correctIndex: number) => correctIndex === idx)
          : -1;
        const isCorrectIdx = correctIndexs[clickCount] === idx;

        return (
          <MemoryGameBoxBtn
            changedColor={isCorrectIdx ? MEMORY_GAME_CORRECT_COLOR : MEMORY_GAME_WRONG_COLOR}
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
      if (isDoing && clickCount === 0) setCorrectIndexs(getCorrectIndexes());
    }, START_NEXT_STAGE_ANSWER_TERM);
  }, [getCorrectIndexes, clickCount, START_NEXT_STAGE_ANSWER_TERM, isDoing]);

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
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems={'center'}
          width="600px"
          height="28px"
        >
          {isDoing && (
            <>
              <Text as="h1" fontWeight="bold" fontSize="28px">
                Memory Game
              </Text>
              <Button
                colorScheme="red"
                height={'28px'}
                as="button"
                onClick={() => {
                  if (confirm('정말 나가시겠습니까?')) {
                    setGameState(READY);
                  }
                }}
              >
                나가기
              </Button>
            </>
          )}
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
          {isDoing ? (
            <MemoryGameBoard stage={stage} viewBtn={viewBtn} setGameState={setGameState} />
          ) : (
            <MemoryGameReadyView onClickStartBtn={onClickStartBtn} gameState={gameState} />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Memory;
