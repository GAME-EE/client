import { Center, Button } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from 'react';
import DYNO, { INIT_PLAY_STATE } from '../../constants/dyno';
import { IPlayState } from '../../types/dyno';
import { HomeButton, GameStartButton, GameScore, GameStage } from '../common';
import ChickenCanvas from './ChickenCanvas';

function ChickenGame() {
  const [isPlay, setIsPlay] = useState(false);
  const [GameState, setGameState] = useState({ stage: 1, score: 0 });

  const updateGameState = (stage: number, lastScore?: number) => {
    if (lastScore) {
      setGameState({ stage, score: lastScore });
    } else {
      setGameState({ stage, score: stage * DYNO.GAME_LEVEL_UP_TIME });
    }
  };
  return (
    <>
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
    </>
  );
}

export default ChickenGame;
