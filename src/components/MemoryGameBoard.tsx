import { Box, Text, Grid } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { GRID_ITEM_COUNT, COLOR } from '../constants';
import MemoryGameTimer from './MemoryGameTimer';
import useScore from '../hooks/useScore';

interface Props {
  stage: number;
  viewBtn: () => JSX.Element[];
  setGameState: Dispatch<SetStateAction<string>>;
}

const MemoryGameBoard = ({ stage, viewBtn, setGameState }: Props) => {
  const { MEMORY_GAME_BOARD_COLOR } = COLOR;
  const { score } = useScore({ stage });

  return (
    <>
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
            나의 현재 점수 : {score}
          </Text>
        </Box>
        <MemoryGameTimer setGameState={setGameState} />
      </Box>
      <Grid
        templateColumns={`repeat(${GRID_ITEM_COUNT[stage].size}, 1fr)`}
        templateRows={`repeat(${GRID_ITEM_COUNT[stage].size}, 1fr)`}
        gap={1.5}
        width="100%"
        height="500px"
      >
        {viewBtn()}
      </Grid>
    </>
  );
};

export default MemoryGameBoard;
