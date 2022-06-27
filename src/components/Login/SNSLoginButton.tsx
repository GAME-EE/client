import { Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  type: IType;
}

interface IType {
  bg: string;
  color: string;
  img: string;
  name: string;
  title: string;
  uri: string;
}
const SNSLoginButton = ({ type }: Props) => {
  const { bg, color, img, name, title, uri } = type;

  return (
    <Link href={uri} passHref>
      <Button
        bg={bg}
        color={color}
        height="50px"
        width="300px"
        fontSize="24px"
        as="a"
        _hover={{ opacity: 0.7 }}
        marginTop="20px"
        key={type.name}
      >
        <Image src={img} alt={name} width="24px" height="24px" draggable={false} />
        <Text ml="10px">{title}</Text>
      </Button>
    </Link>
  );
};

export default SNSLoginButton;
