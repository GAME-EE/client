import { IObstacle } from '../types/dyno';
import DYNO, { GAME_LEVEL } from '../constants/dyno';
import { getRandomNumber } from '../utils/number';

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

const getObstacleMovePosition = (obstacleList: IObstacle[]) => {
  return obstacleList.map(obstacle => ({
    ...obstacle,
    x: obstacle.x - (obstacle.speed ?? DYNO.INIT_OBSTACLE_SPEED),
  }));
};
export { getCurrentGameLevel, getNewObstacle, getObstacleMovePosition };
