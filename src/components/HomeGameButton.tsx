import { Box } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const HomeGameButton = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={180}
        height={180}
        backgroundColor="white"
        borderRadius="5px"
        shadow="md"
        transition="all 0.25s ease"
        _hover={{ bgColor: 'purple.400', boxShadow: '2xl', cursor: 'pointer', color: 'white' }}
        as="a"
      >
        {children}
      </Box>
    </Link>
  );
};

export default HomeGameButton;
