import { Box } from '@chakra-ui/react';

import SnakeGameCanvas from './SnakeGameCanvas';
import SnakeGameBodyCounter from './SnakeGameBodyCounter';
import SnakeSpeedProgressbar from './SnakeSpeedProgressbar';

import { useSnakeGame } from '../../hooks';

const SnakeGame = () => {
  const {
    snakeBody,
    snakeBodyLength,
    foodPosition,
    currentFrame,
    snakeGameDispatch,
    handleKeyDown,
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
      <SnakeGameBodyCounter snakeBodyLength={snakeBodyLength} />
      <SnakeGameCanvas
        snakeBody={snakeBody}
        foodPosition={foodPosition}
        snakeGameDispatch={snakeGameDispatch}
        handleKeyDown={handleKeyDown}
        currentFrame={currentFrame}
      />
      <SnakeSpeedProgressbar currentFrame={currentFrame} />
    </Box>
  );
};

export default SnakeGame;
