import { memo } from 'react';
import { motion } from 'framer-motion';

import CustomChakraMotion from './CustomChakraMotion';

const Stage = CustomChakraMotion(motion.div);

interface GameStageInterface {
  stage: number;
}

/**
 * @description
 * 게임 스테이지가 바뀔 때 애니메이션 실행되는 컴포넌트
 *
 * usage: `<GameStage stage={number} />`
 */
const GameStage = ({ stage }: GameStageInterface) => {
  return (
    <Stage fontSize={26} key={stage} initial={{ scale: 6 }} animate={{ scale: 1.5 }}>
      {stage}
    </Stage>
  );
};

export default memo(GameStage);
