import { Button } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const MemoryGameBackButton = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref>
      <Button colorScheme="red" height="50px" width="300px" fontSize="28px" as="button">
        {children}
      </Button>
    </Link>
  );
};

export default MemoryGameBackButton;
