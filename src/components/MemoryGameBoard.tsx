import { Box, Text, Progress, Grid } from '@chakra-ui/react';
import { GRID_ITEM_COUNT, COLOR } from '../constants';

interface Props {
  stage: number;
  viewBtn: () => JSX.Element[];
}
const MemoryGameBoard = ({ stage, viewBtn }: Props) => {
  const { MEMORY_GAME_BOARD_COLOR } = COLOR;
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
    </>
  );
};

export default MemoryGameBoard;
