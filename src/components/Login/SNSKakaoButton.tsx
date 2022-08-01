import { Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { LOGIN_TYPE } from '../../constants';

const SNSKakaoButton = () => {
  const { bg, color, img, name, title, uri } = LOGIN_TYPE.kakao;

  return (
    <Link href={uri} passHref>
      <Button
        bg={bg}
        color={color}
        height="50px"
        width="250px"
        fontSize="24px"
        as="a"
        _hover={{ opacity: 0.7 }}
        marginTop="20px"
        key={name}
      >
        <Image src={img} alt={name} width="24px" height="24px" draggable={false} />
        <Text ml="10px">{title}</Text>
      </Button>
    </Link>
  );
};
export default SNSKakaoButton;
