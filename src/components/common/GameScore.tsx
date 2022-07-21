import { memo } from 'react';
import { motion } from 'framer-motion';

import CustomChakraMotion from './CustomChakraMotion';

const Score = CustomChakraMotion(motion.div);

interface GameScoreInterface {
  score: number;
}

/**
 * @description
 * 게임 스코어가 바뀔 때 애니메이션 실행되는 컴포넌트
 *
 * usage: `<GameScore score={number} />`
 */
const GameScore = ({ score }: GameScoreInterface) => {
  return (
    <Score
      fontSize={26}
      key={score}
      initial={{ rotate: 50, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
    >
      {score.toLocaleString('ko-KR')}
    </Score>
  );
};

export default memo(GameScore);
