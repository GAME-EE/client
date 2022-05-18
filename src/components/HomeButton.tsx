import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ROUTES } from '../constants';

interface Props {
  children: React.ReactNode;
  style: IStyle;
}

interface IStyle {
  color: string;
  height: string;
  width: string;
  fontSize: string;
}
const HomeButton = ({ children, style }: Props) => {
  const { color, height, width, fontSize } = style;

  return (
    <Link href={ROUTES.HOME} passHref>
      <Button colorScheme={color} height={height} width={width} fontSize={fontSize} as="button">
        {children}
      </Button>
    </Link>
  );
};

export default HomeButton;
