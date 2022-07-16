import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import CustomChakraMotion from './common/CustomChakraMotion';

interface Props {
  href: string;
  imageSrc: string;
  imageAlt: string;
}

const Box = CustomChakraMotion(motion.a);

const HomeGameLinkButton = ({ href, imageSrc, imageAlt }: Props) => {
  return (
    <Box
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      width={300}
      height={300}
      position="relative"
      _hover={{ cursor: 'pointer' }}
    >
      <Link href={href} passHref>
        <Image
          src={imageSrc}
          alt={imageAlt}
          style={{ borderRadius: '10px' }}
          layout="fill"
          objectFit="cover"
          draggable="false"
        />
      </Link>
    </Box>
  );
};

export default HomeGameLinkButton;
