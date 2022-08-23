import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import DYNO from '../../constants/chicken';
import ChickenCanvas from './ChickenCanvas';
import { HomeButton, GameStartButton, GameScore, GameStage } from '../common';
import { saveScoreAPI } from '../../api/rank';
import { GAME_INFO } from '../../constants/rank';

function ChickenGame() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [GameState, setGameState] = useState<number>(0);

  const updateGameState = (time: number) => {
    setGameState(time);
  };

  const saveScore = (score: number) => {
    const userId = '1';
    saveScoreAPI(userId, GAME_INFO.CHICKEN_GAME.gid, score);
  };
  return (
    <VStack gap={5}>
      <HomeButton />
      <GameStage stage={parseInt(GameState / DYNO.GAME_LEVEL_UP_TIME + 1 + '')} />
      <ChickenCanvas
        isPlay={isPlay}
        stopPlay={(score: number) => {
          setIsPlay(false);
          saveScore(score);
        }}
        updateGameState={updateGameState}
      />
      <GameScore score={GameState} />
      <GameStartButton colorScheme="yellow" onClick={() => setIsPlay(true)} disabled={isPlay} />
    </VStack>
  );
}

export default ChickenGame;
