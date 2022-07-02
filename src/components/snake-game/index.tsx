import { Box } from '@chakra-ui/react';

import SnakeGameCanvas from './SnakeGameCanvas';
import SnakeSpeedProgressbar from './SnakeSpeedProgressbar';
import HomeButton from '../common/HomeButton';
import { GameScore } from '..';

import { useSnakeGame } from '../../hooks';

const SnakeGame = () => {
  const {
    snakeBody,
    snakeBodyLength,
    snakeDirection,
    foodPosition,
    currentFrame,
    snakeGameDispatch,
  } = useSnakeGame();

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      rowGap="20px"
    >
      <HomeButton />
      <GameScore score={snakeBodyLength} />
      <SnakeGameCanvas
        snakeBody={snakeBody}
        foodPosition={foodPosition}
        snakeGameDispatch={snakeGameDispatch}
        snakeDirection={snakeDirection}
        currentFrame={currentFrame}
      />
      <SnakeSpeedProgressbar currentFrame={currentFrame} />
    </Box>
  );
};

export default SnakeGame;
