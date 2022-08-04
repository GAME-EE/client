import { useEffect, useRef } from 'react';
import { IObstacle, IUnit, IJumpState } from '../types/dyno';
import DYNO, { CANVAS_OBJECT, GAME_LEVEL, INIT_JUMP_STATE, UNIT_OBJECT } from '../constants/dyno';
import {
  getCurrentGameLevel,
  getNewObstacle,
  getMoveState,
  checkCollision,
  getObstacleMovePosition,
} from './useChicken';

function useChickenGame() {
  const obstacleRef = useRef<IObstacle[]>([]);
  const unitRef = useRef<IUnit>({ ...UNIT_OBJECT });
  const jumpRef = useRef<IJumpState>(INIT_JUMP_STATE);
  useEffect(() => {
    unitRef.current.image = new window.Image();
    unitRef.current.image.src = '/chick.png';
  }, []);

  const handleJump = () => {
    if (jumpRef.current.level < DYNO.JUMP_MAX_LEVEL) {
      const newJumpState = {
        ...jumpRef.current,
        isjumping: true,
        level: jumpRef.current.level + 1,
        maxY: unitRef.current.y - DYNO.JUMP_HEIGHT,
        speed: INIT_JUMP_STATE.speed,
      };
      jumpRef.current = newJumpState;
    }
  };
  const clearState = () => {
    jumpRef.current = { ...INIT_JUMP_STATE };
    obstacleRef.current = [];
  };
  const createObstacle = (currentGameLevel: number) => {
    const tObstacle: IObstacle = getNewObstacle(currentGameLevel);

    obstacleRef.current = [...obstacleRef.current, tObstacle];
  };
  const handleMoveState = () => {
    const { unitState, jumpState } = getMoveState(unitRef.current, jumpRef.current);
    unitRef.current = unitState;
    jumpRef.current = jumpState;
  };
  const drawMoveObstacles = (
    handleStopGame: () => void,
    handleDrawImage: (obstacle: IObstacle) => void,
  ) => {
    obstacleRef.current = getObstacleMovePosition(obstacleRef.current);

    obstacleRef.current.forEach((obstacle, i, list) => {
      const isObstacleOffScreen = obstacle.x < 0 - obstacle.width;
      if (isObstacleOffScreen) {
        list.splice(i, 1);
      }

      // 충돌
      if (checkCollision(unitRef.current, obstacle)) {
        handleStopGame();
      }
      handleDrawImage(obstacle);
    });
  };

  return {
    unitRef,
    clearState,
    handleJump,
    drawMoveObstacles,
    handleMoveState,
    createObstacle,
  };
}

export default useChickenGame;
