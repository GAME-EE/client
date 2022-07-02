import { Box } from '@chakra-ui/react';

import SnakeGameCanvas from './SnakeGameCanvas';
import SnakeSpeedProgressbar from './SnakeSpeedProgressbar';
import { HomeButton, GameStartButton } from '../common';
import { GameScore } from '..';

import { useSnakeGame } from '../../hooks';
import { SNAKE_ACTIONS } from '../../hooks/useSnakeGame';

const SnakeGame = () => {
  const {
    isPlaying,
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
        isPlaying={isPlaying}
        snakeBody={snakeBody}
        foodPosition={foodPosition}
        snakeGameDispatch={snakeGameDispatch}
        snakeDirection={snakeDirection}
        currentFrame={currentFrame}
      />
      <SnakeSpeedProgressbar currentFrame={currentFrame} />
      <GameStartButton
        colorScheme="yellow"
        onClick={() =>
          snakeGameDispatch({
            type: SNAKE_ACTIONS.GAME_START,
          })
        }
        disabled={isPlaying}
      />
    </Box>
  );
};

export default SnakeGame;
