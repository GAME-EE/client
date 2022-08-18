import { useEffect, useRef } from 'react';
import { IObstacle, IUnit, IJumpState } from '../types/dyno';
import DYNO, {
  CANVAS_OBJECT,
  INIT_JUMP_STATE,
  MOVE_STATE,
  UNIT_OBJECT,
} from '../constants/chicken';
import { getNewObstacle, getObstacleMovePosition } from '../utils/chicken';
import { getAccelerate } from '../utils/number';

const useChickenGame = () => {
  const obstacleRef = useRef<IObstacle[]>([]);
  const unitRef = useRef<IUnit>({ ...UNIT_OBJECT });
  const jumpRef = useRef<IJumpState>({ ...INIT_JUMP_STATE });

  useEffect(() => {
    unitRef.current.image = new window.Image();
    unitRef.current.image.src = '/chick.png';
  }, []);

  const handleJump = () => {
    const isJumpOk = jumpRef.current.level < DYNO.JUMP_MAX_LEVEL;
    if (isJumpOk) {
      jumpRef.current = {
        ...jumpRef.current,
        isjumping: true,
        level: jumpRef.current.level + 1,
        maxY: unitRef.current.y - DYNO.JUMP_HEIGHT,
        speed: INIT_JUMP_STATE.speed,
      };
    }
  };

  const clearState = () => {
    jumpRef.current = { ...INIT_JUMP_STATE };
    obstacleRef.current = [];
  };

  const checkCollision = (obstacle: IObstacle): boolean => {
    const unitState = unitRef.current;
    const isXTopLeftCollision =
      obstacle.x + (obstacle.blank?.topLeft ?? 0) < unitState.x + unitState.width;
    const isTTopRightCollision =
      unitState.x < obstacle.x + obstacle.width - (obstacle.blank?.topRight ?? 0);
    const isXCollision = isXTopLeftCollision && isTTopRightCollision;
    const isYCollision = unitState.y + unitState.width > obstacle.y;

    return isXCollision && isYCollision;
  };

  const createObstacle = (currentGameLevel: number) => {
    const tObstacle: IObstacle = getNewObstacle(currentGameLevel);

    obstacleRef.current = [...obstacleRef.current, tObstacle];
  };

  const getUnitState = (action: string) => {
    const unitState = unitRef.current;
    const jumpState = jumpRef.current;
    if (action === MOVE_STATE.JUMP) {
      const unitY =
        unitState.y - jumpState.speed > jumpState.maxY
          ? unitState.y - jumpState.speed
          : jumpState.maxY;
      return { ...unitState, y: unitY };
    }
    if (action === MOVE_STATE.DESCENT) {
      const unitDownLimit = CANVAS_OBJECT.height - unitState.height;
      const unitY =
        unitState.y + jumpState.speed < unitDownLimit
          ? unitState.y + jumpState.speed
          : unitDownLimit;
      return { ...unitState, y: unitY };
    }
    return unitState;
  };

  const getJumpState = (action: string, time: number): IJumpState => {
    const jumpState = jumpRef.current;
    const JUMP_UP_SPEED_LIMIT = 1;

    if (action === MOVE_STATE.STOP) {
      return { ...jumpState, isjumping: false };
    }
    if (action === MOVE_STATE.JUMP) {
      const acceleration = getAccelerate(DYNO.ACCELERATION_UP, time);
      const jumpSpeed =
        jumpState.speed - acceleration > JUMP_UP_SPEED_LIMIT
          ? jumpState.speed - acceleration
          : JUMP_UP_SPEED_LIMIT;

      return { ...jumpState, speed: jumpSpeed };
    }
    if (action === MOVE_STATE.DESCENT) {
      const downAcceleration = getAccelerate(DYNO.ACCELERATION_DOWN, time);
      const JUMP_DOWN_SPEED_LIMIT = INIT_JUMP_STATE.speed + DYNO.DOWN_PLUS_SPEED;
      const jumpSpeed =
        jumpState.speed + downAcceleration < JUMP_DOWN_SPEED_LIMIT
          ? jumpState.speed + downAcceleration
          : JUMP_DOWN_SPEED_LIMIT;
      return { ...jumpState, speed: jumpSpeed };
    }
    if (action === MOVE_STATE.FLOOER) {
      return { ...jumpState, level: 0, speed: INIT_JUMP_STATE.speed };
    }
    return jumpState;
  };

  const getJumpFlag = (flag: string) => {
    const unitState = unitRef.current;
    const jumpState = jumpRef.current;
    const isJumping = jumpState.isjumping;
    const isNotCanvasFloor = unitState.y + unitState.height < CANVAS_OBJECT.height;
    const isUnitLocationFloor = unitState.y + unitState.height >= CANVAS_OBJECT.height;
    switch (flag) {
      case 'STOP_JUMP':
        return isJumping && jumpState.maxY >= unitState.y;
      case 'JUMP':
        return isJumping && unitState.y > jumpState.maxY;
      case 'UNIT_DESCENT':
        return !isJumping && isNotCanvasFloor;
      case 'JUMP_INIT':
        return jumpState.level !== 0 && isUnitLocationFloor;
      default:
        break;
    }
  };

  const handleMoveState = () => {
    let unitState = unitRef.current;
    let jumpState = jumpRef.current;
    const time = DYNO.JUMP_HEIGHT + (jumpState.maxY - unitState.y);

    if (getJumpFlag('STOP_JUMP')) {
      jumpState = getJumpState(MOVE_STATE.STOP, time);
    }
    if (getJumpFlag('JUMP')) {
      jumpState = getJumpState(MOVE_STATE.JUMP, time);
      unitState = getUnitState(MOVE_STATE.JUMP);
    }
    if (getJumpFlag('UNIT_DESCENT')) {
      jumpState = getJumpState(MOVE_STATE.DESCENT, time);
      unitState = getUnitState(MOVE_STATE.DESCENT);
    }
    if (getJumpFlag('JUMP_INIT')) {
      jumpState = getJumpState(MOVE_STATE.FLOOER, time);
    }
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
      if (checkCollision(obstacle)) {
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
};

export default useChickenGame;
