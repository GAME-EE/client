import { IUnit, IObstacle, IJumpState } from '../types/dyno';
import DYNO, { CANVAS_OBJECT, GAME_LEVEL, INIT_JUMP_STATE } from '../constants/dyno';
import { getAccelerate, getRandomNumber } from '../utils/number';

const checkCollision = (unit: IUnit, obstacle: IObstacle): boolean => {
  const isXTopLeftCollision = obstacle.x + (obstacle.blank?.topLeft ?? 0) < unit.x + unit.width;
  const isTTopRightCollision =
    unit.x < obstacle.x + obstacle.width - (obstacle.blank?.topRight ?? 0);
  const isXCollision = isXTopLeftCollision && isTTopRightCollision;
  const isYCollision = unit.y + unit.width > obstacle.y;

  return isXCollision && isYCollision;
};

const getCurrentGameLevel = (time: number) => {
  const level = parseInt(time / DYNO.GAME_LEVEL_UP_TIME + 1 + '');
  const currentGameLevel = level < DYNO.GAME_MAX_LEVEL ? level : DYNO.GAME_MAX_LEVEL;
  return currentGameLevel;
};

const getNewObstacle = (currentGameLevel: number) => {
  const randomIndex = getRandomNumber(0, 10);
  const selectObstacle = GAME_LEVEL[currentGameLevel].obstacleList[randomIndex];
  const selectSpeed = GAME_LEVEL[currentGameLevel].speed;

  const newObstacle: IObstacle = {
    ...selectObstacle,
    speed: selectSpeed,
    image: new window.Image(),
  };
  if (newObstacle.image) {
    newObstacle.image.src = newObstacle.imageURL;
  }
  return newObstacle;
};

const JUMP_UP_SPEED_LIMIT = 1;

const getUnitState = (action: string, unitState: IUnit, jumpState: IJumpState) => {
  if (action === 'JUMP') {
    const unitY =
      unitState.y - jumpState.speed > jumpState.maxY
        ? unitState.y - jumpState.speed
        : jumpState.maxY;
    return { ...unitState, y: unitY };
  }
  if (action === 'DESCENT') {
    const unitDownLimit = CANVAS_OBJECT.height - unitState.height;
    const unitY =
      unitState.y + jumpState.speed < unitDownLimit ? unitState.y + jumpState.speed : unitDownLimit;
    return { ...unitState, y: unitY };
  }
  return unitState;
};

const getJumpState = (action: string, jumpState: IJumpState, time: number): IJumpState => {
  if (action === 'STOP') {
    return { ...jumpState, isjumping: false };
  }
  if (action === 'JUMP') {
    const acceleration = getAccelerate(DYNO.ACCELERATION_UP, time);
    const jumpSpeed =
      jumpState.speed - acceleration > JUMP_UP_SPEED_LIMIT
        ? jumpState.speed - acceleration
        : JUMP_UP_SPEED_LIMIT;

    return { ...jumpState, speed: jumpSpeed };
  }
  if (action === 'DESCENT') {
    const downAcceleration = getAccelerate(DYNO.ACCELERATION_DOWN, time);
    const JUMP_DOWN_SPEED_LIMIT = INIT_JUMP_STATE.speed + DYNO.DOWN_PLUS_SPEED;
    const jumpSpeed =
      jumpState.speed + downAcceleration < JUMP_DOWN_SPEED_LIMIT
        ? jumpState.speed + downAcceleration
        : JUMP_DOWN_SPEED_LIMIT;
    return { ...jumpState, speed: jumpSpeed };
  }
  if (action === 'FLOOER') {
    return { ...jumpState, level: 0, speed: INIT_JUMP_STATE.speed };
  }
  return jumpState;
};

const getJumpFlag = (flag, unitState: IUnit, jumpState: IJumpState) => {
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
export {
  checkCollision,
  getCurrentGameLevel,
  getNewObstacle,
  getJumpState,
  getUnitState,
  getJumpFlag,
};
