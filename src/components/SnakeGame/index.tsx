import SnakeGameCanvas from './SnakeGameCanvas';
import SnakeGameBodyCounter from './SnakeGameBodyCounter';

import { useSnakeGame } from '../../hooks';

const SnakeGame = () => {
  const { snakeBody, snakeBodyLength, foodPosition, snakeGameDispatch, handleKeyDown } =
    useSnakeGame();

  return (
    <>
      <SnakeGameBodyCounter snakeBodyLength={snakeBodyLength} />
      <SnakeGameCanvas
        snakeBody={snakeBody}
        foodPosition={foodPosition}
        snakeGameDispatch={snakeGameDispatch}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
};

export default SnakeGame;
