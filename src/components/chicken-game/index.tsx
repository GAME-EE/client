import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import DYNO from '../../constants/chicken';
import ChickenCanvas from './ChickenCanvas';
import { HomeButton, GameStartButton, GameScore, GameStage } from '../common';

function ChickenGame() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [GameState, setGameState] = useState<number>(0);

  const updateGameState = (time: number) => {
    setGameState(time);
  };
  return (
    <VStack gap={5}>
      <HomeButton />
      <GameStage stage={parseInt(GameState / DYNO.GAME_LEVEL_UP_TIME + 1 + '')} />
      <ChickenCanvas
        isPlay={isPlay}
        stopPlay={() => setIsPlay(false)}
        updateGameState={updateGameState}
      />
      <GameScore score={GameState} />
      <GameStartButton colorScheme="yellow" onClick={() => setIsPlay(true)} disabled={isPlay} />
    </VStack>
  );
}

export default ChickenGame;
