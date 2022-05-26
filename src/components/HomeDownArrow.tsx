import { motion } from 'framer-motion';
import Image from 'next/image';

const HomeDownArrow = () => {
  return (
    <motion.div
      animate={{
        y: ['0px', '10px', '0px'],
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <Image
        src="/home/down-arrow.png"
        alt="chicken"
        width="30px"
        height="30px"
        draggable={false}
      />
    </motion.div>
  );
};

export default HomeDownArrow;
