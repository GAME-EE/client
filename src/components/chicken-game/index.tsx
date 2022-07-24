import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import DYNO, { INIT_GAME_STATE } from '../../constants/dyno';
import { IGameState } from '../../types/dyno';
import { HomeButton, GameStartButton, GameScore, GameStage } from '../common';
import ChickenCanvas from './ChickenCanvas';

function ChickenGame() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [GameState, setGameState] = useState<IGameState>(INIT_GAME_STATE);

  const updateGameState = (stage: number, lastScore?: number) => {
    if (lastScore) {
      setGameState({ stage, score: lastScore });
    } else {
      setGameState({ stage, score: stage * DYNO.GAME_LEVEL_UP_TIME });
    }
  };
  return (
    <VStack gap={5}>
      <HomeButton />
      <GameStage stage={GameState.stage} />
      <ChickenCanvas
        isPlay={isPlay}
        stopPlay={() => {
          setIsPlay(false);
        }}
        updateGameState={updateGameState}
      />
      <GameScore score={GameState.score} />
      <GameStartButton colorScheme="yellow" onClick={() => setIsPlay(true)} disabled={isPlay} />
    </VStack>
  );
}

export default ChickenGame;
